
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vsevsjvtrshgeiudrnth.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZzZXZzanZ0cnNoZ2VpdWRybnRoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI1ODE1ODEsImV4cCI6MjA1ODE1NzU4MX0.uLkTc3a0kdMNfgIg2qYKnnaLjbvtXGKPOoWbqntibmw'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
