import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { generateProfileEmail } from '@/lib/emails/profile-email';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  console.log('🎯 API: send-profile called');
  try {
    const body = await request.json();
    const { email, name, assessmentData, sessionId } = body;
    
    console.log('📧 Received email:', email);
    console.log('👤 Received name:', name);
    console.log('📊 Has assessment data:', !!assessmentData);

    if (!email || !name) {
      console.error('❌ Missing required fields');
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Store the completion data in Supabase
    console.log('💾 Attempting to save to Supabase...');
    const { data, error } = await supabase
      .from('web_analytics')
      .insert({
        event_type: 'profile_request',
        session_id: sessionId || 'unknown',
        data: {
          email,
          name,
          assessment_summary: assessmentData,
          completed_at: new Date().toISOString(),
        },
      });

    if (error) {
      console.error('❌ Supabase error:', error);
      console.log('⚠️ Continuing without saving to database...');
      // Don't fail the request - continue to send email
    } else {
      console.log('✅ Data saved to Supabase');
    }

    // Send profile email
    console.log('📧 Preparing to send email...');
    let emailSent = false;
    let emailErrorMsg = null;
    
    try {
      if (!process.env.RESEND_API_KEY) {
        throw new Error('RESEND_API_KEY not configured');
      }
      
      console.log('📧 Generating email HTML...');
      const emailHtml = generateProfileEmail({
        name,
        sport: assessmentData?.sport || 'Your Sport',
        level: assessmentData?.level || 'Intermediate',
        goals: assessmentData?.goals || ['Performance Improvement'],
        trainingHours: assessmentData?.training_hours || '5-10 hours',
        frustrations: assessmentData?.frustrations || [],
        progressTracking: assessmentData?.progress_tracking || 'Manual tracking',
      });

      console.log('📧 Sending email via Resend...');
      const emailResult = await resend.emails.send({
        from: 'EVZAIN <hello@evzain.com>',
        to: email,
        subject: `${name}, Your EVZAIN Athlete Profile is Ready`,
        html: emailHtml,
      });
      
      console.log('✅ Email sent successfully!', emailResult);
      emailSent = true;
    } catch (emailError) {
      console.error('❌ Email send error:', emailError);
      emailErrorMsg = emailError instanceof Error ? emailError.message : 'Unknown error';
      // Don't fail the request if email fails
    }
    
    return NextResponse.json({ 
      success: true,
      message: emailSent ? 'Profile sent to your email!' : 'Profile saved! Email may be delayed.',
      emailSent,
      emailError: emailErrorMsg
    });
  } catch (error) {
    console.error('Error in send-profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
