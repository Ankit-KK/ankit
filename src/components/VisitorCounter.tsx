
import React, { useEffect, useState } from 'react'
import { getVisitCount, recordVisit } from '@/services/visitService'
import { Badge } from '@/components/ui/badge'
import { Users } from 'lucide-react'

interface VisitorCounterProps {
  className?: string
}

const VisitorCounter: React.FC<VisitorCounterProps> = ({ className }) => {
  const [visitCount, setVisitCount] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Record this visit
        await recordVisit()
        // Get updated count
        const count = await getVisitCount()
        setVisitCount(count)
      } catch (error) {
        console.error('Error fetching visitor data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <div className={`flex items-center gap-1.5 ${className || ''}`}>
      <Users size={16} className="text-primary" />
      <Badge variant="outline" className="bg-background/50 backdrop-blur-sm">
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
