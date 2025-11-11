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
  Database,
  Satellite,
  Wifi,
  RefreshCw,
  Clock,
  CheckCircle,
  XCircle,
  Pause,
  Play,
  Settings,
  BarChart3,
  Globe,
  Server,
  Cloud,
  Bolt,
  Thermometer,
  Droplets
} from 'lucide-react'

interface RealTimeStream {
  id: string
  name: string
  type: 'energy' | 'financial' | 'operational' | 'environmental' | 'market'
  status: 'active' | 'inactive' | 'error'
  lastUpdate: string
  dataPoints: number
  frequency: string
  source: string
  reliability: number
}

interface LiveDataPoint {
  id: string
  streamId: string
  timestamp: string
  value: number
  unit: string
  quality: 'good' | 'warning' | 'error'
  location: string
  agency: string
}

interface IntegrationStatus {
  id: string
  name: string
  status: 'connected' | 'disconnected' | 'connecting'
  latency: number
  throughput: string
  errorRate: number
  lastSync: string
}

export default function RealTimeDataIntegration() {
  const [streams, setStreams] = useState<RealTimeStream[]>([])
  const [liveData, setLiveData] = useState<LiveDataPoint[]>([])
  const [integrations, setIntegrations] = useState<IntegrationStatus[]>([])
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    // Simulate real-time data streams
    const mockStreams: RealTimeStream[] = [
      {
        id: 'stream-1',
        name: 'Power Generation',
        type: 'energy',
        status: 'active',
        lastUpdate: new Date().toISOString(),
        dataPoints: 15420,
        frequency: '5 seconds',
        source: 'VRA Control Systems',
        reliability: 99.2
      },
      {
        id: 'stream-2',
        name: 'Grid Load',
        type: 'energy',
        status: 'active',
        lastUpdate: new Date().toISOString(),
        dataPoints: 12850,
        frequency: '10 seconds',
        source: 'GRIDCo SCADA',
        reliability: 98.8
      },
      {
        id: 'stream-3',
        name: 'Revenue Flow',
        type: 'financial',
        status: 'active',
        lastUpdate: new Date().toISOString(),
        dataPoints: 8750,
        frequency: '1 minute',
        source: 'ECG Billing System',
        reliability: 97.5
      },
      {
        id: 'stream-4',
        name: 'Fuel Consumption',
        type: 'operational',
        status: 'active',
        lastUpdate: new Date().toISOString(),
        dataPoints: 9680,
        frequency: '30 seconds',
        source: 'BOST Monitoring',
        reliability: 96.8
      },
      {
        id: 'stream-5',
        name: 'Environmental Data',
        type: 'environmental',
        status: 'active',
        lastUpdate: new Date().toISOString(),
        dataPoints: 12450,
        frequency: '15 minutes',
        source: 'EPA Sensors',
        reliability: 95.2
      },
      {
        id: 'stream-6',
        name: 'Market Prices',
        type: 'market',
        status: 'error',
        lastUpdate: new Date(Date.now() - 300000).toISOString(),
        dataPoints: 15680,
        frequency: '1 minute',
        source: 'Energy Exchange API',
        reliability: 0
      }
    ]

    const mockLiveData: LiveDataPoint[] = [
      {
        id: 'data-1',
        streamId: 'stream-1',
        timestamp: new Date().toISOString(),
        value: 2847,
        unit: 'MW',
        quality: 'good',
        location: 'Akosombo',
        agency: 'VRA'
      },
      {
        id: 'data-2',
        streamId: 'stream-2',
        timestamp: new Date().toISOString(),
        value: 2650,
        unit: 'MW',
        quality: 'good',
        location: 'National Grid',
        agency: 'GRIDCo'
      },
      {
        id: 'data-3',
        streamId: 'stream-3',
        timestamp: new Date().toISOString(),
        value: 2450000,
        unit: '₵',
        quality: 'good',
        location: 'Head Office',
        agency: 'ECG'
      },
      {
        id: 'data-4',
        streamId: 'stream-4',
        timestamp: new Date().toISOString(),
        value: 2840,
        unit: 'm³',
        quality: 'warning',
        location: 'Tema Depot',
        agency: 'BOST'
      },
      {
        id: 'data-5',
        streamId: 'stream-5',
        timestamp: new Date().toISOString(),
        value: 42.5,
        unit: '°C',
        quality: 'good',
        location: 'Accra',
        agency: 'EPA'
      }
    ]

    const mockIntegrations: IntegrationStatus[] = [
      {
        id: 'int-1',
        name: 'VRA Systems',
        status: 'connected',
        latency: 45,
        throughput: '1.2 MB/s',
        errorRate: 0.1,
        lastSync: new Date().toISOString()
      },
      {
        id: 'int-2',
        name: 'ECG Billing',
        status: 'connected',
        latency: 120,
        throughput: '850 KB/s',
        errorRate: 0.3,
        lastSync: new Date().toISOString()
      },
      {
        id: 'int-3',
        name: 'GRIDCo SCADA',
        status: 'connected',
        latency: 25,
        throughput: '2.4 MB/s',
        errorRate: 0.05,
        lastSync: new Date().toISOString()
      },
      {
        id: 'int-4',
        name: 'BOST Monitoring',
        status: 'disconnected',
        latency: 0,
        throughput: '0 B/s',
        errorRate: 100,
        lastSync: new Date(Date.now() - 1800000).toISOString()
      },
      {
        id: 'int-5',
        name: 'EPA Sensors',
        status: 'connecting',
        latency: 0,
        throughput: '0 B/s',
        errorRate: 0,
        lastSync: new Date(Date.now() - 60000).toISOString()
      }
    ]

    setStreams(mockStreams)
    setLiveData(mockLiveData)
    setIntegrations(mockIntegrations)
    setLoading(false)

    // Simulate real-time updates
    const interval = setInterval(() => {
      setLiveData(prev => {
        const updated = [...prev]
        const randomIndex = Math.floor(Math.random() * updated.length)
        updated[randomIndex] = {
          ...updated[randomIndex],
          timestamp: new Date().toISOString(),
          value: updated[randomIndex].value * (1 + (Math.random() - 0.5) * 0.1)
        }
        return updated
      })
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const refreshData = async () => {
    setRefreshing(true)
    // Simulate data refresh
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'inactive': return <Pause className="h-4 w-4 text-yellow-500" />
      case 'error': return <XCircle className="h-4 w-4 text-red-500" />
      case 'connected': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'disconnected': return <XCircle className="h-4 w-4 text-red-500" />
      case 'connecting': return <RefreshCw className="h-4 w-4 text-blue-500 animate-spin" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'energy': return <Bolt className="h-4 w-4" />
      case 'financial': return <BarChart3 className="h-4 w-4" />
      case 'operational': return <Settings className="h-4 w-4" />
      case 'environmental': return <Thermometer className="h-4 w-4" />
      case 'market': return <Globe className="h-4 w-4" />
      default: return <Database className="h-4 w-4" />
    }
  }

  const getQualityColor = (quality: string) => {
    switch (quality) {
      case 'good': return 'bg-green-500'
      case 'warning': return 'bg-yellow-500'
      case 'error': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Satellite className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-lg font-medium">Real-time Data Integration Initializing...</p>
          <p className="text-sm text-muted-foreground">Connecting to data sources and streams</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Real-time Data Integration
          </h2>
          <p className="text-muted-foreground">Live data streams and integration monitoring</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
            <Wifi className="h-3 w-3 mr-1" />
            Live
          </Badge>
          <Button 
            onClick={refreshData} 
            disabled={refreshing}
            variant="outline"
            size="sm"
          >
            {refreshing ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="streams" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-md p-1 rounded-lg">
          <TabsTrigger value="streams" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Data Streams
          </TabsTrigger>
          <TabsTrigger value="live" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Live Data
          </TabsTrigger>
          <TabsTrigger value="integrations" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Integrations
          </TabsTrigger>
          <TabsTrigger value="monitoring" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Monitoring
          </TabsTrigger>
        </TabsList>

        <TabsContent value="streams" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {streams.map((stream) => (
              <Card key={stream.id} className="sophisticated-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                        {getTypeIcon(stream.type)}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{stream.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1 capitalize">
                          {stream.type}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getStatusIcon(stream.status)}
                      <div className={`w-2 h-2 rounded-full ${
                        stream.status === 'active' ? 'bg-green-500 animate-pulse' : 
                        stream.status === 'error' ? 'bg-red-500' : 'bg-yellow-500'
                      }`} />
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Data Points</p>
                      <p className="text-sm font-medium">{stream.dataPoints.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Frequency</p>
                      <p className="text-sm font-medium">{stream.frequency}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Reliability</span>
                      <span className="text-xs font-medium">{stream.reliability}%</span>
                    </div>
                    <Progress value={stream.reliability} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Source</p>
                    <p className="text-sm font-medium">{stream.source}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">{formatTimestamp(stream.lastUpdate)}</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Activity className="h-3 w-3 mr-1" />
                      View
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {liveData.map((data) => (
              <Card key={data.id} className="sophisticated-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500">
                        <Database className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{data.agency}</CardTitle>
                        <p className="text-xs text-muted-foreground">{data.location}</p>
                      </div>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getQualityColor(data.quality)}`} />
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                      {data.value.toLocaleString()}
                    </div>
                    <div className="text-sm text-muted-foreground">{data.unit}</div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Quality</p>
                    <Badge className={`${getQualityColor(data.quality)} text-white border-0 text-xs capitalize`}>
                      {data.quality}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Last Update</p>
                    <p className="text-sm font-medium">{formatTimestamp(data.timestamp)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">Live</span>
                    <div className="flex items-center space-x-1">
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" />
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.2s' }} />
                      <div className="w-1 h-1 bg-green-500 rounded-full animate-pulse" style={{ animationDelay: '0.4s' }} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="integrations" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {integrations.map((integration) => (
              <Card key={integration.id} className="sophisticated-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                        <Server className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{integration.name}</CardTitle>
                        <div className="flex items-center space-x-1 mt-1">
                          {getStatusIcon(integration.status)}
                          <span className="text-xs text-muted-foreground capitalize">
                            {integration.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Latency</p>
                      <p className="text-sm font-medium">{integration.latency}ms</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Throughput</p>
                      <p className="text-sm font-medium">{integration.throughput}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Error Rate</span>
                      <span className="text-xs font-medium">{integration.errorRate}%</span>
                    </div>
                    <Progress value={100 - integration.errorRate} className="h-2" />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Last Sync</p>
                    <p className="text-sm font-medium">{formatTimestamp(integration.lastSync)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">Integration</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Settings className="h-3 w-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="monitoring" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="sophisticated-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5 text-green-500" />
                  <span>System Health</span>
                </CardTitle>
                <CardDescription>Real-time system monitoring and performance</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="text-2xl font-bold text-green-600">98.2%</div>
                    <div className="text-sm text-muted-foreground">Uptime</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-2xl font-bold text-blue-600">45ms</div>
                    <div className="text-sm text-muted-foreground">Avg Latency</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Active Streams</span>
                    <span className="text-xs font-medium">5/6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Data Rate</span>
                    <span className="text-xs font-medium">4.2 MB/s</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Error Rate</span>
                    <span className="text-xs font-medium text-green-600">0.1%</span>
                  </div>
                </div>
                <Button className="w-full professional-button">
                  <Activity className="h-4 w-4 mr-2" />
                  View Health Report
                </Button>
              </CardContent>
            </Card>

            <Card className="sophisticated-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Cloud className="h-5 w-5 text-blue-500" />
                  <span>Data Processing</span>
                </CardTitle>
                <CardDescription>Real-time data processing and analytics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="text-2xl font-bold text-purple-600">1.2M</div>
                    <div className="text-sm text-muted-foreground">Points/Min</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-red-50">
                    <div className="text-2xl font-bold text-orange-600">99.8%</div>
                    <div className="text-sm text-muted-foreground">Processing</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Queue Size</span>
                    <span className="text-xs font-medium">1,245</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Processing Time</span>
                    <span className="text-xs font-medium">12ms</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Memory Usage</span>
                    <span className="text-xs font-medium">68%</span>
                  </div>
                </div>
                <Button className="w-full professional-button">
                  <Database className="h-4 w-4 mr-2" />
                  Processing Stats
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}