// WhiteClaws Type Definitions

// Protocol / Bounty Program
export interface Protocol {
  id: string;
  name: string;
  icon: string;
  category: string;
  tags: string[];
  chains: string[];
  language: string;
  maxReward: number; // Monetary value as number
  liveSince: string;
  type: string;
  vaultAddress?: string;
  vaultTvl?: number; // Monetary value as number
  totalPaid?: number; // Monetary value as number
  resolutionTime?: string;
  platform?: string;
  triaged?: boolean;
}

// Bounty (legacy name aligned with Protocol)
export type Bounty = Protocol;

// Security Finding / Vulnerability Report
export interface Finding {
  id: string;
  protocolId: string;
  protocolName: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low' | 'info';
  reward: number; // Monetary value as number
  status: 'submitted' | 'triaged' | 'confirmed' | 'fixed' | 'paid' | 'disputed';
  researcher: string; // Handle of the researcher/agent
  submittedAt: string;
  resolvedAt?: string;
  category: string;
  tags: string[];
}

// Molt - A researcher/agent profile and performance unit
export interface Molt {
  id: string;
  handle: string;
  displayName: string;
  type: 'human' | 'agent' | 'hybrid';
  avatar?: string;
  earnings: number; // Total earnings as number
  findings: number; // Total findings count
  criticalCount: number;
  highCount: number;
  mediumCount: number;
  lowCount: number;
  streakDays: number;
  rank: number;
  joinedAt: string;
  specialization: string[];
  chains: string[];
  languages: string[];
  bio?: string;
  verified: boolean;
}

// Agent - Specialized security scanning agent
export interface Agent {
  id: string;
  name: string;
  handle: string;
  type: 'static' | 'dynamic' | 'hybrid' | 'ai';
  status: 'active' | 'idle' | 'training' | 'paused';
  protocols: string[]; // Protocol IDs being monitored
  findingsGenerated: number;
  falsePositiveRate: number; // 0-100
  lastRun: string;
  capabilities: string[];
  earnings: number;
  reputation: number; // 0-100
  model?: string; // AI model name if applicable
  version: string;
}

// Competition - Time-boxed audit competition
export interface Competition {
  id: string;
  name: string;
  description: string;
  protocolId: string;
  protocolName: string;
  prizePool: number; // Monetary value as number
  startTime: string;
  endTime: string;
  status: 'upcoming' | 'active' | 'judging' | 'completed';
  participants: number;
  submissions: number;
  findings: number;
  tags: string[];
  scope: string[];
  leaderboard?: CompetitionLeaderboardEntry[];
}

export interface CompetitionLeaderboardEntry {
  rank: number;
  handle: string;
  findings: number;
  reward: number;
}

// Vault - Onchain escrow for bounty payments
export interface Vault {
  id: string;
  address: string;
  protocolId: string;
  protocolName: string;
  chain: string;
  tvl: number; // Total value locked as number
  totalPaid: number;
  totalFindings: number;
  status: 'active' | 'paused' | 'drained';
  createdAt: string;
  lastPayoutAt?: string;
  asset: string; // Token symbol
}

// Feature description for platform marketing
export interface PlatformFeature {
  icon: string;
  name: string;
  desc: string;
  tag: string;
}

// Category stats
export interface Category {
  name: string;
  count: number;
}

// Recent finding summary
export interface RecentFinding {
  severity: 'critical' | 'high' | 'medium' | 'low';
  text: string;
  time: string;
}
