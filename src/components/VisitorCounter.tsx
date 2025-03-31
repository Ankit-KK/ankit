
import React, { useEffect, useState } from 'react'
import { getVisitCount, recordVisit } from '@/services/visitService'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'
import { toast } from '@/components/ui/use-toast'

interface VisitorCounterProps {
  className?: string
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ className }) => {
  const [visitCount, setVisitCount] = useState<number>(1) // Default to 1 for the current visitor
  const [loading, setLoading] = useState<boolean>(true)
  const [hasError, setHasError] = useState<boolean>(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Record this visit
        await recordVisit()
        // Get updated count
        const count = await getVisitCount()
        setVisitCount(count)
        setHasError(false)
      } catch (error) {
        console.error('Error fetching visitor data:', error)
        setHasError(true)
        
        // Show toast only on first render
        toast({
          title: "Couldn't connect to visitor counter",
          description: "Using local count instead. Visit the Supabase setup instructions for help.",
          variant: "destructive"
        })
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className={`flex items-center gap-1.5 ${className || ''}`}>
      <Users size={16} className="text-primary" />
      <Badge 
        variant="outline" 
        className={`bg-background/50 backdrop-blur-sm ${hasError ? 'border-destructive/30' : ''}`}
      >
        {loading ? (
          <span className="animate-pulse">Loading...</span>
        ) : (
          <span>{visitCount.toLocaleString()} unique visitor{visitCount !== 1 ? 's' : ''}</span>
        )}
      </Badge>
    </div>
  )
}

export default VisitorCounter
