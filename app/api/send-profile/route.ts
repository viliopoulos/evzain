import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

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

    // TODO: Add email sending later
    // For now, data is stored in Supabase
    
    return NextResponse.json({ 
      success: true,
      message: 'Profile request received. We\'ll be in touch soon!' 
    });
  } catch (error) {
    console.error('Error in send-profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
