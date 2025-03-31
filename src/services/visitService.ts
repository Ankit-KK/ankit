
import { supabase } from '@/lib/supabase'

/**
 * Record a new visit to the site
 * Note: This requires a 'visits' table in your Supabase database with:
 * - ip_address (text)
 * - visited_at (timestamp with default now())
 */
export const recordVisit = async () => {
  try {
    // Get the IP address through a service (since client can't directly get it)
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    const ipAddress = data.ip

    // Check if this IP has visited before
    const { data: existingVisit } = await supabase
      .from('visits')
      .select('*')
      .eq('ip_address', ipAddress)
      .single()

    // If no visit from this IP, record it
    if (!existingVisit) {
      await supabase.from('visits').insert([
        { ip_address: ipAddress }
      ])
    }
    
    return true
  } catch (error) {
    console.error('Error recording visit:', error)
    return false
  }
}

/**
 * Get the total count of unique visitors
 */
export const getVisitCount = async (): Promise<number> => {
  try {
    const { count, error } = await supabase
      .from('visits')
      .select('*', { count: 'exact', head: true })
    
    if (error) throw error
    return count || 0
  } catch (error) {
    console.error('Error getting visit count:', error)
    return 0
  }
}
