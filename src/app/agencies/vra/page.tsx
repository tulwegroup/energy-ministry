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
  Factory,
  Zap,
  Droplet,
  ArrowLeft,
  Shield,
  Target,
  Power
} from 'lucide-react'
import { 
  ProductionChart,
  RevenueChart,
  EnergyMixChart as VRAMixChart
} from '@/components/charts'
import Link from 'next/link'

interface VRaData {
  overview: {
    totalCapacity: string
    generation: string
    efficiency: string
    revenue: string
    plants: string
    availability: string
  }
  operations: {
    plants: Array<{
      name: string
      type: string
      capacity: string
      generation: string
      availability: number
    }>
    generation: Array<{
      source: string
      capacity: string
      generation: string
      efficiency: number
    }>
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
  }>
}

export default function VRADashboard() {
  const [data, setData] = useState<VRaData | null>(null)

  useEffect(() => {
    setData({
      overview: {
        totalCapacity: '2,850 MW',
        generation: '1,847 MW',
        efficiency: '85.6%',
        revenue: '₵2.1B',
        plants: '6',
        availability: '91.2%'
      },
      operations: {
        plants: [
          { name: 'Akosombo', type: 'Hydro', capacity: '1,020 MW', generation: '880 MW', availability: 94.5 },
          { name: 'Kpong', type: 'Hydro', capacity: '160 MW', generation: '145 MW', availability: 92.8 },
          { name: 'Bui', type: 'Hydro', capacity: '400 MW', generation: '320 MW', availability: 89.2 },
          { name: 'Takoradi', type: 'Thermal', capacity: '660 MW', generation: '420 MW', availability: 87.5 },
          { name: 'Tema', type: 'Thermal', capacity: '330 MW', generation: '280 MW', availability: 85.3 },
          { name: 'Kumasi', type: 'Thermal', capacity: '280 MW', generation: '240 MW', availability: 88.7 }
        ],
        generation: [
          { source: 'Hydro', capacity: '1,580 MW', generation: '1,345 MW', efficiency: 85.1 },
          { source: 'Thermal', capacity: '1,270 MW', generation: '1,020 MW', efficiency: 80.3 },
          { source: 'Renewable', capacity: '0 MW', generation: '0 MW', efficiency: 0 }
        ]
      },
      alerts: [
        { id: '1', type: 'warning', message: 'Low water levels at Akosombo affecting generation capacity', timestamp: '2024-01-15T10:30:00Z' },
        { id: '2', type: 'info', message: 'Scheduled maintenance for Takoradi T3 plant', timestamp: '2024-01-14T14:20:00Z' },
        { id: '3', type: 'critical', message: 'Unexpected outage at Tema Thermal Plant', timestamp: '2024-01-13T16:45:00Z' }
      ]
    })
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading VRA Dashboard...</p>
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
              <Factory className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold">VRA & IPPs</h1>
                <p className="text-xs text-muted-foreground">Volta River Authority & Independent Power Producers</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Power Generation</Badge>
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
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="plants">Power Plants</TabsTrigger>
            <TabsTrigger value="generation">Generation</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Capacity</CardTitle>
                  <Power className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.totalCapacity}</div>
                  <p className="text-xs text-muted-foreground">+150 MW from last year</p>
                  <Progress value={85} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Generation</CardTitle>
                  <Zap className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.generation}</div>
                  <p className="text-xs text-muted-foreground">64.8% capacity factor</p>
                  <Progress value={65} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Efficiency</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.efficiency}</div>
                  <p className="text-xs text-muted-foreground">+2.1% improvement</p>
                  <Progress value={86} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.revenue}</div>
                  <p className="text-xs text-muted-foreground">+12.3% YoY growth</p>
                  <Progress value={88} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Power Plants</CardTitle>
                  <Factory className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.plants}</div>
                  <p className="text-xs text-muted-foreground">6 major facilities</p>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Plant Availability</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.availability}</div>
                  <p className="text-xs text-muted-foreground">Above target of 90%</p>
                  <Progress value={91} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Production Trends</CardTitle>
                <CardDescription>Daily power generation trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductionChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="plants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Factory className="h-5 w-5" />
                  <span>Power Plant Performance</span>
                </CardTitle>
                <CardDescription>Real-time status of all power plants</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.operations.plants.map((plant, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{plant.name}</h4>
                        <Badge variant="outline" className="mb-2">{plant.type}</Badge>
                        <div className="text-lg font-bold mb-2">{plant.capacity}</div>
                        <div className="text-sm text-muted-foreground mb-2">Generation: {plant.generation}</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Availability</span>
                          <Badge variant="outline">{plant.availability}%</Badge>
                        </div>
                        <Progress value={plant.availability} className="h-2 mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="generation" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Zap className="h-5 w-5" />
                  <span>Generation Mix</span>
                </CardTitle>
                <CardDescription>Power generation by source</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.operations.generation.map((source, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{source.source}</h4>
                        <div className="text-2xl font-bold mb-2">{source.capacity}</div>
                        <div className="text-sm text-muted-foreground mb-2">Generation: {source.generation}</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Efficiency</span>
                          <Badge variant="outline">{source.efficiency}%</Badge>
                        </div>
                        <Progress value={source.efficiency} className="h-2 mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Energy Mix</CardTitle>
                <CardDescription>Generation source distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <VRAMixChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Monthly revenue trends</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}