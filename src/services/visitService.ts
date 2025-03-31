
import { supabase } from '@/lib/supabase'
import { toast } from '@/components/ui/use-toast'

/**
 * Ensures that the 'visits' table exists in the Supabase database
 */
export const ensureVisitsTable = async (): Promise<boolean> => {
  try {
    // Check if the visits table exists
    const { data: tables } = await supabase
      .from('_tables')
      .select('table_name')
      .eq('table_name', 'visits')

    // If table exists, return early
    if (tables && tables.length > 0) {
      return true
    }

    // Create the visits table if it doesn't exist
    // Note: This requires RLS permissions to create tables
    const { error } = await supabase.rpc('create_visits_table')

    if (error) {
      console.error('Error creating visits table:', error)
      return false
    }

    return true
  } catch (error) {
    console.error('Error ensuring visits table exists:', error)
    return false
  }
}

/**
 * Record a new visit to the site
 * Creates a 'visits' table in your Supabase database if it doesn't exist with:
 * - ip_address (text)
 * - visited_at (timestamp with default now())
 */
export const recordVisit = async () => {
  try {
    // First, ensure the table exists
    const tableExists = await ensureVisitsTable()
    
    if (!tableExists) {
      // Fall back to storing in localStorage if we can't create the table
      const visitsCount = localStorage.getItem('visitsCount') || '0'
      localStorage.setItem('visitsCount', (parseInt(visitsCount) + 1).toString())
      return true
    }

    // Get the IP address through a service (since client can't directly get it)
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    const ipAddress = data.ip

    // Check if this IP has visited before
    const { data: existingVisit, error: checkError } = await supabase
      .from('visits')
      .select('*')
      .eq('ip_address', ipAddress)
      .single()

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "No rows returned" error, which is expected for new visitors
      console.error('Error checking visit:', checkError)
    }

    // If no visit from this IP, record it
    if (!existingVisit) {
      const { error } = await supabase.from('visits').insert([
        { ip_address: ipAddress }
      ])
      
      if (error) {
        console.error('Error recording visit:', error)
      }
    }
    
    return true
  } catch (error) {
    console.error('Error recording visit:', error)
    // Fall back to localStorage
    const visitsCount = localStorage.getItem('visitsCount') || '0'
    localStorage.setItem('visitsCount', (parseInt(visitsCount) + 1).toString())
    return false
  }
}

/**
 * Get the total count of unique visitors
 */
export const getVisitCount = async (): Promise<number> => {
  try {
    // Try to get count from Supabase
    const { count, error } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true })
    
    if (error) {
      // Fall back to localStorage if there's an error
      const localCount = localStorage.getItem('visitsCount')
      return localCount ? parseInt(localCount) : 1 // Default to at least 1
    }
    
    return count || 1 // Always show at least 1 for the current visitor
  } catch (error) {
    console.error('Error getting visit count:', error)
    // Fall back to localStorage
    const localCount = localStorage.getItem('visitsCount')
    return localCount ? parseInt(localCount) : 1 // Default to at least 1
  }
}
