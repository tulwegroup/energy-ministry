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
  procurements: Array<{
    id: string
    title: string
    agency: string
    category: string
    value: number
    status: string
    riskLevel: string
    createdAt: string
  }>
  contracts: Array<{
    id: string
    title: string
    agency: string
    contractor: string
    value: number
    status: string
    startDate: string
    endDate: string
  }>
  financialReports: Array<{
    id: string
    agency: string
    period: string
    totalRevenue: number
    totalExpenses: number
    netIncome: number
    totalAssets: number
    totalLiabilities: number
    year: number
  }>
  assets: Array<{
    id: string
    name: string
    agency: string
    category: string
    value: number
    status: string
    condition: string
  }>
  liabilities: Array<{
    id: string
    name: string
    agency: string
    category: string
    amount: number
    status: string
    dueDate: string
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
      totalRevenue: '₵4.2B',
      subsidies: '₵680M',
      receivables: '₵1.8B',
      liabilities: '₵1.2B',
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
      { id: 'gnpc', name: 'GNPC', performance: 92, compliance: 95, lastUpdated: SERVER_TIMESTAMP, metrics: { production: '145.8 kboepd', revenue: '₵5.8B', reserves: '1.2B barrels', uptime: '96.8%' } },
      { id: 'npa', name: 'NPA', performance: 88, compliance: 92, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '87.4%', revenue: '₵380M', cases: '1,245 resolved' } },
      { id: 'goil', name: 'GOIL & OMCs', performance: 85, compliance: 89, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '83.2%', revenue: '₵2.1B', stations: '382 outlets' } },
      { id: 'ecg', name: 'ECG', performance: 78, compliance: 84, lastUpdated: SERVER_TIMESTAMP, metrics: { losses: '22.8%', collection: '82.4%', revenue: '₵5.2B', customers: '3.2M' } },
      { id: 'gridco', name: 'GRIDCo', performance: 94, compliance: 97, lastUpdated: SERVER_TIMESTAMP, metrics: { reliability: '98.6%', frequency: '50.01 Hz', revenue: '₵2.8B', coverage: '98.2%' } },
      { id: 'vra', name: 'VRA & IPPs', performance: 89, compliance: 92, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '88.3%', generation: '2,847 MW', revenue: '₵3.8B', capacity: '87.6%' } },
      { id: 'bost', name: 'BOST', performance: 82, compliance: 87, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '81.5%', storage: '450M liters', revenue: '₵1.65B', coverage: '92.4%' } },
      { id: 'purc', name: 'PURC', performance: 87, compliance: 93, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '86.1%', decisions: '48 rulings', revenue: '₵125M', compliance: '94.2%' } },
      { id: 'epa', name: 'EPA', performance: 89, compliance: 91, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '87.3%', inspections: '2,847', revenue: '₵85M', compliance: '89.7%' } }
    ],
    procurements: [
      { id: 'proc-1', title: 'Emergency Power Transformers', agency: 'ECG', category: 'Equipment', value: 12500000, status: 'In Progress', riskLevel: 'Medium', createdAt: '2024-01-15T10:00:00Z' },
      { id: 'proc-2', title: 'Smart Metering System', agency: 'ECG', category: 'Technology', value: 28500000, status: 'Approved', riskLevel: 'Low', createdAt: '2024-01-10T14:30:00Z' },
      { id: 'proc-3', title: 'Gas Turbine Maintenance', agency: 'VRA', category: 'Services', value: 18200000, status: 'Completed', riskLevel: 'Low', createdAt: '2024-01-05T09:15:00Z' },
      { id: 'proc-4', title: 'Transmission Line Materials', agency: 'GRIDCo', category: 'Materials', value: 45600000, status: 'Pending', riskLevel: 'High', createdAt: '2024-01-12T16:45:00Z' },
      { id: 'proc-5', title: 'Fuel Supply Contract', agency: 'BOST', category: 'Supply', value: 85000000, status: 'In Progress', riskLevel: 'Medium', createdAt: '2024-01-08T11:20:00Z' },
      { id: 'proc-6', title: 'Environmental Consulting', agency: 'EPA', category: 'Services', value: 8200000, status: 'Approved', riskLevel: 'Low', createdAt: '2024-01-14T13:10:00Z' },
      { id: 'proc-7', title: 'Substation Equipment', agency: 'GRIDCo', category: 'Equipment', value: 32400000, status: 'Evaluated', riskLevel: 'Medium', createdAt: '2024-01-16T09:30:00Z' },
      { id: 'proc-8', title: 'Solar Panel Installation', agency: 'VRA', category: 'Renewable', value: 67500000, status: 'Tender', riskLevel: 'Low', createdAt: '2024-01-17T14:20:00Z' },
      { id: 'proc-9', title: 'Pipeline Maintenance', agency: 'GNPC', category: 'Services', value: 42800000, status: 'In Progress', riskLevel: 'High', createdAt: '2024-01-18T11:45:00Z' },
      { id: 'proc-10', title: 'IT Infrastructure Upgrade', agency: 'PURC', category: 'Technology', value: 15600000, status: 'Approved', riskLevel: 'Low', createdAt: '2024-01-19T13:30:00Z' }
    ],
    contracts: [
      { id: 'cont-1', title: 'Kumasi Power Plant Construction', agency: 'VRA', contractor: 'Siemens Energy', value: 285000000, status: 'Active', startDate: '2023-06-01', endDate: '2025-12-31' },
      { id: 'cont-2', title: 'Smart Grid Implementation', agency: 'ECG', contractor: 'Huawei Technologies', value: 467000000, status: 'Active', startDate: '2023-09-01', endDate: '2026-08-31' },
      { id: 'cont-3', title: 'Transmission Line Upgrade', agency: 'GRIDCo', contractor: 'ABB Ltd', value: 182000000, status: 'Active', startDate: '2023-03-01', endDate: '2024-12-31' },
      { id: 'cont-4', title: 'Fuel Supply Agreement', agency: 'GNPC', contractor: 'Shell Ghana', value: 820000000, status: 'Active', startDate: '2023-01-01', endDate: '2027-12-31' },
      { id: 'cont-5', title: 'Maintenance Services', agency: 'BOST', contractor: 'Local Engineering Ltd', value: 48500000, status: 'Completed', startDate: '2023-01-01', endDate: '2023-12-31' },
      { id: 'cont-6', title: 'Renewable Energy Project', agency: 'VRA', contractor: 'First Solar', value: 325000000, status: 'Active', startDate: '2023-04-01', endDate: '2025-06-30' },
      { id: 'cont-7', title: 'Pipeline Construction', agency: 'GNPC', contractor: 'China Petroleum', value: 542000000, status: 'Active', startDate: '2023-02-01', endDate: '2026-03-31' },
      { id: 'cont-8', title: 'Substation Development', agency: 'GRIDCo', contractor: 'GE Power', value: 128000000, status: 'Active', startDate: '2023-07-01', endDate: '2025-09-30' }
    ],
    financialReports: [
      { id: 'fin-1', agency: 'ECG', period: 'Quarterly', totalRevenue: 5200000000, totalExpenses: 4100000000, netIncome: 1100000000, totalAssets: 12500000000, totalLiabilities: 3200000000, year: 2024 },
      { id: 'fin-2', agency: 'VRA', period: 'Quarterly', totalRevenue: 3800000000, totalExpenses: 2900000000, netIncome: 900000000, totalAssets: 9800000000, totalLiabilities: 2100000000, year: 2024 },
      { id: 'fin-3', agency: 'GRIDCo', period: 'Quarterly', totalRevenue: 2800000000, totalExpenses: 2100000000, netIncome: 700000000, totalAssets: 7200000000, totalLiabilities: 1500000000, year: 2024 },
      { id: 'fin-4', agency: 'GNPC', period: 'Quarterly', totalRevenue: 5800000000, totalExpenses: 4200000000, netIncome: 1600000000, totalAssets: 18500000000, totalLiabilities: 3800000000, year: 2024 },
      { id: 'fin-5', agency: 'BOST', period: 'Quarterly', totalRevenue: 1650000000, totalExpenses: 1280000000, netIncome: 370000000, totalAssets: 3800000000, totalLiabilities: 950000000, year: 2024 }
    ],
    assets: [
      { id: 'asset-1', name: 'Akosombo Hydro Plant', agency: 'VRA', category: 'Infrastructure', value: 850000000, status: 'Active', condition: 'Good' },
      { id: 'asset-2', name: 'Tema Thermal Plant', agency: 'VRA', category: 'Infrastructure', value: 420000000, status: 'Active', condition: 'Fair' },
      { id: 'asset-3', name: 'Pokuase Substation', agency: 'GRIDCo', category: 'Infrastructure', value: 68000000, status: 'Active', condition: 'Excellent' },
      { id: 'asset-4', name: 'Smart Metering System', agency: 'ECG', category: 'Technology', value: 45000000, status: 'Active', condition: 'Good' },
      { id: 'asset-5', name: 'Fuel Storage Tanks', agency: 'BOST', category: 'Infrastructure', value: 120000000, status: 'Active', condition: 'Good' },
      { id: 'asset-6', name: 'Jubilee Field Equipment', agency: 'GNPC', category: 'Equipment', value: 950000000, status: 'Active', condition: 'Excellent' }
    ],
    liabilities: [
      { id: 'liab-1', name: 'World Bank Loan', agency: 'ECG', category: 'Long Term', amount: 850000000, status: 'Current', dueDate: '2030-12-31' },
      { id: 'liab-2', name: 'Supplier Credit', agency: 'VRA', amount: 320000000, status: 'Current', dueDate: '2024-12-31' },
      { id: 'liab-3', name: 'Contractor Payments', agency: 'GRIDCo', amount: 180000000, status: 'Current', dueDate: '2024-06-30' },
      { id: 'liab-4', name: 'Bond Issue', agency: 'GNPC', amount: 1200000000, status: 'Current', dueDate: '2028-12-31' },
      { id: 'liab-5', name: 'Tax Obligations', agency: 'BOST', amount: 45000000, status: 'Overdue', dueDate: '2024-01-31' }
    ]
  }
}