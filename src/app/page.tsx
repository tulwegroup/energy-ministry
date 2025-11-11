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
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  DollarSign, 
  Leaf,
  Building,
  Truck,
  Battery,
  Cable,
  Factory,
  Warehouse,
  Scale,
  Shield,
  Menu,
  X
} from 'lucide-react'
import { 
  RevenueAnalysisChart, 
  ExpenditureBreakdownChart, 
  ArrearsReceivablesChart, 
  ProjectFundingChart, 
  SDG7PerformanceChart,
  EnergyMixChart 
} from '@/components/charts'
import { getServerEnergyData } from '@/lib/server-data'
import Link from 'next/link'

// Server data interface
interface ServerData {
  metrics: Array<{
    title: string
    value: string
    demand?: string
    status: 'healthy' | 'warning' | 'critical'
    change: string
    timestamp: string
  }>
  financial: {
    totalRevenue: string
    subsidies: string
    receivables: string
    liabilities: string
    lastUpdated: string
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    source: string
    acknowledged: boolean
    timestamp: string
  }>
  projects: Array<{
    id: string
    name: string
    progress: number
    cost: string
    variance: string
    status: 'on-track' | 'delayed' | 'at-risk'
    lastUpdated: string
  }>
  agencies: Array<{
    id: string
    name: string
    performance: number
    compliance: number
    lastUpdated: string
    metrics: Record<string, number | string>
  }>
}

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [data, setData] = useState<ServerData | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Initialize with server data only
  useEffect(() => {
    // Get server data
    const serverData = getServerEnergyData()
    setData(serverData)
    setIsClient(true)
  }, [])

  const agencyIcons = {
    gnpc: Building,
    npa: Scale,
    goil: Truck,
    ecg: Zap,
    gridco: Cable,
    vra: Factory,
    bost: Warehouse,
    purc: Scale,
    epa: Leaf
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading Energy Dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="flex h-16 items-center px-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <Zap className="h-8 w-8 text-primary" />
              <div>
                <h1 className="text-xl font-bold">NECID</h1>
                <p className="text-xs text-muted-foreground">National Energy Command & Insights Dashboard</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Minister of Energy</Badge>
            <div className="text-sm text-muted-foreground">
              Last Updated: {isClient ? 'Live' : 'Server Data'}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 border-r bg-card ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Energy Agencies</h2>
            <nav className="space-y-2">
              {data.agencies.map((agency) => {
                const IconComponent = agencyIcons[agency.id as keyof typeof agencyIcons] || Building
                return (
                  <Link key={agency.id} href={`/agencies/${agency.id}`}>
                    <button
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent text-left"
                    >
                      <IconComponent className="h-5 w-5" />
                      <div>
                        <div className="font-medium">{agency.name}</div>
                        <div className="text-xs text-muted-foreground">Energy Sector Agency</div>
                      </div>
                    </button>
                  </Link>
                )
              })}
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          <Tabs defaultValue="executive" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="executive">Executive Summary</TabsTrigger>
              <TabsTrigger value="agencies">Agency Dashboards</TabsTrigger>
              <TabsTrigger value="financial">Financial Overview</TabsTrigger>
              <TabsTrigger value="esg">ESG & Compliance</TabsTrigger>
            </TabsList>

            <TabsContent value="executive" className="space-y-6">
              {/* Critical Alerts */}
              <div className="space-y-3">
                {data.alerts.slice(0, 3).map((alert, index) => (
                  <Alert key={alert.id} className={alert.type === 'critical' ? 'border-red-500' : alert.type === 'warning' ? 'border-yellow-500' : 'border-blue-500'}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                ))}
              </div>

              {/* Executive Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.metrics.map((metric, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                      <Activity className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      {metric.demand && (
                        <p className="text-xs text-muted-foreground">Demand: {metric.demand}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge 
                          variant={metric.status === 'healthy' ? 'default' : metric.status === 'warning' ? 'secondary' : 'destructive'}
                        >
                          {metric.status}
                        </Badge>
                        <span className="text-xs text-muted-foreground">{metric.change}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Financial Summary */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Fiscal Summary</span>
                  </CardTitle>
                  <CardDescription>Consolidated financial position across all agencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{data.financial.totalRevenue}</div>
                      <div className="text-sm text-muted-foreground">Total Revenue</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-orange-600">{data.financial.subsidies}</div>
                      <div className="text-sm text-muted-foreground">Subsidies</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-yellow-600">{data.financial.receivables}</div>
                      <div className="text-sm text-muted-foreground">Receivables</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-red-600">{data.financial.liabilities}</div>
                      <div className="text-sm text-muted-foreground">Liabilities</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flagship Projects */}
              <Card>
                <CardHeader>
                  <CardTitle>Flagship Project Tracker</CardTitle>
                  <CardDescription>Top ongoing projects with completion status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.projects.slice(0, 3).map((project, index) => (
                      <div key={project.id}>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.cost} • Variance: {project.variance}</p>
                          </div>
                          <Badge variant="outline">{project.progress}%</Badge>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="agencies" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.agencies.map((agency) => {
                  const IconComponent = agencyIcons[agency.id as keyof typeof agencyIcons] || Building
                  return (
                    <Link key={agency.id} href={`/agencies/${agency.id}`}>
                      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                        <CardHeader>
                          <CardTitle className="flex items-center space-x-2">
                            <IconComponent className="h-5 w-5" />
                            <span>{agency.name}</span>
                          </CardTitle>
                          <CardDescription>Energy Sector Agency</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm">Performance</span>
                              <Badge variant="outline">{agency.performance}%</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Compliance</span>
                              <Badge variant="outline">{agency.compliance}%</Badge>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm">Last Updated</span>
                              <span className="text-sm text-muted-foreground">
                                Server Data
                              </span>
                            </div>
                          </div>
                          <Separator className="my-3" />
                          <Button variant="outline" className="w-full">
                            View Full Dashboard
                          </Button>
                        </CardContent>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </TabsContent>

            <TabsContent value="financial" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Revenue Analysis</CardTitle>
                    <CardDescription>Monthly revenue trends across agencies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <RevenueAnalysisChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Expenditure Breakdown</CardTitle>
                    <CardDescription>CAPEX vs OPEX across the energy sector</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ExpenditureBreakdownChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Arrears & Receivables</CardTitle>
                    <CardDescription>Aging analysis of outstanding payments</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ArrearsReceivablesChart />
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Project Funding Status</CardTitle>
                    <CardDescription>Capital project funding utilization</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ProjectFundingChart />
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="esg" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Leaf className="h-5 w-5" />
                      <span>Environmental Impact</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Renewable Energy</span>
                          <span className="text-sm font-medium">23.5%</span>
                        </div>
                        <Progress value={23.5} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Emissions Reduction</span>
                          <span className="text-sm font-medium">-12.3%</span>
                        </div>
                        <Progress value={87.7} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Flaring Reduction</span>
                          <span className="text-sm font-medium">-45.2%</span>
                        </div>
                        <Progress value={54.8} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Social Impact</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Energy Access</span>
                          <span className="text-sm font-medium">87.2%</span>
                        </div>
                        <Progress value={87.2} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Local Content</span>
                          <span className="text-sm font-medium">34.8%</span>
                        </div>
                        <Progress value={34.8} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Gender Participation</span>
                          <span className="text-sm font-medium">28.9%</span>
                        </div>
                        <Progress value={28.9} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Governance</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Compliance Score</span>
                          <span className="text-sm font-medium">91.3%</span>
                        </div>
                        <Progress value={91.3} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Transparency Index</span>
                          <span className="text-sm font-medium">78.6%</span>
                        </div>
                        <Progress value={78.6} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm">Risk Management</span>
                          <span className="text-sm font-medium">85.1%</span>
                        </div>
                        <Progress value={85.1} className="h-2" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>SDG7 Performance Dashboard</CardTitle>
                  <CardDescription>Progress towards Sustainable Development Goal 7</CardDescription>
                </CardHeader>
                <CardContent>
                  <SDG7PerformanceChart />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}