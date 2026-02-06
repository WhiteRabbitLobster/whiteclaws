export interface Competition {
  id: string;
  title: string;
  protocol: string;
  protocolIcon: string;
  protocolSlug: string;
  prizePool: number;
  startDate: string;
  endDate: string;
  participantCount: number;
  status: 'Active' | 'Upcoming' | 'Completed';
  chain: string;
  scope: ScopeItem[];
  participants: Participant[];
  findingsCount: number;
  paidOut: number;
}

export interface ScopeItem {
  type: 'contract' | 'github';
  name: string;
  address?: string;
  url?: string;
}

export interface Participant {
  handle: string;
  avatar?: string;
  findings: number;
  country?: string;
}

export const mockCompetitions: Competition[] = [
  {
    id: 'pinto-amo-audit-2026',
    title: 'Pinto AMO Security Audit',
    protocol: 'Pinto Protocol',
    protocolIcon: 'P',
    protocolSlug: 'pinto',
    prizePool: 100000,
    startDate: '2026-01-15T00:00:00Z',
    endDate: '2026-02-15T23:59:59Z',
    participantCount: 127,
    status: 'Active',
    chain: 'Base',
    scope: [
      { type: 'contract', name: 'PintoAMO.sol', address: '0x1234...5678' },
      { type: 'contract', name: 'StabilityModule.sol', address: '0xabcd...efgh' },
      { type: 'github', name: 'pinto/protocol-v1', url: 'https://github.com/pinto/protocol-v1' },
    ],
    participants: [
      { handle: 'pwned_admin', findings: 3, country: 'US' },
      { handle: '0xshadow', findings: 2, country: 'GB' },
      { handle: 'reentrancy_queen', findings: 4, country: 'DE' },
      { handle: 'defi_doctor', findings: 1, country: 'FR' },
      { handle: 'flash_loan_fury', findings: 2, country: 'JP' },
    ],
    findingsCount: 12,
    paidOut: 0,
  },
  {
    id: 'ssv-dvt-audit-2026',
    title: 'SSV DVT Core Audit',
    protocol: 'SSV Network',
    protocolIcon: 'S',
    protocolSlug: 'ssv-network',
    prizePool: 500000,
    startDate: '2026-01-20T00:00:00Z',
    endDate: '2026-02-20T23:59:59Z',
    participantCount: 203,
    status: 'Active',
    chain: 'Ethereum',
    scope: [
      { type: 'contract', name: 'SSVNetwork.sol', address: '0xDD9B...4E1' },
      { type: 'contract', name: 'SSVClusters.sol', address: '0x5678...9abc' },
      { type: 'github', name: 'ssv-network/core', url: 'https://github.com/ssv-network/core' },
    ],
    participants: [
      { handle: 'bytecode_bandit', findings: 5, country: 'CA' },
      { handle: 'slither_sensei', findings: 3, country: 'AU' },
      { handle: 'mythril_monk', findings: 2, country: 'NL' },
      { handle: 'oracle_oracle', findings: 4, country: 'SG' },
      { handle: 'gas_goblin', findings: 1, country: 'KR' },
    ],
    findingsCount: 18,
    paidOut: 0,
  },
  {
    id: 'layerzero-v2-audit-2026',
    title: 'LayerZero V2 Protocol Audit',
    protocol: 'LayerZero',
    protocolIcon: 'LZ',
    protocolSlug: 'layerzero',
    prizePool: 2500000,
    startDate: '2026-02-01T00:00:00Z',
    endDate: '2026-03-01T23:59:59Z',
    participantCount: 89,
    status: 'Upcoming',
    chain: 'Multi-chain',
    scope: [
      { type: 'contract', name: 'EndpointV2.sol', address: '0x...' },
      { type: 'contract', name: 'MessageLib.sol', address: '0x...' },
      { type: 'github', name: 'LayerZero-Labs/protocol', url: 'https://github.com/LayerZero-Labs/protocol' },
    ],
    participants: [],
    findingsCount: 0,
    paidOut: 0,
  },
  {
    id: 'uniswap-v4-audit-2026',
    title: 'Uniswap V4 Hooks Audit',
    protocol: 'Uniswap',
    protocolIcon: 'U',
    protocolSlug: 'uniswap',
    prizePool: 1500000,
    startDate: '2026-02-10T00:00:00Z',
    endDate: '2026-03-10T23:59:59Z',
    participantCount: 156,
    status: 'Upcoming',
    chain: 'Ethereum',
    scope: [
      { type: 'contract', name: 'PoolManager.sol', address: '0x...' },
      { type: 'contract', name: 'Hooks.sol', address: '0x...' },
      { type: 'github', name: 'Uniswap/v4-core', url: 'https://github.com/Uniswap/v4-core' },
    ],
    participants: [],
    findingsCount: 0,
    paidOut: 0,
  },
  {
    id: 'alchemix-v2-audit-2025',
    title: 'Alchemix V2 Yield Strategies',
    protocol: 'Alchemix',
    protocolIcon: 'A',
    protocolSlug: 'alchemix',
    prizePool: 300000,
    startDate: '2025-11-01T00:00:00Z',
    endDate: '2025-12-01T23:59:59Z',
    participantCount: 94,
    status: 'Completed',
    chain: 'Ethereum',
    scope: [
      { type: 'contract', name: 'AlchemistV2.sol', address: '0x...' },
      { type: 'contract', name: 'Transmuter.sol', address: '0x...' },
    ],
    participants: [
      { handle: 'flash_loan_fury', findings: 2, country: 'JP' },
      { handle: 'bytecode_bandit', findings: 1, country: 'CA' },
      { handle: 'claw_hunter', findings: 3, country: 'US' },
    ],
    findingsCount: 6,
    paidOut: 145000,
  },
  {
    id: 'ens-governance-audit-2025',
    title: 'ENS Governor Upgrade Audit',
    protocol: 'ENS',
    protocolIcon: 'E',
    protocolSlug: 'ens',
    prizePool: 250000,
    startDate: '2025-10-15T00:00:00Z',
    endDate: '2025-11-15T23:59:59Z',
    participantCount: 67,
    status: 'Completed',
    chain: 'Ethereum',
    scope: [
      { type: 'contract', name: 'ENSGovernor.sol', address: '0x...' },
      { type: 'contract', name: 'TimelockController.sol', address: '0x...' },
    ],
    participants: [
      { handle: 'reentrancy_queen', findings: 1, country: 'DE' },
      { handle: 'defi_doctor', findings: 2, country: 'FR' },
    ],
    findingsCount: 3,
    paidOut: 85000,
  },
];

// Helper functions
export function formatTimeRemaining(endDate: string): { text: string; isUrgent: boolean } {
  const end = new Date(endDate);
  const now = new Date();
  const diffMs = end.getTime() - now.getTime();

  if (diffMs <= 0) return { text: 'Ended', isUrgent: false };

  const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));

  if (days > 0) {
    return { text: `${days}d ${hours}h ${minutes}m`, isUrgent: days < 3 };
  }
  return { text: `${hours}h ${minutes}m`, isUrgent: true };
}

export function formatDateRange(startDate: string, endDate: string): string {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return `${formatDate(start)} – ${formatDate(end)}`;
}
