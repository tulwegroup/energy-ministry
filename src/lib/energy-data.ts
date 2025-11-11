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
    { title: 'Total Power Generation', baseValue: 3200, unit: 'MW', demandBase: 3100 },
    { title: 'Fuel Stock Cover', baseValue: 12.3, unit: ' days' },
    { title: 'Gas Flow & Supply', baseValue: 120, unit: ' MMscfd' },
    { title: 'Transmission Reliability', baseValue: 95.8, unit: '%' },
    { title: 'Distribution Efficiency', baseValue: 68.5, unit: '%' },
    { title: 'Energy Security Index', baseValue: 74.2, unit: '' }
  ]

  return baseMetrics.map((metric, index) => {
    // Add realistic variations
    const variation = (Math.random() - 0.5) * 0.1 // ±5% variation
    const value = metric.baseValue * (1 + variation)
    const changePercent = ((Math.random() - 0.5) * 10).toFixed(1) // ±5% change
    const change = changePercent.startsWith('-') ? changePercent : `+${changePercent}`

    // Determine status based on value ranges
    let status: 'healthy' | 'warning' | 'critical' = 'healthy'
    if (metric.title === 'Distribution Efficiency' && value < 65) status = 'critical'
    else if (metric.title === 'Distribution Efficiency' && value < 72) status = 'warning'
    else if (metric.title === 'Fuel Stock Cover' && value < 10) status = 'critical'
    else if (metric.title === 'Fuel Stock Cover' && value < 15) status = 'warning'
    else if (metric.title === 'Energy Security Index' && value < 70) status = 'critical'
    else if (metric.title === 'Energy Security Index' && value < 78) status = 'warning'

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
  
  const baseRevenue = 2100 // ₵M (reduced from 2800M)
  const baseSubsidies = 680 // ₵M (increased from 420M)
  const baseReceivables = 1850 // ₵M (increased from 1200M)
  const baseLiabilities = 1420 // ₵M (increased from 890M to reflect inherited debts)

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
    { type: 'critical' as const, message: 'ECG accumulated debts exceed ₵2.1B - urgent tariff review needed', source: 'ECG' },
    { type: 'critical' as const, message: 'System losses at ECG reach 32.8% - highest in West Africa', source: 'ECG' },
    { type: 'warning' as const, message: 'Gas supply shortfall from Nigeria affecting 450MW generation', source: 'GNPC' },
    { type: 'warning' as const, message: 'Currency depreciation increasing fuel costs by 18% QoQ', source: 'BOST' },
    { type: 'critical' as const, message: 'Major transmission line collapse affecting Northern Ghana', source: 'GRIDCo' },
    { type: 'info' as const, message: 'Renewable energy contribution stagnant at 3% of total mix', source: 'VRA' },
    { type: 'warning' as const, message: 'Collection rate at ECG drops to 68% due to economic hardships', source: 'ECG' },
    { type: 'critical' as const, message: 'Inherited debts from previous administration total ₵5.2B across sector', source: 'Ministry' }
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
    { name: 'Pokuase Bulk Supply Point (AfDB Funded)', baseCost: 65, baseProgress: 78 },
    { name: 'Kumasi 330kV Substation (World Bank)', baseCost: 52, baseProgress: 65 },
    { name: 'Takoradi Thermal Plant Phase 2', baseCost: 380, baseProgress: 45 },
    { name: 'Tema-Accra Transmission Line Upgrade', baseCost: 95, baseProgress: 52 },
    { name: 'Bui Dam Hydro Expansion', baseCost: 420, baseProgress: 38 },
    { name: 'ECG Smart Metering Project', baseCost: 280, baseProgress: 25 },
    { name: 'CENIT Power Plant (150MW)', baseCost: 180, baseProgress: 88 },
    { name: 'Karpowership Ghana (450MW)', baseCost: 220, baseProgress: 92 }
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
    { id: 'gnpc', name: 'GNPC', basePerformance: 82, baseCompliance: 88 },
    { id: 'npa', name: 'NPA', basePerformance: 78, baseCompliance: 85 },
    { id: 'goil', name: 'GOIL & OMCs', basePerformance: 75, baseCompliance: 82 },
    { id: 'ecg', name: 'ECG', basePerformance: 58, baseCompliance: 65 },
    { id: 'gridco', name: 'GRIDCo', basePerformance: 86, baseCompliance: 90 },
    { id: 'vra', name: 'VRA & IPPs', basePerformance: 79, baseCompliance: 84 },
    { id: 'bost', name: 'BOST', basePerformance: 71, baseCompliance: 78 },
    { id: 'purc', name: 'PURC', basePerformance: 81, baseCompliance: 88 },
    { id: 'epa', name: 'EPA', basePerformance: 83, baseCompliance: 86 }
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
        metrics.production = `${(Math.random() * 30 + 70).toFixed(1)} kboepd`
        metrics.uptime = `${(Math.random() * 8 + 85).toFixed(1)}%`
        metrics.debt = `₵${(Math.random() * 200 + 600).toFixed(0)}M`
        break
      case 'ecg':
        metrics.losses = `${(Math.random() * 8 + 28).toFixed(1)}%` // 28-36% range
        metrics.collection = `${(Math.random() * 10 + 62).toFixed(1)}%` // 62-72% range
        metrics.debt = `₵${(Math.random() * 800 + 1500).toFixed(0)}M` // ₵1.5-2.3B
        metrics.customers = `${(Math.random() * 0.5 + 4.3).toFixed(1)}M`
        break
      case 'gridco':
        metrics.reliability = `${(Math.random() * 5 + 92).toFixed(1)}%`
        metrics.frequency = `${(50 + (Math.random() - 0.5) * 0.4).toFixed(2)} Hz`
        metrics.losses = `${(Math.random() * 3 + 4.5).toFixed(1)}%`
        break
      case 'vra':
        metrics.generation = `${(Math.random() * 800 + 1400).toFixed(0)} MW`
        metrics.thermal = `${(Math.random() * 400 + 800).toFixed(0)} MW`
        metrics.hydro = `${(Math.random() * 200 + 400).toFixed(0)} MW`
        break
      case 'bost':
        metrics.fuelCover = `${(Math.random() * 8 + 8).toFixed(1)} days`
        metrics.depotCapacity = `${(Math.random() * 200 + 400).toFixed(0)} million litres`
        break
      default:
        metrics.efficiency = `${(Math.random() * 20 + 65).toFixed(1)}%`
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