import { NextRequest, NextResponse } from 'next/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseServiceKey
    ? createClient(supabaseUrl, supabaseServiceKey)
    : null;

// Email templates
const EMAIL_TEMPLATES = {
  waitlist_welcome: {
    subject: 'Welcome to the EVZAIN Movement ζ',
    getBody: (data?: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 32px; font-weight: 300; color: #0f172a; }
    .logo-accent { font-family: 'Georgia', serif; font-style: italic; color: #10b981; }
    .zeta { font-size: 48px; color: #0891b2; opacity: 0.3; }
    .content { background: #ffffff; padding: 30px; border-radius: 12px; border-left: 4px solid #10b981; }
    .button { display: inline-block; background: linear-gradient(to right, #10b981, #059669); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .footer { text-align: center; margin-top: 40px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">EVZA<span class="logo-accent">IN</span></div>
      <div class="zeta">ζ</div>
    </div>
    
    <div class="content">
      <h2 style="color: #0f172a; margin-top: 0;">You're Part of Something Special</h2>
      
      <p>Thank you for joining the EVZAIN waitlist. You're now part of a movement to democratize elite-level training intelligence.</p>
      
      <p><strong>What happens next?</strong></p>
      <ul>
        <li>We're building EVZAIN with real athletes, for real athletes</li>
        <li>You'll get early access before anyone else</li>
        <li>Your feedback will shape the platform</li>
      </ul>
      
      <p>In the meantime, take our 5-minute assessment to help us understand your training journey better:</p>
      
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://evzain.com'}/assessment" class="button">
        Take the Assessment →
      </a>
      
      <p style="margin-top: 30px;">Built by athletes who competed at the highest level, EVZAIN blends ancient wisdom (εὖ ζήν - "living well") with modern AI to help you train smarter and live better.</p>
      
      <p style="margin-top: 30px; color: #64748b; font-style: italic;">
        - The EVZAIN Team
      </p>
    </div>
    
    <div class="footer">
      <p>Questions? Reply to this email or reach out to performance@evzain.com</p>
      <p style="margin-top: 10px;">© ${new Date().getFullYear()} EVZAIN. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  },
  
  assessment_complete: {
    subject: 'Your EVZAIN Training Blueprint is Ready',
    getBody: (data?: any) => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; line-height: 1.6; color: #1e293b; }
    .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
    .header { text-align: center; margin-bottom: 40px; }
    .logo { font-size: 32px; font-weight: 300; color: #0f172a; }
    .logo-accent { font-family: 'Georgia', serif; font-style: italic; color: #10b981; }
    .content { background: #ffffff; padding: 30px; border-radius: 12px; border-left: 4px solid #0891b2; }
    .insight-box { background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 3px solid #0891b2; }
    .button { display: inline-block; background: linear-gradient(to right, #0891b2, #0e7490); color: white; padding: 14px 32px; text-decoration: none; border-radius: 8px; font-weight: 600; margin: 20px 0; }
    .footer { text-align: center; margin-top: 40px; color: #64748b; font-size: 14px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <div class="logo">EVZA<span class="logo-accent">IN</span></div>
    </div>
    
    <div class="content">
      <h2 style="color: #0f172a; margin-top: 0;">Thank You for Completing Your Assessment</h2>
      
      <p>We've analyzed your responses and we're excited to help you on your journey.</p>
      
      <div class="insight-box">
        <h3 style="margin-top: 0; color: #0891b2;">Your Profile</h3>
        <p><strong>Sport:</strong> ${data?.sport || 'Your sport'}</p>
        <p><strong>Level:</strong> ${data?.level || 'Your level'}</p>
        <p><strong>Athlete Segment:</strong> ${data?.athlete_segment || 'Determined'}</p>
        <p><strong>Primary Focus:</strong> ${data?.primary_focus?.replace(/_/g, ' ') || 'Your goals'}</p>
      </div>
      
      <p><strong>What's next?</strong></p>
      <ul>
        <li>We're analyzing your responses to create personalized recommendations</li>
        <li>You'll receive early access to EVZAIN when we launch</li>
        <li>We may reach out for a brief conversation to better understand your needs</li>
      </ul>
      
      <p>Your insights are invaluable in helping us build the best training intelligence platform for athletes like you.</p>
      
      <a href="${process.env.NEXT_PUBLIC_SITE_URL || 'https://evzain.com'}/results" class="button">
        View Your Results →
      </a>
      
      <p style="margin-top: 30px; color: #64748b; font-style: italic;">
        - The EVZAIN Team
      </p>
    </div>
    
    <div class="footer">
      <p>Questions? Reply to this email or reach out to performance@evzain.com</p>
      <p style="margin-top: 10px;">© ${new Date().getFullYear()} EVZAIN. All rights reserved.</p>
    </div>
  </div>
</body>
</html>
    `
  }
};

export async function POST(request: NextRequest) {
  if (!supabase) {
    console.error('Supabase client not initialized - check environment variables');
    return NextResponse.json(
      {
        error: 'Service temporarily unavailable',
        details: 'Email service is not properly configured',
      },
      { status: 503 }
    );
  }

  try {
    const { to, type, data } = await request.json();

    if (!to || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: to, type' },
        { status: 400 }
      );
    }

    const template = EMAIL_TEMPLATES[type as keyof typeof EMAIL_TEMPLATES];
    if (!template) {
      return NextResponse.json(
        { error: 'Invalid email type' },
        { status: 400 }
      );
    }

    // In production, integrate with email service (SendGrid, Resend, etc.)
    // For now, we'll log the email and store it in the database
    
    const emailBody = template.getBody(data);
    
    // Log email in database
    const { error: dbError } = await supabase
      .from('email_campaign_log')
      .insert([{
        recipient_email: to,
        campaign_type: type,
        subject: template.subject,
        body: emailBody,
        status: 'sent'
      }]);

    if (dbError) {
      console.error('Error logging email:', dbError);
    }

    // Update waitlist signup to mark email as sent
    if (type === 'waitlist_welcome') {
      await supabase
        .from('waitlist_signups')
        .update({ email_sent: true, email_sent_at: new Date().toISOString() })
        .eq('email', to);
    }

    // TODO: Integrate with actual email service
    // Example with Resend:
    // const resend = new Resend(process.env.RESEND_API_KEY);
    // await resend.emails.send({
    //   from: 'EVZAIN <hello@evzain.com>',
    //   to: [to],
    //   subject: template.subject,
    //   html: emailBody
    // });

    console.log(`Email queued: ${type} to ${to}`);

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      type,
      to
    });

  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({
    status: supabase ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
  });
}
