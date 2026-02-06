import Link from 'next/link';
import { notFound } from 'next/navigation';
import { mockCompetitions, Competition, formatTimeRemaining, formatDateRange } from '@/lib/competitions';

export function generateStaticParams() {
  return mockCompetitions.map((competition) => ({
    id: competition.id,
  }));
}

export default function CompetitionDetailPage({ params }: { params: { id: string } }) {
  const competition = mockCompetitions.find((c) => c.id === params.id);

  if (!competition) {
    notFound();
  }

  const timeRemaining = formatTimeRemaining(competition.endDate);
  const isActive = competition.status === 'Active';

  return (
    <div className="min-h-screen bg-[var(--white)]">
      <div className="max-w-[1120px] mx-auto px-6 py-12">
        {/* Protocol Header */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-[var(--radius-sm)] bg-[var(--g100)] border border-[var(--g200)] flex items-center justify-center text-lg font-bold text-[var(--g700)]">
              {competition.protocolIcon}
            </div>
            <div>
              <h1 className="text-3xl font-bold text-[var(--g900)] mb-1">{competition.title}</h1>
              <p className="text-[var(--g500)]">{competition.protocol}</p>
            </div>
          </div>

          {/* Status & Action */}
          <div className="flex items-center justify-between">
            <span className={`px-3 py-1.5 text-xs font-semibold rounded-[var(--radius-full)] ${getStatusStyle(competition.status)}`}>
              {competition.status}
            </span>
            <Link
              href={`/bounties/${competition.protocolSlug}`}
              className="btn btn-secondary"
            >
              View Protocol
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-[var(--g50)] border border-[var(--g200)] rounded-[var(--radius-md)] p-5">
            <p className="text-sm text-[var(--g500)] mb-2 uppercase tracking-wide">Prize Pool</p>
            <p className="text-2xl font-bold text-[var(--g900)]">
              ${competition.prizePool.toLocaleString()}
            </p>
          </div>
          <div className="bg-[var(--g50)] border border-[var(--g200)] rounded-[var(--radius-md)] p-5">
            <p className="text-sm text-[var(--g500)] mb-2 uppercase tracking-wide">Participants</p>
            <p className="text-2xl font-bold text-[var(--g900)]">{competition.participantCount}</p>
          </div>
          <div className="bg-[var(--g50)] border border-[var(--g200)] rounded-[var(--radius-md)] p-5">
            <p className="text-sm text-[var(--g500)] mb-2 uppercase tracking-wide">Findings</p>
            <p className="text-2xl font-bold text-[var(--g900)]">{competition.findingsCount}</p>
          </div>
          <div className="bg-[var(--g50)] border border-[var(--g200)] rounded-[var(--radius-md)] p-5">
            <p className="text-sm text-[var(--g500)] mb-2 uppercase tracking-wide">Paid Out</p>
            <p className="text-2xl font-bold text-[var(--g900)]">
              ${competition.paidOut.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Countdown Timer & Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Left Column: Countdown & Scope */}
          <div className="lg:col-span-2 space-y-6">
            {/* Countdown Timer */}
            {isActive && (
              <div className={`p-5 border rounded-[var(--radius-md)] ${timeRemaining.isUrgent ? 'border-red-200 bg-red-50' : 'border-[var(--g200)] bg-[var(--g50)]'}`}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-semibold text-[var(--g900)]">Time Remaining</p>
                  <span className={`text-xs font-semibold ${timeRemaining.isUrgent ? 'text-red-600' : 'text-[var(--g500)]'}`}>
                    {timeRemaining.isUrgent ? 'Ending soon' : 'Active'}
                  </span>
                </div>
                <p className={`text-2xl font-bold ${timeRemaining.isUrgent ? 'text-red-700' : 'text-[var(--g900)]'}`}>
                  {timeRemaining.text}
                </p>
                <p className="text-sm text-[var(--g500)] mt-2">
                  {formatDateRange(competition.startDate, competition.endDate)}
                </p>
              </div>
            )}

            {/* Scope Section */}
            <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-5">
              <h2 className="text-lg font-semibold text-[var(--g900)] mb-4">Scope</h2>
              <div className="space-y-3">
                {competition.scope.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-[var(--g50)] border border-[var(--g150)] rounded-[var(--radius-sm)]">
                    {item.type === 'contract' ? (
                      <>
                        <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--g100)] border border-[var(--g200)] flex items-center justify-center">
                          <svg className="w-4 h-4 text-[var(--g500)]" fill="none" stroke="currentColor" viewBox="0 0时说24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[var(--g900)]">{item.name}</p>
                          <p className="text-xs text-[var(--g500)] font-mono">{item.address}</p>
                        </div>
                      </>
                    ) : (
                      <>
                        <div className="w-8 h-8 rounded-[var(--radius-sm)] bg-[var(--g100)] border border-[var(--g200)] flex items-center justify-center">
                          <svg className="w-4 h-4 text-[var(--g500)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-[var(--g900)]">{item.name}</p>
                          <p className="text-xs text-[var(--g500)] truncate">{item.url}</p>
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Chain & Quick Info */}
          <div className="space-y-6">
            {/* Chain Info */}
            <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-5">
              <h2 className="text-lg font-semibold text-[var(--g900)] mb-4">Chain</h2>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--g100)] border border-[var(--g200)] flex items-center justify-center">
                  <svg className="w-5 h-5 text-[var(--g600)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <p className="text-sm font-medium text-[var(--g900)]">{competition.chain}</p>
                  <p className="text-xs text-[var(--g500)]">Network</p>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-5">
              <h2 className="text-lg font-semibold text-[var(--g900)] mb-4">Quick Stats</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--g500)]">Avg. Finding Value</span>
                  <span className="text-sm font-semibold text-[var(--g900)]">
                    ${competition.findingsCount > 0 ? Math.round(competition.paidOut / competition.findingsCount).toLocaleString() : '0'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--g500)]">Participation Rate</span>
                  <span className="text-sm font-semibold text-[var(--g900)]">
                    {Math.round((competition.participants.length / competition.participantCount) * 100)}%
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-[var(--g500)]">Days Active</span>
                  <span className="text-sm font-semibold text-[var(--g900)]">
                    {Math.ceil(
                      (new Date(competition.endDate).getTime() - new Date(competition.startDate).getTime()) / (1000 * 60 * 60 * 24)
                    )}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Participant List */}
        <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-[var(--g900)]">Top Participants</h2>
            <span className="text-sm text-[var(--g500)]">{competition.participants.length} of {competition.participantCount} shown</span>
          </div>
          {competition.participants.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[var(--g200)]">
                    <th className="py-3 text-left text-xs font-semibold text-[var(--g500)] uppercase tracking-wide">Hunter</th>
                    <th className="py-3 text-left text-xs font-semibold text-[var(--g500)] uppercase tracking-wide">Findings</th>
                    <th className="py-3 text-left text-xs font-semibold text-[var(--g500)] uppercase tracking-wide">Country</th>
                    <th className="py-3 text-left text-xs font-semibold text-[var(--g500)] uppercase tracking-wide">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {competition.participants.map((participant, index) => (
                    <tr key={index} className="border-b border-[var(--g100)] hover:bg-[var(--g50)]">
                      <td className="py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[var(--g200)] flex items-center justify-center text-xs font-bold text-[var(--g700)]">
                            {participant.handle.charAt(0).toUpperCase()}
                          </div>
                          <span className="text-sm font-medium text-[var(--g900)]">@{participant.handle}</span>
                        </div>
                      </td>
                      <td className="py-3">
                        <span className="text-sm font-semibold text-[var(--g900)]">{participant.findings}</span>
                      </td>
                      <td className="py-3">
                        <span className="text-sm text-[var(--g500)]">{participant.country}</span>
                      </td>
                      <td className="py-3">
                        <span className="px-2 py-1 text-xs font-semibold bg-green-100 text-green-800 rounded-[var(--radius-full)]">
                          Active
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-[var(--g500)]">No participants yet. Be the first!</p>
            </div>
          )}
        </div>

        {/* CTA */}
        {isActive && (
          <div className="mt-8 p-5 bg-[var(--g900)] text-white rounded-[var(--radius-md)]">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold mb-2">Ready to hunt?</h3>
                <p className="text-sm opacity-90">
                  Join {competition.participantCount} other hunters in finding vulnerabilities.
                </p>
              </div>
              <button className="btn btn-primary">
                Join Competition
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getStatusStyle(status: string): string {
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