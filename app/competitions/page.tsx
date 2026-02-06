'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Competition } from '@/lib/competitions';
import { mockCompetitions } from '@/lib/competitions';

// Count stats
const getCounts = (competitions: Competition[]) => ({
  active: competitions.filter((c) => c.status === 'Active').length,
  upcoming: competitions.filter((c) => c.status === 'Upcoming').length,
  completed: competitions.filter((c) => c.status === 'Completed').length,
});

export default function CompetitionsPage() {
  const [activeTab, setActiveTab] = useState<'active' | 'upcoming' | 'completed'>('active');

  const counts = getCounts(mockCompetitions);

  const filteredCompetitions = mockCompetitions.filter((competition) => {
    if (activeTab === 'active') return competition.status === 'Active';
    if (activeTab === 'upcoming') return competition.status === 'Upcoming';
    if (activeTab === 'completed') return competition.status === 'Completed';
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--white)]">
      <div className="max-w-[1120px] mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[var(--g900)] mb-2">Audit Competitions</h1>
          <p className="text-[var(--g500)]">
            Time-boxed competitive audits. Multiple researchers review code simultaneously.
          </p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-[var(--g50)] border border-[var(--g200)] rounded-[var(--radius-md)]">
          <div className="text-center p-4 border-r border-[var(--g200)] last:border-r-0">
            <p className="text-2xl font-bold text-[var(--g900)]">${(5.2).toFixed(1)}M</p>
            <p className="text-xs text-[var(--g500)] uppercase tracking-wide mt-1">Total Prize Pools</p>
          </div>
          <div className="text-center p-4 border-r border-[var(--g200)] last:border-r-0">
            <p className="text-2xl font-bold text-[var(--g900)]">{mockCompetitions.length}</p>
            <p className="text-xs text-[var(--g500)] uppercase tracking-wide mt-1">Total Competitions</p>
          </div>
          <div className="text-center p-4">
            <p className="text-2xl font-bold text-[var(--g900)]">584</p>
            <p className="text-xs text-[var(--g500)] uppercase tracking-wide mt-1">Total Participants</p>
          </div>
        </div>

        {/* Tab Bar */}
        <div className="flex gap-2 bg-[var(--g100)] p-1 rounded-[var(--radius-sm)] w-fit mb-8">
          <button
            onClick={() => setActiveTab('active')}
            className={`tab ${activeTab === 'active' ? 'active' : ''}`}
          >
            Active ({counts.active})
          </button>
          <button
            onClick={() => setActiveTab('upcoming')}
            className={`tab ${activeTab === 'upcoming' ? 'active' : ''}`}
          >
            Upcoming ({counts.upcoming})
          </button>
          <button
            onClick={() => setActiveTab('completed')}
            className={`tab ${activeTab === 'completed' ? 'active' : ''}`}
          >
            Completed ({counts.completed})
          </button>
        </div>

        {/* Competition Grid */}
        {filteredCompetitions.length === 0 ? (
          <div className="text-center py-16 bg-[var(--g50)] border border-[var(--g200)] rounded-[var(--radius-md)]">
            <p className="text-[var(--g500)]">No {activeTab} competitions at the moment.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredCompetitions.map((competition) => (
              <CompetitionCard key={competition.id} competition={competition} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// Competition Card Component
function CompetitionCard({ competition }: { competition: Competition }) {
  const timeRemaining = getTimeRemaining(competition.endDate);
  const statusBadgeStyle = getStatusBadgeStyle(competition.status);

  return (
    <Link
      href={`/competitions/${competition.id}`}
      className="block bg-[var(--white)] border border-[var(--g200)] rounded-[var(--radius-md)] p-5 hover:border-[var(--g400)] hover:shadow-[0_2px_8px_rgba(0,0,0,0.04)] transition-all duration-200"
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--g100)] border border-[var(--g200)] flex items-center justify-center text-sm font-bold text-[var(--g700)]">
            {competition.protocolIcon}
          </div>
          <div>
            <h3 className="text-base font-semibold text-[var(--g900)]">{competition.title}</h3>
            <p className="text-sm text-[var(--g500)]">{competition.protocol}</p>
          </div>
        </div>
        <span className={`px-2.5 py-1 text-[10px] font-semibold rounded-[var(--radius-full)] ${statusBadgeStyle}`}>
          {competition.status}
        </span>
      </div>

      {/* Prize Pool Bar */}
      <div className="flex items-center justify-between p-3 bg-[var(--g50)] border border-[var(--g150)] rounded-[var(--radius-sm)] mb-4">
        <span className="text-[11px] text-[var(--g400)] font-medium uppercase tracking-wide">Prize Pool</span>
        <span className="font-mono text-lg font-bold text-[var(--g900)]">
          ${competition.prizePool.toLocaleString()}
        </span>
      </div>

      {/* Stats Row */}
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[var(--g400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-[var(--g600)]">{timeRemaining}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-4 text-[var(--g400)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="text-[var(--g600)]">{competition.participantCount} hunters</span>
          </div>
        </div>
        <span className="text-[var(--g400)]">→</span>
      </div>
    </Link>
  );
}

function getStatusBadgeStyle(status: string): string {
  switch (status) {
    case 'Active':
      return 'bg-[var(--g900)] text-white';
    case 'Upcoming':
      return 'bg-[var(--g100)] text-[var(--g600)] border border-[var(--g200)]';
    case 'Completed':
      return 'bg-[var(--g300)] text-[var(--g800)]';
    default:
      return 'bg-[var(--g100)] text-[var(--g600)]';
  }
}

function getTimeRemaining(endDate: string): string {
  const end = new Date(endDate);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();

  if (diffMs <= 0) return 'Ended';

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

  if (days > 0) return `${days}d ${hours}h left`;
  return `${hours}h left`;
}
