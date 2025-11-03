import { NextResponse } from 'next/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import {
  EmailConfigError,
  sendTransactionalEmail,
} from '@/lib/email/mailer';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Validation helpers
function validateAssessmentData(data: any): { valid: boolean; errors: string[] } {
  const errors: string[] = [];

  // Required fields
  if (!data.sport || typeof data.sport !== 'string') {
    errors.push('Sport is required');
  }
  if (!data.level || typeof data.level !== 'string') {
    errors.push('Level is required');
  }
  if (!data.trainingHours || typeof data.trainingHours !== 'string') {
    errors.push('Training hours is required');
  }
  if (!Array.isArray(data.goals) || data.goals.length === 0) {
    errors.push('At least one goal is required');
  }
  if (!data.progressTracking || typeof data.progressTracking !== 'string') {
    errors.push('Progress tracking is required');
  }
  if (!Array.isArray(data.frustrations)) {
    errors.push('Frustrations must be an array');
  }
  if (!data.confusionFrequency || typeof data.confusionFrequency !== 'string') {
    errors.push('Confusion frequency is required');
  }
  if (!Array.isArray(data.trackingMethod)) {
    errors.push('Tracking methods must be an array');
  }
  if (!data.compete || typeof data.compete !== 'string') {
    errors.push('Competition status is required');
  }
  if (!Array.isArray(data.mentalChallenges)) {
    errors.push('Mental challenges must be an array');
  }
  if (!Array.isArray(data.mentalStrategies) || data.mentalStrategies.length === 0) {
    errors.push('At least one mental strategy is required');
  }
  if (!Array.isArray(data.adviceSources) || data.adviceSources.length === 0) {
    errors.push('At least one advice source is required');
  }
  if (!data.readingHabits || typeof data.readingHabits !== 'string') {
    errors.push('Reading habits is required');
  }
  if (!data.willingnessToPay || typeof data.willingnessToPay !== 'string') {
    errors.push('Willingness to pay is required');
  }

  // Validate email if provided
  if (data.email && typeof data.email === 'string') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(data.email.trim())) {
      errors.push('Invalid email format');
    }
  }

  // Validate arrays don't exceed reasonable limits (anti-spam)
  if (data.goals && data.goals.length > 10) {
    errors.push('Too many goals selected');
  }
  if (data.frustrations && data.frustrations.length > 10) {
    errors.push('Too many frustrations selected');
  }
  if (data.trackingMethod && data.trackingMethod.length > 10) {
    errors.push('Too many tracking methods selected');
  }
  if (data.mentalChallenges && data.mentalChallenges.length > 10) {
    errors.push('Too many mental challenges selected');
  }
  if (data.mentalStrategies && data.mentalStrategies.length > 10) {
    errors.push('Too many mental strategies selected');
  }
  if (data.adviceSources && data.adviceSources.length > 10) {
    errors.push('Too many advice sources selected');
  }

  // Validate text fields for reasonable length (anti-spam)
  if (data.sportOther && data.sportOther.length > 100) {
    errors.push('Sport description is too long');
  }
  if (data.frustrationOther && data.frustrationOther.length > 200) {
    errors.push('Frustration description is too long');
  }
  if (data.trackingOther && data.trackingOther.length > 100) {
    errors.push('Tracking method description is too long');
  }
  if (data.mentalOther && data.mentalOther.length > 200) {
    errors.push('Mental challenge description is too long');
  }
  if (data.injuryDetails && data.injuryDetails.length > 500) {
    errors.push('Injury details are too long');
  }

  return {
    valid: errors.length === 0,
    errors
  };
}

export async function POST(request: Request) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return NextResponse.json(
      {
        error: 'Service temporarily unavailable',
        details: 'Assessment service is not properly configured',
      },
      { status: 503 }
    );
  }

  try {
    const data = await request.json();
    
    // Validate assessment data
    const validation = validateAssessmentData(data);
    if (!validation.valid) {
      return NextResponse.json(
        { 
          error: 'Validation failed',
          details: validation.errors 
        },
        { status: 400 }
      );
    }

    // Generate session ID if not provided
    const sessionId = data.sessionId || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

    // Map frontend data to database schema
    const assessmentRecord = {
      email: data.email?.trim().toLowerCase() || null,
      session_id: sessionId,
      sport: data.sport,
      sport_other: data.sportOther || null,
      level: data.level,
      training_hours: data.trainingHours,
      goals: data.goals,
      progress_tracking: data.progressTracking,
      injury_status: data.injuryStatus || null,
      injury_details: data.injuryDetails || null,
      frustrations: data.frustrations || [],
      frustration_other: data.frustrationOther || null,
      confusion_frequency: data.confusionFrequency,
      tracking_methods: data.trackingMethod || [],
      tracking_other: data.trackingOther || null,
      compete: data.compete,
      mental_challenges: data.mentalChallenges || [],
      mental_other: data.mentalOther || null,
      mental_strategies: data.mentalStrategies,
      advice_sources: data.adviceSources,
      reading_habits: data.readingHabits,
      willingness_to_pay: data.willingnessToPay,
      completed_at: new Date().toISOString(),
      time_spent_seconds: data.timeSpent || null
    };

    // Insert into database (triggers will auto-compute derived fields)
    const { data: savedAssessment, error } = await supabase
      .from('assessment_responses')
      .insert([assessmentRecord])
      .select()
      .single();

    if (error) {
      console.error('Error saving assessment:', error);
      return NextResponse.json(
        { error: 'Failed to save assessment' },
        { status: 500 }
      );
    }

    if (data.email) {
      try {
        await sendTransactionalEmail({
          to: data.email,
          type: 'assessment_complete',
          data: {
            sport: savedAssessment.sport,
            level: savedAssessment.level,
            athlete_segment: savedAssessment.athlete_segment,
            primary_focus: savedAssessment.primary_focus,
          },
        });
      } catch (err) {
        if (err instanceof EmailConfigError) {
          console.warn('Resend not configured; skipping assessment email');
        } else {
          console.error('Failed to send assessment email:', err);
        }
      }
    }

    return NextResponse.json({
      success: true,
      assessment: savedAssessment,
      message: 'Assessment saved successfully'
    });

  } catch (error) {
    console.error('Error in assessment submission:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment' },
      { status: 500 }
    );
  }
}
