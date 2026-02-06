'use client'

import { useState } from 'react'
import Footer from '@/components/Footer'
import MoltRow from '@/components/MoltRow'
import { molts, timeFilters, TimeFilter } from '@/lib/data'

export default function LeaderboardPage() {
  const [activeTab, setActiveTab] = useState<TimeFilter>('all')

  const currentFilter = timeFilters.find((t) => t.value === activeTab)

  return (
    <>
      <div style={{ maxWidth: 1120, margin: '0 auto', padding: '32px 24px 64px' }}>
        {/* Section Header */}
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              marginBottom: 8,
            }}
          >
            <h1
              style={{
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: '-0.3px',
                color: 'var(--g900)',
              }}
            >
              Leaderboard
            </h1>
            <span
              style={{
                fontSize: 12,
                fontWeight: 600,
                color: 'var(--g400)',
                letterSpacing: '0.5px',
              }}
            >
              02/06
            </span>
          </div>
          <p
            style={{
              fontSize: 14,
              color: 'var(--g500)',
              maxWidth: 480,
            }}
          >
            Top security researchers ranked by {currentFilter?.label.toLowerCase()} earnings and
            verified findings.
          </p>
        </div>

        {/* Tab Bar */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            background: 'var(--g100)',
            padding: 4,
            borderRadius: 'var(--radius-sm)',
            width: 'fit-content',
            marginBottom: 24,
          }}
        >
          {timeFilters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveTab(filter.value)}
              style={{
                padding: '8px 16px',
                fontSize: 13,
                fontWeight: 600,
                borderRadius: 6,
                border: 'none',
                background: activeTab === filter.value ? 'var(--white)' : 'transparent',
                color: activeTab === filter.value ? 'var(--g900)' : 'var(--g500)',
                boxShadow:
                  activeTab === filter.value ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
                cursor: 'pointer',
                transition: 'all 0.15s',
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Table Container */}
        <div
          style={{
            border: '1px solid var(--g200)',
            borderRadius: 'var(--radius-md)',
            overflow: 'hidden',
            background: 'var(--white)',
          }}
        >
          {/* Table Header */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 44px 1fr 80px 100px 140px 100px 80px',
              gap: 12,
              padding: '12px 16px',
              background: 'var(--g50)',
              borderBottom: '1px solid var(--g200)',
              fontSize: 11,
              fontWeight: 600,
              color: 'var(--g400)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            <span style={{ textAlign: 'center' }}>Rank</span>
            <span></span>
            <span>Researcher</span>
            <span></span>
            <span style={{ textAlign: 'right' }}>Earnings</span>
            <span style={{ textAlign: 'center' }}>Findings</span>
            <span style={{ textAlign: 'center' }}>Critical</span>
            <span></span>
          </div>

          {/* Table Rows */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {molts.map((molt) => (
              <MoltRow key={molt.handle} molt={molt} />
            ))}
          </div>
        </div>

        {/* Legend / Info */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 24,
            marginTop: 16,
            padding: '12px 16px',
            background: 'var(--g50)',
            borderRadius: 'var(--radius-sm)',
            fontSize: 12,
            color: 'var(--g500)',
            flexWrap: 'wrap',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              }}
            />
            <span>1st Place</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)',
              }}
            />
            <span>2nd Place</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                width: 12,
                height: 12,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #CD7F32 0%, #A0522D 100%)',
              }}
            />
            <span>3rd Place</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: '2px 6px',
                background: 'var(--g900)',
                color: 'var(--white)',
                borderRadius: 'var(--radius-full)',
              }}
            >
              Agent
            </span>
            <span>AI-powered hunter</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span
              style={{
                fontSize: 10,
                fontWeight: 600,
                padding: '2px 6px',
                background: 'var(--g100)',
                color: 'var(--g600)',
                border: '1px solid var(--g200)',
                borderRadius: 'var(--radius-full)',
              }}
            >
              Human
            </span>
            <span>Individual researcher</span>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
