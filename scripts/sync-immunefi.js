#!/usr/bin/env node
/**
 * Immunefi Data Sync Script
 * Fetches real bounty data from Immunefi unofficial API
 * Transforms to WhiteClaws format and writes to lib/data.ts
 */

const https = require('https');
const fs = require('fs');
const path = require('path');

// Fetch URL helper
function fetchJson(url) {
  return new Promise((resolve, reject) => {
    const req = https.get(url, {
      headers: { 'User-Agent': 'WhiteClaws-Immunefi-Sync/1.0' }
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Failed to parse JSON: ${e.message}`));
        }
      });
    });
    req.on('error', reject);
  });
}

// Extract chain from asset URL
function extractChain(asset) {
  const chainMap = {
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
  
  const chains = [];
  const url = (asset.url || '').toLowerCase();
  
  Object.entries(chainMap).forEach(([key, value]) => {
    if (url.includes(key)) chains.push(value);
  });
  
  if (chains.length === 0) chains.push('ETH');
  return Array.from(new Set(chains));
}

// Determine category
function determineCategory(name, description) {
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

// Transform program
function transformProgram(program, index) {
  // FIX: Use 'project' field which contains the actual program name
  const name = program.project || program.name || 'Unknown';
  const id = (program.slug || name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') || `program-${index}`;
  const icon = name.charAt(0).toUpperCase();
  
  const allChains = (program.assets || []).flatMap(extractChain);
  const chains = Array.from(new Set(allChains));
  
  // Default rewards based on maxBounty
  const maxRewardNum = program.maxBounty || 0;
  const maxReward = maxRewardNum > 0 ? `$${maxRewardNum.toLocaleString()}` : 'Variable';
  
  // Build severity table from rewards data
  const severityTable = {};
  if (program.rewards) {
    for (const [severity, details] of Object.entries(program.rewards)) {
      if (details && typeof details === 'object' && details.max) {
        severityTable[severity] = { max: `$${details.max.toLocaleString()}` };
      }
    }
  }
  
  const hasSolidity = program.assets?.some(a => a.url?.includes('.sol'));
  const language = program.language || (hasSolidity ? 'Solidity' : 'Rust');
  
  const category = determineCategory(name, program.description);
  const tags = [category];
  if (program.assets?.some(a => a.isSafeHarbor)) tags.push('Safe Harbor');
  if (program.kyc) tags.push('KYC Required');
  
  return {
    id,
    name,
    icon,
    category,
    tags,
    chains,
    language,
    maxReward,
    maxRewardNum,
    liveSince: program.launchDate ? program.launchDate.split('-')[0] : '2024',
    type: program.productType || 'Smart Contract',
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
    severityTable,
    websiteUrl: program.websiteUrl,
    githubUrl: program.githubUrl,
  };
}

// Get top category
function getTopCategory(programs) {
  const categories = {};
  programs.forEach(p => {
    categories[p.category] = (categories[p.category] || 0) + 1;
  });
  return Object.entries(categories).sort((a, b) => b[1] - a[1])[0]?.[0] || 'DeFi';
}

// Main sync
async function syncImmunefiData() {
  try {
    console.log('🐇 Starting Immunefi data sync...\n');
    
    const url = 'https://raw.githubusercontent.com/infosec-us-team/Immunefi-Bug-Bounty-Programs-Unofficial/main/projects.json';
    const programs = await fetchJson(url);
    
    console.log(`📊 Found ${programs.length} programs`);
    
    // Transform all programs (including those with 0 bounty for completeness)
    const bountyPrograms = programs
      .map((p, i) => transformProgram(p, i))
      .sort((a, b) => b.maxRewardNum - a.maxRewardNum);
    
    console.log(`✅ Transformed ${bountyPrograms.length} programs`);
    
    const top50 = bountyPrograms.slice(0, 50);
    console.log(`📝 Using top ${top50.length} programs`);
    
    // Generate TypeScript
    const chains = Array.from(new Set(top50.flatMap(p => p.chains)));
    const stats = {
      totalPrograms: top50.length,
      totalMaxRewards: top50.reduce((sum, p) => sum + p.maxRewardNum, 0),
      topCategory: getTopCategory(top50),
      chains,
    };
    
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
  websiteUrl?: string;
  githubUrl?: string;
}

export const programStats = ${JSON.stringify(stats, null, 2)};

export const bountyPrograms: BountyProgram[] = ${JSON.stringify(top50, null, 2)};
`;
    
    const outputPath = path.join(__dirname, '..', 'lib', 'data.ts');
    fs.writeFileSync(outputPath, fileContent);
    console.log(`\n✅ Written to ${outputPath}`);
    
    console.log('\n📊 Top 10 Programs by Reward:');
    top50.slice(0, 10).forEach((p, i) => {
      console.log(`  ${i + 1}. ${p.name}: ${p.maxReward || 'Variable'}`);
    });
    
    return top50.length;
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

syncImmunefiData();
