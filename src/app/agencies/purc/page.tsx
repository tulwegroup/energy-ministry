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
  Scale,
  Users,
  FileText,
  ArrowLeft,
  Shield,
  Target,
  Gavel
} from 'lucide-react'
import { 
  RevenueChart,
  ComplianceChart
} from '@/components/charts'
import Link from 'next/link'

interface PURCData {
  overview: {
    efficiency: string
    complaints: string
    resolutions: string
    revenue: string
    utilities: string
    satisfaction: string
  }
  operations: {
    utilities: Array<{
      name: string
      type: string
      complaints: number
      resolved: number
      resolution: number
    }>
    regulations: Array<{
      type: string
      pending: number
      approved: number
      implementation: string
    }>
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
  }>
}

export default function PURCDashboard() {
  const [data, setData] = useState<PURCData | null>(null)

  useEffect(() => {
    setData({
      overview: {
        efficiency: '83.1%',
        complaints: '2,847',
        resolutions: '2,456',
        revenue: '₵125M',
        utilities: '8',
        satisfaction: '86.2%'
      },
      operations: {
        utilities: [
          { name: 'ECG', type: 'Electricity', complaints: 1245, resolved: 1089, resolution: 87.5 },
          { name: 'GWCL', type: 'Water', complaints: 856, resolved: 742, resolution: 86.7 },
          { name: 'GOIL', type: 'Petroleum', complaints: 324, resolved: 285, resolution: 88.0 },
          { name: 'TotalEnergies', type: 'Petroleum', complaints: 256, resolved: 224, resolution: 87.5 },
          { name: 'Shell', type: 'Petroleum', complaints: 166, resolved: 116, resolution: 69.9 }
        ],
        regulations: [
          { type: 'Tariff Reviews', pending: 12, approved: 8, implementation: 'Q2 2024' },
          { type: 'Quality Standards', pending: 8, approved: 15, implementation: 'Q1 2024' },
          { type: 'Service Guidelines', pending: 6, approved: 12, implementation: 'Q3 2024' }
        ]
      },
      alerts: [
        { id: '1', type: 'warning', message: 'High complaint volume against ECG - 15% increase', timestamp: '2024-01-15T10:30:00Z' },
        { id: '2', type: 'info', message: 'Public hearing scheduled for water tariff review', timestamp: '2024-01-14T14:20:00Z' },
        { id: '3', type: 'critical', message: 'Service quality violations detected at 3 petroleum companies', timestamp: '2024-01-13T16:45:00Z' }
      ]
    })
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading PURC Dashboard...</p>
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
              <Scale className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold">PURC</h1>
                <p className="text-xs text-muted-foreground">Public Utilities Regulatory Commission</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Utilities Regulation</Badge>
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
            <TabsTrigger value="complaints">Complaints</TabsTrigger>
            <TabsTrigger value="regulations">Regulations</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Regulatory Efficiency</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.efficiency}</div>
                  <p className="text-xs text-muted-foreground">+2.3% improvement</p>
                  <Progress value={83} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Complaints</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.complaints}</div>
                  <p className="text-xs text-muted-foreground">This month</p>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.resolutions}</div>
                  <p className="text-xs text-muted-foreground">86.2% resolved</p>
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
                  <p className="text-xs text-muted-foreground">+5.2% YoY growth</p>
                  <Progress value={78} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Regulated Utilities</CardTitle>
                  <Gavel className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.utilities}</div>
                  <p className="text-xs text-muted-foreground">Active sectors</p>
                  <Progress value={80} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Public Satisfaction</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.satisfaction}</div>
                  <p className="text-xs text-muted-foreground">Above target</p>
                  <Progress value={86} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Trends</CardTitle>
                <CardDescription>Monthly compliance performance across utilities</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="complaints" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5" />
                  <span>Utility Complaints</span>
                </CardTitle>
                <CardDescription>Complaint resolution performance by utility</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.operations.utilities.map((utility, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{utility.name}</h4>
                        <Badge variant="outline">{utility.resolution}%</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
                        <span>Type: {utility.type}</span>
                        <span>Complaints: {utility.complaints}</span>
                        <span>Resolved: {utility.resolved}</span>
                      </div>
                      <Progress value={utility.resolution} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="regulations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Gavel className="h-5 w-5" />
                  <span>Regulatory Activities</span>
                </CardTitle>
                <CardDescription>Current regulatory review and approval status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {data.operations.regulations.map((regulation, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{regulation.type}</h4>
                        <div className="grid grid-cols-2 gap-2 text-sm text-muted-foreground mb-2">
                          <span>Pending: {regulation.pending}</span>
                          <span>Approved: {regulation.approved}</span>
                        </div>
                        <Badge variant="outline">{regulation.implementation}</Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Monthly revenue from regulatory fees</CardDescription>
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