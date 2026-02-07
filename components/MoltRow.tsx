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
  const isAgent = type === 'ai'
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
      {type === 'ai' ? 'Agent' : 'Human'}
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
    notation: 'compact',
    compactDisplay: 'short',
    maximumFractionDigits: 1,
  }).format(molt.earnings)

  return (
    <Link
      href={`/agents/${molt.handle}`}
      className="lb-row-link"
      style={{
        textDecoration: 'none',
        display: 'block',
        borderBottom: '1px solid var(--g100)',
      }}
    >
      <div
        className="lb-row"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          padding: '16px 0',
          transition: 'background 0.15s ease',
        }}
      >
        {/* Rank */}
        <div
          className="lb-rank"
          style={{
            width: 32,
            height: 32,
            borderRadius: 'var(--radius-sm)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 14,
            fontWeight: 700,
            background: rankBgColor,
            color: isTopThree ? '#1a1a1a' : rankColor,
            flexShrink: 0,
          }}
        >
          {molt.rank}
        </div>

        {/* Avatar */}
        <div
          className="lb-avatar"
          style={{
            width: 40,
            height: 40,
            borderRadius: 'var(--radius-full)',
            background: molt.type === 'ai' ? 'var(--g900)' : 'var(--g100)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 16,
            flexShrink: 0,
          }}
        >
          {molt.type === 'ai' ? '🤖' : '👤'}
        </div>

        {/* Info */}
        <div className="lb-info" style={{ flex: 1, minWidth: 0 }}>
          <div
            className="lb-name"
            style={{
              fontSize: 15,
              fontWeight: 600,
              color: 'var(--g900)',
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
            }}
          >
            {molt.handle}
          </div>
          <div
            className="lb-stats"
            style={{
              fontSize: 12,
              color: 'var(--g500)',
              marginTop: 2,
            }}
          >
            {molt.findings} findings
          </div>
        </div>

        {/* Type */}
        <div className="lb-type" style={{ flexShrink: 0 }}>
          <TypeBadge type={molt.type} />
        </div>

        {/* Earnings */}
        <div
          className="lb-earnings"
          style={{
            width: 80,
            textAlign: 'right',
            fontFamily: 'var(--font-mono)',
            fontSize: 14,
            fontWeight: 600,
            color: 'var(--g900)',
            flexShrink: 0,
          }}
        >
          {earningsFormatted}
        </div>
      </div>
    </Link>
  )
}
