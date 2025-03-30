
import { createClient } from '@supabase/supabase-js';

// Get environment variables with fallback to placeholder values that won't crash the app
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-project.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-key';

// Create a single supabase client for interacting with your database
export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);

// Add a clear warning about missing environment variables
if (supabaseUrl === 'https://placeholder-project.supabase.co' || supabaseAnonKey === 'placeholder-key') {
  console.warn(
    '⚠️ Using placeholder Supabase credentials. Authentication will not work. Please create a .env file in the root directory with your Supabase URL and anon key based on the .env.example file.'
  );
}
