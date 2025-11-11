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
  Droplets,
  Factory,
  Truck,
  Users,
  FileText,
  ArrowLeft,
  Zap,
  Shield,
  Target
} from 'lucide-react'
import { 
  ProductionChart,
  RevenueChart,
  ReservesChart,
  ExplorationChart
} from '@/components/charts'
import Link from 'next/link'

interface GNPCData {
  overview: {
    production: string
    reserves: string
    revenue: string
    exploration: string
    uptime: string
    efficiency: string
  }
  operations: {
    fields: Array<{
      name: string
      production: string
      status: 'active' | 'maintenance' | 'planned'
      efficiency: number
    }>
    platforms: Array<{
      name: string
      type: string
      production: string
      uptime: number
    }>
  }
  financial: {
    monthlyRevenue: Array<{ month: string; revenue: number; costs: number }>
    investments: Array<{ project: string; amount: number; status: string }>
    reserves: Array<{ type: string; volume: string; value: string }>
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
  }>
}

export default function GNPCDashboard() {
  const [data, setData] = useState<GNPCData | null>(null)

  useEffect(() => {
    // Mock GNPC data - in real implementation, this would come from API
    setData({
      overview: {
        production: '125.3 kboepd',
        reserves: '1.2 billion barrels',
        revenue: '$850M',
        exploration: '15 active blocks',
        uptime: '94.2%',
        efficiency: '87.6%'
      },
      operations: {
        fields: [
          { name: 'Jubilee Field', production: '85.2 kboepd', status: 'active', efficiency: 92 },
          { name: 'TEN Fields', production: '32.1 kboepd', status: 'active', efficiency: 88 },
          { name: 'Sankofa Field', production: '8.0 kboepd', status: 'active', efficiency: 85 }
        ],
        platforms: [
          { name: 'FPSO Kwame Nkrumah', type: 'Floating Production', production: '85.2 kboepd', uptime: 96 },
          { name: 'FPSO John Atta Mills', type: 'Floating Production', production: '32.1 kboepd', uptime: 94 },
          { name: 'Sankofa Platform', type: 'Fixed Platform', production: '8.0 kboepd', uptime: 91 }
        ]
      },
      financial: {
        monthlyRevenue: [
          { month: 'Jan', revenue: 85, costs: 42 },
          { month: 'Feb', revenue: 88, costs: 44 },
          { month: 'Mar', revenue: 92, costs: 45 },
          { month: 'Apr', revenue: 87, costs: 43 },
          { month: 'May', revenue: 90, costs: 46 },
          { month: 'Jun', revenue: 95, costs: 48 }
        ],
        investments: [
          { project: 'Deepwater Tano Cape Three Points', amount: 450, status: 'ongoing' },
          { project: 'South West Tano', amount: 320, status: 'planning' },
          { project: 'Saltpond Field Redevelopment', amount: 85, status: 'completed' }
        ],
        reserves: [
          { type: 'Proven Reserves', volume: '660 million barrels', value: '$45B' },
          { type: 'Probable Reserves', volume: '340 million barrels', value: '$23B' },
          { type: 'Possible Reserves', volume: '200 million barrels', value: '$14B' }
        ]
      },
      alerts: [
        { id: '1', type: 'warning', message: 'Production optimization required at TEN Fields', timestamp: '2024-01-15T10:30:00Z' },
        { id: '2', type: 'info', message: 'Scheduled maintenance for FPSO John Atta Mills', timestamp: '2024-01-14T14:20:00Z' },
        { id: '3', type: 'critical', message: 'Gas flaring exceeds regulatory limits', timestamp: '2024-01-13T09:15:00Z' }
      ]
    })
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading GNPC Dashboard...</p>
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
              <Droplets className="h-8 w-8 text-blue-600" />
              <div>
                <h1 className="text-xl font-bold">GNPC</h1>
                <p className="text-xs text-muted-foreground">Ghana National Petroleum Corporation</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Petroleum Sector</Badge>
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
            <TabsTrigger value="financial">Financial</TabsTrigger>
            <TabsTrigger value="exploration">Exploration</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Daily Production</CardTitle>
                  <Droplets className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.production}</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last month</p>
                  <Progress value={87} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Reserves</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.reserves}</div>
                  <p className="text-xs text-muted-foreground">Proven + Probable</p>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Monthly Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.revenue}</div>
                  <p className="text-xs text-muted-foreground">+8.3% YoY growth</p>
                  <Progress value={82} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Operational Uptime</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.uptime}</div>
                  <p className="text-xs text-muted-foreground">Above target of 90%</p>
                  <Progress value={94} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Efficiency Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.efficiency}</div>
                  <p className="text-xs text-muted-foreground">Production efficiency</p>
                  <Progress value={88} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Active Blocks</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.exploration}</div>
                  <p className="text-xs text-muted-foreground">Exploration activities</p>
                  <Progress value={65} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Production Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Production Trends</CardTitle>
                <CardDescription>Daily oil and gas production volumes</CardDescription>
              </CardHeader>
              <CardContent>
                <ProductionChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Production Fields */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Factory className="h-5 w-5" />
                    <span>Production Fields</span>
                  </CardTitle>
                  <CardDescription>Active oil and gas fields</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.fields.map((field, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div>
                          <h4 className="font-medium">{field.name}</h4>
                          <p className="text-sm text-muted-foreground">{field.production}</p>
                        </div>
                        <div className="text-right">
                          <Badge variant={field.status === 'active' ? 'default' : field.status === 'maintenance' ? 'secondary' : 'outline'}>
                            {field.status}
                          </Badge>
                          <div className="text-sm text-muted-foreground mt-1">{field.efficiency}% efficient</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Production Platforms */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Zap className="h-5 w-5" />
                    <span>Production Platforms</span>
                  </CardTitle>
                  <CardDescription>Offshore and onshore facilities</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.platforms.map((platform, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{platform.name}</h4>
                          <Badge variant="outline">{platform.type}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Production: {platform.production}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Uptime</span>
                          <span className="text-sm font-medium">{platform.uptime}%</span>
                        </div>
                        <Progress value={platform.uptime} className="h-2 mt-1" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financial" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Analysis</CardTitle>
                  <CardDescription>Monthly revenue vs operational costs</CardDescription>
                </CardHeader>
                <CardContent>
                  <RevenueChart />
                </CardContent>
              </Card>

              {/* Investment Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Investment Projects</CardTitle>
                  <CardDescription>Active capital investments</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.financial.investments.map((investment, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{investment.project}</h4>
                          <Badge variant="outline">{investment.status}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">${investment.amount}M investment</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reserves Value */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle>Reserves Valuation</CardTitle>
                  <CardDescription>Oil and gas reserves by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {data.financial.reserves.map((reserve, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{reserve.type}</h4>
                          <p className="text-2xl font-bold">{reserve.volume}</p>
                          <p className="text-sm text-muted-foreground">{reserve.value}</p>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="exploration" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Exploration Activities</CardTitle>
                <CardDescription>Active exploration blocks and seismic surveys</CardDescription>
              </CardHeader>
              <CardContent>
                <ExplorationChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Environmental Compliance</CardTitle>
                  <CardDescription>Regulatory compliance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Gas Flaring Reduction</span>
                        <span className="text-sm font-medium">87.3%</span>
                      </div>
                      <Progress value={87.3} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Spill Prevention</span>
                        <span className="text-sm font-medium">98.1%</span>
                      </div>
                      <Progress value={98.1} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Emissions Control</span>
                        <span className="text-sm font-medium">92.7%</span>
                      </div>
                      <Progress value={92.7} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Safety Performance</CardTitle>
                  <CardDescription>Health and safety metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Safety Training</span>
                        <span className="text-sm font-medium">95.8%</span>
                      </div>
                      <Progress value={95.8} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Incident Rate</span>
                        <span className="text-sm font-medium">0.12</span>
                      </div>
                      <Progress value={99} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">Emergency Response</span>
                        <span className="text-sm font-medium">94.2%</span>
                      </div>
                      <Progress value={94.2} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}