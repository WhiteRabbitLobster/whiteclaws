'use client';

import { useState, useMemo } from 'react';
import Footer from '@/components/Footer';
import DataRow from '@/components/DataRow';
import { bountyPrograms } from '@/lib/data';

type FilterCategory = 'All' | 'DeFi' | 'L2/L1' | 'Infra';
type SortOption = 'Highest Reward' | 'Newest' | 'Most Active';

const filters: FilterCategory[] = ['All', 'DeFi', 'L2/L1', 'Infra'];
const sortOptions: SortOption[] = ['Highest Reward', 'Newest', 'Most Active'];

export default function BountiesPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('Highest Reward');

  const filteredAndSortedBounties = useMemo(() => {
    let result = [...bountyPrograms];

    // Filter by category
    if (activeFilter !== 'All') {
      result = result.filter((b) => {
        const categoryMap: Record<string, string> = {
          'DeFi': 'DeFi',
          'L2/L1': 'L2 / L1',
          'Infra': 'Infrastructure',
        };
        return b.category === categoryMap[activeFilter];
      });
    }

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (b) =>
          b.name.toLowerCase().includes(query) ||
          b.category.toLowerCase().includes(query) ||
          b.tags.some((tag) => tag.toLowerCase().includes(query)) ||
          b.chains.some((chain) => chain.toLowerCase().includes(query))
      );
    }

    // Sort
    result.sort((a, b) => {
      switch (sortBy) {
        case 'Highest Reward':
          return b.maxRewardNum - a.maxRewardNum;
        case 'Newest':
          const months: Record<string, number> = {
            Jan: 0, Feb: 1, Mar: 2, Apr: 3, May: 4, Jun: 5,
            Jul: 6, Aug: 7, Sep: 8, Oct: 9, Nov: 10, Dec: 11,
          };
          const [aMonth, aYear] = a.liveSince.split(' ');
          const [bMonth, bYear] = b.liveSince.split(' ');
          const aDate = new Date(parseInt(aYear), months[aMonth] || 0);
          const bDate = new Date(parseInt(bYear), months[bMonth] || 0);
          return bDate.getTime() - aDate.getTime();
        case 'Most Active':
          const aTvl = parseInt(a.vaultTvl?.replace(/[^0-9]/g, '') || '0');
          const bTvl = parseInt(b.vaultTvl?.replace(/[^0-9]/g, '') || '0');
          return bTvl - aTvl;
        default:
          return 0;
      }
    });

    return result;
  }, [activeFilter, searchQuery, sortBy]);

  return (
    <>
      <div className="max-w-[1120px] mx-auto px-6 py-8 pb-16">
        {/* Section Header with Counter */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-xl font-bold text-[var(--g900)]">Bounty Programs</h1>
              <span className="text-xs font-medium text-[var(--g400)] font-mono">
                01/06
              </span>
            </div>
            <p className="text-sm text-[var(--g500)]">
              Explore active bug bounty programs across DeFi, L2s, bridges, and infrastructure.
            </p>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-full border transition-all duration-150 ${
                activeFilter === filter
                  ? 'bg-[var(--g900)] text-white border-[var(--g900)]'
                  : 'bg-white text-[var(--g500)] border-[var(--g200)] hover:border-[var(--g400)] hover:text-[var(--g700)]'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search + Sort Bar */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search protocols, chains, tags..."
              className="w-full px-4 py-2.5 text-sm font-mono bg-[var(--g50)] border border-[var(--g200)] rounded-[var(--radius-sm)] placeholder:text-[var(--g400)] focus:outline-none focus:border-[var(--g400)] transition-colors"
            />
          </div>

          <div className="relative">
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="appearance-none px-4 py-2.5 pr-10 text-sm font-medium bg-white border border-[var(--g200)] rounded-[var(--radius-sm)] text-[var(--g700)] focus:outline-none focus:border-[var(--g400)] cursor-pointer min-w-[160px] hover:border-[var(--g300)]"
            >
              {sortOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
            <svg
              className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[var(--g500)] pointer-events-none"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Bounty List Header */}
        <div className="hidden sm:flex items-center gap-4 px-4 py-2 text-xs font-semibold text-[var(--g400)] uppercase tracking-wide border-b border-[var(--g200)]">
          <div className="w-10 flex-shrink-0"></div>
          <div className="flex-1">Protocol</div>
          <div className="w-28 text-right">Reward</div>
          <div className="w-24 flex-shrink-0 hidden sm:block">Chains</div>
          <div className="w-20 text-right">Status</div>
        </div>

        {/* Bounty List */}
        <div className="border border-[var(--g200)] rounded-[var(--radius-md)] overflow-hidden">
          {filteredAndSortedBounties.length > 0 ? (
            filteredAndSortedBounties.map((bounty) => (
              <DataRow
                key={bounty.id}
                id={bounty.id}
                icon={bounty.icon}
                name={bounty.name}
                tags={bounty.tags}
                maxReward={bounty.maxReward}
                chains={bounty.chains}
                status={bounty.status}
              />
            ))
          ) : (
            <div className="px-4 py-12 text-center">
              <p className="text-sm text-[var(--g500)]">
                No bounties found matching your criteria.
              </p>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mt-4 flex items-center justify-between text-xs text-[var(--g400)]">
          <span>
            Showing {filteredAndSortedBounties.length} of {bountyPrograms.length} programs
          </span>
        </div>
      </div>

      <Footer />
    </>
  );
}
