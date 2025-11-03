import { NextRequest, NextResponse } from 'next/server';
import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase: SupabaseClient | null =
  supabaseUrl && supabaseAnonKey
    ? createClient(supabaseUrl, supabaseAnonKey)
    : null;

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// List of disposable email domains to filter out spam
const DISPOSABLE_DOMAINS = [
  'tempmail.com', 'guerrillamail.com', '10minutemail.com', 'throwaway.email',
  'mailinator.com', 'trashmail.com', 'fakeinbox.com', 'sharklasers.com'
];

function validateEmail(email: string): { valid: boolean; error?: string } {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' };
  }

  const trimmedEmail = email.trim().toLowerCase();

  if (!EMAIL_REGEX.test(trimmedEmail)) {
    return { valid: false, error: 'Invalid email format' };
  }

  // Check for disposable email domains
  const domain = trimmedEmail.split('@')[1];
  if (DISPOSABLE_DOMAINS.includes(domain)) {
    return { valid: false, error: 'Disposable email addresses are not allowed' };
  }

  // Check for suspicious patterns
  if (trimmedEmail.length > 254) {
    return { valid: false, error: 'Email address is too long' };
  }

  return { valid: true };
}

export async function POST(request: NextRequest) {
  if (!supabase) {
    console.error('Supabase client not initialized');
    return NextResponse.json(
      { error: 'Service temporarily unavailable' },
      { status: 503 }
    );
  }

  try {
    const { email, source } = await request.json();

    // Validate email
    const validation = validateEmail(email);
    if (!validation.valid) {
      return NextResponse.json(
        { error: validation.error },
        { status: 400 }
      );
    }

    const trimmedEmail = email.trim().toLowerCase();

    // Check if email already exists
    const { data: existing } = await supabase
      .from('waitlist_signups')
      .select('id')
      .eq('email', trimmedEmail)
      .single();

    if (existing) {
      return NextResponse.json(
        { 
          success: true, 
          message: "You're already on the waitlist!",
          alreadyExists: true 
        },
        { status: 200 }
      );
    }

    // Insert new signup
    const { data, error } = await supabase
      .from('waitlist_signups')
      .insert([{
        email: trimmedEmail,
        source: source || 'homepage'
      }])
      .select()
      .single();

    if (error) {
      console.error('Error saving waitlist signup:', error);
      return NextResponse.json(
        { error: 'Failed to save email' },
        { status: 500 }
      );
    }

    // TODO: Trigger welcome email via /api/send-email
    // await fetch('/api/send-email', {
    //   method: 'POST',
    //   body: JSON.stringify({
    //     to: trimmedEmail,
    //     type: 'waitlist_welcome'
    //   })
    // });

    return NextResponse.json({
      success: true,
      message: "You're part of the movement! Welcome to EVZAIN.",
      data
    });

  } catch (error) {
    console.error('Error in waitlist signup:', error);
    return NextResponse.json(
      { error: 'Failed to process signup' },
      { status: 500 }
    );
  }
}

export function GET() {
  return NextResponse.json({
    status: supabase ? 'ok' : 'degraded',
    timestamp: new Date().toISOString(),
  });
}
