'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Brain, 
  TrendingUp, 
  Target, 
  Lightbulb, 
  BarChart3,
  PieChart,
  Activity,
  Zap,
  DollarSign,
  AlertTriangle,
  CheckCircle,
  Clock,
  Sparkles,
  FileText,
  Download
} from 'lucide-react'

interface Insight {
  id: string
  category: 'operational' | 'financial' | 'strategic' | 'risk'
  title: string
  description: string
  confidence: number
  impact: 'high' | 'medium' | 'low'
  timeframe: string
  actionItems: string[]
  dataPoints: Array<{
    label: string
    value: number
    change: number
  }>
}

interface AIPrediction {
  id: string
  metric: string
  currentValue: number
  predictedValue: number
  confidence: number
  timeframe: string
  factors: string[]
}

interface Recommendation {
  id: string
  priority: 'critical' | 'high' | 'medium' | 'low'
  title: string
  description: string
  expectedImpact: string
  implementation: string
  cost: string
  timeline: string
}

export default function AdvancedAIInsights() {
  const [insights, setInsights] = useState<Insight[]>([])
  const [predictions, setPredictions] = useState<AIPrediction[]>([])
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [loading, setLoading] = useState(true)
  const [aiQuery, setAiQuery] = useState('')
  const [aiResponse, setAiResponse] = useState('')

  useEffect(() => {
    // Simulate loading AI insights
    const timer = setTimeout(() => {
      setInsights([
        {
          id: 'insight-1',
          category: 'operational',
          title: 'Grid Optimization Opportunity',
          description: 'AI analysis reveals 23% potential improvement in grid efficiency through load balancing optimization',
          confidence: 89,
          impact: 'high',
          timeframe: '3-6 months',
          actionItems: [
            'Implement AI-driven load balancing algorithms',
            'Upgrade smart grid infrastructure',
            'Train operations team on new systems'
          ],
          dataPoints: [
            { label: 'Current Efficiency', value: 76, change: -2.1 },
            { label: 'Target Efficiency', value: 94, change: 0 },
            { label: 'Potential Savings', value: 180, change: 0 }
          ]
        },
        {
          id: 'insight-2',
          category: 'financial',
          title: 'Revenue Leakage Detection',
          description: 'Machine learning identified ₵142M in potential revenue recovery through commercial loss reduction',
          confidence: 92,
          impact: 'high',
          timeframe: '6-12 months',
          actionItems: [
            'Deploy advanced metering infrastructure',
            'Implement real-time fraud detection',
            'Enhance billing system accuracy'
          ],
          dataPoints: [
            { label: 'Current Losses', value: 24.5, change: 1.2 },
            { label: 'Target Losses', value: 15.2, change: 0 },
            { label: 'Recovery Potential', value: 142, change: 0 }
          ]
        },
        {
          id: 'insight-3',
          category: 'strategic',
          title: 'Renewable Energy Integration',
          description: 'Strategic analysis shows optimal path for 40% renewable energy integration by 2027',
          confidence: 85,
          impact: 'medium',
          timeframe: '2-4 years',
          actionItems: [
            'Phase solar power plant development',
            'Develop energy storage solutions',
            'Create regulatory framework for renewables'
          ],
          dataPoints: [
            { label: 'Current Renewable %', value: 12, change: 2.1 },
            { label: 'Target Renewable %', value: 40, change: 0 },
            { label: 'Investment Required', value: 2800, change: 0 }
          ]
        }
      ])

      setPredictions([
        {
          id: 'pred-1',
          metric: 'Energy Demand',
          currentValue: 3847,
          predictedValue: 4650,
          confidence: 87,
          timeframe: 'Q3 2024',
          factors: ['Industrial growth', 'Population increase', 'Economic development']
        },
        {
          id: 'pred-2',
          metric: 'Revenue Generation',
          currentValue: 4200,
          predictedValue: 5120,
          confidence: 82,
          timeframe: 'Q4 2024',
          factors: ['Tariff adjustments', 'Loss reduction', 'New customer acquisition']
        },
        {
          id: 'pred-3',
          metric: 'System Reliability',
          currentValue: 94.2,
          predictedValue: 97.8,
          confidence: 79,
          timeframe: 'Q2 2024',
          factors: ['Infrastructure upgrades', 'Preventive maintenance', 'Grid automation']
        }
      ])

      setRecommendations([
        {
          id: 'rec-1',
          priority: 'critical',
          title: 'Emergency Grid Modernization',
          description: 'Immediate upgrade of critical transmission infrastructure to prevent cascading failures',
          expectedImpact: 'Reduce outage risk by 65%, improve system reliability',
          implementation: 'Fast-track procurement and deployment of smart grid equipment',
          cost: '₵85M',
          timeline: '3-6 months'
        },
        {
          id: 'rec-2',
          priority: 'high',
          title: 'AI-Powered Predictive Maintenance',
          description: 'Implement machine learning system for equipment failure prediction and maintenance scheduling',
          expectedImpact: 'Reduce maintenance costs by 40%, extend equipment life by 25%',
          implementation: 'Deploy IoT sensors and AI analytics platform across all assets',
          cost: '₵45M',
          timeline: '6-9 months'
        },
        {
          id: 'rec-3',
          priority: 'medium',
          title: 'Digital Transformation Initiative',
          description: 'Comprehensive digitalization of operations and customer services',
          expectedImpact: 'Improve operational efficiency by 35%, enhance customer satisfaction',
          implementation: 'Phase implementation of digital platforms and mobile applications',
          cost: '₵120M',
          timeline: '12-18 months'
        }
      ])

      setLoading(false)
    }, 2500)

    return () => clearTimeout(timer)
  }, [])

  const handleAIQuery = async () => {
    if (aiQuery.trim()) {
      // Simulate AI response
      setAiResponse('Analyzing your query about energy sector optimization...\n\nBased on current data and trends, I recommend:\n\n1. **Short-term Actions (1-3 months):**\n   - Focus on reducing technical and commercial losses\n   - Implement demand response programs\n   - Optimize generation dispatch\n\n2. **Medium-term Strategy (3-6 months):**\n   - Accelerate grid modernization projects\n   - Deploy advanced analytics for predictive maintenance\n   - Enhance cross-border power trading capabilities\n\n3. **Long-term Vision (6-18 months):**\n   - Scale renewable energy integration\n   - Develop energy storage solutions\n   - Create smart grid ecosystem\n\nKey performance indicators to monitor:\n- System reliability improvement\n- Revenue collection efficiency\n- Customer satisfaction metrics\n- Environmental impact reduction\n\nWould you like me to elaborate on any specific area?')
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'operational': return 'bg-blue-500'
      case 'financial': return 'bg-green-500'
      case 'strategic': return 'bg-purple-500'
      case 'risk': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'border-red-500 bg-red-50'
      case 'high': return 'border-orange-500 bg-orange-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  if (loading) {
    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Brain className="h-5 w-5" />
              <span>Advanced AI Insights</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
                <p className="mt-4 text-muted-foreground">AI is analyzing energy sector data...</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
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
              Advanced AI-Powered Insights
            </span>
          </CardTitle>
          <CardDescription>
            Machine learning-driven analysis and recommendations for strategic energy sector decision-making
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">{insights.length}</div>
              <div className="text-sm text-muted-foreground">AI Insights</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{predictions.length}</div>
              <div className="text-sm text-muted-foreground">Predictions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{recommendations.length}</div>
              <div className="text-sm text-muted-foreground">Recommendations</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">94%</div>
              <div className="text-sm text-muted-foreground">AI Accuracy</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="insights" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="insights">AI Insights</TabsTrigger>
          <TabsTrigger value="predictions">Predictions</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="ai-assistant">AI Assistant</TabsTrigger>
        </TabsList>

        <TabsContent value="insights" className="space-y-4">
          <div className="grid gap-6">
            {insights.map((insight) => (
              <Card key={insight.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-lg ${getCategoryColor(insight.category)}`}>
                        <Brain className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-lg">{insight.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="capitalize">{insight.category}</Badge>
                          <Badge variant="outline">{insight.confidence}% confidence</Badge>
                          <Badge className={`${insight.impact === 'high' ? 'bg-red-500' : insight.impact === 'medium' ? 'bg-yellow-500' : 'bg-green-500'} text-white`}>
                            {insight.impact} impact
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-muted-foreground">{insight.timeframe}</p>
                    </div>
                  </div>
                  <CardDescription>{insight.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Key Data Points</h4>
                      <div className="space-y-2">
                        {insight.dataPoints.map((point, index) => (
                          <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded">
                            <span className="text-sm">{point.label}</span>
                            <div className="text-right">
                              <span className="font-medium">{point.value}</span>
                              {point.change !== 0 && (
                                <span className={`text-xs ml-1 ${point.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                  ({point.change > 0 ? '+' : ''}{point.change}%)
                                </span>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Action Items</h4>
                      <ul className="space-y-2">
                        {insight.actionItems.map((action, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="predictions" className="space-y-4">
          <div className="grid md:grid-cols-3 gap-4">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <TrendingUp className="h-5 w-5 text-blue-500" />
                    <span className="text-lg">{prediction.metric}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-2xl font-bold text-blue-600">{prediction.currentValue}</div>
                      <div className="text-sm text-muted-foreground">Current</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold text-green-600">{prediction.predictedValue}</div>
                      <div className="text-sm text-muted-foreground">Predicted</div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">{prediction.confidence}%</div>
                      <div className="text-sm text-muted-foreground">Confidence</div>
                    </div>
                    <div>
                      <p className="text-sm font-medium mb-2">Timeframe: {prediction.timeframe}</p>
                      <p className="text-sm text-muted-foreground mb-2">Key Factors:</p>
                      <ul className="space-y-1">
                        {prediction.factors.map((factor, index) => (
                          <li key={index} className="text-xs flex items-center space-x-1">
                            <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                            <span>{factor}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <div className="grid gap-4">
            {recommendations.map((rec) => (
              <Card key={rec.id} className={getPriorityColor(rec.priority)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Target className="h-5 w-5" />
                      <div>
                        <CardTitle className="text-lg">{rec.title}</CardTitle>
                        <Badge variant={rec.priority === 'critical' ? 'destructive' : rec.priority === 'high' ? 'default' : 'secondary'} className="mt-1">
                          {rec.priority} priority
                        </Badge>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{rec.cost}</p>
                      <p className="text-sm text-muted-foreground">{rec.timeline}</p>
                    </div>
                  </div>
                  <CardDescription>{rec.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium text-sm">Expected Impact:</p>
                      <p className="text-sm text-muted-foreground">{rec.expectedImpact}</p>
                    </div>
                    <div>
                      <p className="font-medium text-sm">Implementation:</p>
                      <p className="text-sm text-muted-foreground">{rec.implementation}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm">View Details</Button>
                      <Button size="sm" variant="outline">Add to Plan</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="ai-assistant" className="space-y-4">
          <div className="grid lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5" />
                  <span>AI Energy Assistant</span>
                </CardTitle>
                <CardDescription>
                  Ask questions about energy sector optimization, strategy, or operations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Textarea
                    value={aiQuery}
                    onChange={(e) => setAiQuery(e.target.value)}
                    placeholder="e.g., How can we reduce technical losses in the distribution network?"
                    rows={4}
                  />
                  <Button onClick={handleAIQuery} className="w-full">
                    <Brain className="h-4 w-4 mr-2" />
                    Get AI Insights
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <FileText className="h-5 w-5" />
                  <span>AI Response</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {aiResponse ? (
                  <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm whitespace-pre-line">{aiResponse}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Download className="h-4 w-4 mr-2" />
                        Export
                      </Button>
                      <Button size="sm" variant="outline">
                        Share
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-32">
                    <p className="text-muted-foreground text-sm">Ask a question to get AI-powered insights</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}