'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Activity, 
  Zap, 
  TrendingUp, 
  AlertTriangle, 
  Wifi,
  WifiOff,
  Server,
  Database,
  Cloud,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  BarChart3
} from 'lucide-react'

interface RealTimeMetric {
  id: string
  name: string
  value: number
  unit: string
  change: number
  status: 'normal' | 'warning' | 'critical'
  lastUpdate: string
  source: string
}

interface DataSource {
  id: string
  name: string
  type: 'api' | 'iot' | 'sensor' | 'manual'
  status: 'connected' | 'disconnected' | 'error'
  lastSync: string
  dataPoints: number
  reliability: number
}

interface RealTimeAlert {
  id: string
  type: 'system' | 'operational' | 'security' | 'data'
  severity: 'low' | 'medium' | 'high' | 'critical'
  message: string
  source: string
  timestamp: string
  acknowledged: boolean
}

interface DataStream {
  id: string
  name: string
  category: string
  rate: number // data points per second
  volume: number // total data points
  quality: number // percentage
  latency: number // milliseconds
}

export default function RealTimeDataIntegration() {
  const [metrics, setMetrics] = useState<RealTimeMetric[]>([])
  const [dataSources, setDataSources] = useState<DataSource[]>([])
  const [alerts, setAlerts] = useState<RealTimeAlert[]>([])
  const [dataStreams, setDataStreams] = useState<DataStream[]>([])
  const [isConnected, setIsConnected] = useState(true)
  const [lastUpdate, setLastUpdate] = useState(new Date())

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: metric.value + (Math.random() - 0.5) * 10,
        change: Math.random() * 10 - 5,
        lastUpdate: new Date().toISOString(),
        status: Math.random() > 0.8 ? (Math.random() > 0.5 ? 'warning' : 'critical') : 'normal'
      })))

      setLastUpdate(new Date())

      // Occasionally add new alerts
      if (Math.random() > 0.95) {
        const newAlert: RealTimeAlert = {
          id: `alert-${Date.now()}`,
          type: ['system', 'operational', 'security', 'data'][Math.floor(Math.random() * 4)] as any,
          severity: ['low', 'medium', 'high', 'critical'][Math.floor(Math.random() * 4)] as any,
          message: `Real-time alert: ${['Unusual activity detected', 'Data quality degraded', 'System performance issue', 'Security event triggered'][Math.floor(Math.random() * 4)]}`,
          source: ['ECG', 'GRIDCo', 'VRA', 'GNPC'][Math.floor(Math.random() * 4)],
          timestamp: new Date().toISOString(),
          acknowledged: false
        }
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)]) // Keep only last 10 alerts
      }
    }, 3000)

    // Initialize data
    setMetrics([
      {
        id: 'metric-1',
        name: 'Power Generation',
        value: 3847,
        unit: 'MW',
        change: 2.3,
        status: 'normal',
        lastUpdate: new Date().toISOString(),
        source: 'VRA'
      },
      {
        id: 'metric-2',
        name: 'Grid Frequency',
        value: 50.02,
        unit: 'Hz',
        change: -0.1,
        status: 'normal',
        lastUpdate: new Date().toISOString(),
        source: 'GRIDCo'
      },
      {
        id: 'metric-3',
        name: 'Transmission Load',
        value: 2847,
        unit: 'MW',
        change: 5.2,
        status: 'warning',
        lastUpdate: new Date().toISOString(),
        source: 'GRIDCo'
      },
      {
        id: 'metric-4',
        name: 'Distribution Efficiency',
        value: 76.8,
        unit: '%',
        change: -1.2,
        status: 'critical',
        lastUpdate: new Date().toISOString(),
        source: 'ECG'
      },
      {
        id: 'metric-5',
        name: 'Fuel Stock Level',
        value: 18.5,
        unit: 'days',
        change: -0.8,
        status: 'warning',
        lastUpdate: new Date().toISOString(),
        source: 'BOST'
      },
      {
        id: 'metric-6',
        name: 'Revenue Collection',
        value: 82.4,
        unit: '%',
        change: 3.1,
        status: 'normal',
        lastUpdate: new Date().toISOString(),
        source: 'ECG'
      }
    ])

    setDataSources([
      {
        id: 'source-1',
        name: 'VRA SCADA System',
        type: 'api',
        status: 'connected',
        lastSync: new Date().toISOString(),
        dataPoints: 15420,
        reliability: 98.5
      },
      {
        id: 'source-2',
        name: 'GRIDCo Smart Grid',
        type: 'iot',
        status: 'connected',
        lastSync: new Date().toISOString(),
        dataPoints: 32847,
        reliability: 96.2
      },
      {
        id: 'source-3',
        name: 'ECG Metering Network',
        type: 'sensor',
        status: 'connected',
        lastSync: new Date().toISOString(),
        dataPoints: 285639,
        reliability: 94.8
      },
      {
        id: 'source-4',
        name: 'GNPC Production Data',
        type: 'api',
        status: 'disconnected',
        lastSync: new Date(Date.now() - 300000).toISOString(), // 5 minutes ago
        dataPoints: 8754,
        reliability: 0
      },
      {
        id: 'source-5',
        name: 'BOST Storage System',
        type: 'manual',
        status: 'connected',
        lastSync: new Date().toISOString(),
        dataPoints: 3256,
        reliability: 99.1
      }
    ])

    setDataStreams([
      {
        id: 'stream-1',
        name: 'Power Generation Data',
        category: 'Generation',
        rate: 10,
        volume: 15420,
        quality: 98.5,
        latency: 120
      },
      {
        id: 'stream-2',
        name: 'Grid Monitoring Data',
        category: 'Transmission',
        rate: 25,
        volume: 32847,
        quality: 96.2,
        latency: 85
      },
      {
        id: 'stream-3',
        name: 'Consumption Data',
        category: 'Distribution',
        rate: 100,
        volume: 285639,
        quality: 94.8,
        latency: 200
      },
      {
        id: 'stream-4',
        name: 'Market Data',
        category: 'Commercial',
        rate: 5,
        volume: 8754,
        quality: 0,
        latency: 0
      }
    ])

    return () => clearInterval(interval)
  }, [])

  const acknowledgeAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'normal': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'critical': return 'bg-red-500'
      case 'connected': return 'bg-green-500'
      case 'disconnected': return 'bg-red-500'
      case 'error': return 'bg-orange-500'
      default: return 'bg-gray-500'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'low': return 'border-blue-500 bg-blue-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'high': return 'border-orange-500 bg-orange-50'
      case 'critical': return 'border-red-500 bg-red-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Real-time Data Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-green-500">
              {isConnected ? <Wifi className="h-5 w-5 text-white" /> : <WifiOff className="h-5 w-5 text-white" />}
            </div>
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Real-Time Data Integration
            </span>
          </CardTitle>
          <CardDescription>
            Live data streaming from energy sector sources with real-time monitoring and alerts
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{metrics.length}</div>
              <div className="text-sm text-muted-foreground">Live Metrics</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{dataSources.filter(s => s.status === 'connected').length}</div>
              <div className="text-sm text-muted-foreground">Connected Sources</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{dataStreams.reduce((acc, stream) => acc + stream.rate, 0)}</div>
              <div className="text-sm text-muted-foreground">Data Points/sec</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{alerts.filter(a => !a.acknowledged).length}</div>
              <div className="text-sm text-muted-foreground">Active Alerts</div>
            </div>
          </div>
          <div className="flex items-center justify-center mt-4 space-x-2">
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
            <span className="text-sm text-muted-foreground">
              {isConnected ? 'Connected' : 'Disconnected'} • Last update: {lastUpdate.toLocaleTimeString()}
            </span>
            <Button size="sm" variant="outline" onClick={() => setIsConnected(!isConnected)}>
              <RefreshCw className="h-4 w-4 mr-1" />
              {isConnected ? 'Disconnect' : 'Connect'}
            </Button>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="metrics" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="metrics">Live Metrics</TabsTrigger>
          <TabsTrigger value="sources">Data Sources</TabsTrigger>
          <TabsTrigger value="alerts">Real-time Alerts</TabsTrigger>
          <TabsTrigger value="streams">Data Streams</TabsTrigger>
        </TabsList>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {metrics.map((metric) => (
              <Card key={metric.id} className="hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{metric.name}</CardTitle>
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(metric.status)}`}></div>
                  </div>
                  <CardDescription>Source: {metric.source}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-end justify-between">
                      <div>
                        <span className="text-2xl font-bold">{metric.value.toFixed(1)}</span>
                        <span className="text-sm text-muted-foreground ml-1">{metric.unit}</span>
                      </div>
                      <div className={`text-sm ${metric.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {metric.change > 0 ? '+' : ''}{metric.change.toFixed(1)}%
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Status</span>
                        <Badge variant={metric.status === 'normal' ? 'default' : metric.status === 'warning' ? 'secondary' : 'destructive'} className="text-xs">
                          {metric.status}
                        </Badge>
                      </div>
                      <div className="flex justify-between text-xs">
                        <span>Last Update</span>
                        <span>{new Date(metric.lastUpdate).toLocaleTimeString()}</span>
                      </div>
                    </div>

                    <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${metric.status === 'normal' ? 'bg-green-500' : metric.status === 'warning' ? 'bg-yellow-500' : 'bg-red-500'}`}
                        style={{ width: `${Math.min(100, Math.abs(metric.change) * 20)}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="sources" className="space-y-4">
          <div className="grid gap-4">
            {dataSources.map((source) => (
              <Card key={source.id}>
                <CardContent className="pt-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`p-3 rounded-lg ${getStatusColor(source.status)}`}>
                        {source.type === 'api' && <Server className="h-6 w-6 text-white" />}
                        {source.type === 'iot' && <Database className="h-6 w-6 text-white" />}
                        {source.type === 'sensor' && <Cloud className="h-6 w-6 text-white" />}
                        {source.type === 'manual' && <BarChart3 className="h-6 w-6 text-white" />}
                      </div>
                      <div>
                        <h3 className="font-medium">{source.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{source.type} source</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center space-x-2">
                        <Badge variant={source.status === 'connected' ? 'default' : 'destructive'}>
                          {source.status}
                        </Badge>
                        <div className={`w-2 h-2 rounded-full ${getStatusColor(source.status)}`}></div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        {source.reliability > 0 ? `${source.reliability}% reliable` : 'Offline'}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div className="text-center">
                      <div className="text-lg font-bold">{source.dataPoints.toLocaleString()}</div>
                      <div className="text-sm text-muted-foreground">Data Points</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold">{new Date(source.lastSync).toLocaleTimeString()}</div>
                      <div className="text-sm text-muted-foreground">Last Sync</div>
                    </div>
                    <div className="text-center">
                      <Button size="sm" variant="outline" className="w-full">
                        {source.status === 'connected' ? 'Configure' : 'Reconnect'}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="alerts" className="space-y-4">
          <div className="grid gap-3">
            {alerts.map((alert) => (
              <Card key={alert.id} className={getSeverityColor(alert.severity)}>
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <AlertTriangle className="h-5 w-5" />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{alert.message}</h4>
                          {alert.acknowledged && <CheckCircle className="h-4 w-4 text-green-600" />}
                        </div>
                        <p className="text-sm text-muted-foreground">{alert.source} • {new Date(alert.timestamp).toLocaleString()}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={alert.severity === 'critical' ? 'destructive' : alert.severity === 'high' ? 'default' : 'secondary'}>
                        {alert.severity}
                      </Badge>
                      {!alert.acknowledged && (
                        <Button size="sm" onClick={() => acknowledgeAlert(alert.id)}>
                          Acknowledge
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="streams" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {dataStreams.map((stream) => (
              <Card key={stream.id}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Activity className="h-5 w-5 text-blue-500" />
                    <span>{stream.name}</span>
                  </CardTitle>
                  <CardDescription>{stream.category} Stream</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-blue-50 rounded-lg">
                        <div className="text-lg font-bold text-blue-600">{stream.rate}</div>
                        <div className="text-sm text-muted-foreground">Points/sec</div>
                      </div>
                      <div className="text-center p-3 bg-green-50 rounded-lg">
                        <div className="text-lg font-bold text-green-600">{stream.volume.toLocaleString()}</div>
                        <div className="text-sm text-muted-foreground">Total Volume</div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Data Quality</span>
                        <span className="font-medium">{stream.quality}%</span>
                      </div>
                      <Progress value={stream.quality} className="h-2" />
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Latency</span>
                        <span className="font-medium">{stream.latency}ms</span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-orange-500"
                          style={{ width: `${Math.min(100, (stream.latency / 500) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}