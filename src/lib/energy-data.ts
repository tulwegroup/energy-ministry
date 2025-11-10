// Mock data service for the National Energy Command & Insights Dashboard

export interface EnergyMetric {
  title: string
  value: string
  demand?: string
  status: 'healthy' | 'warning' | 'critical'
  change: string
  timestamp: Date
}

export interface FinancialData {
  totalRevenue: string
  subsidies: string
  receivables: string
  liabilities: string
  lastUpdated: Date
}

export interface Alert {
  id: string
  type: 'critical' | 'warning' | 'info'
  message: string
  timestamp: Date
  source: string
  acknowledged: boolean
}

export interface Project {
  id: string
  name: string
  progress: number
  cost: string
  variance: string
  status: 'on-track' | 'delayed' | 'at-risk'
  lastUpdated: Date
}

export interface AgencyData {
  id: string
  name: string
  performance: number
  compliance: number
  lastUpdated: Date
  metrics: Record<string, number | string>
}

// Generate mock energy metrics with realistic variations - ONLY CALL ON CLIENT
export function generateEnergyMetrics(): EnergyMetric[] {
  if (typeof window === 'undefined') {
    // Return empty array on server side
    return []
  }
  
  const baseMetrics = [
    { title: 'Total Power Generation', baseValue: 3847, unit: 'MW', demandBase: 3650 },
    { title: 'Fuel Stock Cover', baseValue: 18.5, unit: ' days' },
    { title: 'Gas Flow & Supply', baseValue: 145, unit: ' MMscfd' },
    { title: 'Transmission Reliability', baseValue: 98.2, unit: '%' },
    { title: 'Distribution Efficiency', baseValue: 76.8, unit: '%' },
    { title: 'Energy Security Index', baseValue: 82.4, unit: '' }
  ]

  return baseMetrics.map((metric, index) => {
    // Add realistic variations
    const variation = (Math.random() - 0.5) * 0.1 // ±5% variation
    const value = metric.baseValue * (1 + variation)
    const changePercent = ((Math.random() - 0.5) * 10).toFixed(1) // ±5% change
    const change = changePercent.startsWith('-') ? changePercent : `+${changePercent}`

    // Determine status based on value ranges
    let status: 'healthy' | 'warning' | 'critical' = 'healthy'
    if (metric.title === 'Distribution Efficiency' && value < 75) status = 'critical'
    else if (metric.title === 'Distribution Efficiency' && value < 80) status = 'warning'
    else if (metric.title === 'Fuel Stock Cover' && value < 15) status = 'critical'
    else if (metric.title === 'Fuel Stock Cover' && value < 20) status = 'warning'
    else if (metric.title === 'Energy Security Index' && value < 75) status = 'critical'
    else if (metric.title === 'Energy Security Index' && value < 85) status = 'warning'

    return {
      title: metric.title,
      value: `${value.toFixed(1)}${metric.unit}`,
      demand: metric.demandBase ? `${(metric.demandBase * (1 + variation)).toFixed(0)} MW` : undefined,
      status,
      change: `${change}%`,
      timestamp: new Date()
    }
  })
}

// Generate mock financial data - ONLY CALL ON CLIENT
export function generateFinancialData(): FinancialData {
  if (typeof window === 'undefined') {
    // Return default data on server side
    return {
      totalRevenue: '₵0M',
      subsidies: '₵0M',
      receivables: '₵0M',
      liabilities: '₵0M',
      lastUpdated: new Date()
    }
  }
  
  const baseRevenue = 2800 // ₵M
  const baseSubsidies = 420 // ₵M
  const baseReceivables = 1200 // ₵M
  const baseLiabilities = 890 // ₵M

  const variation = (Math.random() - 0.5) * 0.05 // ±2.5% variation

  return {
    totalRevenue: `₵${(baseRevenue * (1 + variation)).toFixed(0)}M`,
    subsidies: `₵${(baseSubsidies * (1 + variation)).toFixed(0)}M`,
    receivables: `₵${(baseReceivables * (1 + variation)).toFixed(0)}M`,
    liabilities: `₵${(baseLiabilities * (1 + variation)).toFixed(0)}M`,
    lastUpdated: new Date()
  }
}

// Generate mock alerts - ONLY CALL ON CLIENT
export function generateAlerts(): Alert[] {
  if (typeof window === 'undefined') {
    // Return empty array on server side
    return []
  }
  
  const alertTemplates = [
    { type: 'critical' as const, message: 'Critical gas shortfall risk expected in Western Region', source: 'GNPC' },
    { type: 'warning' as const, message: 'ECG losses rising in Ashanti Region - 24.5% AT&C losses', source: 'ECG' },
    { type: 'info' as const, message: 'GRIDCo maintenance scheduled for Tema-Accra corridor', source: 'GRIDCo' },
    { type: 'warning' as const, message: 'Fuel stock levels below 15 days in Northern depots', source: 'BOST' },
    { type: 'critical' as const, message: 'System frequency instability detected in Eastern corridor', source: 'GRIDCo' },
    { type: 'info' as const, message: 'Renewable energy generation peaks at 28% of total mix', source: 'VRA' }
  ]

  // Return 2-4 random alerts
  const numAlerts = Math.floor(Math.random() * 3) + 2
  const selectedAlerts = alertTemplates.sort(() => 0.5 - Math.random()).slice(0, numAlerts)

  return selectedAlerts.map((alert, index) => ({
    id: `alert-${Date.now()}-${index}`,
    type: alert.type,
    message: alert.message,
    source: alert.source,
    timestamp: new Date(Date.now() - Math.random() * 3600000), // Within last hour
    acknowledged: Math.random() > 0.7 // 30% chance of being acknowledged
  }))
}

// Generate mock project data - ONLY CALL ON CLIENT
export function generateProjects(): Project[] {
  if (typeof window === 'undefined') {
    // Return empty array on server side
    return []
  }
  
  const projectTemplates = [
    { name: 'Pokuase Bulk Supply Point', baseCost: 45, baseProgress: 85 },
    { name: 'Kumasi 330kV Substation', baseCost: 38, baseProgress: 72 },
    { name: 'Takoradi Thermal Expansion', baseCost: 67, baseProgress: 91 },
    { name: 'Tema-Accra Transmission Upgrade', baseCost: 52, baseProgress: 60 },
    { name: 'Sunyani Power Plant', baseCost: 29, baseProgress: 70 },
    { name: 'Tamale Distribution Network', baseCost: 34, baseProgress: 45 }
  ]

  return projectTemplates.map((project, index) => {
    const progressVariation = (Math.random() - 0.5) * 10 // ±5% variation
    const progress = Math.max(0, Math.min(100, project.baseProgress + progressVariation))
    
    const costVariance = ((Math.random() - 0.5) * 20).toFixed(1) // ±10% variance
    const variance = costVariance.startsWith('-') ? costVariance : `+${costVariance}`

    // Determine status based on progress and variance
    let status: 'on-track' | 'delayed' | 'at-risk' = 'on-track'
    if (progress < 50) status = 'at-risk'
    else if (progress < 70 || Math.abs(parseFloat(costVariance)) > 10) status = 'delayed'

    return {
      id: `project-${index}`,
      name: project.name,
      progress: Math.round(progress),
      cost: `$${project.baseCost}M`,
      variance: `${variance}%`,
      status,
      lastUpdated: new Date()
    }
  })
}

// Generate mock agency data - ONLY CALL ON CLIENT
export function generateAgencyData(): AgencyData[] {
  if (typeof window === 'undefined') {
    // Return empty array on server side
    return []
  }
  
  const agencies = [
    { id: 'gnpc', name: 'GNPC', basePerformance: 88, baseCompliance: 92 },
    { id: 'npa', name: 'NPA', basePerformance: 85, baseCompliance: 89 },
    { id: 'goil', name: 'GOIL & OMCs', basePerformance: 82, baseCompliance: 87 },
    { id: 'ecg', name: 'ECG', basePerformance: 76, baseCompliance: 83 },
    { id: 'gridco', name: 'GRIDCo', basePerformance: 91, baseCompliance: 94 },
    { id: 'vra', name: 'VRA & IPPs', basePerformance: 87, baseCompliance: 90 },
    { id: 'bost', name: 'BOST', basePerformance: 79, baseCompliance: 85 },
    { id: 'purc', name: 'PURC', basePerformance: 84, baseCompliance: 91 },
    { id: 'epa', name: 'EPA', basePerformance: 86, baseCompliance: 88 }
  ]

  return agencies.map((agency) => {
    const performanceVariation = (Math.random() - 0.5) * 10
    const complianceVariation = (Math.random() - 0.5) * 8

    const performance = Math.max(0, Math.min(100, agency.basePerformance + performanceVariation))
    const compliance = Math.max(0, Math.min(100, agency.baseCompliance + complianceVariation))

    // Generate agency-specific metrics
    const metrics: Record<string, number | string> = {}
    switch (agency.id) {
      case 'gnpc':
        metrics.production = `${(Math.random() * 50 + 100).toFixed(1)} kboepd`
        metrics.uptime = `${(Math.random() * 5 + 92).toFixed(1)}%`
        break
      case 'ecg':
        metrics.losses = `${(Math.random() * 10 + 20).toFixed(1)}%`
        metrics.collection = `${(Math.random() * 15 + 75).toFixed(1)}%`
        break
      case 'gridco':
        metrics.reliability = `${(Math.random() * 3 + 96).toFixed(1)}%`
        metrics.frequency = `${(50 + (Math.random() - 0.5) * 0.2).toFixed(2)} Hz`
        break
      default:
        metrics.efficiency = `${(Math.random() * 20 + 70).toFixed(1)}%`
    }

    return {
      id: agency.id,
      name: agency.name,
      performance: Math.round(performance),
      compliance: Math.round(compliance),
      lastUpdated: new Date(),
      metrics
    }
  })
}

// Simulate real-time data updates
export class EnergyDataService {
  private listeners: Set<() => void> = new Set()
  private updateInterval: NodeJS.Timeout | null = null
  private data: any = null

  constructor() {
    // Only start real-time updates on client side
    if (typeof window !== 'undefined') {
      this.startRealTimeUpdates()
    }
  }

  subscribe(callback: () => void) {
    this.listeners.add(callback)
    return () => this.listeners.delete(callback)
  }

  private notify() {
    this.listeners.forEach(callback => callback())
  }

  startRealTimeUpdates() {
    // Update data every 30 seconds
    this.updateInterval = setInterval(() => {
      this.notify()
    }, 30000)
  }

  stopRealTimeUpdates() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval)
      this.updateInterval = null
    }
  }

  getCurrentData() {
    // Generate data if not cached or on client side
    if (!this.data || typeof window !== 'undefined') {
      this.data = {
        metrics: generateEnergyMetrics(),
        financial: generateFinancialData(),
        alerts: generateAlerts(),
        projects: generateProjects(),
        agencies: generateAgencyData(),
        lastUpdated: new Date()
      }
    }
    return this.data
  }
}

// Global instance - only create on client side
let globalEnergyDataService: EnergyDataService | null = null

export function getEnergyDataService() {
  if (!globalEnergyDataService && typeof window !== 'undefined') {
    globalEnergyDataService = new EnergyDataService()
  }
  return globalEnergyDataService
}