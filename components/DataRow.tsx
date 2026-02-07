'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface DataRowProps {
  slug: string;
  icon: string;
  name: string;
  tags: string[];
  maxReward: string;
  chains: string[];
  status: 'Live' | 'Paused' | 'Upcoming';
}

export default function DataRow({
  slug,
  icon,
  name,
  tags,
  maxReward,
  chains,
  status,
}: DataRowProps) {
  const statusStyles = {
    Live: 'bg-green-500/20 text-green-400 border-green-500/30',
    Paused: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
    Upcoming: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  };

  return (
    <Link
      href={`/bounties/${slug}`}
      className="group flex items-center gap-4 px-4 py-4 border-b border-[#1A1A1A] hover:bg-white/[0.02] transition-all cursor-pointer"
    >
      <div className="w-10 h-10 rounded-lg bg-[#0C0C0C] border border-[#1A1A1A] flex items-center justify-center text-sm font-bold text-[#707070] flex-shrink-0 group-hover:border-[#252525] transition-colors">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <h4 className="text-sm font-semibold text-[#F0F0F0] truncate group-hover:text-white transition-colors">
            {name}
          </h4>
        </div>
        <div className="flex items-center gap-1.5 flex-wrap">
          {tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-[#111111] text-[#707070] border border-[#1A1A1A]"
            >
              {tag}
            </span>
          ))}
          {tags.length > 2 && (
            <span className="text-[10px] text-[#404040]">+{tags.length - 2}</span>
          )}
        </div>
      </div>
      <div className="w-28 text-right flex-shrink-0">
        <span className="font-mono text-sm font-semibold text-[#F0F0F0]">
          {maxReward}
        </span>
      </div>
      <div className="w-24 flex-shrink-0 hidden sm:block">
        <div className="flex items-center gap-1 justify-end">
          {chains.slice(0, 2).map((chain) => (
            <span
              key={chain}
              className="px-2 py-0.5 text-[11px] font-medium rounded bg-[#111111] text-[#707070] border border-[#1A1A1A]"
            >
              {chain}
            </span>
          ))}
          {chains.length > 2 && (
            <span className="text-[11px] text-[#404040]">+{chains.length - 2}</span>
          )}
        </div>
      </div>
      <div className="w-20 text-right flex-shrink-0">
        <span
          className={cn(
            'inline-flex items-center px-2.5 py-1 text-[10px] font-semibold rounded-full border',
            statusStyles[status]
          )}
        >
          {status}
        </span>
      </div>
    </Link>
  );
}
