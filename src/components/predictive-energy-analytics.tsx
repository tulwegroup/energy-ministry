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
  Zap, 
  AlertTriangle, 
  Target, 
  BarChart3,
  Activity,
  Clock,
  DollarSign,
  Leaf,
  Shield,
  Users,
  Network,
  Satellite
} from 'lucide-react'

interface Prediction {
  id: string
  type: 'demand' | 'supply' | 'price' | 'revenue' | 'risk'
  title: string
  description: string
  confidence: number
  timeframe: string
  impact: 'high' | 'medium' | 'low'
  value: string
  trend: 'up' | 'down' | 'stable'
  recommendation: string
}

interface MarketInsight {
  id: string
  category: 'global' | 'regional' | 'local'
  title: string
  insight: string
  impact: string
  action: string
  timestamp: string
}

export default function PredictiveEnergyAnalytics() {
  const [predictions, setPredictions] = useState<Prediction[]>([])
  const [marketInsights, setMarketInsights] = useState<MarketInsight[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate AI-powered predictions
    const mockPredictions: Prediction[] = [
      {
        id: 'pred-1',
        type: 'demand',
        title: 'Peak Demand Surge',
        description: 'AI predicts 23% increase in peak demand for Q3 2024',
        confidence: 92,
        timeframe: '3 months',
        impact: 'high',
        value: '+425 MW',
        trend: 'up',
        recommendation: 'Increase generation capacity and secure additional power purchase agreements'
      },
      {
        id: 'pred-2',
        type: 'supply',
        title: 'Gas Supply Optimization',
        description: 'ML algorithm identifies 18% efficiency improvement in gas distribution',
        confidence: 87,
        timeframe: '6 months',
        impact: 'medium',
        value: '₵245M savings',
        trend: 'up',
        recommendation: 'Implement AI-driven routing and pressure optimization systems'
      },
      {
        id: 'pred-3',
        type: 'price',
        title: 'Energy Price Volatility',
        description: 'Neural network forecasts high price volatility in H2 2024',
        confidence: 78,
        timeframe: '6 months',
        impact: 'high',
        value: '±15% fluctuation',
        trend: 'unstable',
        recommendation: 'Hedge 40% of energy requirements and establish strategic reserves'
      },
      {
        id: 'pred-4',
        type: 'revenue',
        title: 'Revenue Growth Projection',
        description: 'Deep learning model predicts 28% revenue growth for renewable sector',
        confidence: 85,
        timeframe: '12 months',
        impact: 'high',
        value: '+₵2.8B',
        trend: 'up',
        recommendation: 'Accelerate renewable energy investments and expand green portfolio'
      },
      {
        id: 'pred-5',
        type: 'risk',
        title: 'Infrastructure Risk Alert',
        description: 'Computer vision detects potential failure in transmission infrastructure',
        confidence: 73,
        timeframe: '2 months',
        impact: 'high',
        value: 'Critical risk',
        trend: 'increasing',
        recommendation: 'Immediate inspection and preventive maintenance of identified assets'
      }
    ]

    const mockMarketInsights: MarketInsight[] = [
      {
        id: 'insight-1',
        category: 'global',
        title: 'Global Energy Transition',
        insight: 'International markets shifting towards renewable energy investments',
        impact: 'High impact on export opportunities',
        action: 'Develop renewable energy export strategy',
        timestamp: '2 hours ago'
      },
      {
        id: 'insight-2',
        category: 'regional',
        title: 'West African Power Pool',
        insight: 'Regional integration creating new trading opportunities',
        impact: 'Medium revenue potential',
        action: 'Negotiate cross-border power agreements',
        timestamp: '4 hours ago'
      },
      {
        id: 'insight-3',
        category: 'local',
        title: 'Industrial Growth Pattern',
        insight: 'Manufacturing sector expansion driving energy demand',
        impact: 'High infrastructure requirements',
        action: 'Plan industrial zone power infrastructure',
        timestamp: '6 hours ago'
      }
    ]

    setPredictions(mockPredictions)
    setMarketInsights(mockMarketInsights)
    setLoading(false)
  }, [])

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'down': return <TrendingUp className="h-4 w-4 text-red-500 rotate-180" />
      case 'stable': return <Activity className="h-4 w-4 text-blue-500" />
      default: return <Activity className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'demand': return <Zap className="h-5 w-5" />
      case 'supply': return <BarChart3 className="h-5 w-5" />
      case 'price': return <DollarSign className="h-5 w-5" />
      case 'revenue': return <Target className="h-5 w-5" />
      case 'risk': return <AlertTriangle className="h-5 w-5" />
      default: return <Brain className="h-5 w-5" />
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Brain className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-lg font-medium">AI Analytics Engine Initializing...</p>
          <p className="text-sm text-muted-foreground">Training neural networks and analyzing patterns</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Predictive Energy Analytics
          </h2>
          <p className="text-muted-foreground">AI-powered insights and future energy forecasting</p>
        </div>
        <Badge className="professional-gradient text-white border-0">
          <Brain className="h-3 w-3 mr-1" />
          AI-Powered
        </Badge>
      </div>

      <Tabs defaultValue="predictions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card/80 backdrop-blur-md p-1 rounded-lg">
          <TabsTrigger value="predictions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Predictions
          </TabsTrigger>
          <TabsTrigger value="insights" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Market Insights
          </TabsTrigger>
          <TabsTrigger value="optimization" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Optimization
          </TabsTrigger>
        </TabsList>

        <TabsContent value="predictions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="sophisticated-card hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                        {getTypeIcon(prediction.type)}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{prediction.title}</CardTitle>
                        <div className="flex items-center space-x-1 mt-1">
                          {getTrendIcon(prediction.trend)}
                          <span className="text-xs text-muted-foreground">{prediction.timeframe}</span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getImpactColor(prediction.impact)} text-white border-0 text-xs`}>
                      {prediction.impact}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{prediction.description}</p>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Confidence</span>
                      <span className="text-xs font-medium">{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                      {prediction.value}
                    </span>
                    <div className="flex items-center space-x-1">
                      <Brain className="h-3 w-3 text-purple-500" />
                      <span className="text-xs text-purple-500">AI</span>
                    </div>
                  </div>
                  
                  <div className="pt-2 border-t border-white/10">
                    <p className="text-xs text-muted-foreground">
                      <span className="font-medium">Recommendation:</span> {prediction.recommendation}
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="insights" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {marketInsights.map((insight) => (
              <Card key={insight.id} className="sophisticated-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500">
                        <Satellite className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{insight.title}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {insight.category}
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-muted-foreground">{insight.insight}</p>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Target className="h-3 w-3 text-orange-500" />
                      <span className="text-xs font-medium">Impact:</span>
                      <span className="text-xs text-muted-foreground">{insight.impact}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Users className="h-3 w-3 text-blue-500" />
                      <span className="text-xs font-medium">Action:</span>
                      <span className="text-xs text-muted-foreground">{insight.action}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">{insight.timestamp}</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      Analyze
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="optimization" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="sophisticated-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Leaf className="h-5 w-5 text-green-500" />
                  <span>Smart Grid Optimization</span>
                </CardTitle>
                <CardDescription>AI-driven grid balancing and load management</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="text-2xl font-bold text-green-600">18%</div>
                    <div className="text-sm text-muted-foreground">Efficiency Gain</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-2xl font-bold text-blue-600">₵245M</div>
                    <div className="text-sm text-muted-foreground">Annual Savings</div>
                  </div>
                </div>
                <Button className="w-full professional-button">
                  <Network className="h-4 w-4 mr-2" />
                  Optimize Grid
                </Button>
              </CardContent>
            </Card>

            <Card className="sophisticated-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-purple-500" />
                  <span>Risk Mitigation</span>
                </CardTitle>
                <CardDescription>Proactive risk identification and prevention</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-red-50 to-orange-50">
                    <div className="text-2xl font-bold text-red-600">92%</div>
                    <div className="text-sm text-muted-foreground">Risk Detection</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-yellow-50 to-amber-50">
                    <div className="text-2xl font-bold text-yellow-600">78%</div>
                    <div className="text-sm text-muted-foreground">Prevention Rate</div>
                  </div>
                </div>
                <Button className="w-full professional-button">
                  <Shield className="h-4 w-4 mr-2" />
                  Assess Risks
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}