'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  TrendingUp, 
  AlertTriangle, 
  Zap, 
  DollarSign, 
  Target,
  BarChart3,
  PieChart,
  Activity,
  Clock,
  MapPin,
  Users
} from 'lucide-react'

interface Prediction {
  id: string
  type: 'demand' | 'supply' | 'financial' | 'operational'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  timeframe: string
  recommendedAction: string
  status: 'pending' | 'reviewed' | 'implemented'
}

interface Anomaly {
  id: string
  category: string
  severity: 'critical' | 'warning' | 'info'
  description: string
  detectedAt: string
  trend: 'increasing' | 'decreasing' | 'stable'
  affectedAgencies: string[]
}

export default function AIPredictiveAnalytics() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [anomalies, setAnomalies] = useState<Anomaly[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate AI-powered data loading
    const timer = setTimeout(() => {
      setPredictions([
        {
          id: 'pred-1',
          type: 'demand',
          title: 'Peak Demand Surge Expected',
          description: 'AI predicts 15% increase in energy demand for Q3 2024 due to industrial growth',
          confidence: 92,
          impact: 'high',
          timeframe: '3 months',
          recommendedAction: 'Increase generation capacity and secure additional power purchase agreements',
          status: 'pending'
        },
        {
          id: 'pred-2',
          type: 'supply',
          title: 'Gas Supply Disruption Risk',
          description: 'Machine learning models indicate 78% probability of supply chain disruption',
          confidence: 78,
          impact: 'high',
          timeframe: '2-4 weeks',
          recommendedAction: 'Diversify suppliers and increase fuel reserves to 30 days',
          status: 'reviewed'
        },
        {
          id: 'pred-3',
          type: 'financial',
          title: 'Revenue Optimization Opportunity',
          description: 'AI identified ₵240M potential revenue increase through tariff optimization',
          confidence: 85,
          impact: 'medium',
          timeframe: '6 months',
          recommendedAction: 'Implement dynamic pricing and reduce commercial losses',
          status: 'pending'
        },
        {
          id: 'pred-4',
          type: 'operational',
          title: 'Equipment Failure Prediction',
          description: 'Predictive maintenance indicates 65% failure probability for Akosombo Unit 3',
          confidence: 65,
          impact: 'high',
          timeframe: '2-3 months',
          recommendedAction: 'Schedule preventive maintenance and prepare backup capacity',
          status: 'implemented'
        }
      ])

      setAnomalies([
        {
          id: 'anom-1',
          category: 'Distribution Losses',
          severity: 'critical',
          description: 'Unusual spike in technical losses detected in Ashanti Region',
          detectedAt: '2024-01-20T14:30:00Z',
          trend: 'increasing',
          affectedAgencies: ['ECG']
        },
        {
          id: 'anom-2',
          category: 'Generation Efficiency',
          severity: 'warning',
          description: 'Thermal plant efficiency dropping below expected parameters',
          detectedAt: '2024-01-20T09:15:00Z',
          trend: 'decreasing',
          affectedAgencies: ['VRA']
        },
        {
          id: 'anom-3',
          category: 'Revenue Collection',
          severity: 'info',
          description: 'Collection rates showing unusual patterns in urban areas',
          detectedAt: '2024-01-19T16:45:00Z',
          trend: 'stable',
          affectedAgencies: ['ECG', 'NPA']
        }
      ])

      setLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-500 bg-red-50'
      case 'warning': return 'border-yellow-500 bg-yellow-50'
      case 'info': return 'border-blue-500 bg-blue-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Brain className="h-5 w-5" />
            <span>AI Predictive Analytics</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
              <p className="mt-4 text-muted-foreground">AI models are analyzing energy data...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* AI Insights Header */}
      <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-blue-500">
              <Brain className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              AI-Powered Predictive Analytics
            </span>
          </CardTitle>
          <CardDescription>
            Advanced machine learning models providing real-time insights and predictions for strategic decision-making
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{predictions.length}</div>
              <div className="text-sm text-muted-foreground">Active Predictions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{anomalies.length}</div>
              <div className="text-sm text-muted-foreground">Anomalies Detected</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">94%</div>
              <div className="text-sm text-muted-foreground">Model Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">24/7</div>
              <div className="text-sm text-muted-foreground">Real-time Monitoring</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="predictions" className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="anomalies">Anomalies</TabsTrigger>
          <TabsTrigger value="insights">Strategic Insights</TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid gap-4">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {prediction.type === 'demand' && <Zap className="h-5 w-5 text-blue-500" />}
                      {prediction.type === 'supply' && <BarChart3 className="h-5 w-5 text-green-500" />}
                      {prediction.type === 'financial' && <DollarSign className="h-5 w-5 text-yellow-500" />}
                      {prediction.type === 'operational' && <Activity className="h-5 w-5 text-red-500" />}
                      <CardTitle className="text-lg">{prediction.title}</CardTitle>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={`${getImpactColor(prediction.impact)} text-white`}>
                        {prediction.impact} impact
                      </Badge>
                      <Badge variant="outline">{prediction.confidence}% confidence</Badge>
                    </div>
                  </div>
                  <CardDescription>{prediction.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4" />
                        <span className="text-sm">{prediction.timeframe}</span>
                      </div>
                      <Badge variant={prediction.status === 'pending' ? 'secondary' : prediction.status === 'reviewed' ? 'default' : 'destructive'}>
                        {prediction.status}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm font-medium">Recommended Action:</p>
                      <p className="text-sm text-muted-foreground">{prediction.recommendedAction}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">View Details</Button>
                      <Button size="sm">Take Action</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="anomalies" className="space-y-4">
          <div className="grid gap-4">
            {anomalies.map((anomaly) => (
              <Card key={anomaly.id} className={`${getSeverityColor(anomaly.severity)}`}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-5 w-5" />
                      <CardTitle className="text-lg">{anomaly.category}</CardTitle>
                    </div>
                    <Badge variant={anomaly.severity === 'critical' ? 'destructive' : anomaly.severity === 'warning' ? 'default' : 'secondary'}>
                      {anomaly.severity}
                    </Badge>
                  </div>
                  <CardDescription>{anomaly.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Trend:</span>
                      <Badge variant="outline">{anomaly.trend}</Badge>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Detected:</span>
                      <span className="text-sm">{new Date(anomaly.detectedAt).toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-sm font-medium">Affected Agencies:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {anomaly.affectedAgencies.map((agency) => (
                          <Badge key={agency} variant="outline" className="text-xs">
                            {agency}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    <Button size="sm" variant="outline">Investigate Anomaly</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>Performance Trends</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Energy Security</span>
                      <span className="text-sm font-medium">+12%</span>
                    </div>
                    <Progress value={82} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Revenue Growth</span>
                      <span className="text-sm font-medium">+8.7%</span>
                    </div>
                    <Progress value={78} className="h-2" />
                  </div>
                  <div>
                    <div className="flex justify-between mb-2">
                      <span className="text-sm">Operational Efficiency</span>
                      <span className="text-sm font-medium">+5.2%</span>
                    </div>
                    <Progress value={71} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Target className="h-5 w-5" />
                  <span>AI Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="text-sm font-medium">Optimize Grid Operations</p>
                    <p className="text-xs text-muted-foreground">AI suggests 15% efficiency improvement</p>
                  </div>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="text-sm font-medium">Reduce Technical Losses</p>
                    <p className="text-xs text-muted-foreground">Potential savings: ₵180M annually</p>
                  </div>
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm font-medium">Predictive Maintenance</p>
                    <p className="text-xs text-muted-foreground">Prevent 70% of equipment failures</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}