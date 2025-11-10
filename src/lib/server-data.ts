// Server-side data provider to avoid hydration issues
export interface ServerEnergyData {
  metrics: Array<{
    title: string
    value: string
    demand?: string
    status: 'healthy' | 'warning' | 'critical'
    change: string
    timestamp: string // ISO string for consistency
  }>
  financial: {
    totalRevenue: string
    subsidies: string
    receivables: string
    liabilities: string
    lastUpdated: string // ISO string for consistency
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    source: string
    acknowledged: boolean
    timestamp: string // ISO string for consistency
  }>
  projects: Array<{
    id: string
    name: string
    progress: number
    cost: string
    variance: string
    status: 'on-track' | 'delayed' | 'at-risk'
    lastUpdated: string // ISO string for consistency
  }>
  agencies: Array<{
    id: string
    name: string
    performance: number
    compliance: number
    lastUpdated: string // ISO string for consistency
    metrics: Record<string, number | string>
  }>
}

// Fixed timestamp for server-side consistency
export const SERVER_TIMESTAMP = '2024-01-01T00:00:00.000Z'

// Generate consistent server-side data
export function getServerEnergyData(): ServerEnergyData {
  return {
    metrics: [
      { title: 'Total Power Generation', value: '3,847 MW', demand: '3,650 MW', status: 'healthy' as const, change: '+2.3%', timestamp: SERVER_TIMESTAMP },
      { title: 'Fuel Stock Cover', value: '18.5 days', status: 'warning' as const, change: '-0.8%', timestamp: SERVER_TIMESTAMP },
      { title: 'Gas Flow & Supply', value: '145 MMscfd', status: 'healthy' as const, change: '+5.2%', timestamp: SERVER_TIMESTAMP },
      { title: 'Transmission Reliability', value: '98.2%', status: 'healthy' as const, change: '+0.3%', timestamp: SERVER_TIMESTAMP },
      { title: 'Distribution Efficiency', value: '76.8%', status: 'critical' as const, change: '-1.2%', timestamp: SERVER_TIMESTAMP },
      { title: 'Energy Security Index', value: '82.4', status: 'warning' as const, change: '-2.1%', timestamp: SERVER_TIMESTAMP }
    ],
    financial: {
      totalRevenue: '₵2.8B',
      subsidies: '₵420M',
      receivables: '₵1.2B',
      liabilities: '₵890M',
      lastUpdated: SERVER_TIMESTAMP
    },
    alerts: [
      { id: 'alert-1', type: 'critical' as const, message: 'Critical gas shortfall risk expected in Western Region', source: 'GNPC', acknowledged: false, timestamp: SERVER_TIMESTAMP },
      { id: 'alert-2', type: 'warning' as const, message: 'ECG losses rising in Ashanti Region - 24.5% AT&C losses', source: 'ECG', acknowledged: false, timestamp: SERVER_TIMESTAMP },
      { id: 'alert-3', type: 'info' as const, message: 'GRIDCo maintenance scheduled for Tema-Accra corridor', source: 'GRIDCo', acknowledged: false, timestamp: SERVER_TIMESTAMP }
    ],
    projects: [
      { id: 'project-1', name: 'Pokuase Bulk Supply Point', progress: 85, cost: '$45M', variance: '+5%', status: 'on-track' as const, lastUpdated: SERVER_TIMESTAMP },
      { id: 'project-2', name: 'Kumasi 330kV Substation', progress: 72, cost: '$38M', variance: '-2%', status: 'on-track' as const, lastUpdated: SERVER_TIMESTAMP },
      { id: 'project-3', name: 'Takoradi Thermal Expansion', progress: 91, cost: '$67M', variance: '+8%', status: 'on-track' as const, lastUpdated: SERVER_TIMESTAMP },
      { id: 'project-4', name: 'Tema-Accra Transmission Upgrade', progress: 60, cost: '$52M', variance: '-3%', status: 'delayed' as const, lastUpdated: SERVER_TIMESTAMP },
      { id: 'project-5', name: 'Sunyani Power Plant', progress: 70, cost: '$29M', variance: '+2%', status: 'on-track' as const, lastUpdated: SERVER_TIMESTAMP },
      { id: 'project-6', name: 'Tamale Distribution Network', progress: 45, cost: '$34M', variance: '-12%', status: 'at-risk' as const, lastUpdated: SERVER_TIMESTAMP }
    ],
    agencies: [
      { id: 'gnpc', name: 'GNPC', performance: 88, compliance: 92, lastUpdated: SERVER_TIMESTAMP, metrics: { production: '125.3 kboepd', uptime: '94.2%' } },
      { id: 'npa', name: 'NPA', performance: 85, compliance: 89, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '82.4%' } },
      { id: 'goil', name: 'GOIL & OMCs', performance: 82, compliance: 87, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '79.8%' } },
      { id: 'ecg', name: 'ECG', performance: 76, compliance: 83, lastUpdated: SERVER_TIMESTAMP, metrics: { losses: '24.5%', collection: '78.2%' } },
      { id: 'gridco', name: 'GRIDCo', performance: 91, compliance: 94, lastUpdated: SERVER_TIMESTAMP, metrics: { reliability: '97.8%', frequency: '50.02 Hz' } },
      { id: 'vra', name: 'VRA & IPPs', performance: 87, compliance: 90, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '85.6%' } },
      { id: 'bost', name: 'BOST', performance: 79, compliance: 85, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '77.3%' } },
      { id: 'purc', name: 'PURC', performance: 84, compliance: 91, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '83.1%' } },
      { id: 'epa', name: 'EPA', performance: 86, compliance: 88, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '84.7%' } }
    ]
  }
}