import { NextResponse } from 'next/server';
import { saveAssessment, SupabaseConfigError } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const data = await request.json();
    
    // Basic validation
    if (!data.sport || !data.level || !data.trainingHours) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Save to database
    const assessment = await saveAssessment(data);

    return NextResponse.json(assessment);
  } catch (error) {
    if (error instanceof SupabaseConfigError) {
      console.error('Supabase not configured for assessments');
      return NextResponse.json(
        {
          error: 'Service temporarily unavailable',
          details: 'Assessment service is not properly configured',
        },
        { status: 503 }
      );
    }

    console.error('Error in assessment submission:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment' },
      { status: 500 }
    );
  }
}
