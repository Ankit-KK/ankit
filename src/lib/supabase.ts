
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallback to empty strings
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Add a check to warn about missing environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Missing Supabase environment variables. Make sure to create a .env file based on .env.example and add your Supabase URL and anon key.'
  );
}
