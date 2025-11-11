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
  Leaf,
  TreePine,
  Factory,
  ArrowLeft,
  Shield,
  Target,
  Wind
} from 'lucide-react'
import { 
  RevenueChart,
  ComplianceChart
} from '@/components/charts'
import Link from 'next/link'

interface EPAData {
  overview: {
    efficiency: string
    inspections: string
    violations: string
    compliance: string
    companies: string
    satisfaction: string
  }
  operations: {
    inspections: Array<{
      sector: string
      conducted: number
      violations: number
      compliance: number
    }>
    environmental: Array<{
      metric: string
      current: number
      target: number
      status: string
    }>
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
  }>
}

export default function EPADashboard() {
  const [data, setData] = useState<EPAData | null>(null)

  useEffect(() => {
    setData({
      overview: {
        efficiency: '84.7%',
        inspections: '1,247',
        violations: '156',
        compliance: '88.3%',
        companies: '2,847',
        satisfaction: '82.1%'
      },
      operations: {
        inspections: [
          { sector: 'Mining', conducted: 245, violations: 45, compliance: 81.6 },
          { sector: 'Manufacturing', conducted: 387, violations: 52, compliance: 86.6 },
          { sector: 'Oil & Gas', conducted: 156, violations: 28, compliance: 82.1 },
          { sector: 'Agriculture', conducted: 289, violations: 18, compliance: 93.8 },
          { sector: 'Construction', conducted: 170, violations: 13, compliance: 92.4 }
        ],
        environmental: [
          { metric: 'Air Quality', current: 87, target: 90, status: 'Good' },
          { metric: 'Water Quality', current: 82, target: 85, status: 'Fair' },
          { metric: 'Soil Quality', current: 78, target: 80, status: 'Fair' },
          { metric: 'Noise Levels', current: 91, target: 85, status: 'Poor' }
        ]
      },
      alerts: [
        { id: '1', type: 'critical', message: 'Oil spill detected at Takoradi port - emergency response deployed', timestamp: '2024-01-15T08:30:00Z' },
        { id: '2', type: 'warning', message: 'High air pollution levels in Accra industrial area', timestamp: '2024-01-14T16:20:00Z' },
        { id: '3', type: 'info', message: 'Environmental impact assessment completed for new mining project', timestamp: '2024-01-13T11:45:00Z' }
      ]
    })
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading EPA Dashboard...</p>
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
              <Leaf className="h-8 w-8 text-green-600" />
              <div>
                <h1 className="text-xl font-bold">EPA</h1>
                <p className="text-xs text-muted-foreground">Environmental Protection Agency</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Environmental Regulation</Badge>
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
            <TabsTrigger value="inspections">Inspections</TabsTrigger>
            <TabsTrigger value="environmental">Environmental</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="enforcement">Enforcement</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Operational Efficiency</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.efficiency}</div>
                  <p className="text-xs text-muted-foreground">+3.2% improvement</p>
                  <Progress value={85} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Inspections</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.inspections}</div>
                  <p className="text-xs text-muted-foreground">This quarter</p>
                  <Progress value={78} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Violations Found</CardTitle>
                  <AlertTriangle className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.violations}</div>
                  <p className="text-xs text-muted-foreground">12.5% violation rate</p>
                  <Progress value={13} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Compliance Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.compliance}</div>
                  <p className="text-xs text-muted-foreground">Above target</p>
                  <Progress value={88} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Registered Companies</CardTitle>
                  <Factory className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.companies}</div>
                  <p className="text-xs text-muted-foreground">+156 new this year</p>
                  <Progress value={82} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Public Satisfaction</CardTitle>
                  <Leaf className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.satisfaction}</div>
                  <p className="text-xs text-muted-foreground">Environmental protection</p>
                  <Progress value={82} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Compliance Trends</CardTitle>
                <CardDescription>Monthly environmental compliance performance</CardDescription>
              </CardHeader>
              <CardContent>
                <ComplianceChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inspections" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5" />
                  <span>Inspection Results</span>
                </CardTitle>
                <CardDescription>Environmental inspection performance by sector</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.operations.inspections.map((inspection, index) => (
                    <div key={index} className="p-3 border rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{inspection.sector}</h4>
                        <Badge variant="outline">{inspection.compliance}%</Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-2 text-sm text-muted-foreground mb-2">
                        <span>Conducted: {inspection.conducted}</span>
                        <span>Violations: {inspection.violations}</span>
                        <span>Compliance: {inspection.compliance}%</span>
                      </div>
                      <Progress value={inspection.compliance} className="h-2" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TreePine className="h-5 w-5" />
                  <span>Environmental Indicators</span>
                </CardTitle>
                <CardDescription>Current environmental quality metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.operations.environmental.map((metric, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{metric.metric}</h4>
                        <div className="text-2xl font-bold mb-2">{metric.current}%</div>
                        <div className="text-sm text-muted-foreground mb-2">Target: {metric.target}%</div>
                        <Badge variant={metric.status === 'Good' ? 'default' : metric.status === 'Fair' ? 'secondary' : 'destructive'}>
                          {metric.status}
                        </Badge>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Monthly revenue from environmental permits and fines</CardDescription>
              </CardHeader>
              <CardContent>
                <RevenueChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="enforcement" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Wind className="h-5 w-5" />
                  <span>Enforcement Actions</span>
                </CardTitle>
                <CardDescription>Recent enforcement activities and penalties</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Fines Issued</h4>
                      <div className="text-2xl font-bold mb-2">₵2.8M</div>
                      <p className="text-sm text-muted-foreground">This quarter</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Facilities Closed</h4>
                      <div className="text-2xl font-bold mb-2">12</div>
                      <p className="text-sm text-muted-foreground">For violations</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4">
                      <h4 className="font-medium mb-2">Cases Prosecuted</h4>
                      <div className="text-2xl font-bold mb-2">28</div>
                      <p className="text-sm text-muted-foreground">In court</p>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}