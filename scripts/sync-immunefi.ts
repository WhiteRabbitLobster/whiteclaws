#!/usr/bin/env ts-node
/**
 * Immunefi Data Sync Script
 * Fetches real bounty data from Immunefi unofficial API
 * Transforms to WhiteClaws format and writes to lib/data.ts
 */

import * as fs from 'fs';
import * as path from 'path';

interface ImmunefiAsset {
  id: string;
  url: string;
  type: string;
  description?: string;
  isSafeHarbor: boolean;
  isPrimacyOfImpact: boolean;
}

interface ImmunefiProgram {
  id?: string;
  name: string;
  description?: string;
  ecosystem?: string[];
  assets: ImmunefiAsset[];
  assetsBodyV2?: any;
  program?: {
    max_reward?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

interface WhiteClawsBounty {
  id: string;
  name: string;
  icon: string;
  category: string;
  tags: string[];
  chains: string[];
  language: string;
  maxReward: string;
  maxRewardNum: number;
  liveSince: string;
  type: string;
  status: 'Live' | 'Paused' | 'Upcoming';
  vaultAddress?: string;
  vaultTvl?: string;
  totalPaid?: string;
  resolutionTime?: string;
  platform: string;
  triaged?: boolean;
  about?: string;
  scope?: any[];
  severityTable?: any;
}

// Fetch the projects list
async function fetchProjects(): Promise<ImmunefiProgram[]> {
  const url = 'https://raw.githubusercontent.com/infosec-us-team/Immunefi-Bug-Bounty-Programs-Unofficial/main/projects.json';
  console.log('🐇 Fetching Immunefi projects list...');
  
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  return await response.json();
}

// Extract chain from asset URL
function extractChain(asset: ImmunefiAsset): string[] {
  const chainMap: Record<string, string> = {
    'ethereum': 'ETH',
    'base': 'BASE',
    'arbitrum': 'ARB',
    'optimism': 'OP',
    'polygon': 'POLY',
    'avalanche': 'AVAX',
    'bnb': 'BSC',
    'solana': 'SOL',
    'starknet': 'STRK',
    'cosmos': 'ATOM',
    'bitcoin': 'BTC',
  };
  
  const chains: string[] = [];
  const url = asset.url?.toLowerCase() || '';
  
  Object.entries(chainMap).forEach(([key, value]) => {
    if (url.includes(key)) chains.push(value);
  });
  
  if (chains.length === 0) chains.push('ETH'); // Default to ETH
  return [...new Set(chains)];
}

// Determine category from name/description
function determineCategory(name: string, description?: string): string {
  const text = (name + ' ' + (description || '')).toLowerCase();
  
  if (text.includes('bridge') || text.includes('cross')) return 'Bridge';
  if (text.includes('staking') || text.includes('validator')) return 'Staking';
  if (text.includes('amm') || text.includes('dex') || text.includes('swap')) return 'DeFi';
  if (text.includes('oracle')) return 'Oracle';
  if (text.includes('lending') || text.includes('borrow')) return 'Lending';
  if (text.includes('perp') || text.includes('future')) return 'Derivatives';
  if (text.includes('dao') || text.includes('governance')) return 'DAO';
  if (text.includes('wallet')) return 'Wallet';
  if (text.includes('gaming') || text.includes('game')) return 'Gaming';
  if (text.includes('router') || text.includes('infrastructure')) return 'Infrastructure';
  
  return 'DeFi';
}

// Parse max reward to number
function parseMaxReward(reward?: string): number {
  if (!reward) return 0;
  const match = reward.match(/[\d,]+\.?\d*/);
  if (!match) return 0;
  return parseFloat(match[0].replace(/,/g, ''));
}

// Transform Immunefi program to WhiteClaws format
function transformProgram(program: ImmunefiProgram, index: number): WhiteClawsBounty {
  const name = program.name || 'Unknown';
  const id = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const icon = name.charAt(0).toUpperCase();
  
  // Extract chains from all assets
  const allChains = program.assets?.flatMap(extractChain) || ['ETH'];
  const chains = [...new Set(allChains)];
  
  // Detect language from assets
  const hasSolidity = program.assets?.some(a => a.url?.includes('.sol'));
  const language = hasSolidity ? 'Solidity' : 'Rust'; // Default
  
  // Parse max reward
  const maxRewardStr = program.program?.max_reward || '$0';
  const maxRewardNum = parseMaxReward(maxRewardStr);
  
  // Format max reward
  const maxReward = maxRewardNum > 0 
    ? `$${maxRewardNum.toLocaleString()}` 
    : 'N/A';
  
  // Determine category and tags
  const category = determineCategory(name, program.description);
  const tags = [category];
  if (program.assets?.some(a => a.isSafeHarbor)) tags.push('Safe Harbor');
  
  return {
    id: id || `program-${index}`,
    name,
    icon,
    category,
    tags,
    chains,
    language,
    maxReward,
    maxRewardNum,
    liveSince: '2024',
    type: 'Smart Contract',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: program.description,
    scope: program.assets?.map(a => ({
      target: a.description || a.url?.split('/').pop() || 'Contract',
      type: a.type,
      url: a.url,
      safeHarbor: a.isSafeHarbor,
    })),
  };
}

// Main sync function
async function syncImmunefiData() {
  try {
    console.log('🐇 Starting Immunefi data sync...\n');
    
    const programs = await fetchProjects();
    console.log(`📊 Found ${programs.length} programs`);
    
    // Transform programs
    const bountyPrograms = programs
      .map((p, i) => transformProgram(p, i))
      .filter(p => p.maxRewardNum > 0) // Only programs with bounties
      .sort((a, b) => b.maxRewardNum - a.maxRewardNum); // Sort by reward
    
    console.log(`✅ Transformed ${bountyPrograms.length} programs with bounties`);
    
    // Take top 50 for now
    const topPrograms = bountyPrograms.slice(0, 50);
    console.log(`📝 Using top ${topPrograms.length} programs`);
    
    // Generate TypeScript file content
    const fileContent = `export interface BountyProgram {
  id: string;
  name: string;
  icon: string;
  category: string;
  tags: string[];
  chains: string[];
  language: string;
  maxReward: string;
  maxRewardNum: number;
  liveSince: string;
  type: string;
  status: 'Live' | 'Paused' | 'Upcoming';
  vaultAddress?: string;
  vaultTvl?: string;
  totalPaid?: string;
  resolutionTime?: string;
  platform: string;
  triaged?: boolean;
  about?: string;
  scope?: any[];
  severityTable?: any;
}

export const bountyPrograms: BountyProgram[] = ${JSON.stringify(topPrograms, null, 2)};

// Program statistics
export const programStats = {
  totalPrograms: ${topPrograms.length},
  totalMaxRewards: ${topPrograms.reduce((sum, p) => sum + p.maxRewardNum, 0)},
  topCategory: '${getTopCategory(topPrograms)}',
  chains: ${JSON.stringify([...new Set(topPrograms.flatMap(p => p.chains))])},
};

function getTopCategory(programs: WhiteClawsBounty[]): string {
  const categories: Record<string, number> = {};
  programs.forEach(p => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });
  return Object.entries(categories)
    .sort((a, b) => b[1] - a[1])[0]?.[0] || 'DeFi';
}
`;
    
    // Write to file
    const outputPath = path.join(__dirname, '..', 'lib', 'data.ts');
    fs.writeFileSync(outputPath, fileContent);
    console.log(`\n✅ Written to ${outputPath}`);
    
    console.log('\n📊 Top 10 Programs by Reward:');
    topPrograms.slice(0, 10).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name}: ${p.maxReward}`);
    });
    
  } catch (error) {
    console.error('❌ Error:', error);
    process.exit(1);
  }
}

// Run sync
syncImmunefiData();
