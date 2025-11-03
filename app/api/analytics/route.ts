import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

const supabase = supabaseUrl && supabaseServiceKey
  ? createClient(supabaseUrl, supabaseServiceKey)
  : null;

export async function GET() {
  if (!supabase) {
    return NextResponse.json(
      { error: 'Analytics service not configured' },
      { status: 503 }
    );
  }

  try {
    // Waitlist analytics
    const { data: waitlistData, error: waitlistError } = await supabase
      .from('waitlist_signups')
      .select('*')
      .order('created_at', { ascending: false });

    if (waitlistError) throw waitlistError;

    // Assessment analytics
    const { data: assessmentData, error: assessmentError } = await supabase
      .from('assessment_responses')
      .select('*')
      .not('completed_at', 'is', null);

    if (assessmentError) throw assessmentError;

    // Email campaign analytics
    const { data: emailData, error: emailError } = await supabase
      .from('email_campaign_log')
      .select('*');

    if (emailError) throw emailError;

    // Process assessment data by segment and focus
    const segmentCounts: Record<string, number> = {};
    const focusCounts: Record<string, number> = {};
    let totalTimeSpent = 0;

    assessmentData?.forEach((assessment) => {
      const segment = assessment.athlete_segment || 'unknown';
      const focus = assessment.primary_focus || 'general_improvement';

      segmentCounts[segment] = (segmentCounts[segment] || 0) + 1;
      focusCounts[focus] = (focusCounts[focus] || 0) + 1;

      if (assessment.time_spent_seconds) {
        totalTimeSpent += assessment.time_spent_seconds;
      }
    });

    // Email analytics
    const emailsByType: Record<string, number> = {};
    let emailsOpened = 0;
    let emailsClicked = 0;

    emailData?.forEach((email) => {
      const type = email.campaign_type || 'unknown';
      emailsByType[type] = (emailsByType[type] || 0) + 1;

      if (email.opened_at) emailsOpened++;
      if (email.clicked_at) emailsClicked++;
    });

    return NextResponse.json({
      waitlist: {
        total: waitlistData?.length || 0,
        emailsSent: waitlistData?.filter((w) => w.email_sent).length || 0,
        recent: waitlistData?.slice(0, 20) || [],
      },
      assessments: {
        total: assessmentData?.length || 0,
        completed: assessmentData?.length || 0,
        avgTimeSpent:
          assessmentData?.length > 0
            ? Math.round(totalTimeSpent / assessmentData.length)
            : 0,
        bySegment: segmentCounts,
        byFocus: focusCounts,
      },
      emails: {
        total: emailData?.length || 0,
        opened: emailsOpened,
        clicked: emailsClicked,
        byType: emailsByType,
      },
    });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}
