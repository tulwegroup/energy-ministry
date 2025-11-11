'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { 
  Activity, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  BarChart3,
  Truck,
  MapPin,
  Users,
  FileText,
  ArrowLeft,
  Shield,
  Target,
  Fuel,
  Droplet
} from 'lucide-react'
import { 
  SalesChart,
  NetworkChart,
  PerformanceChart,
  InventoryChart
} from '@/components/charts'
import Link from 'next/link'

interface GOILData {
  overview: {
    totalSales: string
    marketShare: string
    efficiency: string
    customerSatisfaction: string
    networkSize: string
    revenue: string
  }
  operations: {
    sales: Array<{
      product: string
      volume: string
      revenue: string
      growth: string
    }>
    stations: Array<{
      region: string
      stations: number
      performance: number
      revenue: string
    }>
    performance: Array<{
      metric: string
      current: number
      target: number
      status: 'excellent' | 'good' | 'needs-improvement'
    }>
  }
  network: {
    distribution: Array<{ region: string; percentage: number; stations: number }>
    topStations: Array<{
      name: string
      location: string
      monthlySales: string
      performance: number
    }>
    expansion: Array<{
      region: string
      plannedStations: number
      status: string
      timeline: string
    }>
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
  }>
}

export default function GOILDashboard() {
  const [data, setData] = useState<GOILData | null>(null)

  useEffect(() => {
    // Mock GOIL data - in real implementation, this would come from API
    setData({
      overview: {
        totalSales: '98.7M liters',
        marketShare: '22.3%',
        efficiency: '68.4%',
        customerSatisfaction: '74.8%',
        networkSize: '358 stations',
        revenue: '₵980M'
      },
      operations: {
        sales: [
          { product: 'Petrol (Super)', volume: '35.8M liters', revenue: '₵485M', growth: '-2.3%' },
          { product: 'Diesel', volume: '42.3M liters', revenue: '₵398M', growth: '+1.8%' },
          { product: 'Kerosene', volume: '6.2M liters', revenue: '₵67M', growth: '-5.4%' },
          { product: 'LPG', volume: '14.4M kg', revenue: '₵130M', growth: '+3.2%' }
        ],
        stations: [
          { region: 'Greater Accra', stations: 78, performance: 72, revenue: '₵325M' },
          { region: 'Ashanti', stations: 68, performance: 69, revenue: '₵245M' },
          { region: 'Western', stations: 42, performance: 65, revenue: '₵155M' },
          { region: 'Eastern', stations: 38, performance: 62, revenue: '₵128M' },
          { region: 'Northern', stations: 32, performance: 58, revenue: '₵95M' }
        ],
        performance: [
          { metric: 'Sales Volume', current: 74, target: 85, status: 'needs-improvement' },
          { metric: 'Revenue Growth', current: 68, target: 90, status: 'needs-improvement' },
          { metric: 'Customer Satisfaction', current: 75, target: 85, status: 'needs-improvement' },
          { metric: 'Operational Efficiency', current: 68, target: 82, status: 'needs-improvement' },
          { metric: 'Inventory Management', current: 71, target: 80, status: 'needs-improvement' }
        ]
      },
      network: {
        distribution: [
          { region: 'Greater Accra', percentage: 22.1, stations: 85 },
          { region: 'Ashanti', percentage: 18.7, stations: 72 },
          { region: 'Western', percentage: 12.5, stations: 48 },
          { region: 'Eastern', percentage: 11.7, stations: 45 },
          { region: 'Northern', percentage: 9.1, stations: 35 },
          { region: 'Others', percentage: 25.9, stations: 100 }
        ],
        topStations: [
          { name: 'GOIL Tema Motorway', location: 'Tema', monthlySales: '₵12.5M', performance: 94 },
          { name: 'GOIL Accra Mall', location: 'Accra', monthlySales: '₵10.8M', performance: 92 },
          { name: 'GOIL Kumasi Central', location: 'Kumasi', monthlySales: '₵9.2M', performance: 89 },
          { name: 'GOIL Takoradi Harbour', location: 'Takoradi', monthlySales: '₵8.5M', performance: 87 },
          { name: 'GOIL Tamale Main', location: 'Tamale', monthlySales: '₵7.3M', performance: 85 }
        ],
        expansion: [
          { region: 'Oti', plannedStations: 8, status: 'planning', timeline: 'Q2 2026' },
          { region: 'North East', plannedStations: 6, status: 'planning', timeline: 'Q3 2026' },
          { region: 'Savannah', plannedStations: 7, status: 'underway', timeline: 'Q4 2025' },
          { region: 'Bono East', plannedStations: 10, status: 'underway', timeline: 'Q1 2026' }
        ]
      },
      alerts: [
        { id: '1', type: 'critical', message: 'Fuel price increases reducing sales volume by 15% across all regions', timestamp: '2025-11-15T09:30:00Z' },
        { id: '2', type: 'warning', message: 'Supply chain disruptions affecting Northern Region stations - 8 days stock remaining', timestamp: '2025-11-14T14:20:00Z' },
        { id: '3', type: 'critical', message: 'Currency depreciation increasing operational costs by 22%', timestamp: '2025-11-13T11:45:00Z' },
        { id: '4', type: 'warning', message: 'Competition from new OMCs affecting market share in Accra', timestamp: '2025-11-12T16:20:00Z' }
      ]
    })
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading GOIL Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-4">
          <Link href="/">
            <Button variant="ghost" size="icon" className="mr-4">
              <ArrowLeft className="h-6 w-6" />
            </Button>
          </Link>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Truck className="h-8 w-8 text-orange-600" />
              <div>
                <h1 className="text-xl font-bold">GOIL & OMCs</h1>
                <p className="text-xs text-muted-foreground">Oil Marketing Companies</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Petroleum Marketing</Badge>
            <div className="text-sm text-muted-foreground">
              Last Updated: Live
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-6">
        {/* Critical Alerts */}
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
            <TabsTrigger value="operations">Operations</TabsTrigger>
            <TabsTrigger value="network">Network</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="expansion">Expansion</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Sales</CardTitle>
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.totalSales}</div>
                  <p className="text-xs text-muted-foreground">+10.5% from last month</p>
                  <Progress value={87} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Market Share</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.marketShare}</div>
                  <p className="text-xs text-muted-foreground">Market leader</p>
                  <Progress value={85} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Operational Efficiency</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.efficiency}</div>
                  <p className="text-xs text-muted-foreground">+2.3% improvement</p>
                  <Progress value={80} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Customer Satisfaction</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.customerSatisfaction}</div>
                  <p className="text-xs text-muted-foreground">Above industry average</p>
                  <Progress value={87} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Network Size</CardTitle>
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.networkSize}</div>
                  <p className="text-xs text-muted-foreground">Nationwide coverage</p>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.revenue}</div>
                  <p className="text-xs text-muted-foreground">+15.2% YoY growth</p>
                  <Progress value={92} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Sales Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Sales Performance</CardTitle>
                <CardDescription>Monthly sales trends by product category</CardDescription>
              </CardHeader>
              <CardContent>
                <SalesChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Product Sales */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Fuel className="h-5 w-5" />
                    <span>Product Sales</span>
                  </CardTitle>
                  <CardDescription>Monthly sales by product category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.sales.map((sale, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{sale.product}</h4>
                          <Badge variant="outline">{sale.growth}</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                          <span>Volume: {sale.volume}</span>
                          <span>Revenue: {sale.revenue}</span>
                        </div>
                        <Progress value={85 + index * 3} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Regional Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Regional Performance</span>
                  </CardTitle>
                  <CardDescription>Station performance by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.stations.map((station, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{station.region}</h4>
                          <Badge variant="outline">{station.performance}%</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                          <span>Stations: {station.stations}</span>
                          <span>Revenue: {station.revenue}</span>
                        </div>
                        <Progress value={station.performance} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="network" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Network Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Network Distribution</span>
                  </CardTitle>
                  <CardDescription>Geographic distribution of stations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.network.distribution.map((region, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{region.region}</h4>
                          <Badge variant="outline">{region.percentage}%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{region.stations} stations</p>
                        <Progress value={region.percentage} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performing Stations */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Top Performing Stations</span>
                  </CardTitle>
                  <CardDescription>Highest revenue generating stations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.network.topStations.map((station, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{station.name}</h4>
                          <Badge variant="outline">{station.performance}%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{station.location}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Monthly Sales</span>
                          <span className="font-bold">{station.monthlySales}</span>
                        </div>
                        <Progress value={station.performance} className="h-2 mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Network Map */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Network Overview</CardTitle>
                  <CardDescription>Station network visualization</CardDescription>
                </CardHeader>
                <CardContent>
                  <NetworkChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Performance Metrics</span>
                  </CardTitle>
                  <CardDescription>Key performance indicators</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.performance.map((metric, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{metric.metric}</h4>
                          <Badge variant={
                            metric.status === 'excellent' ? 'default' : 
                            metric.status === 'good' ? 'secondary' : 'destructive'
                          }>
                            {metric.status}
                          </Badge>
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

              {/* Performance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Trends</CardTitle>
                  <CardDescription>Monthly performance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <PerformanceChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="expansion" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5" />
                  <span>Network Expansion Plans</span>
                </CardTitle>
                <CardDescription>Upcoming station openings and expansion projects</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.network.expansion.map((project, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{project.region}</h4>
                        <p className="text-2xl font-bold mb-2">{project.plannedStations}</p>
                        <p className="text-sm text-muted-foreground mb-2">New Stations</p>
                        <Badge variant="outline">{project.status}</Badge>
                        <p className="text-xs text-muted-foreground mt-2">{project.timeline}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Current inventory levels and distribution</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}