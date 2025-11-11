'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
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
  X,
  ShoppingCart,
  Briefcase,
  FileText,
  Target,
  User,
  LogOut
} from 'lucide-react'
import { 
  RevenueAnalysisChart, 
  ExpenditureBreakdownChart, 
  ArrearsReceivablesChart, 
  ProjectFundingChart, 
  SDG7PerformanceChart,
  EnergyMixChart 
} from '@/components/charts'
import AIPredictiveAnalytics from '@/components/ai-predictive-analytics'
import RealTimeCollaboration from '@/components/real-time-collaboration'
import DigitalTwinIntegration from '@/components/digital-twin-integration'
import AdvancedAIInsights from '@/components/advanced-ai-insights'
import RealTimeDataIntegration from '@/components/real-time-data-integration'
import UserProfile from '@/components/user-profile'
import { getServerEnergyData } from '@/lib/server-data'
import { useAuth } from '@/lib/auth-context'
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
  const [profileOpen, setProfileOpen] = useState(false)
  // Initialize with server data directly to avoid loading state
  const [data, setData] = useState<ServerData | null>(getServerEnergyData())
  const [isClient, setIsClient] = useState(true)
  const { user, logout } = useAuth()

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
      <header className="border-b bg-card/80 backdrop-blur-md sticky top-0 z-50">
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
              <div className="p-2 rounded-lg energy-gradient">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">NECID</h1>
                <p className="text-xs text-muted-foreground">National Energy Command & Insights Dashboard</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline" className="professional-gradient text-white border-0">Minister of Energy</Badge>
            <div className="text-sm text-muted-foreground flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full pulse-animation"></div>
              <span>{isClient ? 'Live' : 'Server Data'}</span>
            </div>
            {user && (
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="text-xs">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:inline-block text-sm">{user.name}</span>
                </Button>
                
                {profileOpen && (
                  <div className="absolute right-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50">
                    <div className="p-4 border-b">
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-10 w-10">
                          <AvatarFallback>
                            {user.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-muted-foreground">{user.role} • {user.agency}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-2">
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => {
                          setProfileOpen(false)
                          // Navigate to profile page or show profile modal
                        }}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Profile
                      </Button>
                      <Button 
                        variant="ghost" 
                        className="w-full justify-start"
                        onClick={() => {
                          setProfileOpen(false)
                          logout()
                        }}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`w-64 border-r bg-card/80 backdrop-blur-md ${sidebarOpen ? 'block' : 'hidden'} md:block`}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Energy Agencies</h2>
            <nav className="space-y-2">
              {data.agencies.map((agency) => {
                const IconComponent = agencyIcons[agency.id as keyof typeof agencyIcons] || Building
                return (
                  <Link key={agency.id} href={`/agencies/${agency.id}`}>
                    <button
                      className="w-full flex items-center space-x-3 p-3 rounded-lg hover:bg-accent/50 text-left transition-all duration-200 hover-lift"
                    >
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                        <IconComponent className="h-4 w-4 text-white" />
                      </div>
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
            <TabsList className="grid w-full grid-cols-11 bg-card/80 backdrop-blur-md p-1 rounded-lg">
              <TabsTrigger value="executive" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Executive Summary</TabsTrigger>
              <TabsTrigger value="agencies" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Agency Dashboards</TabsTrigger>
              <TabsTrigger value="financial" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Financial Overview</TabsTrigger>
              <TabsTrigger value="procurements" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Procurements</TabsTrigger>
              <TabsTrigger value="projects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Projects & Contracts</TabsTrigger>
              <TabsTrigger value="esg" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">ESG & Compliance</TabsTrigger>
              <TabsTrigger value="ai-analytics" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">AI Analytics</TabsTrigger>
              <TabsTrigger value="advanced-insights" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Advanced Insights</TabsTrigger>
              <TabsTrigger value="real-time-data" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Real-time Data</TabsTrigger>
              <TabsTrigger value="collaboration" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Collaboration</TabsTrigger>
              <TabsTrigger value="digital-twin" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">Digital Twin</TabsTrigger>
            </TabsList>

            <TabsContent value="executive" className="space-y-6">
              {/* Critical Alerts */}
              <div className="space-y-3">
                {data.alerts.slice(0, 3).map((alert, index) => (
                  <Alert key={alert.id} className={`${alert.type === 'critical' ? 'border-red-500 bg-red-50/50' : alert.type === 'warning' ? 'border-yellow-500 bg-yellow-50/50' : 'border-blue-500 bg-blue-50/50'} backdrop-blur-sm card-shadow`}>
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription>{alert.message}</AlertDescription>
                  </Alert>
                ))}
              </div>

              {/* Executive Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {data.metrics.map((metric, index) => (
                  <Card key={index} className="card-shadow hover-lift bg-card/80 backdrop-blur-md">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.title}</CardTitle>
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                        <Activity className="h-4 w-4 text-white" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">{metric.value}</div>
                      {metric.demand && (
                        <p className="text-xs text-muted-foreground">Demand: {metric.demand}</p>
                      )}
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge 
                          variant={metric.status === 'healthy' ? 'default' : metric.status === 'warning' ? 'secondary' : 'destructive'}
                          className={`${metric.status === 'healthy' ? 'bg-green-500' : metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'} text-white border-0`}
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
              <Card className="card-shadow bg-card/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg success-gradient">
                      <DollarSign className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">Fiscal Summary</span>
                  </CardTitle>
                  <CardDescription>Consolidated financial position across all agencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                      <div className="text-2xl font-bold text-green-600">{data.financial.totalRevenue}</div>
                      <div className="text-sm text-muted-foreground">Total Revenue</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-red-50">
                      <div className="text-2xl font-bold text-orange-600">{data.financial.subsidies}</div>
                      <div className="text-sm text-muted-foreground">Subsidies</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50">
                      <div className="text-2xl font-bold text-yellow-600">{data.financial.receivables}</div>
                      <div className="text-sm text-muted-foreground">Receivables</div>
                    </div>
                    <div className="text-center p-4 rounded-lg bg-gradient-to-br from-red-50 to-pink-50">
                      <div className="text-2xl font-bold text-red-600">{data.financial.liabilities}</div>
                      <div className="text-sm text-muted-foreground">Liabilities</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Flagship Projects */}
              <Card className="card-shadow bg-card/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg warning-gradient">
                      <Target className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">Flagship Project Tracker</span>
                  </CardTitle>
                  <CardDescription>Top ongoing projects with completion status</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.projects.slice(0, 3).map((project, index) => (
                      <div key={project.id} className="p-4 rounded-lg bg-gradient-to-r from-gray-50 to-white border">
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            <h4 className="font-medium">{project.name}</h4>
                            <p className="text-sm text-muted-foreground">{project.cost} • Variance: {project.variance}</p>
                          </div>
                          <Badge variant="outline" className="bg-gradient-to-r from-blue-500 to-purple-500 text-white border-0">{project.progress}%</Badge>
                        </div>
                        <Progress value={project.progress} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Minister's Decision Support */}
              <Card className="card-shadow bg-card/80 backdrop-blur-md">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg professional-gradient">
                      <Shield className="h-5 w-5 text-white" />
                    </div>
                    <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Minister's Decision Support</span>
                  </CardTitle>
                  <CardDescription>Key insights and recommendations for strategic decisions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-green-50 to-emerald-50">
                      <h4 className="font-medium text-green-600">🔍 Critical Success Factors</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Power generation exceeds demand by 5.4% - stable supply</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-green-500 mt-1">✓</span>
                          <span>Transmission reliability at 98.2% - excellent performance</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-yellow-500 mt-1">⚠</span>
                          <span>Fuel stock cover at 18.5 days - requires monitoring</span>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="space-y-4 p-4 rounded-lg bg-gradient-to-br from-red-50 to-pink-50">
                      <h4 className="font-medium text-red-600">🚨 Immediate Attention Required</h4>
                      <ul className="space-y-2 text-sm">
                        <li className="flex items-start space-x-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>ECG distribution efficiency at 76.8% - critical</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-red-500 mt-1">•</span>
                          <span>Western Region gas shortfall risk - high priority</span>
                        </li>
                        <li className="flex items-start space-x-2">
                          <span className="text-orange-500 mt-1">•</span>
                          <span>6 major contracts totaling ₵288M - active monitoring</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                  
                  <Separator className="my-4" />
                  
                  <div className="space-y-4">
                    <h4 className="font-medium text-blue-600">📊 Strategic Recommendations</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                      <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg hover-lift">
                        <div className="font-medium">Short Term (1-3 months)</div>
                        <div>Address ECG distribution losses and gas supply issues</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg hover-lift">
                        <div className="font-medium">Medium Term (3-6 months)</div>
                        <div>Complete delayed projects and expand renewable capacity</div>
                      </div>
                      <div className="p-3 bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg hover-lift">
                        <div className="font-medium">Long Term (6-12 months)</div>
                        <div>Infrastructure modernization and financial optimization</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Key Performance Indicators */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Minister's KPI Dashboard</span>
                  </CardTitle>
                  <CardDescription>Top-level performance indicators for the energy sector</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-green-600">82.4</div>
                      <div className="text-sm text-muted-foreground">Energy Security Index</div>
                      <div className="text-xs text-green-600">Target: 85</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">₵2.8B</div>
                      <div className="text-sm text-muted-foreground">Total Revenue</div>
                      <div className="text-xs text-blue-600">+8.7% YoY</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">85%</div>
                      <div className="text-sm text-muted-foreground">Avg Agency Performance</div>
                      <div className="text-xs text-purple-600">Target: 90%</div>
                    </div>
                    <div className="text-center p-4 border rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">23.5%</div>
                      <div className="text-sm text-muted-foreground">Renewable Energy</div>
                      <div className="text-xs text-orange-600">Target: 30%</div>
                    </div>
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

              {/* Enhanced Financial Position */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <TrendingUp className="h-5 w-5" />
                      <span>Agency Financial Performance</span>
                    </CardTitle>
                    <CardDescription>Net income by agency (₵ Millions)</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {data.financialReports.map((report) => (
                        <div key={report.id} className="flex justify-between items-center p-2 border rounded">
                          <span className="font-medium">{report.agency}</span>
                          <div className="text-right">
                            <div className="font-bold text-green-600">
                              ₵{(report.netIncome / 1000000).toFixed(1)}M
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {report.period} {report.year}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Building className="h-5 w-5" />
                      <span>Asset Portfolio</span>
                    </CardTitle>
                    <CardDescription>Major assets across agencies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {data.assets.slice(0, 5).map((asset) => (
                        <div key={asset.id} className="p-2 border rounded">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-sm">{asset.name}</h4>
                            <Badge variant="outline" className="text-xs">{asset.agency}</Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                            <span>₵{(asset.value / 1000000).toFixed(1)}M</span>
                            <span>{asset.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Liabilities & Obligations</span>
                    </CardTitle>
                    <CardDescription>Outstanding liabilities by agency</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {data.liabilities.map((liability) => (
                        <div key={liability.id} className="p-2 border rounded">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium text-sm">{liability.name}</h4>
                            <Badge variant={liability.status === 'Overdue' ? 'destructive' : 'outline'} className="text-xs">
                              {liability.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-1 text-xs text-muted-foreground">
                            <span>₵{(liability.amount / 1000000).toFixed(1)}M</span>
                            <span>{liability.category}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Financial Health Summary */}
              <Card>
                <CardHeader>
                  <CardTitle>Financial Health Summary</CardTitle>
                  <CardDescription>Consolidated financial position across all agencies</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600">
                        ₵{(data.financialReports.reduce((sum, r) => sum + r.totalAssets, 0) / 1000000000).toFixed(1)}B
                      </div>
                      <div className="text-sm text-muted-foreground">Total Assets</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-red-600">
                        ₵{(data.financialReports.reduce((sum, r) => sum + r.totalLiabilities, 0) / 1000000000).toFixed(1)}B
                      </div>
                      <div className="text-sm text-muted-foreground">Total Liabilities</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-green-600">
                        ₵{(data.financialReports.reduce((sum, r) => sum + r.netIncome, 0) / 1000000000).toFixed(1)}B
                      </div>
                      <div className="text-sm text-muted-foreground">Net Income</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600">
                        {data.financialReports.length}
                      </div>
                      <div className="text-sm text-muted-foreground">Agencies Reporting</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="procurements" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Procurement Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <ShoppingCart className="h-5 w-5" />
                      <span>Procurement Overview</span>
                    </CardTitle>
                    <CardDescription>Recent procurement activities across all agencies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.procurements.slice(0, 5).map((proc) => (
                        <div key={proc.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{proc.title}</h4>
                            <Badge variant={proc.riskLevel === 'High' ? 'destructive' : proc.riskLevel === 'Medium' ? 'secondary' : 'default'}>
                              {proc.riskLevel}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                            <span>Agency: {proc.agency}</span>
                            <span>Category: {proc.category}</span>
                            <span>Value: ₵{(proc.value / 1000000).toFixed(1)}M</span>
                            <span>Status: {proc.status}</span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            Created: {new Date(proc.createdAt).toLocaleDateString()}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Procurement Analytics */}
                <Card>
                  <CardHeader>
                    <CardTitle>Procurement Analytics</CardTitle>
                    <CardDescription>Procurement trends and insights</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            ₵{data.procurements.reduce((sum, p) => sum + p.value, 0).toLocaleString()}
                          </div>
                          <div className="text-sm text-muted-foreground">Total Value</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {data.procurements.filter(p => p.status === 'Completed').length}
                          </div>
                          <div className="text-sm text-muted-foreground">Completed</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">By Agency</h4>
                        {Object.entries(
                          data.procurements.reduce((acc, proc) => {
                            acc[proc.agency] = (acc[proc.agency] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([agency, count]) => (
                          <div key={agency} className="flex justify-between items-center">
                            <span className="text-sm">{agency}</span>
                            <Badge variant="outline">{count}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Risk Assessment & Compliance */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Risk Assessment</span>
                    </CardTitle>
                    <CardDescription>Procurement risk analysis by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-3 gap-4 text-center">
                        <div className="p-3 bg-red-50 rounded-lg">
                          <div className="text-2xl font-bold text-red-600">
                            {data.procurements.filter(p => p.riskLevel === 'High').length}
                          </div>
                          <div className="text-sm text-muted-foreground">High Risk</div>
                        </div>
                        <div className="p-3 bg-yellow-50 rounded-lg">
                          <div className="text-2xl font-bold text-yellow-600">
                            {data.procurements.filter(p => p.riskLevel === 'Medium').length}
                          </div>
                          <div className="text-sm text-muted-foreground">Medium Risk</div>
                        </div>
                        <div className="p-3 bg-green-50 rounded-lg">
                          <div className="text-2xl font-bold text-green-600">
                            {data.procurements.filter(p => p.riskLevel === 'Low').length}
                          </div>
                          <div className="text-sm text-muted-foreground">Low Risk</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">High Risk Procurements</h4>
                        {data.procurements.filter(p => p.riskLevel === 'High').map((proc) => (
                          <div key={proc.id} className="p-2 border border-red-200 rounded bg-red-50">
                            <div className="flex justify-between items-center">
                              <span className="text-sm font-medium">{proc.title}</span>
                              <Badge variant="destructive" className="text-xs">{proc.agency}</Badge>
                            </div>
                            <div className="text-xs text-muted-foreground">
                              ₵{(proc.value / 1000000).toFixed(1)}M • {proc.category}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Shield className="h-5 w-5" />
                      <span>Compliance Monitoring</span>
                    </CardTitle>
                    <CardDescription>Procurement compliance status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600">
                            {Math.round((data.procurements.filter(p => p.status === 'Completed' || p.status === 'Approved').length / data.procurements.length) * 100)}%
                          </div>
                          <div className="text-sm text-muted-foreground">Compliance Rate</div>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600">
                            {data.procurements.filter(p => p.status === 'Pending').length}
                          </div>
                          <div className="text-sm text-muted-foreground">Pending Review</div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <h4 className="font-medium">By Status</h4>
                        {Object.entries(
                          data.procurements.reduce((acc, proc) => {
                            acc[proc.status] = (acc[proc.status] || 0) + 1;
                            return acc;
                          }, {} as Record<string, number>)
                        ).map(([status, count]) => (
                          <div key={status} className="flex justify-between items-center">
                            <span className="text-sm">{status}</span>
                            <div className="flex items-center space-x-2">
                              <Progress value={(count / data.procurements.length) * 100} className="h-2 w-16" />
                              <Badge variant="outline" className="text-xs">{count}</Badge>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Benchmarking */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5" />
                    <span>Agency Performance Benchmarking</span>
                  </CardTitle>
                  <CardDescription>Comparative analysis of agency procurement efficiency</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {data.agencies.slice(0, 3).map((agency) => {
                        const agencyProcurements = data.procurements.filter(p => p.agency === agency.name);
                        const avgValue = agencyProcurements.length > 0 ? agencyProcurements.reduce((sum, p) => sum + p.value, 0) / agencyProcurements.length : 0;
                        const completionRate = agencyProcurements.length > 0 ? (agencyProcurements.filter(p => p.status === 'Completed').length / agencyProcurements.length) * 100 : 0;
                        
                        return (
                          <div key={agency.id} className="p-4 border rounded-lg">
                            <div className="flex justify-between items-start mb-3">
                              <h4 className="font-medium">{agency.name}</h4>
                              <Badge variant="outline">{agency.performance}%</Badge>
                            </div>
                            <div className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>Procurements</span>
                                <span className="font-medium">{agencyProcurements.length}</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Avg Value</span>
                                <span className="font-medium">₵{(avgValue / 1000000).toFixed(1)}M</span>
                              </div>
                              <div className="flex justify-between text-sm">
                                <span>Completion</span>
                                <span className="font-medium">{completionRate.toFixed(0)}%</span>
                              </div>
                              <Progress value={completionRate} className="h-2 mt-1" />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="projects" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Active Projects */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Briefcase className="h-5 w-5" />
                      <span>Active Projects</span>
                    </CardTitle>
                    <CardDescription>Current projects across all agencies</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.projects.map((project) => (
                        <div key={project.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{project.name}</h4>
                            <Badge variant={project.status === 'on-track' ? 'default' : project.status === 'delayed' ? 'secondary' : 'destructive'}>
                              {project.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                            <span>Cost: {project.cost}</span>
                            <span>Variance: {project.variance}</span>
                          </div>
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{project.progress}%</span>
                            </div>
                            <Progress value={project.progress} className="h-2" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Major Contracts */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <FileText className="h-5 w-5" />
                      <span>Major Contracts</span>
                    </CardTitle>
                    <CardDescription>Active contracts and their status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {data.contracts.map((contract) => (
                        <div key={contract.id} className="p-3 border rounded-lg">
                          <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium">{contract.title}</h4>
                            <Badge variant={contract.status === 'Active' ? 'default' : 'secondary'}>
                              {contract.status}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                            <span>Agency: {contract.agency}</span>
                            <span>Contractor: {contract.contractor}</span>
                            <span>Value: ₵{(contract.value / 1000000).toFixed(1)}M</span>
                            <span>Ends: {new Date(contract.endDate).getFullYear()}</span>
                          </div>
                        </div>
                      ))}
                    </div>
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

            {/* AI Analytics Tab */}
            <TabsContent value="ai-analytics" className="space-y-6">
              <AIPredictiveAnalytics />
            </TabsContent>

            {/* Advanced Insights Tab */}
            <TabsContent value="advanced-insights" className="space-y-6">
              <AdvancedAIInsights />
            </TabsContent>

            {/* Real-time Data Tab */}
            <TabsContent value="real-time-data" className="space-y-6">
              <RealTimeDataIntegration />
            </TabsContent>

            {/* Collaboration Tab */}
            <TabsContent value="collaboration" className="space-y-6">
              <RealTimeCollaboration />
            </TabsContent>

            {/* Digital Twin Tab */}
            <TabsContent value="digital-twin" className="space-y-6">
              <DigitalTwinIntegration />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  )
}

// Wrap the component with AuthGuard
function ProtectedHome() {
  return (
    <AuthGuard>
      <Home />
    </AuthGuard>
  )
}

export default ProtectedHome