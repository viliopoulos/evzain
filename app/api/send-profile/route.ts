import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { generateAthleteSnapshot } from '@/lib/email/athlete-snapshot';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, name, assessmentData, sessionId } = body;

    if (!email || !name) {
      return NextResponse.json(
        { error: 'Email and name are required' },
        { status: 400 }
      );
    }

    // Store the completion data in Supabase
    const { data, error } = await supabase
      .from('web_analytics')
      .insert([
        {
          event_type: 'profile_request',
          session_id: sessionId || 'unknown',
          data: {
            email,
            name,
            assessment_summary: assessmentData,
            completed_at: new Date().toISOString(),
          },
        },
      ]);

    if (error) {
      console.error('Supabase error:', error);
      return NextResponse.json(
        { error: 'Failed to store data' },
        { status: 500 }
      );
    }

    // Send athlete profile snapshot email
    try {
      const emailHtml = generateAthleteSnapshot({
        name,
        sport: assessmentData.sport || 'Your Sport',
        level: assessmentData.level || 'intermediate',
        primaryGoal: assessmentData.goals?.[0] || 'Performance Improvement',
        trainingHours: assessmentData.trainingHours || '5-10',
        assessmentData,
      });

      await resend.emails.send({
        from: 'EVZAIN <noreply@evzain.com>',
        to: email,
        subject: `${name}, Your EVZAIN Athlete Profile is Ready`,
        html: emailHtml,
      });
    } catch (emailError) {
      console.error('Email send error:', emailError);
      // Don't fail the request if email fails
    }
    
    return NextResponse.json({ 
      success: true,
      message: 'Profile snapshot sent to your email' 
    });
  } catch (error) {
    console.error('Error in send-profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
