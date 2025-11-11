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
  Scale,
  FileText,
  ArrowLeft,
  Shield,
  Target,
  Users,
  Truck,
  Droplet
} from 'lucide-react'
import { 
  PricingChart,
  ComplianceChart,
  MarketShareChart,
  QualityChart
} from '@/components/charts'
import Link from 'next/link'

interface NPAData {
  overview: {
    efficiency: string
    pricingStability: string
    marketCompliance: string
    qualityStandards: string
    licensedOMCs: string
    consumerProtection: string
  }
  operations: {
    pricing: Array<{
      product: string
      currentPrice: string
      previousPrice: string
      change: string
      effectiveDate: string
    }>
    compliance: Array<{
      category: string
      complianceRate: number
      violations: number
      penalties: string
    }>
    quality: Array<{
      parameter: string
      standard: string
      passRate: number
      samples: number
    }>
  }
  market: {
    marketShare: Array<{ company: string; percentage: number; volume: string }>
    consumption: Array<{ month: string; volume: number; value: number }>
    imports: Array<{ product: string; volume: string; source: string }>
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
  }>
}

export default function NPADashboard() {
  const [data, setData] = useState<NPAData | null>(null)

  useEffect(() => {
    // Mock NPA data - in real implementation, this would come from API
    setData({
      overview: {
        efficiency: '82.4%',
        pricingStability: '94.7%',
        marketCompliance: '87.3%',
        qualityStandards: '91.8%',
        licensedOMCs: '142',
        consumerProtection: '96.2%'
      },
      operations: {
        pricing: [
          { product: 'Petrol (Super)', currentPrice: '₵12.85', previousPrice: '₵12.65', change: '+1.6%', effectiveDate: '2024-01-15' },
          { product: 'Diesel', currentPrice: '₵13.20', previousPrice: '₵13.05', change: '+1.1%', effectiveDate: '2024-01-15' },
          { product: 'Kerosene', currentPrice: '₵11.45', previousPrice: '₵11.30', change: '+1.3%', effectiveDate: '2024-01-15' },
          { product: 'LPG (per kg)', currentPrice: '₵10.80', previousPrice: '₵10.60', change: '+1.9%', effectiveDate: '2024-01-15' }
        ],
        compliance: [
          { category: 'Pricing Compliance', complianceRate: 87, violations: 23, penalties: '₵2.3M' },
          { category: 'Quality Standards', complianceRate: 92, violations: 8, penalties: '₵1.2M' },
          { category: 'Safety Regulations', complianceRate: 89, violations: 15, penalties: '₵1.8M' },
          { category: 'Environmental Standards', complianceRate: 85, violations: 18, penalties: '₵2.1M' }
        ],
        quality: [
          { parameter: 'Octane Rating', standard: 'RON 91-95', passRate: 94, samples: 1250 },
          { parameter: 'Sulphur Content', standard: '<50 ppm', passRate: 91, samples: 1250 },
          { parameter: 'Water Content', standard: '<200 mg/kg', passRate: 96, samples: 1250 },
          { parameter: 'Density', standard: '720-775 kg/m³', passRate: 93, samples: 1250 }
        ]
      },
      market: {
        marketShare: [
          { company: 'GOIL', percentage: 28.5, volume: '125.3M liters' },
          { company: 'TotalEnergies', percentage: 18.2, volume: '80.1M liters' },
          { company: 'Shell', percentage: 15.8, volume: '69.5M liters' },
          { company: 'Engen', percentage: 12.4, volume: '54.6M liters' },
          { company: 'Puma Energy', percentage: 10.3, volume: '45.2M liters' },
          { company: 'Others', percentage: 14.8, volume: '65.0M liters' }
        ],
        consumption: [
          { month: 'Jan', volume: 420, value: 5.2 },
          { month: 'Feb', volume: 385, value: 4.8 },
          { month: 'Mar', volume: 445, value: 5.6 },
          { month: 'Apr', volume: 410, value: 5.1 },
          { month: 'May', volume: 435, value: 5.4 },
          { month: 'Jun', volume: 460, value: 5.8 }
        ],
        imports: [
          { product: 'Petrol', volume: '180.5M liters', source: 'Netherlands, Belgium' },
          { product: 'Diesel', volume: '220.3M liters', source: 'Netherlands, UK' },
          { product: 'Kerosene', volume: '45.2M liters', source: 'Netherlands, USA' },
          { product: 'LPG', volume: '85.7M kg', source: 'Nigeria, Togo' }
        ]
      },
      alerts: [
        { id: '1', type: 'warning', message: 'Price compliance issues detected in Ashanti Region', timestamp: '2024-01-15T11:30:00Z' },
        { id: '2', type: 'critical', message: 'Quality standards violation at 3 OMCs in Accra', timestamp: '2024-01-14T16:45:00Z' },
        { id: '3', type: 'info', message: 'Monthly pricing review scheduled for next week', timestamp: '2024-01-13T09:20:00Z' }
      ]
    })
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading NPA Dashboard...</p>
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
              <Scale className="h-8 w-8 text-purple-600" />
              <div>
                <h1 className="text-xl font-bold">NPA</h1>
                <p className="text-xs text-muted-foreground">National Petroleum Authority</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Petroleum Regulatory</Badge>
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
            <TabsTrigger value="pricing">Pricing</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="quality">Quality</TabsTrigger>
            <TabsTrigger value="market">Market</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Regulatory Efficiency</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.efficiency}</div>
                  <p className="text-xs text-muted-foreground">+3.2% from last quarter</p>
                  <Progress value={82} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Pricing Stability</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.pricingStability}</div>
                  <p className="text-xs text-muted-foreground">Within target range</p>
                  <Progress value={95} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Market Compliance</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.marketCompliance}</div>
                  <p className="text-xs text-muted-foreground">Above regulatory minimum</p>
                  <Progress value={87} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Quality Standards</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.qualityStandards}</div>
                  <p className="text-xs text-muted-foreground">Exceeding expectations</p>
                  <Progress value={92} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Licensed OMCs</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.licensedOMCs}</div>
                  <p className="text-xs text-muted-foreground">Active operators</p>
                  <Progress value={78} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Consumer Protection</CardTitle>
                  <Shield className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.consumerProtection}</div>
                  <p className="text-xs text-muted-foreground">Complaint resolution rate</p>
                  <Progress value={96} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            {/* Market Share Chart */}
            <Card>
              <CardHeader>
                <CardTitle>Market Share Distribution</CardTitle>
                <CardDescription>Top petroleum product distributors</CardDescription>
              </CardHeader>
              <CardContent>
                <MarketShareChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Current Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <DollarSign className="h-5 w-5" />
                    <span>Current Pricing</CardTitle>
                  </CardTitle>
                  <CardDescription>Latest approved petroleum product prices</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.pricing.map((price, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{price.product}</h4>
                          <Badge variant={price.change.startsWith('+') ? 'destructive' : 'default'}>
                            {price.change}
                          </Badge>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Previous: {price.previousPrice}</span>
                          <span className="text-lg font-bold">{price.currentPrice}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">Effective: {price.effectiveDate}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Pricing Trends</CardTitle>
                  <CardDescription>Historical price movements</CardDescription>
                </CardHeader>
                <CardContent>
                  <PricingChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="compliance" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Compliance Overview */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Shield className="h-5 w-5" />
                    <span>Compliance Overview</span>
                  </CardTitle>
                  <CardDescription>Regulatory compliance metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.compliance.map((compliance, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{compliance.category}</h4>
                          <Badge variant="outline">{compliance.complianceRate}%</Badge>
                        </div>
                        <div className="flex justify-between items-center text-sm text-muted-foreground mb-2">
                          <span>Violations: {compliance.violations}</span>
                          <span>Penalties: {compliance.penalties}</span>
                        </div>
                        <Progress value={compliance.complianceRate} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Compliance Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Compliance Trends</CardTitle>
                  <CardDescription>Monthly compliance performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ComplianceChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="quality" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Quality Standards */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Target className="h-5 w-5" />
                    <span>Quality Standards</span>
                  </CardTitle>
                  <CardDescription>Product quality testing results</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.operations.quality.map((quality, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{quality.parameter}</h4>
                          <Badge variant="outline">{quality.passRate}%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">Standard: {quality.standard}</p>
                        <div className="flex justify-between items-center text-sm text-muted-foreground">
                          <span>Samples Tested: {quality.samples}</span>
                          <span>Pass Rate: {quality.passRate}%</span>
                        </div>
                        <Progress value={quality.passRate} className="h-2 mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Quality Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Quality Trends</CardTitle>
                  <CardDescription>Monthly quality compliance</CardDescription>
                </CardHeader>
                <CardContent>
                  <QualityChart />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="market" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Market Share */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <BarChart3 className="h-5 w-5" />
                    <span>Market Share</span>
                  </CardTitle>
                  <CardDescription>Top petroleum distributors</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.market.marketShare.map((company, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-medium">{company.company}</h4>
                          <Badge variant="outline">{company.percentage}%</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">Volume: {company.volume}</p>
                        <Progress value={company.percentage} className="h-2 mt-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Consumption Trends */}
              <Card>
                <CardHeader>
                  <CardTitle>Consumption Trends</CardTitle>
                  <CardDescription>Monthly petroleum consumption</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {data.market.consumption.map((month, index) => (
                      <div key={index} className="p-3 border rounded-lg">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{month.month}</span>
                          <div className="text-right">
                            <div className="font-bold">{month.volume}M liters</div>
                            <div className="text-sm text-muted-foreground">₵{month.value}B</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Import Sources */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5" />
                    <span>Import Sources</span>
                  </CardTitle>
                  <CardDescription>Monthly petroleum imports by source</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {data.market.imports.map((importItem, index) => (
                      <Card key={index}>
                        <CardContent className="p-4">
                          <h4 className="font-medium mb-2">{importItem.product}</h4>
                          <p className="text-lg font-bold">{importItem.volume}</p>
                          <p className="text-sm text-muted-foreground">{importItem.source}</p>
                        </CardContent>
                      </Card>
                    ))}
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