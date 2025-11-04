import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resendApiKey = process.env.RESEND_API_KEY ?? '';
const forwardToEmail = process.env.RESEND_FORWARD_TO ?? 'viliopoulo@gmail.com';
const resend = new Resend(resendApiKey);

type ResendEmailReceivedEvent = {
  type: string;
  data: {
    email_id: string;
    to: string[];
    from: string;
    subject?: string;
    html?: string;
    text?: string;
    attachments?: any[];
  };
};

export async function POST(request: Request) {
  if (!resendApiKey) {
    console.error('RESEND_API_KEY is not configured');
    return NextResponse.json({ error: 'Resend API key missing' }, { status: 500 });
  }

  let event: ResendEmailReceivedEvent;

  try {
    event = (await request.json()) as ResendEmailReceivedEvent;
  } catch (error) {
    console.error('Failed to parse Resend webhook payload', error);
    return NextResponse.json({ error: 'Invalid JSON payload' }, { status: 400 });
  }

  if (event.type !== 'email.received') {
    return NextResponse.json({ ok: true });
  }

  const emailId = event.data?.email_id;

  if (!emailId) {
    console.error('Resend webhook missing email_id');
    return NextResponse.json({ error: 'Missing email_id' }, { status: 400 });
  }

  try {
    console.log('Processing inbound email', {
      emailId,
      to: event.data?.to,
      from: event.data?.from,
      subject: event.data?.subject,
    });

    // Fetch full email content and attachments using Resend SDK
    const [emailResponse, attachmentsResponse] = await Promise.all([
      resend.emails.receiving.get(emailId),
      resend.emails.receiving.attachments.list({ emailId }),
    ]);

    const emailData = emailResponse.data;
    const attachmentsList = Array.isArray(attachmentsResponse.data?.data) 
      ? attachmentsResponse.data.data 
      : [];
    
    const htmlBody = emailData?.html ?? (emailData?.text ? `<pre>${emailData.text}</pre>` : `<p>From: ${event.data.from}</p><p>Subject: ${event.data.subject}</p><p>(Email body not available)</p>`);
    const textBody = emailData?.text ?? emailData?.html?.replace(/<[^>]+>/g, '') ?? `From: ${event.data.from}\nSubject: ${event.data.subject}\n\n(Email body not available)`;

    // Download and prepare attachments
    const preparedAttachments = await Promise.all(
      attachmentsList.map(async (attachment: any) => {
        try {
          const response = await fetch(attachment.download_url);
          const buffer = Buffer.from(await response.arrayBuffer());
          return {
            filename: attachment.filename,
            content: buffer.toString('base64'),
          };
        } catch (error) {
          console.error('Failed to download attachment', { filename: attachment.filename, error });
          return null;
        }
      })
    );

    const validAttachments = preparedAttachments.filter((a: { filename: string; content: string } | null): a is { filename: string; content: string } => a !== null);

    // Extract sender name and email from the from field
    const fromMatch = event.data.from.match(/^(.+?)\s*<(.+?)>$/) || [null, event.data.from, event.data.from];
    const senderName = fromMatch[1]?.trim() || event.data.from.split('@')[0];
    const senderEmail = fromMatch[2] || event.data.from;

    // Add original sender info to email body
    const enrichedHtml = `
      <div style="background: #f3f4f6; padding: 12px; margin-bottom: 16px; border-left: 4px solid #10b981; font-family: sans-serif;">
        <strong>From:</strong> ${event.data.from}<br>
        <strong>To:</strong> ${event.data.to.join(', ')}<br>
        <strong>Reply to this email to respond to ${senderName}</strong>
      </div>
      ${htmlBody}
    `;

    const enrichedText = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
From: ${event.data.from}
To: ${event.data.to.join(', ')}
Reply to this email to respond to ${senderName}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${textBody}
    `;

    await resend.emails.send({
      from: 'EVZAIN Performance <performance@evzain.com>',
      to: [forwardToEmail],
      replyTo: senderEmail,
      subject: `[${senderName}] ${event.data.subject ?? '(no subject)'}`,
      html: enrichedHtml,
      text: enrichedText,
      attachments: validAttachments.length > 0 ? validAttachments : undefined,
    });

    console.log('Forwarded inbound email from Resend', {
      emailId,
      to: forwardToEmail,
      originalTo: event.data.to,
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Failed to forward inbound Resend email', {
      emailId,
      error: errorMessage,
      stack: error instanceof Error ? error.stack : undefined,
    });

    return NextResponse.json({ error: 'Failed to process inbound email', details: errorMessage }, { status: 500 });
  }
}

export function GET() {
  return NextResponse.json({
    status: 'ok',
    forwardTo: forwardToEmail,
    timestamp: new Date().toISOString(),
  });
}
