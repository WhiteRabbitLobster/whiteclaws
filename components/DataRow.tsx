'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface DataRowProps {
  id: string;
  icon: string;
  name: string;
  tags: string[];
  maxReward: string;
  chains: string[];
  status: 'Live' | 'Paused' | 'Upcoming';
}

export default function DataRow({
  id,
  icon,
  name,
  tags,
  maxReward,
  chains,
  status,
}: DataRowProps) {
  const statusStyles = {
    Live: 'bg-[var(--g900)] text-white',
    Paused: 'bg-[var(--g300)] text-[var(--g800)]',
    Upcoming: 'bg-[var(--g100)] text-[var(--g600)]',
  };

  return (
    <Link
      href={`/bounties/${id}`}
      className="group flex items-center gap-4 px-4 py-3 border-b border-[var(--g100)] hover:bg-[var(--g50)] transition-colors cursor-pointer"
    >
      <div className="w-10 h-10 rounded-[var(--radius-sm)] bg-[var(--g100)] border border-[var(--g200)] flex items-center justify-center text-sm font-bold text-[var(--g700)] flex-shrink-0">
        {icon}
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-sm font-semibold text-[var(--g900)] truncate">
            {name}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-[10px] font-semibold rounded-full bg-[var(--g100)] text-[var(--g500)] border border-[var(--g200)]"
            >
              {tag}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="text-[10px] text-[var(--g400)]">
              +{tags.length - 2}
            </span>
          )}
        </div>
      </div>

      <div className="w-28 text-right flex-shrink-0">
        <span className="font-mono text-sm font-semibold text-[var(--g900)]">
          {maxReward}
        </span>
      </div>

      <div className="w-24 flex-shrink-0 hidden sm:block">
        <div className="flex items-center gap-1">
          {chains.slice(0, 2).map((chain) => (
            <span
              key={chain}
              className="px-2 py-0.5 text-[11px] font-medium rounded bg-[var(--g50)] text-[var(--g600)] border border-[var(--g150)]"
            >
              {chain}
            </span>
          ))}
          {chains.length > 2 && (
            <span className="text-[11px] text-[var(--g400)]">
              +{chains.length - 2}
            </span>
          )}
        </div>
      </div>

      <div className="w-20 text-right flex-shrink-0">
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-1 text-[10px] font-semibold rounded-[var(--radius-full)]',
            statusStyles[status]
          )}
        >
          {status}
        </span>
      </div>
    </Link>
  );
}
