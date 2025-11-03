import { NextRequest, NextResponse } from 'next/server';
import { EMAIL_TEMPLATES, type EmailTemplateType } from '@/lib/email/templates';
import {
  EmailConfigError,
  getEmailServiceStatus,
  sendTransactionalEmail,
} from '@/lib/email/mailer';

export async function POST(request: NextRequest) {
  try {
    const { to, type, data } = await request.json();

    if (!to || !type) {
      return NextResponse.json(
        { error: 'Missing required fields: to, type' },
        { status: 400 }
      );
    }

    if (!(type in EMAIL_TEMPLATES)) {
      return NextResponse.json(
        { error: 'Invalid email type' },
        { status: 400 }
      );
    }

    await sendTransactionalEmail({ to, type: type as EmailTemplateType, data });

    return NextResponse.json({
      success: true,
      message: 'Email sent successfully',
      type,
      to,
    });
  } catch (error) {
    if (error instanceof EmailConfigError) {
      return NextResponse.json(
        {
          error: 'Email service not configured',
          details: error.message,
        },
        { status: 503 }
      );
    }

    console.error('Error sending email:', error);
    return NextResponse.json(
      { error: 'Failed to send email' },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({
    status: 'ok',
    service: getEmailServiceStatus(),
    timestamp: new Date().toISOString(),
  });
}
