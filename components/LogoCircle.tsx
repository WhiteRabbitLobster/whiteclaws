'use client'

import { useState, useEffect } from 'react'

interface LogoCircleProps {
  size?: number
  className?: string
}

export default function LogoCircle({ size = 120, className = '' }: LogoCircleProps) {
  const [drawn, setDrawn] = useState(false)
  const [pulse, setPulse] = useState(false)

  useEffect(() => {
    const drawTimer = setTimeout(() => setDrawn(true), 200)
    const pulseTimer = setTimeout(() => setPulse(true), 800)
    return () => {
      clearTimeout(drawTimer)
      clearTimeout(pulseTimer)
    }
  }, [])

  const center = size / 2
  const radius = (size - 8) / 2
  const circumference = 2 * Math.PI * radius

  return (
    <div className={`logo-circle-container ${className}`} style={{ width: size, height: size }}>
      <svg
        className="logo-svg"
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* Outer ring with draw animation */}
        <circle
          className="logo-ring"
          cx={center}
          cy={center}
          r={radius}
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={drawn ? 0 : circumference}
          style={{
            transition: 'stroke-dashoffset 1.2s cubic-bezier(0.4, 0, 0.2, 1)',
            color: 'var(--g900)',
          }}
        />
        
        {/* Inner decorative ring */}
        <circle
          className="logo-inner-ring"
          cx={center}
          cy={center}
          r={radius * 0.7}
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
          strokeDasharray="4 4"
          opacity={drawn ? 0.3 : 0}
          style={{
            transition: 'opacity 0.8s ease 0.6s',
            color: 'var(--g400)',
          }}
        />
        
        {/* Center dot */}
        <circle
          className="logo-dot"
          cx={center}
          cy={center}
          r={drawn ? 4 : 0}
          fill="currentColor"
          style={{
            transition: 'r 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.8s',
            color: 'var(--g900)',
          }}
        />
      </svg>
      
      {/* Lobster emoji with scale animation */}
      <span 
        className={`logo-emoji ${pulse ? 'pulse' : ''}`}
        style={{
          fontSize: size * 0.4,
          opacity: drawn ? 1 : 0,
          transform: drawn ? 'scale(1)' : 'scale(0)',
          transition: 'all 0.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) 0.4s',
        }}
      >
        🦞
      </span>
    </div>
  )
}
