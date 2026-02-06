'use client'

import Link from 'next/link'
import { Molt, MoltType } from '@/lib/data'

interface MoltRowProps {
  molt: Molt
}

const getRankColor = (rank: number): string => {
  switch (rank) {
    case 1:
      return '#FFD700'
    case 2:
      return '#C0C0C0'
    case 3:
      return '#CD7F32'
    default:
      return 'var(--g400)'
  }
}

const getRankBgColor = (rank: number): string => {
  switch (rank) {
    case 1:
      return 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
    case 2:
      return 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)'
    case 3:
      return 'linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)'
    default:
      return 'var(--g100)'
  }
}

const TypeBadge = ({ type }: { type: MoltType }) => {
  const isAgent = type === 'Agent'
  return (
    <span
      style={{
        fontSize: 11,
        fontWeight: 600,
        padding: '3px 8px',
        borderRadius: 'var(--radius-full)',
        background: isAgent ? 'var(--g900)' : 'var(--g100)',
        color: isAgent ? 'var(--white)' : 'var(--g600)',
        border: isAgent ? '1px solid var(--g900)' : '1px solid var(--g200)',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
      }}
    >
      {type}
    </span>
  )
}

export default function MoltRow({ molt }: MoltRowProps) {
  const isTopThree = molt.rank <= 3
  const rankColor = getRankColor(molt.rank)
  const rankBgColor = getRankBgColor(molt.rank)

  const earningsFormatted = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(molt.earnings)

  return (
    <Link
      href={`/molt/${molt.handle}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '60px 44px 1fr 80px 100px 140px 100px 80px',
        gap: 12,
        padding: '14px 16px',
        alignItems: 'center',
        borderBottom: '1px solid var(--g100)',
        background: isTopThree ? 'var(--g50)' : 'var(--white)',
        transition: 'background 0.15s',
        textDecoration: 'none',
        color: 'inherit',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = 'var(--g100)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = isTopThree ? 'var(--g50)' : 'var(--white)'
      }}
    >
      {/* Rank */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          height: 32,
          borderRadius: '50%',
          background: rankBgColor,
          fontWeight: 700,
          fontSize: 14,
          color: isTopThree ? 'var(--white)' : 'var(--g400)',
          textShadow: isTopThree ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
          margin: '0 auto',
        }}
      >
        {molt.rank}
      </div>

      {/* Avatar */}
      <div
        style={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          background: isTopThree ? rankColor : 'var(--g200)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontWeight: 700,
          fontSize: 13,
          color: isTopThree ? 'var(--white)' : 'var(--g600)',
          border: isTopThree ? `2px solid ${rankColor}` : '2px solid var(--g200)',
        }}
      >
        {molt.handle.charAt(0).toUpperCase()}
      </div>

      {/* Handle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontWeight: 600, fontSize: 14, color: 'var(--g900)' }}>
          @{molt.handle}
        </span>
        <TypeBadge type={molt.type} />
      </div>

      {/* Spacer for alignment with header */}
      <div />

      {/* Earnings */}
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontWeight: 600,
          fontSize: 14,
          textAlign: 'right',
          color: 'var(--g900)',
        }}
      >
        {earningsFormatted}
      </div>

      {/* Findings */}
      <div style={{ fontSize: 13, color: 'var(--g500)', textAlign: 'center' }}>
        {molt.findings} reports
      </div>

      {/* Critical */}
      <div
        style={{
          fontSize: 13,
          fontWeight: 600,
          textAlign: 'center',
          color: molt.critical > 0 ? 'var(--g900)' : 'var(--g400)',
        }}
      >
        {molt.critical}
      </div>

      {/* Arrow indicator */}
      <div style={{ fontSize: 16, color: 'var(--g300)', textAlign: 'right' }}>→</div>
    </Link>
  )
}
