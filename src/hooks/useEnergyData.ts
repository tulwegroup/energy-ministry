'use client'

import { useState, useEffect } from 'react'
import { getEnergyDataService, EnergyMetric, FinancialData, Alert, Project, AgencyData } from '@/lib/energy-data'
import { getServerEnergyData, ServerEnergyData, SERVER_TIMESTAMP } from '@/lib/server-data'

export function useEnergyData() {
  const [metrics, setMetrics] = useState<EnergyMetric[]>([])
  const [financial, setFinancial] = useState<FinancialData | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [projects, setProjects] = useState<Project[]>([])
  const [agencies, setAgencies] = useState<AgencyData[]>([])
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [loading, setLoading] = useState(true)

  const updateData = () => {
    try {
      const service = getEnergyDataService()
      if (service) {
        const data = service.getCurrentData()
        setMetrics(data.metrics)
        setFinancial(data.financial)
        setAlerts(data.alerts)
        setProjects(data.projects)
        setAgencies(data.agencies)
        setLastUpdated(data.lastUpdated)
        setLoading(false)
      }
    } catch (error) {
      console.error('Error updating energy data:', error)
    }
  }

  useEffect(() => {
    // Initialize with server data to avoid hydration mismatch
    const serverData = getServerEnergyData()
    
    // Convert server data to client format
    const initialMetrics: EnergyMetric[] = serverData.metrics.map(m => ({
      ...m,
      timestamp: new Date(m.timestamp)
    }))
    
    const initialFinancial: FinancialData = {
      ...serverData.financial,
      lastUpdated: new Date(serverData.financial.lastUpdated)
    }
    
    const initialAlerts: Alert[] = serverData.alerts.map(a => ({
      ...a,
      timestamp: new Date(a.timestamp)
    }))
    
    const initialProjects: Project[] = serverData.projects.map(p => ({
      ...p,
      lastUpdated: new Date(p.lastUpdated)
    }))
    
    const initialAgencies: AgencyData[] = serverData.agencies.map(a => ({
      ...a,
      lastUpdated: new Date(a.lastUpdated)
    }))

    setMetrics(initialMetrics)
    setFinancial(initialFinancial)
    setAlerts(initialAlerts)
    setProjects(initialProjects)
    setAgencies(initialAgencies)
    setLastUpdated(new Date(serverData.metrics[0]?.timestamp || SERVER_TIMESTAMP))
    setLoading(false)

    // Subscribe to real-time updates
    const service = getEnergyDataService()
    if (service) {
      const unsubscribe = service.subscribe(updateData)

      // Cleanup on unmount
      return () => {
        unsubscribe()
      }
    }
  }, [])

  return {
    metrics,
    financial,
    alerts,
    projects,
    agencies,
    lastUpdated,
    loading,
    refresh: updateData
  }
}

// Hook for specific agency data
export function useAgencyData(agencyId: string) {
  const [agency, setAgency] = useState<AgencyData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const updateAgencyData = () => {
      try {
        const service = getEnergyDataService()
        if (service) {
          const data = service.getCurrentData()
          const agencyData = data.agencies.find(a => a.id === agencyId)
          setAgency(agencyData || null)
          setLoading(false)
        }
      } catch (error) {
        console.error('Error updating agency data:', error)
      }
    }

    // Initialize with server data
    const serverData = getServerEnergyData()
    const serverAgency = serverData.agencies.find(a => a.id === agencyId)
    if (serverAgency) {
      setAgency({
        ...serverAgency,
        lastUpdated: new Date(serverAgency.lastUpdated)
      })
      setLoading(false)
    }

    const service = getEnergyDataService()
    if (service) {
      const unsubscribe = service.subscribe(updateAgencyData)

      return () => unsubscribe()
    }
  }, [agencyId])

  return { agency, loading }
}

// Hook for alerts management
export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])

  useEffect(() => {
    // Initialize with server data
    const serverData = getServerEnergyData()
    const initialAlerts: Alert[] = serverData.alerts.map(a => ({
      ...a,
      timestamp: new Date(a.timestamp)
    }))
    setAlerts(initialAlerts)

    const updateAlerts = () => {
      try {
        const service = getEnergyDataService()
        if (service) {
          const data = service.getCurrentData()
          setAlerts(data.alerts)
        }
      } catch (error) {
        console.error('Error updating alerts:', error)
      }
    }

    const service = getEnergyDataService()
    if (service) {
      const unsubscribe = service.subscribe(updateAlerts)

      return () => unsubscribe()
    }
  }, [])

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ))
  }

  const dismissAlert = (alertId: string) => {
    setAlerts(prev => prev.filter(alert => alert.id !== alertId))
  }

  return {
    alerts,
    acknowledgeAlert,
    dismissAlert,
    criticalAlerts: alerts.filter(a => a.type === 'critical' && !a.acknowledged),
    warningAlerts: alerts.filter(a => a.type === 'warning' && !a.acknowledged),
    infoAlerts: alerts.filter(a => a.type === 'info' && !a.acknowledged)
  }
}

// Hook for projects tracking
export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    // Initialize with server data
    const serverData = getServerEnergyData()
    const initialProjects: Project[] = serverData.projects.map(p => ({
      ...p,
      lastUpdated: new Date(p.lastUpdated)
    }))
    setProjects(initialProjects)

    const updateProjects = () => {
      try {
        const service = getEnergyDataService()
        if (service) {
          const data = service.getCurrentData()
          setProjects(data.projects)
        }
      } catch (error) {
        console.error('Error updating projects:', error)
      }
    }

    const service = getEnergyDataService()
    if (service) {
      const unsubscribe = service.subscribe(updateProjects)

      return () => unsubscribe()
    }
  }, [])

  const getProjectsByStatus = (status: 'on-track' | 'delayed' | 'at-risk') => {
    return projects.filter(p => p.status === status)
  }

  const getProjectProgress = () => {
    const totalProgress = projects.reduce((sum, p) => sum + p.progress, 0)
    return projects.length > 0 ? totalProgress / projects.length : 0
  }

  return {
    projects,
    getProjectsByStatus,
    getProjectProgress,
    onTrack: getProjectsByStatus('on-track'),
    delayed: getProjectsByStatus('delayed'),
    atRisk: getProjectsByStatus('at-risk')
  }
}