import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export class SupabaseConfigError extends Error {}

let cachedSupabase: SupabaseClient | null = null;

function getSupabaseClient() {
  if (!cachedSupabase) {
    if (!supabaseUrl || !supabaseAnonKey) {
      throw new SupabaseConfigError('Supabase credentials are not configured');
    }
    cachedSupabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false
      }
    });
  }
  return cachedSupabase;
}

// Helper function to save assessment
export async function saveAssessment(assessmentData: any) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('assessments')
    .insert([assessmentData])
    .select()
    .single();

  if (error) {
    console.error('Error saving assessment:', error);
    throw error;
  }

  return data;
}

// Helper function to get assessment by ID
export async function getAssessmentById(id: string) {
  const supabase = getSupabaseClient();
  const { data, error } = await supabase
    .from('assessments')
    .select('*')
    .eq('id', id)
    .single();

  if (error) {
    console.error('Error fetching assessment:', error);
    throw error;
  }

  return data;
}
