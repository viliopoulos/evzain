import { Resend } from 'resend';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { EMAIL_TEMPLATES, type EmailTemplateType } from './templates';

const resendApiKey = process.env.RESEND_API_KEY || '';
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'EVZAIN <performance@evzain.com>';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

export class EmailConfigError extends Error {}

let resendClient: Resend | null = resendApiKey ? new Resend(resendApiKey) : null;
let supabaseClient: SupabaseClient | null = null;

function getSupabaseClient() {
  if (supabaseClient) {
    return supabaseClient;
  }

  if (!supabaseUrl || !supabaseServiceKey) {
    return null;
  }

  supabaseClient = createClient(supabaseUrl, supabaseServiceKey);
  return supabaseClient;
}

export function getEmailServiceStatus() {
  return {
    resendConfigured: Boolean(resendClient),
    supabaseLoggingConfigured: Boolean(getSupabaseClient()),
  };
}

interface SendTransactionalEmailOptions {
  to: string;
  type: EmailTemplateType;
  data?: Record<string, any>;
}

export async function sendTransactionalEmail({ to, type, data }: SendTransactionalEmailOptions) {
  if (!resendClient) {
    throw new EmailConfigError('Resend API key not configured');
  }

  const template = EMAIL_TEMPLATES[type];
  if (!template) {
    throw new Error(`Unknown email template: ${type}`);
  }

  const normalizedEmail = to.trim().toLowerCase();
  const html = template.getBody(data);
  const subject = template.subject;

  const response = await resendClient.emails.send({
    from: resendFromEmail,
    to: normalizedEmail,
    subject,
    html,
  });

  const supabase = getSupabaseClient();
  if (supabase) {
    try {
      await supabase
        .from('email_campaign_log')
        .insert([
          {
            recipient_email: normalizedEmail,
            campaign_type: type,
            subject,
            body: html,
            status: 'sent',
          },
        ]);

      if (type === 'waitlist_welcome') {
        await supabase
          .from('waitlist_signups')
          .update({ email_sent: true, email_sent_at: new Date().toISOString() })
          .eq('email', normalizedEmail);
      }
    } catch (error) {
      console.error('Failed to log transactional email send:', error);
    }
  }

  return response;
}
