'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  BarChart3,
  Cable,
  Zap,
  MapPin,
  FileText,
  ArrowLeft,
  Shield,
  Target,
  Power,
  Tower
} from 'lucide-react'
import { 
  TransmissionChart,
  FrequencyChart,
  ReliabilityChart,
  LoadChart
} from '@/components/charts'
import Link from 'next/link'

interface GRIDCoData {
  overview: {
    transmissionCapacity: string
    reliability: string
    frequency: string
    coverage: string
    substations: string
    efficiency: string
  }
  operations: {
    transmission: Array<{
      region: string
      capacity: string
      load: string
      utilization: number
      status: string
    }>
    substations: Array<{
      name: string
      voltage: string
      load: string
      availability: number
    }>
    maintenance: Array<{
      equipment: string
      scheduled: string
      completed: string
      pending: string
    }>
  }
  performance: {
    reliability: Array<{
      metric: string
      current: number
      target: number
      trend: string
    }>
    frequency: Array<{
      time: string
      frequency: number
      deviation: number
    }>
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
  }>
}

export default function GRIDCoDashboard() {
  const [data, setData] = useState<GRIDCoData | null>(null)

  useEffect(() => {
    setData({
      overview: {
        transmissionCapacity: '4,850 MW',
        reliability: '97.8%',
        frequency: '50.02 Hz',
        coverage: '95.2%',
        substations: '142',
        efficiency: '96.4%'
      },
      operations: {
        transmission: [
          { region: 'Northern', capacity: '850 MW', load: '720 MW', utilization: 84.7, status: 'Normal' },
          { region: 'Eastern', capacity: '650 MW', load: '580 MW', utilization: 89.2, status: 'Normal' },
          { region: 'Western', capacity: '750 MW', load: '620 MW', utilization: 82.7, status: 'Normal' },
          { region: 'Central', capacity: '1,200 MW', load: '980 MW', utilization: 81.7, status: 'Normal' },
          { region: 'Southern', capacity: '1,400 MW', load: '1,150 MW', utilization: 82.1, status: 'Normal' }
        ],
        substations: [
          { name: 'Mango', voltage: '330kV', load: '450 MW', availability: 98.5 },
          { name: 'Kumasi', voltage: '330kV', load: '380 MW', availability: 97.8 },
          { name: 'Prestea', voltage: '330kV', load: '320 MW', availability: 99.1 },
          { name: 'Tema', voltage: '330kV', load: '520 MW', availability: 96.9 }
        ],
        maintenance: [
          { equipment: 'Transformers', scheduled: '12', completed: '8', pending: '4' },
          { equipment: 'Transmission Lines', scheduled: '25', completed: '18', pending: '7' },
          { equipment: 'Switchgear', scheduled: '18', completed: '12', pending: '6' },
          { equipment: 'Protection Systems', scheduled: '15', completed: '10', pending: '5' }
        ]
      },
      performance: {
        reliability: [
          { metric: 'System Availability', current: 97.8, target: 98.0, trend: 'stable' },
          { metric: 'Transmission Losses', current: 3.6, target: 3.5, trend: 'improving' },
          { metric: 'Equipment Reliability', current: 96.4, target: 97.0, trend: 'improving' },
          { metric: 'Maintenance Compliance', current: 92.5, target: 95.0, trend: 'stable' }
        ],
        frequency: [
          { time: '00:00', frequency: 50.02, deviation: 0.04 },
          { time: '04:00', frequency: 50.01, deviation: 0.02 },
          { time: '08:00', frequency: 49.98, deviation: -0.02 },
          { time: '12:00', frequency: 49.97, deviation: -0.03 },
          { time: '16:00', frequency: 50.03, deviation: 0.06 },
          { time: '20:00', frequency: 50.01, deviation: 0.02 }
        ]
      },
      alerts: [
        { id: '1', type: 'warning', message: 'High load on Tema-Accra transmission corridor - 92% utilization', timestamp: '2024-01-15T16:30:00Z' },
        { id: '2', type: 'info', message: 'Scheduled maintenance for Kumasi substation this weekend', timestamp: '2024-01-15T14:20:00Z' },
        { id: '3', type: 'critical', message: 'Frequency deviation detected - 49.85 Hz', timestamp: '2024-01-15T12:45:00Z' }
      ]
    })
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading GRIDCo Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Cable className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold">GRIDCo</h1>
                <p className="text-xs text-muted-foreground">Ghana Grid Company</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Transmission System</Badge>
            <div className="text-sm text-muted-foreground">
              Last Updated: Live
            </div>
          </div>
        </div>
      </header>

      <main className="p-6">
        <div className="space-y-3 mb-6">
          {data.alerts.map((alert) => (
            <Alert key={alert.id} className={alert.type === 'critical' ? 'border-red-500' : alert.type === 'warning' ? 'border-yellow-500' : 'border-blue-500'}>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="transmission">Transmission</TabsTrigger>
            <TabsTrigger value="substations">Substations</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Transmission Capacity</CardTitle>
                  <Power className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.transmissionCapacity}</div>
                  <p className="text-xs text-muted-foreground">+150 MW from last year</p>
                  <Progress value={85} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Reliability</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.reliability}</div>
                  <p className="text-xs text-muted-foreground">Above target of 97%</p>
                  <Progress value={98} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Frequency</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.frequency}</div>
                  <p className="text-xs text-muted-foreground">Within acceptable range</p>
                  <Progress value={95} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">National Coverage</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.coverage}</div>
                  <p className="text-xs text-muted-foreground">+2.3% expansion</p>
                  <Progress value={95} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Substations</CardTitle>
                  <Tower className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.substations}</div>
                  <p className="text-xs text-muted-foreground">8 new this year</p>
                  <Progress value={88} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Efficiency</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.efficiency}</div>
                  <p className="text-xs text-muted-foreground">+1.2% improvement</p>
                  <Progress value={96} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Transmission Load Analysis</CardTitle>
                <CardDescription>Regional transmission system performance</CardDescription>
              </CardHeader>
              <CardContent>
                <TransmissionChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="transmission" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cable className="h-5 w-5" />
                  <span>Regional Transmission</span>
                </CardTitle>
                <CardDescription>Transmission system performance by region</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.operations.transmission.map((region, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{region.region} Region</h4>
                        <Badge variant="outline">{region.status}</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
                        <span>Capacity: {region.capacity}</span>
                        <span>Load: {region.load}</span>
                        <span>Utilization: {region.utilization}%</span>
                      </div>
                      <Progress value={region.utilization} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="substations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Tower className="h-5 w-5" />
                  <span>Key Substations</span>
                </CardTitle>
                <CardDescription>Major substation performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.operations.substations.map((substation, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{substation.name}</h4>
                        <div className="text-lg font-bold mb-2">{substation.voltage}</div>
                        <div className="text-sm text-muted-foreground mb-2">Load: {substation.load}</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Availability</span>
                          <Badge variant="outline">{substation.availability}%</Badge>
                        </div>
                        <Progress value={substation.availability} className="h-2 mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Reliability Metrics</span>
                  </CardTitle>
                  <CardDescription>System performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.performance.reliability.map((metric, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{metric.metric}</h4>
                          <Badge variant="outline">{metric.current}%</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                          <span>Current: {metric.current}%</span>
                          <span>Target: {metric.target}%</span>
                        </div>
                        <Progress value={metric.current} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Frequency Stability</CardTitle>
                  <CardDescription>System frequency monitoring</CardDescription>
                </CardHeader>
                <CardContent>
                  <FrequencyChart />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Load Management</CardTitle>
                <CardDescription>System load and demand patterns</CardDescription>
              </CardHeader>
              <CardContent>
                <LoadChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="maintenance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Maintenance Schedule</span>
                </CardTitle>
                <CardDescription>Equipment maintenance status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.operations.maintenance.map((item, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{item.equipment}</h4>
                        <div className="text-2xl font-bold mb-2">{item.scheduled}</div>
                        <p className="text-sm text-muted-foreground mb-2">Scheduled</p>
                        <div className="text-xs text-muted-foreground">
                          <div>Completed: {item.completed}</div>
                          <div>Pending: {item.pending}</div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>System Reliability</CardTitle>
                <CardDescription>Monthly reliability trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ReliabilityChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}