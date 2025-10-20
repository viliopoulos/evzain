// Data Collection Utilities for EVZAIN
// Handles: waitlist signups, assessment submissions, web analytics

import { createClient } from '@supabase/supabase-js';

// Initialize Supabase client
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Generate or retrieve session ID for anonymous tracking
export function getSessionId(): string {
  if (typeof window === 'undefined') return '';
  
  let sessionId = sessionStorage.getItem('evzain_session_id');
  if (!sessionId) {
    sessionId = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    sessionStorage.setItem('evzain_session_id', sessionId);
  }
  return sessionId;
}

// 1. Waitlist Signup
export async function addToWaitlist(email: string, source: string = 'homepage') {
  try {
    const { data, error } = await supabase
      .from('waitlist_signups')
      .insert([{ email, source }])
      .select()
      .single();

    if (error) {
      // If duplicate email, that's okay - just return success
      if (error.code === '23505') {
        console.log('Email already on waitlist');
        return { success: true, alreadyExists: true };
      }
      throw error;
    }

    // Trigger welcome email
    await sendWelcomeEmail(email);

    return { success: true, data };
  } catch (error) {
    console.error('Error adding to waitlist:', error);
    return { success: false, error };
  }
}

// 2. Submit Assessment Response
export async function submitAssessment(assessmentData: any, email?: string) {
  try {
    const sessionId = getSessionId();
    const startTime = sessionStorage.getItem('assessment_start_time');
    const timeSpent = startTime ? Math.floor((Date.now() - parseInt(startTime)) / 1000) : null;

    const { data, error } = await supabase
      .from('assessment_responses')
      .insert([{
        email,
        session_id: sessionId,
        sport: assessmentData.sport,
        sport_other: assessmentData.sportOther,
        level: assessmentData.level,
        training_hours: assessmentData.trainingHours,
        goals: assessmentData.goals,
        progress_tracking: assessmentData.progressTracking,
        injury_status: assessmentData.injuryStatus,
        injury_details: assessmentData.injuryDetails,
        frustrations: assessmentData.frustrations,
        frustration_other: assessmentData.frustrationOther,
        confusion_frequency: assessmentData.confusionFrequency,
        tracking_methods: assessmentData.trackingMethod,
        tracking_other: assessmentData.trackingOther,
        compete: assessmentData.compete,
        mental_challenges: assessmentData.mentalChallenges,
        mental_other: assessmentData.mentalOther,
        mental_strategies: assessmentData.mentalStrategies,
        advice_sources: assessmentData.adviceSources,
        reading_habits: assessmentData.readingHabits,
        willingness_to_pay: assessmentData.willingnessToPay,
        completed_at: new Date().toISOString(),
        time_spent_seconds: timeSpent
      }])
      .select()
      .single();

    if (error) throw error;

    // If email provided, add to waitlist and send completion email
    if (email) {
      await addToWaitlist(email, 'assessment_complete');
      await sendAssessmentCompleteEmail(email, data);
    }

    // Track analytics event
    await trackEvent('assessment_completed', {
      sport: assessmentData.sport,
      level: assessmentData.level,
      time_spent: timeSpent
    });

    return { success: true, data };
  } catch (error) {
    console.error('Error submitting assessment:', error);
    return { success: false, error };
  }
}

// 3. Track Web Analytics Event
export async function trackEvent(eventType: string, eventData: any = {}) {
  try {
    const sessionId = getSessionId();
    
    const { error } = await supabase
      .from('web_analytics')
      .insert([{
        session_id: sessionId,
        event_type: eventType,
        event_data: eventData,
        page_url: typeof window !== 'undefined' ? window.location.href : '',
        referrer: typeof document !== 'undefined' ? document.referrer : '',
        user_agent: typeof navigator !== 'undefined' ? navigator.userAgent : ''
      }]);

    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.error('Error tracking event:', error);
    return { success: false, error };
  }
}

// 4. Send Welcome Email (via API route)
async function sendWelcomeEmail(email: string) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        type: 'waitlist_welcome'
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending welcome email:', error);
    return false;
  }
}

// 5. Send Assessment Complete Email
async function sendAssessmentCompleteEmail(email: string, assessmentData: any) {
  try {
    const response = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: email,
        type: 'assessment_complete',
        data: assessmentData
      })
    });
    return response.ok;
  } catch (error) {
    console.error('Error sending assessment email:', error);
    return false;
  }
}

// 6. Initialize assessment tracking
export function initAssessmentTracking() {
  if (typeof window === 'undefined') return;
  
  if (!sessionStorage.getItem('assessment_start_time')) {
    sessionStorage.setItem('assessment_start_time', Date.now().toString());
  }
  
  trackEvent('assessment_started');
}

// 7. Track page views
export function trackPageView(pageName: string) {
  trackEvent('page_view', { page: pageName });
}

// 8. Track button clicks
export function trackButtonClick(buttonName: string, location: string) {
  trackEvent('button_click', { button: buttonName, location });
}
