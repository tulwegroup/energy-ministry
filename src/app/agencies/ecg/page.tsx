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
  Zap,
  Users,
  MapPin,
  FileText,
  ArrowLeft,
  Shield,
  Target,
  Home,
  Factory,
  Power
} from 'lucide-react'
import { 
  ElectricityChart,
  LossesChart,
  RevenueChart as ECGRevenueChart,
  CustomerChart
} from '@/components/charts'
import Link from 'next/link'

interface ECGData {
  overview: {
    totalCustomers: string
    electricitySupply: string
    collectionRate: string
    technicalLosses: string
    revenue: string
    reliability: string
  }
  operations: {
    supply: Array<{
      region: string
      demand: string
      supply: string
      deficit: string
      reliability: number
    }>
    losses: Array<{
      type: string
      commercial: number
      technical: number
      total: number
    }>
    revenue: Array<{
      category: string
      billed: string
      collected: string
      collection: number
    }>
  }
  customers: {
    categories: Array<{
      type: string
      count: string
      consumption: string
      revenue: string
    }>
    satisfaction: Array<{
      metric: string
      score: number
      target: number
    }>
    complaints: Array<{
      type: string
      resolved: number
      pending: number
      resolution: number
    }>
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
  }>
}

export default function ECGDashboard() {
  const [data, setData] = useState<ECGData | null>(null)

  useEffect(() => {
    // Mock ECG data - in real implementation, this would come from API
    setData({
      overview: {
        totalCustomers: '4.2M',
        electricitySupply: '2,847 MW',
        collectionRate: '78.2%',
        technicalLosses: '24.5%',
        revenue: '₵3.8B',
        reliability: '89.7%'
      },
      operations: {
        supply: [
          { region: 'Greater Accra', demand: '850 MW', supply: '820 MW', deficit: '30 MW', reliability: 96.5 },
          { region: 'Ashanti', demand: '620 MW', supply: '580 MW', deficit: '40 MW', reliability: 93.5 },
          { region: 'Western', demand: '380 MW', supply: '340 MW', deficit: '40 MW', reliability: 89.5 },
          { region: 'Eastern', demand: '290 MW', supply: '260 MW', deficit: '30 MW', reliability: 89.7 },
          { region: 'Northern', demand: '220 MW', supply: '195 MW', deficit: '25 MW', reliability: 88.6 }
        ],
        losses: [
          { type: 'Commercial Losses', commercial: 18.5, technical: 6.0, total: 24.5 },
          { type: 'Technical Losses', commercial: 2.5, technical: 22.0, total: 24.5 },
          { type: 'Total System Losses', commercial: 21.0, technical: 28.0, total: 49.0 }
        ],
        revenue: [
          { category: 'Residential', billed: '₵1.2B', collected: '₵936M', collection: 78.0 },
          { category: 'Commercial', billed: '₵1.8B', collected: '₵1.4B', collection: 77.8 },
          { category: 'Industrial', billed: '₵800M', collected: '₵624M', collection: 78.0 }
        ]
      },
      customers: {
        categories: [
          { type: 'Residential', count: '3.8M', consumption: '4,250 GWh', revenue: '₵1.2B' },
          { type: 'Commercial', count: '285K', consumption: '2,850 GWh', revenue: '₵1.8B' },
          { type: 'Industrial', count: '45K', consumption: '1,200 GWh', revenue: '₵800M' },
          { type: 'Street Lighting', count: '125K', consumption: '180 GWh', revenue: '₵50M' }
        ],
        satisfaction: [
          { metric: 'Power Quality', score: 82, target: 85 },
          { metric: 'Service Reliability', score: 78, target: 80 },
          { metric: 'Customer Service', score: 85, target: 85 },
          { metric: 'Billing Accuracy', score: 88, target: 90 }
        ],
        complaints: [
          { type: 'Power Outages', resolved: 1245, pending: 89, resolution: 93.3 },
          { type: 'Billing Issues', resolved: 892, pending: 156, resolution: 85.1 },
          { type: 'New Connections', resolved: 445, pending: 78, resolution: 85.1 },
          { type: 'Meter Issues', resolved: 678, pending: 45, resolution: 93.8 }
        ]
      },
      alerts: [
        { id: '1', type: 'critical', message: 'Major transformer failure at Kumasi substation affecting 50,000 customers', timestamp: '2024-01-15T14:30:00Z' },
        { id: '2', type: 'warning', message: 'High commercial losses detected in Ashanti Region - 26.8%', timestamp: '2024-01-15T11:20:00Z' },
        { id: '3', type: 'info', message: 'Scheduled maintenance for Tema-Accra transmission line this weekend', timestamp: '2024-01-14T09:15:00Z' }
      ]
    })
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading ECG Dashboard...</p>
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
              <Zap className="h-8 w-8 text-yellow-600" />
              <div>
                <h1 className="text-xl font-bold">ECG</h1>
                <p className="text-xs text-muted-foreground">Electricity Company of Ghana</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Power Distribution</Badge>
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
            <TabsTrigger value="customers">Customers</TabsTrigger>
            <TabsTrigger value="revenue">Revenue</TabsTrigger>
            <TabsTrigger value="losses">Losses</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.totalCustomers}</div>
                  <p className="text-xs text-muted-foreground">+5.2% from last year</p>
                  <Progress value={85} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Electricity Supply</CardTitle>
                  <Power className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.electricitySupply}</div>
                  <p className="text-xs text-muted-foreground">Peak demand</p>
                  <Progress value={78} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Collection Rate</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.collectionRate}</div>
                  <p className="text-xs text-muted-foreground">+2.1% improvement</p>
                  <Progress value={78} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">System Losses</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.technicalLosses}</div>
                  <p className="text-xs text-muted-foreground">Target: 20%</p>
                  <Progress value={76} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.revenue}</div>
                  <p className="text-xs text-muted-foreground">+8.7% YoY growth</p>
                  <Progress value={88} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Reliability</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.reliability}</div>
                  <p className="text-xs text-muted-foreground">Service availability</p>
                  <Progress value={90} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Electricity Supply Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Electricity Supply Trends</CardTitle>
                <CardDescription>Monthly supply and demand analysis</CardDescription>
              </CardHeader>
              <CardContent>
                <ElectricityChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Regional Supply */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5" />
                    <span>Regional Supply</span>
                  </CardTitle>
                  <CardDescription>Power supply by region</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.supply.map((supply, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{supply.region}</h4>
                          <Badge variant="outline">{supply.reliability}%</Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
                          <span>Demand: {supply.demand}</span>
                          <span>Supply: {supply.supply}</span>
                          <span>Deficit: {supply.deficit}</span>
                        </div>
                        <Progress value={supply.reliability} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Loss Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <AlertTriangle className="h-5 w-5" />
                    <span>Loss Analysis</span>
                  </CardTitle>
                  <CardDescription>System losses breakdown</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.losses.map((loss, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <h4 className="font-medium mb-2">{loss.type}</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Commercial</span>
                            <span className="text-sm font-medium">{loss.commercial}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Technical</span>
                            <span className="text-sm font-medium">{loss.technical}%</span>
                          </div>
                          <div className="flex justify-between items-center font-medium">
                            <span className="text-sm">Total</span>
                            <span className="text-sm">{loss.total}%</span>
                          </div>
                        </div>
                        <Progress value={loss.total} className="h-2 mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="customers" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Customer Categories */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5" />
                    <span>Customer Categories</span>
                  </CardTitle>
                  <CardDescription>Customer breakdown by type</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.customers.categories.map((category, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{category.type}</h4>
                          <Badge variant="outline">{category.count}</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground">
                          <span>Consumption: {category.consumption}</span>
                          <span>Revenue: {category.revenue}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Satisfaction */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Customer Satisfaction</span>
                  </CardTitle>
                  <CardDescription>Service quality metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.customers.satisfaction.map((metric, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{metric.metric}</h4>
                          <Badge variant="outline">{metric.score}%</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                          <span>Current: {metric.score}%</span>
                          <span>Target: {metric.target}%</span>
                        </div>
                        <Progress value={metric.score} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Customer Complaints */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <FileText className="h-5 w-5" />
                    <span>Complaint Resolution</span>
                  </CardTitle>
                  <CardDescription>Customer complaints and resolution rates</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.customers.complaints.map((complaint, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{complaint.type}</h4>
                          <div className="text-2xl font-bold mb-2">{complaint.resolution}%</div>
                          <p className="text-sm text-muted-foreground mb-2">Resolution Rate</p>
                          <div className="text-xs text-muted-foreground">
                            <div>Resolved: {complaint.resolved}</div>
                            <div>Pending: {complaint.pending}</div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="revenue" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Collection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Revenue Collection</span>
                  </CardTitle>
                  <CardDescription>Billing and collection performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.revenue.map((revenue, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{revenue.category}</h4>
                          <Badge variant="outline">{revenue.collection}%</Badge>
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                          <span>Billed: {revenue.billed}</span>
                          <span>Collected: {revenue.collected}</span>
                        </div>
                        <Progress value={revenue.collection} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trends</CardTitle>
                  <CardDescription>Monthly revenue performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ECGRevenueChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="losses" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5" />
                  <span>System Losses Analysis</span>
                </CardTitle>
                <CardDescription>Technical and commercial losses trends</CardDescription>
              </CardHeader>
              <CardContent>
                <LossesChart />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Customer Metrics</CardTitle>
                <CardDescription>Customer growth and satisfaction trends</CardDescription>
              </CardHeader>
              <CardContent>
                <CustomerChart />
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}