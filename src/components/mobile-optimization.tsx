'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Smartphone, 
  Tablet, 
  Monitor, 
  Responsive,
  Zap,
  Activity,
  TrendingUp,
  BarChart3,
  Menu,
  X,
  Home,
  Search,
  Bell,
  User,
  Settings,
  ChevronDown,
  ChevronRight,
  Grid,
  List,
  Maximize,
  Minimize,
  Signal,
  Wifi,
  Battery
} from 'lucide-react'

interface DeviceMetrics {
  device: string
  resolution: string
  sessions: number
  bounceRate: number
  avgDuration: string
  conversion: number
}

interface ResponsiveFeature {
  name: string
  description: string
  devices: ('mobile' | 'tablet' | 'desktop')[]
  status: 'implemented' | 'in-progress' | 'planned'
  priority: 'high' | 'medium' | 'low'
}

interface PerformanceMetric {
  name: string
  mobile: number
  tablet: number
  desktop: number
  target: number
  unit: string
}

export default function MobileOptimization() {
  const [deviceMetrics, setDeviceMetrics] = useState<DeviceMetrics[]>([])
  const [features, setFeatures] = useState<ResponsiveFeature[]>([])
  const [performance, setPerformance] = useState<PerformanceMetric[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedDevice, setSelectedDevice] = useState<'mobile' | 'tablet' | 'desktop'>('mobile')

  useEffect(() => {
    const mockDeviceMetrics: DeviceMetrics[] = [
      {
        device: 'Mobile',
        resolution: '360x640',
        sessions: 15420,
        bounceRate: 32.5,
        avgDuration: '4m 32s',
        conversion: 12.8
      },
      {
        device: 'Tablet',
        resolution: '768x1024',
        sessions: 8750,
        bounceRate: 28.3,
        avgDuration: '6m 15s',
        conversion: 18.5
      },
      {
        device: 'Desktop',
        resolution: '1920x1080',
        sessions: 12450,
        bounceRate: 24.1,
        avgDuration: '8m 42s',
        conversion: 24.7
      }
    ]

    const mockFeatures: ResponsiveFeature[] = [
      {
        name: 'Touch-Optimized Navigation',
        description: 'Large touch targets and gesture-based navigation',
        devices: ['mobile', 'tablet'],
        status: 'implemented',
        priority: 'high'
      },
      {
        name: 'Responsive Charts',
        description: 'Charts that adapt to different screen sizes',
        devices: ['mobile', 'tablet', 'desktop'],
        status: 'implemented',
        priority: 'high'
      },
      {
        name: 'Mobile-First Forms',
        description: 'Forms optimized for mobile input methods',
        devices: ['mobile', 'tablet'],
        status: 'implemented',
        priority: 'high'
      },
      {
        name: 'Adaptive Layout',
        description: 'Layout that adjusts to screen orientation',
        devices: ['mobile', 'tablet'],
        status: 'implemented',
        priority: 'medium'
      },
      {
        name: 'Offline Support',
        description: 'Critical functionality available offline',
        devices: ['mobile'],
        status: 'in-progress',
        priority: 'medium'
      },
      {
        name: 'Progressive Web App',
        description: 'PWA features for mobile experience',
        devices: ['mobile'],
        status: 'planned',
        priority: 'low'
      }
    ]

    const mockPerformance: PerformanceMetric[] = [
      {
        name: 'Page Load Time',
        mobile: 2.8,
        tablet: 1.9,
        desktop: 1.2,
        target: 1.5,
        unit: 'seconds'
      },
      {
        name: 'First Input Delay',
        mobile: 120,
        tablet: 85,
        desktop: 45,
        target: 100,
        unit: 'ms'
      },
      {
        name: 'Cumulative Layout Shift',
        mobile: 0.15,
        tablet: 0.08,
        desktop: 0.03,
        target: 0.1,
        unit: 'CLS'
      },
      {
        name: 'Largest Contentful Paint',
        mobile: 3.2,
        tablet: 2.1,
        desktop: 1.4,
        target: 2.5,
        unit: 'seconds'
      }
    ]

    setDeviceMetrics(mockDeviceMetrics)
    setFeatures(mockFeatures)
    setPerformance(mockPerformance)
    setLoading(false)
  }, [])

  const getDeviceIcon = (device: string) => {
    switch (device) {
      case 'Mobile': return <Smartphone className="h-4 w-4" />
      case 'Tablet': return <Tablet className="h-4 w-4" />
      case 'Desktop': return <Monitor className="h-4 w-4" />
      default: return <Responsive className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'implemented': return 'bg-green-500'
      case 'in-progress': return 'bg-yellow-500'
      case 'planned': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-blue-500'
      default: return 'bg-gray-500'
    }
  }

  const getPerformanceColor = (value: number, target: number) => {
    if (value <= target) return 'text-green-600'
    if (value <= target * 1.2) return 'text-yellow-600'
    return 'text-red-600'
  }

  const MobilePreview = () => (
    <div className="bg-white rounded-lg shadow-lg p-4 max-w-sm mx-auto">
      <div className="bg-gray-900 rounded-t-lg p-2 flex items-center justify-between">
        <div className="flex space-x-1">
          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full"></div>
        </div>
        <div className="text-white text-xs">9:41 AM</div>
        <div className="flex space-x-1">
          <Signal className="h-3 w-3 text-white" />
          <Wifi className="h-3 w-3 text-white" />
          <Battery className="h-3 w-3 text-white" />
        </div>
      </div>
      
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4">
        <div className="flex items-center justify-between text-white">
          <div>
            <h3 className="font-bold text-lg">NECID</h3>
            <p className="text-xs opacity-90">Energy Dashboard</p>
          </div>
          <Bell className="h-5 w-5" />
        </div>
      </div>
      
      <div className="p-4 space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-green-50 to-blue-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-green-600">3,847</div>
            <div className="text-xs text-muted-foreground">MW</div>
          </div>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 p-3 rounded-lg">
            <div className="text-lg font-bold text-blue-600">98.2%</div>
            <div className="text-xs text-muted-foreground">Reliability</div>
          </div>
        </div>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Zap className="h-4 w-4 text-purple-500" />
              <span className="text-sm font-medium">Power Generation</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <Activity className="h-4 w-4 text-blue-500" />
              <span className="text-sm font-medium">Grid Status</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between p-2 bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              <span className="text-sm font-medium">Analytics</span>
            </div>
            <ChevronRight className="h-4 w-4" />
          </div>
        </div>
        
        <div className="flex justify-around border-t pt-3">
          <Home className="h-5 w-5 text-purple-600" />
          <BarChart3 className="h-5 w-5 text-gray-400" />
          <Search className="h-5 w-5 text-gray-400" />
          <User className="h-5 w-5 text-gray-400" />
        </div>
      </div>
    </div>
  )

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Responsive className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-lg font-medium">Mobile Optimization Initializing...</p>
          <p className="text-sm text-muted-foreground">Loading responsive design features</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Mobile Optimization & Responsive Design
          </h2>
          <p className="text-muted-foreground">Cross-device compatibility and mobile-first approach</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
            <Responsive className="h-3 w-3 mr-1" />
            Responsive
          </Badge>
          <Button className="professional-button">
            <Monitor className="h-4 w-4 mr-2" />
            Test Devices
          </Button>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-md p-1 rounded-lg">
          <TabsTrigger value="overview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="features" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Features
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Performance
          </TabsTrigger>
          <TabsTrigger value="preview" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {deviceMetrics.map((metric) => (
              <Card key={metric.device} className="sophisticated-card hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                        {getDeviceIcon(metric.device)}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{metric.device}</CardTitle>
                        <p className="text-xs text-muted-foreground">{metric.resolution}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                      <p className="text-sm font-medium">{metric.sessions.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Bounce Rate</p>
                      <p className="text-sm font-medium">{metric.bounceRate}%</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Avg Duration</p>
                      <p className="text-sm font-medium">{metric.avgDuration}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Conversion</p>
                      <p className="text-sm font-medium">{metric.conversion}%</p>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Experience</span>
                      <Badge className="bg-green-500 text-white border-0 text-xs">
                        Optimized
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="features" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature) => (
              <Card key={feature.name} className="sophisticated-card hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                        <Responsive className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{feature.name}</CardTitle>
                        <div className="flex items-center space-x-1 mt-1">
                          {feature.devices.map((device, index) => (
                            <Badge key={index} variant="outline" className="text-xs capitalize">
                              {device}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Badge className={`${getStatusColor(feature.status)} text-white border-0 text-xs capitalize`}>
                        {feature.status}
                      </Badge>
                      <Badge className={`${getPriorityColor(feature.priority)} text-white border-0 text-xs capitalize`}>
                        {feature.priority}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">
                      {feature.devices.length} device types
                    </span>
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

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 gap-6">
            {performance.map((metric) => (
              <Card key={metric.name} className="sophisticated-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500">
                        <Activity className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{metric.name}</CardTitle>
                        <p className="text-xs text-muted-foreground">Target: {metric.target} {metric.unit}</p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="text-center p-3 rounded-lg bg-gradient-to-br from-red-50 to-orange-50">
                      <div className={`text-lg font-bold ${getPerformanceColor(metric.mobile, metric.target)}`}>
                        {metric.mobile} {metric.unit}
                      </div>
                      <div className="text-sm text-muted-foreground">Mobile</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50">
                      <div className={`text-lg font-bold ${getPerformanceColor(metric.tablet, metric.target)}`}>
                        {metric.tablet} {metric.unit}
                      </div>
                      <div className="text-sm text-muted-foreground">Tablet</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                      <div className={`text-lg font-bold ${getPerformanceColor(metric.desktop, metric.target)}`}>
                        {metric.desktop} {metric.unit}
                      </div>
                      <div className="text-sm text-muted-foreground">Desktop</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Performance Status</span>
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 rounded-full bg-green-500"></div>
                        <span className="text-xs font-medium">Good</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Optimization</span>
                      <span className="text-xs font-medium text-green-600">Active</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="preview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="sophisticated-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Smartphone className="h-5 w-5 text-purple-500" />
                  <span>Mobile Preview</span>
                </CardTitle>
                <CardDescription>Optimized for mobile devices</CardDescription>
              </CardHeader>
              <CardContent>
                <MobilePreview />
              </CardContent>
            </Card>

            <Card className="sophisticated-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Responsive className="h-5 w-5 text-blue-500" />
                  <span>Responsive Features</span>
                </CardTitle>
                <CardDescription>Cross-device compatibility</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="text-2xl font-bold text-green-600">100%</div>
                    <div className="text-sm text-muted-foreground">Mobile Friendly</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-2xl font-bold text-blue-600">A+</div>
                    <div className="text-sm text-muted-foreground">Google Score</div>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Touch Targets</span>
                    <span className="text-xs font-medium text-green-600">44px minimum</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Viewport</span>
                    <span className="text-xs font-medium text-green-600">Optimized</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground">Readability</span>
                    <span className="text-xs font-medium text-green-600">Excellent</span>
                  </div>
                </div>
                
                <Button className="w-full professional-button">
                  <Monitor className="h-4 w-4 mr-2" />
                  Test on All Devices
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}