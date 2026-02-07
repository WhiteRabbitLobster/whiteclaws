import { bountyPrograms } from '@/lib/data'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export default function BountyDetailPage({ params }: { params: { slug: string } }) {
  const bounty = bountyPrograms.find(program => program.slug === params.slug)
  
  if (!bounty) {
    return notFound()
  }

  // Mock severity payout data since it's not in the data structure
  const severityPayouts = [
    { severity: 'Critical', payout: bounty.maxReward },
    { severity: 'High', payout: `$${Math.round(bounty.maxRewardNum * 0.5).toLocaleString()}` },
    { severity: 'Medium', payout: `$${Math.round(bounty.maxRewardNum * 0.25).toLocaleString()}` },
    { severity: 'Low', payout: `$${Math.round(bounty.maxRewardNum * 0.1).toLocaleString()}` },
  ]

  return (
    <>
      <div className="max-w-[1120px] mx-auto px-6 py-8">
        {/* Section Header with Counter */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <div className="w-10 h-10 rounded-lg bg-[var(--g900)] flex items-center justify-center text-white font-bold">
                {bounty.icon}
              </div>
              <h1 className="text-xl font-bold text-[var(--g900)]">{bounty.name}</h1>
              <span className="text-xs font-medium text-[var(--g400)] font-mono">
                01/05
              </span>
            </div>
            <p className="text-sm text-[var(--g500)]">
              Bug bounty program details
            </p>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-4">
            <div className="text-xs text-[var(--g400)] uppercase tracking-wide mb-1">Max Reward</div>
            <div className="font-bold text-[var(--g900)]">{bounty.maxReward}</div>
          </div>
          
          <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-4">
            <div className="text-xs text-[var(--g400)] uppercase tracking-wide mb-1">Escrow Balance</div>
            <div className="font-bold text-[var(--g900)]">{bounty.vaultTvl || 'N/A'}</div>
          </div>
          
          <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-4">
            <div className="text-xs text-[var(--g400)] uppercase tracking-wide mb-1">Category</div>
            <div className="font-bold text-[var(--g900)]">{bounty.category}</div>
          </div>
          
          <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-4">
            <div className="text-xs text-[var(--g400)] uppercase tracking-wide mb-1">Status</div>
            <div className={`font-bold ${bounty.status === 'Live' ? 'text-green-600' : bounty.status === 'Paused' ? 'text-yellow-600' : 'text-blue-600'}`}>
              {bounty.status}
            </div>
          </div>
        </div>

        {/* Scope Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-[var(--g900)]">Scope</h2>
            <span className="text-xs font-medium text-[var(--g400)] font-mono">
              02/05
            </span>
          </div>
          
          <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <div className="text-xs text-[var(--g400)] uppercase tracking-wide mb-1">Category</div>
                <div className="font-medium text-[var(--g900)]">{bounty.category}</div>
              </div>
              
              <div>
                <div className="text-xs text-[var(--g400)] uppercase tracking-wide mb-1">Type</div>
                <div className="font-medium text-[var(--g900)]">{bounty.type}</div>
              </div>
              
              <div>
                <div className="text-xs text-[var(--g400)] uppercase tracking-wide mb-1">Language</div>
                <div className="font-medium text-[var(--g900)]">{bounty.language}</div>
              </div>
              
              <div>
                <div className="text-xs text-[var(--g400)] uppercase tracking-wide mb-1">Chains</div>
                <div className="font-medium text-[var(--g900)]">{bounty.chains.join(', ')}</div>
              </div>
            </div>
            
            <div className="mt-4">
              <div className="text-xs text-[var(--g400)] uppercase tracking-wide mb-1">Tags</div>
              <div className="flex flex-wrap gap-2">
                {bounty.tags.map((tag, index) => (
                  <span 
                    key={index} 
                    className="px-2 py-1 text-xs font-medium bg-[var(--g50)] text-[var(--g700)] border border-[var(--g200)] rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Severity Payout Table */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-[var(--g900)]">Severity Payout</h2>
            <span className="text-xs font-medium text-[var(--g400)] font-mono">
              03/05
            </span>
          </div>
          
          <div className="border border-[var(--g200)] rounded-[var(--radius-md)] overflow-hidden">
            <table className="w-full">
              <thead className="bg-[var(--g50)] border-b border-[var(--g200)]">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-[var(--g400)] uppercase tracking-wide">Severity</th>
                  <th className="px-4 py-3 text-right text-xs font-semibold text-[var(--g400)] uppercase tracking-wide">Payout</th>
                </tr>
              </thead>
              <tbody>
                {severityPayouts.map((item, index) => (
                  <tr key={index} className="border-b border-[var(--g200)] last:border-b-0">
                    <td className="px-4 py-3 text-sm font-medium text-[var(--g900)]">{item.severity}</td>
                    <td className="px-4 py-3 text-sm text-right font-bold text-[var(--g900)]">{item.payout}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Vault Address */}
        {bounty.vaultAddress && (
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <h2 className="text-lg font-bold text-[var(--g900)]">Vault Address</h2>
              <span className="text-xs font-medium text-[var(--g400)] font-mono">
                04/05
              </span>
            </div>
            
            <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-4">
              <div className="font-mono text-sm text-[var(--g900)] break-all">
                {bounty.vaultAddress}
              </div>
            </div>
          </div>
        )}

        {/* Submit Finding CTA */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-lg font-bold text-[var(--g900)]">Actions</h2>
            <span className="text-xs font-medium text-[var(--g400)] font-mono">
              05/05
            </span>
          </div>
          
          <div className="border border-[var(--g200)] rounded-[var(--radius-md)] p-6 text-center">
            <Link 
              href={`/submit?program=${bounty.id}`}
              className="inline-block px-6 py-3 bg-[var(--g900)] text-white font-semibold rounded-lg hover:bg-[var(--g700)] transition-colors"
            >
              Submit Finding
            </Link>
            <p className="mt-3 text-sm text-[var(--g500)]">
              Report a vulnerability for this program
            </p>
          </div>
        </div>

        {/* Back Link */}
        <div className="pt-4 border-t border-[var(--g200)]">
          <Link 
            href="/bounties" 
            className="inline-flex items-center gap-2 text-sm font-medium text-[var(--g700)] hover:text-[var(--g900)]"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to all bounties
          </Link>
        </div>
      </div>
    </>
  )
}