import React, { useState, useEffect } from 'react'

interface CountdownTimerProps {
  expiryDate: string
  className?: string
}

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const CountdownTimer: React.FC<CountdownTimerProps> = ({ expiryDate, className = '' }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime()
      const expiry = new Date(expiryDate).getTime()
      const difference = expiry - now

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60))
        const seconds = Math.floor((difference % (1000 * 60)) / 1000)

        setTimeLeft({ days, hours, minutes, seconds })
        setIsExpired(false)
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
        setIsExpired(true)
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [expiryDate])

  const getUrgencyColor = (timeLeft: TimeLeft) => {
    const totalHours = timeLeft.days * 24 + timeLeft.hours
    
    if (totalHours <= 24) {
      return 'text-red-600' // Critical - less than 1 day
    } else if (totalHours <= 72) {
      return 'text-orange-600' // Urgent - less than 3 days
    } else if (totalHours <= 168) {
      return 'text-yellow-600' // Warning - less than 1 week
    } else {
      return 'text-green-600' // Safe - more than 1 week
    }
  }

  const TimeSegment: React.FC<{ value: number; color: string }> = ({ value, color }) => (
    <div className="flex items-center justify-center">
      <div className="w-8 h-8 rounded-full border border-dashed border-gray-300 flex items-center justify-center bg-white">
        <span className={`text-sm font-bold ${color}`}>
          {value.toString().padStart(2, '0')}
        </span>
      </div>
    </div>
  )

  if (isExpired) {
    return (
      <div className="flex items-center">
        <div className="w-8 h-8 rounded-full border border-dashed border-red-300 flex items-center justify-center bg-red-50">
          <span className="text-xs font-bold text-red-600">
            EXP
          </span>
        </div>
      </div>
    )
  }

  const urgencyColor = getUrgencyColor(timeLeft)

  return (
    <div className={`flex items-center space-x-1 ${className}`}>
      <TimeSegment value={timeLeft.days} color={urgencyColor} />
      <TimeSegment value={timeLeft.hours} color={urgencyColor} />
      <TimeSegment value={timeLeft.minutes} color={urgencyColor} />
      <TimeSegment value={timeLeft.seconds} color={urgencyColor} />
    </div>
  )
}

export default CountdownTimer
