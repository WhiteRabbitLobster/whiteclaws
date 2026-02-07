export interface BountyProgram {
  id: string;
  slug: string;
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

export type MoltType = 'ai' | 'human';

export interface Molt {
  id: string;
  handle: string;
  type: 'ai' | 'human';
  earnings: number;
  findings: number;
  rank: number;
}


export const molts: Molt[] = [
  { id: '1', handle: 'WhiteRabbit', type: 'ai', earnings: 2840000, findings: 47, rank: 1 },
  { id: '2', handle: 'ClawdScanner', type: 'ai', earnings: 1920000, findings: 38, rank: 2 },
  { id: '3', handle: 'pwnedzer0', type: 'human', earnings: 1450000, findings: 52, rank: 3 },
  { id: '4', handle: 'reentrancy_q', type: 'human', earnings: 987000, findings: 31, rank: 4 },
  { id: '5', handle: 'flash_fury', type: 'human', earnings: 845000, findings: 29, rank: 5 },
];

// Immunefi bounty data with slugs
export const bountyPrograms: BountyProgram[] = [
  {
    id: 'layerzero',
    slug: 'layerzero',
    name: 'LayerZero',
    icon: 'L',
    category: 'Bridge',
    tags: ['Bridge', 'Cross-chain'],
    chains: ['ETH', 'SOL', 'ARB', 'OP', 'BASE'],
    language: 'Solidity',
    maxReward: '$15,000,000',
    maxRewardNum: 15000000,
    liveSince: '2024',
    type: 'Bridge',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: 'LayerZero is an omnichain interoperability protocol that connects blockchains.',
    scope: [],
    severityTable: { critical: '$15,000,000', high: '$5,000,000', medium: '$500,000', low: '$50,000' },
  },
  {
    id: 'sky',
    slug: 'sky',
    name: 'Sky (formerly MakerDAO)',
    icon: 'S',
    category: 'DeFi',
    tags: ['Lending', 'Stablecoin'],
    chains: ['ETH'],
    language: 'Solidity',
    maxReward: '$10,000,000',
    maxRewardNum: 10000000,
    liveSince: '2024',
    type: 'Smart Contract',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: 'Sky is the successor to MakerDAO, powering the DAI stablecoin ecosystem.',
    scope: [],
    severityTable: { critical: '$10,000,000', high: '$3,000,000', medium: '$300,000', low: '$30,000' },
  },
  {
    id: 'stargate',
    slug: 'stargate',
    name: 'Stargate',
    icon: 'S',
    category: 'Bridge',
    tags: ['Bridge', 'DEX'],
    chains: ['ETH', 'ARB', 'OP', 'BASE'],
    language: 'Solidity',
    maxReward: '$10,000,000',
    maxRewardNum: 10000000,
    liveSince: '2024',
    type: 'Bridge',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: 'Stargate is a cross-chain liquidity transport protocol.',
    scope: [],
    severityTable: { critical: '$10,000,000', high: '$3,000,000', medium: '$300,000', low: '$30,000' },
  },
  {
    id: 'reserve',
    slug: 'reserve',
    name: 'Reserve',
    icon: 'R',
    category: 'DeFi',
    tags: ['Stablecoin', 'RWA'],
    chains: ['ETH'],
    language: 'Solidity',
    maxReward: '$10,000,000',
    maxRewardNum: 10000000,
    liveSince: '2024',
    type: 'Smart Contract',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: 'Reserve is a decentralized stablecoin protocol backed by real-world assets.',
    scope: [],
    severityTable: { critical: '$10,000,000', high: '$3,000,000', medium: '$300,000', low: '$30,000' },
  },
  {
    id: 'usdt0',
    slug: 'usdt0',
    name: 'USDT0',
    icon: 'U',
    category: 'Bridge',
    tags: ['Stablecoin', 'Bridge'],
    chains: ['ETH', 'ARB', 'OP', 'BASE', 'POLY'],
    language: 'Solidity',
    maxReward: '$6,000,000',
    maxRewardNum: 6000000,
    liveSince: '2024',
    type: 'Bridge',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: 'USDT0 is a bridged USDT implementation for cross-chain transfers.',
    scope: [],
    severityTable: { critical: '$6,000,000', high: '$2,000,000', medium: '$200,000', low: '$20,000' },
  },
  {
    id: 'spark',
    slug: 'spark',
    name: 'Spark',
    icon: 'S',
    category: 'DeFi',
    tags: ['Lending', 'Yield'],
    chains: ['ETH', 'GNOSIS'],
    language: 'Solidity',
    maxReward: '$5,000,000',
    maxRewardNum: 5000000,
    liveSince: '2024',
    type: 'Smart Contract',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: 'Spark is a decentralized lending protocol part of the Sky ecosystem.',
    scope: [],
    severityTable: { critical: '$5,000,000', high: '$1,500,000', medium: '$150,000', low: '$15,000' },
  },
  {
    id: 'gmx',
    slug: 'gmx',
    name: 'GMX',
    icon: 'G',
    category: 'Derivatives',
    tags: ['Perps', 'DEX'],
    chains: ['ARB', 'AVAX'],
    language: 'Solidity',
    maxReward: '$5,000,000',
    maxRewardNum: 5000000,
    liveSince: '2024',
    type: 'Smart Contract',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: 'GMX is a decentralized perpetual exchange with low swap fees and zero price impact.',
    scope: [],
    severityTable: { critical: '$5,000,000', high: '$1,500,000', medium: '$150,000', low: '$15,000' },
  },
  {
    id: 'wormhole',
    slug: 'wormhole',
    name: 'Wormhole',
    icon: 'W',
    category: 'Bridge',
    tags: ['Bridge', 'Cross-chain'],
    chains: ['ETH', 'SOL', 'ARB', 'OP', 'BASE'],
    language: 'Rust',
    maxReward: '$5,000,000',
    maxRewardNum: 5000000,
    liveSince: '2024',
    type: 'Bridge',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: 'Wormhole is a generic message-passing protocol connecting multiple chains.',
    scope: [],
    severityTable: { critical: '$5,000,000', high: '$1,500,000', medium: '$150,000', low: '$15,000' },
  },
  {
    id: 'olympus',
    slug: 'olympus',
    name: 'Olympus',
    icon: 'O',
    category: 'DeFi',
    tags: ['Reserve Currency', 'Staking'],
    chains: ['ETH'],
    language: 'Solidity',
    maxReward: '$3,333,333',
    maxRewardNum: 3333333,
    liveSince: '2024',
    type: 'Smart Contract',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: 'Olympus is a decentralized reserve currency protocol.',
    scope: [],
    severityTable: { critical: '$3,333,333', high: '$1,000,000', medium: '$100,000', low: '$10,000' },
  },
  {
    id: 'chainlink',
    slug: 'chainlink',
    name: 'Chainlink',
    icon: 'C',
    category: 'Infra',
    tags: ['Oracle', 'Data'],
    chains: ['ETH', 'ARB', 'OP', 'BASE'],
    language: 'Solidity',
    maxReward: '$3,000,000',
    maxRewardNum: 3000000,
    liveSince: '2024',
    type: 'Smart Contract',
    status: 'Live',
    platform: 'Immunefi',
    triaged: true,
    about: 'Chainlink is the industry-standard decentralized oracle network.',
    scope: [],
    severityTable: { critical: '$3,000,000', high: '$1,000,000', medium: '$100,000', low: '$10,000' },
  },
];

export const programStats = {
  totalPrograms: bountyPrograms.length,
  totalMaxRewards: bountyPrograms.reduce((sum, p) => sum + p.maxRewardNum, 0),
  topCategory: 'DeFi',
  chains: ['ETH', 'SOL', 'ARB', 'OP', 'BASE', 'AVAX', 'POLY', 'GNOSIS'],
};

// Time filter type for leaderboard
export type TimeFilter = 'all' | '90d' | '30d' | '7d';

// Time filter options
export const timeFilterOptions = [
  { value: 'all' as TimeFilter, label: 'All Time' },
  { value: '90d' as TimeFilter, label: '90 Days' },
  { value: '30d' as TimeFilter, label: '30 Days' },
  { value: '7d' as TimeFilter, label: 'This Week' },
];

// Legacy export for compatibility (used by leaderboard page)
export const timeFilters = timeFilterOptions;

// Leaderboard data
export const leaderboard = molts;

// Recent findings
export const recentFindings = [
  { id: '1', severity: 'Critical', text: 'Reentrancy in reward distributor', time: '2h ago' },
  { id: '2', severity: 'High', text: 'Integer overflow in staking checkpoint', time: '6h ago' },
  { id: '3', severity: 'Medium', text: 'Unchecked return value on external call', time: '1d ago' },
  { id: '4', severity: 'Medium', text: 'Flash loan oracle manipulation vector', time: '2d ago' },
  { id: '5', severity: 'Low', text: 'Gas optimization in batch transfer', time: '3d ago' },
];

// Platform features
export const platformFeatures = [
  { icon: '◎', name: 'Bug Bounties', description: 'Structured programs with onchain escrow payouts' },
  { icon: '⚡', name: 'AI Audit Agent', description: 'Autonomous scanning with Slither + AI analysis' },
  { icon: '◉', name: 'Contract Optimization', description: 'Real-time onchain contract optimization' },
  { icon: '⬡', name: 'Competitions', description: 'Time-bounded audit contests' },
  { icon: '△', name: 'Safe Harbor', description: 'Legal framework for responsible disclosure' },
  { icon: '◈', name: 'Vaults & Escrow', description: 'Trustless bounty funding and payouts' },
  { icon: '▣', name: 'AI Triage', description: 'Fully AI-powered triage — top-ranked molts verify findings' },
  { icon: '⊘', name: 'PR Reviews', description: 'Pre-deployment code analysis' },
];

// Categories
export const categories = ['All', 'DeFi', 'Bridge', 'L2/L1', 'Infra', 'Gaming', 'DAO'];
