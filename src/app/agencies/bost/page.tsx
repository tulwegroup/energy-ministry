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
  Warehouse,
  Truck,
  Droplet,
  ArrowLeft,
  Shield,
  Target,
  Fuel
} from 'lucide-react'
import { 
  InventoryChart,
  RevenueChart
} from '@/components/charts'
import Link from 'next/link'

interface BOSTData {
  overview: {
    storageCapacity: string
    currentStock: string
    efficiency: string
    revenue: string
    depots: string
    utilization: string
  }
  operations: {
    depots: Array<{
      name: string
      location: string
      capacity: string
      current: string
      utilization: number
    }>
    products: Array<{
      product: string
      capacity: string
      current: string
      turnover: string
    }>
  }
  alerts: Array<{
    id: string
    type: 'critical' | 'warning' | 'info'
    message: string
    timestamp: string
  }>
}

export default function BOSTDashboard() {
  const [data, setData] = useState<BOSTData | null>(null)

  useEffect(() => {
    setData({
      overview: {
        storageCapacity: '850,000 MT',
        currentStock: '645,000 MT',
        efficiency: '77.3%',
        revenue: '₵850M',
        depots: '12',
        utilization: '75.9%'
      },
      operations: {
        depots: [
          { name: 'Accra Plains', location: 'Accra', capacity: '120,000 MT', current: '95,000 MT', utilization: 79.2 },
          { name: 'Kumasi', location: 'Kumasi', capacity: '85,000 MT', current: '68,000 MT', utilization: 80.0 },
          { name: 'Takoradi', location: 'Takoradi', capacity: '95,000 MT', current: '72,000 MT', utilization: 75.8 },
          { name: 'Buipe', location: 'Buipe', capacity: '65,000 MT', current: '48,000 MT', utilization: 73.8 },
          { name: 'Tamale', location: 'Tamale', capacity: '75,000 MT', current: '56,000 MT', utilization: 74.7 }
        ],
        products: [
          { product: 'Petrol', capacity: '340,000 MT', current: '265,000 MT', turnover: '18.5 days' },
          { product: 'Diesel', capacity: '380,000 MT', current: '295,000 MT', turnover: '22.3 days' },
          { product: 'Kerosene', capacity: '80,000 MT', current: '52,000 MT', turnover: '15.8 days' },
          { product: 'LPG', capacity: '50,000 MT', current: '33,000 MT', turnover: '12.2 days' }
        ]
      },
      alerts: [
        { id: '1', type: 'warning', message: 'Low diesel stock at Kumasi depot - 15 days cover', timestamp: '2024-01-15T11:30:00Z' },
        { id: '2', type: 'info', message: 'Scheduled maintenance for Accra Plains depot pumps', timestamp: '2024-01-14T09:20:00Z' },
        { id: '3', type: 'critical', message: 'Supply delay from Tema Port affecting all depots', timestamp: '2024-01-13T14:45:00Z' }
      ]
    })
  }, [])

  if (!data) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-muted-foreground">Loading BOST Dashboard...</p>
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
              <Warehouse className="h-8 w-8 text-red-600" />
              <div>
                <h1 className="text-xl font-bold">BOST</h1>
                <p className="text-xs text-muted-foreground">Bulk Oil Storage and Transportation</p>
              </div>
            </div>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            <Badge variant="outline">Storage & Transport</Badge>
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
            <TabsTrigger value="depots">Depots</TabsTrigger>
            <TabsTrigger value="inventory">Inventory</TabsTrigger>
            <TabsTrigger value="operations">Operations</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Storage Capacity</CardTitle>
                  <Warehouse className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.storageCapacity}</div>
                  <p className="text-xs text-muted-foreground">Total capacity</p>
                  <Progress value={75} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Current Stock</CardTitle>
                  <Fuel className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.currentStock}</div>
                  <p className="text-xs text-muted-foreground">75.9% utilization</p>
                  <Progress value={76} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Operational Efficiency</CardTitle>
                  <Activity className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.efficiency}</div>
                  <p className="text-xs text-muted-foreground">+3.2% improvement</p>
                  <Progress value={77} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Annual Revenue</CardTitle>
                  <DollarSign className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.revenue}</div>
                  <p className="text-xs text-muted-foreground">+8.7% YoY growth</p>
                  <Progress value={85} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Depots</CardTitle>
                  <Truck className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.depots}</div>
                  <p className="text-xs text-muted-foreground">Nationwide coverage</p>
                  <Progress value={80} className="mt-2" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Utilization Rate</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{data.overview.utilization}</div>
                  <p className="text-xs text-muted-foreground">Optimal range</p>
                  <Progress value={76} className="mt-2" />
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Inventory Management</CardTitle>
                <CardDescription>Current inventory levels across all products</CardDescription>
              </CardHeader>
              <CardContent>
                <InventoryChart />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="depots" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Warehouse className="h-5 w-5" />
                  <span>Depot Performance</span>
                </CardTitle>
                <CardDescription>Storage utilization by depot</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.operations.depots.map((depot, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{depot.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{depot.location}</p>
                        <div className="text-lg font-bold mb-2">{depot.capacity}</div>
                        <div className="text-sm text-muted-foreground mb-2">Current: {depot.current}</div>
                        <div className="flex justify-between items-center">
                          <span className="text-sm">Utilization</span>
                          <Badge variant="outline">{depot.utilization}%</Badge>
                        </div>
                        <Progress value={depot.utilization} className="h-2 mt-2" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="inventory" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Fuel className="h-5 w-5" />
                  <span>Product Inventory</span>
                </CardTitle>
                <CardDescription>Stock levels by product type</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {data.operations.products.map((product, index) => (
                    <Card key={index}>
                      <CardContent className="p-4">
                        <h4 className="font-medium mb-2">{product.product}</h4>
                        <div className="text-lg font-bold mb-2">{product.current}</div>
                        <div className="text-sm text-muted-foreground mb-2">Capacity: {product.capacity}</div>
                        <div className="text-sm font-medium">Turnover: {product.turnover}</div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="operations" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Revenue Analysis</CardTitle>
                <CardDescription>Monthly revenue from storage and transportation services</CardDescription>
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