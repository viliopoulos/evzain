import { NextResponse } from 'next/server';
import { saveAssessment } from '@/lib/supabase';

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
    console.error('Error in assessment submission:', error);
    return NextResponse.json(
      { error: 'Failed to process assessment' },
      { status: 500 }
    );
  }
}
