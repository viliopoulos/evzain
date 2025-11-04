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

    // Fetch full email content from Resend API
    const emailResponse = await fetch(`https://api.resend.com/emails/${emailId}`, {
      headers: {
        'Authorization': `Bearer ${resendApiKey}`,
      },
    });

    if (!emailResponse.ok) {
      throw new Error(`Failed to fetch email: ${emailResponse.statusText}`);
    }

    const emailData = await emailResponse.json();
    
    const htmlBody = emailData.html ?? (emailData.text ? `<pre>${emailData.text}</pre>` : `<p>From: ${event.data.from}</p><p>Subject: ${event.data.subject}</p><p>(Email body not available)</p>`);
    const textBody = emailData.text ?? emailData.html?.replace(/<[^>]+>/g, '') ?? `From: ${event.data.from}\nSubject: ${event.data.subject}\n\n(Email body not available)`;

    await resend.emails.send({
      from: 'EVZAIN <performance@evzain.com>',
      to: [forwardToEmail],
      replyTo: event.data.from,
      subject: `Fwd: ${event.data.subject ?? '(no subject)'}`,
      html: htmlBody,
      text: textBody,
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
