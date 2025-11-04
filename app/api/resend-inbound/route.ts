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

    const [emailResponse, attachmentsResponse] = await Promise.all([
      resend.emails.receiving.get(emailId),
      resend.attachments.receiving.list({ emailId }),
    ]);

    const emailData = emailResponse.data;
    const attachmentsRaw = attachmentsResponse.data;
    const attachmentsArray = Array.isArray((attachmentsRaw as any)?.data)
      ? (attachmentsRaw as any).data
      : Array.isArray(attachmentsRaw)
        ? attachmentsRaw
        : [];

    const preparedAttachments = await Promise.all(
      attachmentsArray.map(async (attachment: any) => {
        const downloadUrl = attachment.download_url;
        const filename = attachment.filename ?? 'attachment';
        const contentType = attachment.content_type ?? 'application/octet-stream';

        try {
          const response = await fetch(downloadUrl);
          const buffer = Buffer.from(await response.arrayBuffer());

          return {
            filename,
            content: buffer.toString('base64'),
            contentType,
          };
        } catch (error) {
          console.error('Failed to download attachment from Resend', {
            filename,
            downloadUrl,
            error,
          });
          return null;
        }
      })
    );

    const sanitizedAttachments = preparedAttachments.filter(
      (attachment): attachment is { filename: string; content: string; contentType: string } =>
        attachment !== null
    );

    const htmlBody = emailData?.html ?? (emailData?.text ? `<pre>${emailData.text}</pre>` : '<p>(no content)</p>');
    const textBody = emailData?.text ?? emailData?.html?.replace(/<[^>]+>/g, '') ?? '';

    await resend.emails.send({
      from: 'EVZAIN <performance@evzain.com>',
      to: [forwardToEmail],
      subject: emailData?.subject ?? event.data.subject ?? '(no subject)',
      html: htmlBody,
      text: textBody,
      attachments: sanitizedAttachments.length ? sanitizedAttachments : undefined,
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
