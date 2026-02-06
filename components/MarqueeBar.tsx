'use client'

import { useEffect, useState } from 'react'

const chains = [
  { name: 'Ethereum', symbol: '◉' },
  { name: 'Base', symbol: '◎' },
  { name: 'Arbitrum', symbol: '⚡' },
  { name: 'Optimism', symbol: '⬡' },
  { name: 'Polygon', symbol: '△' },
  { name: 'Avalanche', symbol: '◈' },
  { name: 'BNB Chain', symbol: '▣' },
  { name: 'Solana', symbol: '⊘' },
]

export default function MarqueeBar() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500)
    return () => clearTimeout(timer)
  }, [])

  // Duplicate chains for seamless loop
  const allChains = [...chains, ...chains, ...chains]

  return (
    <div 
      className="marquee-bar"
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: 'all 0.8s ease 0.3s',
      }}
    >
      <div className="marquee-track">
        {allChains.map((chain, index) => (
          <div key={index} className="marquee-item">
            <span className="marquee-symbol">{chain.symbol}</span>
            <span className="marquee-name">{chain.name}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
