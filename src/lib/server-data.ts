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
      totalRevenue: '₵12.8B',
      subsidies: '₵2.4B',
      receivables: '₵3.2B',
      liabilities: '₵2.8B',
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
      { id: 'gnpc', name: 'GNPC', performance: 94, compliance: 97, lastUpdated: SERVER_TIMESTAMP, metrics: { production: '178.5 kboepd', revenue: '₵8.2B', reserves: '1.8B barrels', uptime: '97.2%', profitMargin: '24.8%' } },
      { id: 'npa', name: 'NPA', performance: 91, compliance: 95, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '91.4%', revenue: '₵485M', cases: '1,847 resolved', costRecovery: '87.3%' } },
      { id: 'goil', name: 'GOIL & OMCs', performance: 88, compliance: 92, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '87.8%', revenue: '₵3.4B', stations: '425 outlets', marketShare: '32.6%' } },
      { id: 'ecg', name: 'ECG', performance: 82, compliance: 88, lastUpdated: SERVER_TIMESTAMP, metrics: { losses: '21.4%', collection: '86.2%', revenue: '₵7.8B', customers: '4.1M', debtRecovery: '72.4%' } },
      { id: 'gridco', name: 'GRIDCo', performance: 96, compliance: 98, lastUpdated: SERVER_TIMESTAMP, metrics: { reliability: '99.1%', frequency: '50.02 Hz', revenue: '₵4.2B', coverage: '99.3%', uptime: '99.7%' } },
      { id: 'vra', name: 'VRA & IPPs', performance: 91, compliance: 94, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '89.7%', generation: '3,247 MW', revenue: '₵5.8B', capacity: '91.2%', availability: '94.8%' } },
      { id: 'bost', name: 'BOST', performance: 86, compliance: 90, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '84.2%', storage: '680M liters', revenue: '₵2.4B', coverage: '96.8%', turnover: '₵8.2B' } },
      { id: 'purc', name: 'PURC', performance: 90, compliance: 96, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '88.9%', decisions: '67 rulings', revenue: '₵185M', compliance: '96.8%', casesResolved: '94.2%' } },
      { id: 'epa', name: 'EPA', performance: 92, compliance: 94, lastUpdated: SERVER_TIMESTAMP, metrics: { efficiency: '89.7%', inspections: '3,847', revenue: '₵125M', compliance: '92.4%', enforcement: '87.6%' } }
    ],
    procurements: [
      { id: 'proc-1', title: 'Emergency Power Transformers', agency: 'ECG', category: 'Equipment', value: 28500000, status: 'In Progress', riskLevel: 'Medium', createdAt: '2024-01-15T10:00:00Z' },
      { id: 'proc-2', title: 'Smart Metering System', agency: 'ECG', category: 'Technology', value: 68000000, status: 'Approved', riskLevel: 'Low', createdAt: '2024-01-10T14:30:00Z' },
      { id: 'proc-3', title: 'Gas Turbine Maintenance', agency: 'VRA', category: 'Services', value: 42000000, status: 'Completed', riskLevel: 'Low', createdAt: '2024-01-05T09:15:00Z' },
      { id: 'proc-4', title: 'Transmission Line Materials', agency: 'GRIDCo', category: 'Materials', value: 125000000, status: 'Pending', riskLevel: 'High', createdAt: '2024-01-12T16:45:00Z' },
      { id: 'proc-5', title: 'Fuel Supply Contract', agency: 'BOST', category: 'Supply', value: 185000000, status: 'In Progress', riskLevel: 'Medium', createdAt: '2024-01-08T11:20:00Z' },
      { id: 'proc-6', title: 'Environmental Consulting', agency: 'EPA', category: 'Services', value: 16800000, status: 'Approved', riskLevel: 'Low', createdAt: '2024-01-14T13:10:00Z' },
      { id: 'proc-7', title: 'Substation Equipment', agency: 'GRIDCo', category: 'Equipment', value: 82000000, status: 'Evaluated', riskLevel: 'Medium', createdAt: '2024-01-16T09:30:00Z' },
      { id: 'proc-8', title: 'Solar Panel Installation', agency: 'VRA', category: 'Renewable', value: 145000000, status: 'Tender', riskLevel: 'Low', createdAt: '2024-01-17T14:20:00Z' },
      { id: 'proc-9', title: 'Pipeline Maintenance', agency: 'GNPC', category: 'Services', value: 98000000, status: 'In Progress', riskLevel: 'High', createdAt: '2024-01-18T11:45:00Z' },
      { id: 'proc-10', title: 'IT Infrastructure Upgrade', agency: 'PURC', category: 'Technology', value: 38500000, status: 'Approved', riskLevel: 'Low', createdAt: '2024-01-19T13:30:00Z' },
      { id: 'proc-11', title: 'Fuel Transportation Services', agency: 'GOIL', category: 'Logistics', value: 68000000, status: 'In Progress', riskLevel: 'Medium', createdAt: '2024-01-20T09:15:00Z' },
      { id: 'proc-12', title: 'Power Plant Spare Parts', agency: 'VRA', category: 'Equipment', value: 52000000, status: 'Approved', riskLevel: 'Low', createdAt: '2024-01-21T14:45:00Z' },
      { id: 'proc-13', title: 'Security System Installation', agency: 'ECG', category: 'Security', value: 28500000, status: 'Evaluated', riskLevel: 'Medium', createdAt: '2024-01-22T10:30:00Z' },
      { id: 'proc-14', title: 'Environmental Impact Assessment', agency: 'EPA', category: 'Consulting', value: 42000000, status: 'In Progress', riskLevel: 'Low', createdAt: '2024-01-23T11:20:00Z' },
      { id: 'proc-15', title: 'Transmission Tower Construction', agency: 'GRIDCo', category: 'Infrastructure', value: 168000000, status: 'Tender', riskLevel: 'High', createdAt: '2024-01-24T13:45:00Z' }
    ],
    contracts: [
      { id: 'cont-1', title: 'Kumasi Power Plant Construction', agency: 'VRA', contractor: 'Siemens Energy', value: 685000000, status: 'Active', startDate: '2023-06-01', endDate: '2025-12-31' },
      { id: 'cont-2', title: 'Smart Grid Implementation', agency: 'ECG', contractor: 'Huawei Technologies', value: 820000000, status: 'Active', startDate: '2023-09-01', endDate: '2026-08-31' },
      { id: 'cont-3', title: 'Transmission Line Upgrade', agency: 'GRIDCo', contractor: 'ABB Ltd', value: 420000000, status: 'Active', startDate: '2023-03-01', endDate: '2024-12-31' },
      { id: 'cont-4', title: 'Fuel Supply Agreement', agency: 'GNPC', contractor: 'Shell Ghana', value: 1850000000, status: 'Active', startDate: '2023-01-01', endDate: '2027-12-31' },
      { id: 'cont-5', title: 'Maintenance Services', agency: 'BOST', contractor: 'Local Engineering Ltd', value: 125000000, status: 'Completed', startDate: '2023-01-01', endDate: '2023-12-31' },
      { id: 'cont-6', title: 'Renewable Energy Project', agency: 'VRA', contractor: 'First Solar', value: 680000000, status: 'Active', startDate: '2023-04-01', endDate: '2025-06-30' },
      { id: 'cont-7', title: 'Pipeline Construction', agency: 'GNPC', contractor: 'China Petroleum', value: 1280000000, status: 'Active', startDate: '2023-02-01', endDate: '2026-03-31' },
      { id: 'cont-8', title: 'Substation Development', agency: 'GRIDCo', contractor: 'GE Power', value: 285000000, status: 'Active', startDate: '2023-07-01', endDate: '2025-09-30' },
      { id: 'cont-9', title: 'Fuel Transportation', agency: 'GOIL', contractor: 'Logistics Ghana Ltd', value: 420000000, status: 'Active', startDate: '2023-05-01', endDate: '2026-05-31' },
      { id: 'cont-10', title: 'Environmental Monitoring', agency: 'EPA', contractor: 'EcoConsult Ltd', value: 85000000, status: 'Active', startDate: '2023-08-01', endDate: '2025-07-31' }
    ],
    financialReports: [
      { id: 'fin-1', agency: 'ECG', period: 'Quarterly', totalRevenue: 7800000000, totalExpenses: 6200000000, netIncome: 1600000000, totalAssets: 18500000000, totalLiabilities: 4800000000, year: 2024 },
      { id: 'fin-2', agency: 'VRA', period: 'Quarterly', totalRevenue: 5800000000, totalExpenses: 4200000000, netIncome: 1600000000, totalAssets: 12800000000, totalLiabilities: 3200000000, year: 2024 },
      { id: 'fin-3', agency: 'GRIDCo', period: 'Quarterly', totalRevenue: 4200000000, totalExpenses: 3100000000, netIncome: 1100000000, totalAssets: 9800000000, totalLiabilities: 2100000000, year: 2024 },
      { id: 'fin-4', agency: 'GNPC', period: 'Quarterly', totalRevenue: 8200000000, totalExpenses: 5800000000, netIncome: 2400000000, totalAssets: 24500000000, totalLiabilities: 5200000000, year: 2024 },
      { id: 'fin-5', agency: 'BOST', period: 'Quarterly', totalRevenue: 2400000000, totalExpenses: 1850000000, netIncome: 550000000, totalAssets: 5800000000, totalLiabilities: 1450000000, year: 2024 },
      { id: 'fin-6', agency: 'GOIL', period: 'Quarterly', totalRevenue: 3400000000, totalExpenses: 2850000000, netIncome: 550000000, totalAssets: 8200000000, totalLiabilities: 2100000000, year: 2024 },
      { id: 'fin-7', agency: 'NPA', period: 'Quarterly', totalRevenue: 485000000, totalExpenses: 385000000, netIncome: 100000000, totalAssets: 1200000000, totalLiabilities: 280000000, year: 2024 },
      { id: 'fin-8', agency: 'PURC', period: 'Quarterly', totalRevenue: 185000000, totalExpenses: 145000000, netIncome: 40000000, totalAssets: 480000000, totalLiabilities: 85000000, year: 2024 },
      { id: 'fin-9', agency: 'EPA', period: 'Quarterly', totalRevenue: 125000000, totalExpenses: 98000000, netIncome: 27000000, totalAssets: 320000000, totalLiabilities: 65000000, year: 2024 }
    ],
    assets: [
      { id: 'asset-1', name: 'Akosombo Hydro Plant', agency: 'VRA', category: 'Infrastructure', value: 1850000000, status: 'Active', condition: 'Good' },
      { id: 'asset-2', name: 'Tema Thermal Plant', agency: 'VRA', category: 'Infrastructure', value: 820000000, status: 'Active', condition: 'Fair' },
      { id: 'asset-3', name: 'Pokuase Substation', agency: 'GRIDCo', category: 'Infrastructure', value: 168000000, status: 'Active', condition: 'Excellent' },
      { id: 'asset-4', name: 'Smart Metering System', agency: 'ECG', category: 'Technology', value: 285000000, status: 'Active', condition: 'Good' },
      { id: 'asset-5', name: 'Fuel Storage Tanks', agency: 'BOST', category: 'Infrastructure', value: 420000000, status: 'Active', condition: 'Good' },
      { id: 'asset-6', name: 'Jubilee Field Equipment', agency: 'GNPC', category: 'Equipment', value: 2850000000, status: 'Active', condition: 'Excellent' },
      { id: 'asset-7', name: 'Kumasi Power Plant', agency: 'VRA', category: 'Infrastructure', value: 680000000, status: 'Active', condition: 'Good' },
      { id: 'asset-8', name: 'Transmission Network', agency: 'GRIDCo', category: 'Infrastructure', value: 3200000000, status: 'Active', condition: 'Good' }
    ],
    liabilities: [
      { id: 'liab-1', name: 'World Bank Loan', agency: 'ECG', category: 'Long Term', amount: 1850000000, status: 'Current', dueDate: '2030-12-31' },
      { id: 'liab-2', name: 'Supplier Credit', agency: 'VRA', amount: 680000000, status: 'Current', dueDate: '2024-12-31' },
      { id: 'liab-3', name: 'Contractor Payments', agency: 'GRIDCo', amount: 420000000, status: 'Current', dueDate: '2024-06-30' },
      { id: 'liab-4', name: 'Bond Issue', agency: 'GNPC', amount: 2850000000, status: 'Current', dueDate: '2028-12-31' },
      { id: 'liab-5', name: 'Tax Obligations', agency: 'BOST', amount: 125000000, status: 'Overdue', dueDate: '2024-01-31' },
      { id: 'liab-6', name: 'Trade Payables', agency: 'GOIL', amount: 480000000, status: 'Current', dueDate: '2024-03-31' },
      { id: 'liab-7', name: 'Short-term Loans', agency: 'NPA', amount: 85000000, status: 'Current', dueDate: '2024-09-30' }
    ]
  }
}