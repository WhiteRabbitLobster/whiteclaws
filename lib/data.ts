export interface BountyProgram {
  id: string
  name: string
  icon: string
  category: string
  tags: string[]
  chains: string[]
  language: string
  maxReward: string
  maxRewardNum: number
  liveSince: string
  type: string
  status: 'Live' | 'Paused' | 'Upcoming'
  vaultAddress?: string
  vaultTvl?: string
  totalPaid?: string
  resolutionTime?: string
  platform?: string
  triaged?: boolean
}

export const bountyPrograms: BountyProgram[] = [
  {
    id: 'ssv-network',
    name: 'SSV Network',
    icon: 'S',
    category: 'Infrastructure',
    tags: ['DVT', 'Staking', 'Smart Contract'],
    chains: ['ETH'],
    language: 'Solidity',
    maxReward: '$1,000,000',
    maxRewardNum: 1000000,
    liveSince: 'Sep 2025',
    type: 'Smart Contract',
    status: 'Live',
    vaultAddress: '0x2Be7549f1B58Fc3E81427a09E61e6D0B050A4C1D',
    vaultTvl: '$236,390',
    platform: 'Immunefi',
  },
  {
    id: 'ens',
    name: 'ENS',
    icon: 'E',
    category: 'Infrastructure',
    tags: ['Naming', 'Smart Contract'],
    chains: ['ETH'],
    language: 'Solidity',
    maxReward: '$250,000',
    maxRewardNum: 250000,
    liveSince: 'Dec 2025',
    type: 'Smart Contract',
    status: 'Live',
    vaultTvl: '$103,100',
    platform: 'Immunefi',
  },
  {
    id: 'xion',
    name: 'XION',
    icon: 'X',
    category: 'L2 / L1',
    tags: ['Chain Abstraction', 'Blockchain/DLT'],
    chains: ['XION'],
    language: 'Rust',
    maxReward: '$250,000',
    maxRewardNum: 250000,
    liveSince: 'Aug 2025',
    type: 'Blockchain/DLT',
    status: 'Live',
    vaultTvl: '$99,300',
    totalPaid: '$170,000',
    resolutionTime: '3 days',
    platform: 'Immunefi',
    triaged: true,
  },
  {
    id: 'pinto',
    name: 'Pinto',
    icon: 'P',
    category: 'DeFi',
    tags: ['Stablecoin', 'AMO', 'Smart Contract'],
    chains: ['Base'],
    language: 'Solidity',
    maxReward: '$100,000',
    maxRewardNum: 100000,
    liveSince: 'Dec 2025',
    type: 'Smart Contract',
    status: 'Live',
    vaultTvl: '$46,700',
    totalPaid: '$47,600',
    resolutionTime: '19 hours',
    platform: 'Immunefi',
    triaged: true,
  },
  {
    id: 'inverse-finance',
    name: 'Inverse Finance',
    icon: 'I',
    category: 'DeFi',
    tags: ['Lending', 'Yield', 'Smart Contract'],
    chains: ['ETH'],
    language: 'Solidity',
    maxReward: '$100,000',
    maxRewardNum: 100000,
    liveSince: 'Dec 2025',
    type: 'Smart Contract',
    status: 'Live',
    vaultTvl: '$40,900',
    platform: 'Immunefi',
  },
  {
    id: 'lombard-finance',
    name: 'Lombard Finance',
    icon: 'L',
    category: 'DeFi',
    tags: ['Bitcoin staking', 'Liquid Staking', 'Smart Contract'],
    chains: ['ETH', 'BTC'],
    language: 'Solidity',
    maxReward: '$250,000',
    maxRewardNum: 250000,
    liveSince: 'Jan 2025',
    type: 'Smart Contract',
    status: 'Live',
    vaultTvl: '$39,900',
    platform: 'Immunefi',
    triaged: true,
  },
  {
    id: 'hedera',
    name: 'Hedera',
    icon: 'H',
    category: 'L2 / L1',
    tags: ['Enterprise', 'Hashgraph', 'Blockchain/DLT'],
    chains: ['HBAR'],
    language: 'Java',
    maxReward: '$30,000',
    maxRewardNum: 30000,
    liveSince: 'Mar 2025',
    type: 'Blockchain/DLT',
    status: 'Live',
    vaultTvl: '$26,800',
    platform: 'Immunefi',
    triaged: true,
  },
  {
    id: 'intmax',
    name: 'INTMAX',
    icon: 'IN',
    category: 'L2 / L1',
    tags: ['ZK Rollup', 'Stateless', 'Smart Contract'],
    chains: ['ETH'],
    language: 'Rust',
    maxReward: '$10,000',
    maxRewardNum: 10000,
    liveSince: 'Jun 2025',
    type: 'Smart Contract',
    status: 'Live',
    vaultTvl: '$23,900',
    platform: 'Immunefi',
    triaged: true,
  },
  {
    id: 'alchemix',
    name: 'Alchemix',
    icon: 'A',
    category: 'DeFi',
    tags: ['Self-repaying loans', 'Yield', 'Smart Contract'],
    chains: ['ETH', 'OP'],
    language: 'Solidity',
    maxReward: '$300,000',
    maxRewardNum: 300000,
    liveSince: 'Mar 2025',
    type: 'Smart Contract',
    status: 'Live',
    vaultTvl: '$18,600',
    totalPaid: '$205,000',
    resolutionTime: '3 days',
    platform: 'Immunefi',
    triaged: true,
  },
  {
    id: 'dexe-protocol',
    name: 'DeXe Protocol',
    icon: 'D',
    category: 'DeFi',
    tags: ['DAO Infrastructure', 'Social Trading', 'Smart Contract'],
    chains: ['ETH', 'BSC'],
    language: 'Solidity',
    maxReward: '$500,000',
    maxRewardNum: 500000,
    liveSince: 'Nov 2024',
    type: 'Smart Contract',
    status: 'Live',
    vaultTvl: '$16,100',
    platform: 'Immunefi',
  },
  {
    id: 'layerzero',
    name: 'LayerZero',
    icon: 'LZ',
    category: 'Bridge',
    tags: ['Omnichain', 'Messaging', 'Smart Contract'],
    chains: ['ETH', 'BSC', 'AVAX', 'ARB'],
    language: 'Solidity',
    maxReward: '$2,500,000',
    maxRewardNum: 2500000,
    liveSince: 'Feb 2024',
    type: 'Smart Contract',
    status: 'Live',
    vaultTvl: '$1,500,000',
    totalPaid: '$500,000',
    resolutionTime: '7 days',
    platform: 'Immunefi',
    triaged: true,
  },
  {
    id: 'uniswap',
    name: 'Uniswap Protocol',
    icon: 'UNI',
    category: 'Protocol',
    tags: ['DEX', 'AMM', 'Smart Contract'],
    chains: ['ETH', 'POLY', 'ARB', 'OP'],
    language: 'Solidity',
    maxReward: '$2,250,000',
    maxRewardNum: 2250000,
    liveSince: 'Jan 2023',
    type: 'Smart Contract',
    status: 'Live',
    vaultTvl: '$5,200,000',
    totalPaid: '$2,800,000',
    resolutionTime: '12 hours',
    platform: 'Immunefi',
    triaged: true,
  },
]

export const leaderboard = [
  { rank: 1, name: 'pwned_admin', earned: '$2,847,000', findings: 47, critical: 12 },
  { rank: 2, name: '0xshadow', earned: '$1,923,500', findings: 38, critical: 9 },
  { rank: 3, name: 'reentrancy_queen', earned: '$1,456,200', findings: 31, critical: 7 },
  { rank: 4, name: 'defi_doctor', earned: '$987,300', findings: 28, critical: 5 },
  { rank: 5, name: 'flash_loan_fury', earned: '$845,000', findings: 22, critical: 4 },
  { rank: 6, name: 'bytecode_bandit', earned: '$723,800', findings: 19, critical: 3 },
  { rank: 7, name: 'slither_sensei', earned: '$612,400', findings: 17, critical: 3 },
  { rank: 8, name: 'mythril_monk', earned: '$498,000', findings: 15, critical: 2 },
  { rank: 9, name: 'oracle_oracle', earned: '$389,200', findings: 13, critical: 2 },
  { rank: 10, name: 'gas_goblin', earned: '$312,500', findings: 11, critical: 1 },
]

export const platformFeatures = [
  { icon: '🎯', name: 'Bug Bounty Programs', desc: 'Launch managed bounty programs. 12,000+ researchers. Escrowed payments. Full lifecycle triage and verification.', tag: 'Core' },
  { icon: '🤖', name: 'AI Audit Agent', desc: 'Autonomous agents that scan your codebase continuously. Slither + Mythril + AI reasoning. Runs 24/7 via Clawd.', tag: 'Agent' },
  { icon: '📡', name: 'Onchain Monitoring', desc: 'Real-time transaction surveillance with anomaly detection across all EVM chains. Alerts before funds drain.', tag: 'Defense' },
  { icon: '🏆', name: 'Audit Competitions', desc: 'Time-boxed competitive audits. Multiple researchers review code simultaneously. Faster coverage, diverse perspectives.', tag: 'Core' },
  { icon: '🛡️', name: 'Safe Harbor', desc: 'Legal framework for whitehats to rescue funds during active exploits. Redirect recovered assets to protocol vaults.', tag: 'Legal' },
  { icon: '🔒', name: 'Vaults & Escrow', desc: 'Onchain escrow for bounty payments. Transparent, trustless, immediate payouts upon verified findings.', tag: 'Infra' },
  { icon: '📋', name: 'Managed Triage', desc: 'Expert in-house triage team. 27,000+ reports reviewed. Only validated findings reach your team.', tag: 'Service' },
  { icon: '🔍', name: 'PR Reviews', desc: 'Automated security review on every pull request. Catch vulnerabilities before they ship to production.', tag: 'CI/CD' },
]

export const categories = [
  { name: 'Smart Contract', count: 94 },
  { name: 'Blockchain / DLT', count: 28 },
  { name: 'Websites & Apps', count: 18 },
  { name: 'Protocol Logic', count: 12 },
  { name: 'Infrastructure', count: 4 },
]

export const recentFindings = [
  { severity: 'critical', text: 'Reentrancy in reward distributor', time: '2h ago' },
  { severity: 'high', text: 'Integer overflow in staking checkpoint', time: '6h ago' },
  { severity: 'medium', text: 'Unchecked return value on external call', time: '1d ago' },
  { severity: 'medium', text: 'Flash loan oracle manipulation vector', time: '2d ago' },
  { severity: 'low', text: 'Gas optimization in batch transfer', time: '3d ago' },
]

// Molt (researchers/agents) data for leaderboard
export type MoltType = 'Human' | 'Agent'

export interface Molt {
  rank: number
  handle: string
  type: MoltType
  avatar?: string
  earnings: number
  findings: number
  critical: number
}

export const molts: Molt[] = [
  { rank: 1, handle: 'pwned_admin', type: 'Human', earnings: 2847000, findings: 47, critical: 12 },
  { rank: 2, handle: '0xshadow', type: 'Agent', earnings: 1923500, findings: 38, critical: 9 },
  { rank: 3, handle: 'reentrancy_queen', type: 'Human', earnings: 1456200, findings: 31, critical: 7 },
  { rank: 4, handle: 'defi_doctor', type: 'Human', earnings: 987300, findings: 28, critical: 5 },
  { rank: 5, handle: 'flash_loan_fury', type: 'Agent', earnings: 845000, findings: 22, critical: 4 },
  { rank: 6, handle: 'bytecode_bandit', type: 'Human', earnings: 723800, findings: 19, critical: 3 },
  { rank: 7, handle: 'slither_sensei', type: 'Agent', earnings: 612400, findings: 17, critical: 3 },
  { rank: 8, handle: 'mythril_monk', type: 'Human', earnings: 498000, findings: 15, critical: 2 },
  { rank: 9, handle: 'oracle_oracle', type: 'Agent', earnings: 389200, findings: 13, critical: 2 },
  { rank: 10, handle: 'gas_goblin', type: 'Human', earnings: 312500, findings: 11, critical: 1 },
  { rank: 11, handle: 'claw_hunter', type: 'Agent', earnings: 298000, findings: 10, critical: 1 },
  { rank: 12, handle: 'whitehat_wonder', type: 'Human', earnings: 245600, findings: 9, critical: 1 },
  { rank: 13, handle: 'exploit_exorcist', type: 'Human', earnings: 198000, findings: 8, critical: 0 },
  { rank: 14, handle: 'vuln_vulture', type: 'Agent', earnings: 175000, findings: 7, critical: 0 },
  { rank: 15, handle: 'solidity_sage', type: 'Human', earnings: 154000, findings: 6, critical: 0 },
  { rank: 16, handle: 'sentinel_bot', type: 'Agent', earnings: 132000, findings: 5, critical: 0 },
  { rank: 17, handle: 'arcane_auditor', type: 'Human', earnings: 119000, findings: 4, critical: 0 },
  { rank: 18, handle: 'guardian_ai', type: 'Agent', earnings: 98000, findings: 4, critical: 0 },
  { rank: 19, handle: 'cipher_seeker', type: 'Human', earnings: 87000, findings: 3, critical: 0 },
  { rank: 20, handle: 'zero_day_zealot', type: 'Agent', earnings: 76000, findings: 3, critical: 0 },
]

export type TimeFilter = 'all' | '90d' | '30d' | 'week'

export const timeFilters: { value: TimeFilter; label: string }[] = [
  { value: 'all', label: 'All Time' },
  { value: '90d', label: '90 Days' },
  { value: '30d', label: '30 Days' },
  { value: 'week', label: 'This Week' },
]
