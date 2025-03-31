
# Supabase Setup for Visitor Counter

Follow these steps to set up the visits tracking functionality in your Supabase project:

1. Log in to your Supabase dashboard and select your project.
2. Go to the SQL Editor section.
3. Create a new query and paste the following SQL:

```sql
-- Function to create the visits table
CREATE OR REPLACE FUNCTION create_visits_table()
RETURNS boolean
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
BEGIN
  -- Check if the table already exists
  IF NOT EXISTS (
    SELECT FROM pg_tables WHERE schemaname = 'public' AND tablename = 'visits'
  ) THEN
    -- Create the visits table
    CREATE TABLE public.visits (
      id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
      ip_address TEXT NOT NULL,
      visited_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
      UNIQUE(ip_address)
    );
    
    -- Set up Row Level Security
    ALTER TABLE public.visits ENABLE ROW LEVEL SECURITY;
    
    -- Create policy to allow anonymous read access
    CREATE POLICY "Allow anonymous read access" 
      ON public.visits 
      FOR SELECT 
      TO anon 
      USING (true);
    
    -- Create policy to allow anonymous insert
    CREATE POLICY "Allow anonymous insert" 
      ON public.visits 
      FOR INSERT 
      TO anon 
      WITH CHECK (true);
  END IF;
  
  RETURN TRUE;
END;
$$;

-- Create the extension if it doesn't exist
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Execute the function to create the table if it doesn't exist
SELECT create_visits_table();
```

4. Run the query to create both the function and the table.
5. The visitor counter should now work properly!

Note: This setup allows anonymous users to insert and read from the visits table, which is necessary for the visitor counter to work without authentication.
