'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Slider } from '@/components/ui/slider'
import { 
  Monitor, 
  Zap, 
  BarChart3, 
  Settings, 
  Play, 
  Pause,
  RotateCcw,
  Maximize,
  MapPin,
  Thermometer,
  Droplets,
  Wind,
  Activity,
  TrendingUp,
  AlertTriangle,
  CheckCircle
} from 'lucide-react'

interface DigitalTwinAsset {
  id: string
  name: string
  type: 'power_plant' | 'substation' | 'transmission_line' | 'distribution_network'
  location: string
  capacity: number
  currentLoad: number
  efficiency: number
  health: number
  status: 'optimal' | 'degraded' | 'critical'
  lastUpdated: string
}

interface SimulationScenario {
  id: string
  name: string
  description: string
  type: 'demand_surge' | 'supply_disruption' | 'equipment_failure' | 'weather_event'
  severity: 'low' | 'medium' | 'high'
  probability: number
  impact: {
    economic: number
    reliability: number
    environmental: number
  }
}

interface SimulationResult {
  scenarioId: string
  timestamp: string
  metrics: {
    systemStability: number
    economicLoss: number
    supplyInterruption: number
    recoveryTime: number
  }
  recommendations: string[]
}

export default function DigitalTwinIntegration() {
  const [assets, setAssets] = useState<DigitalTwinAsset[]>([])
  const [scenarios, setScenarios] = useState<SimulationScenario[]>([])
  const [simulationResults, setSimulationResults] = useState<SimulationResult[]>([])
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null)
  const [isSimulating, setIsSimulating] = useState(false)
  const [simulationProgress, setSimulationProgress] = useState(0)

  useEffect(() => {
    // Simulate loading digital twin data
    const timer = setTimeout(() => {
      setAssets([
        {
          id: 'asset-1',
          name: 'Akosombo Hydro Power Plant',
          type: 'power_plant',
          location: 'Akosombo',
          capacity: 1020,
          currentLoad: 890,
          efficiency: 87,
          health: 92,
          status: 'optimal',
          lastUpdated: '2024-01-20T10:30:00Z'
        },
        {
          id: 'asset-2',
          name: 'Pokuase Bulk Supply Point',
          type: 'substation',
          location: 'Pokuase',
          capacity: 330,
          currentLoad: 285,
          efficiency: 94,
          health: 88,
          status: 'optimal',
          lastUpdated: '2024-01-20T10:28:00Z'
        },
        {
          id: 'asset-3',
          name: 'Tema-Accra Transmission Line',
          type: 'transmission_line',
          location: 'Tema-Accra',
          capacity: 400,
          currentLoad: 365,
          efficiency: 96,
          health: 85,
          status: 'degraded',
          lastUpdated: '2024-01-20T10:25:00Z'
        },
        {
          id: 'asset-4',
          name: 'Kumasi Distribution Network',
          type: 'distribution_network',
          location: 'Kumasi',
          capacity: 280,
          currentLoad: 245,
          efficiency: 78,
          health: 72,
          status: 'degraded',
          lastUpdated: '2024-01-20T10:22:00Z'
        }
      ])

      setScenarios([
        {
          id: 'scenario-1',
          name: 'Peak Demand Surge',
          description: 'Simulate 25% increase in electricity demand during peak hours',
          type: 'demand_surge',
          severity: 'medium',
          probability: 75,
          impact: {
            economic: 65,
            reliability: 70,
            environmental: 40
          }
        },
        {
          id: 'scenario-2',
          name: 'Gas Supply Disruption',
          description: 'Model the impact of interrupted natural gas supply to thermal plants',
          type: 'supply_disruption',
          severity: 'high',
          probability: 35,
          impact: {
            economic: 85,
            reliability: 90,
            environmental: 60
          }
        },
        {
          id: 'scenario-3',
          name: 'Major Equipment Failure',
          description: 'Simulate failure of critical generation or transmission equipment',
          type: 'equipment_failure',
          severity: 'high',
          probability: 20,
          impact: {
            economic: 90,
            reliability: 95,
            environmental: 45
          }
        },
        {
          id: 'scenario-4',
          name: 'Severe Weather Event',
          description: 'Model system response to extreme weather conditions',
          type: 'weather_event',
          severity: 'medium',
          probability: 60,
          impact: {
            economic: 70,
            reliability: 75,
            environmental: 50
          }
        }
      ])

      setSimulationResults([
        {
          scenarioId: 'scenario-1',
          timestamp: '2024-01-20T09:15:00Z',
          metrics: {
            systemStability: 78,
            economicLoss: 12500000,
            supplyInterruption: 8,
            recoveryTime: 4
          },
          recommendations: [
            'Implement demand response programs',
            'Activate backup generation capacity',
            'Coordinate with industrial consumers for load reduction'
          ]
        }
      ])
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  const runSimulation = (scenarioId: string) => {
    setSelectedScenario(scenarioId)
    setIsSimulating(true)
    setSimulationProgress(0)

    const interval = setInterval(() => {
      setSimulationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setIsSimulating(false)
          
          // Add new simulation result
          const newResult: SimulationResult = {
            scenarioId,
            timestamp: new Date().toISOString(),
            metrics: {
              systemStability: Math.floor(Math.random() * 30) + 60,
              economicLoss: Math.floor(Math.random() * 50000000) + 5000000,
              supplyInterruption: Math.floor(Math.random() * 15) + 5,
              recoveryTime: Math.floor(Math.random() * 8) + 2
            },
            recommendations: [
              'Optimize grid configuration',
              'Deploy mobile generation units',
              'Implement emergency protocols',
              'Coordinate cross-border power exchanges'
            ]
          }
          
          setSimulationResults(prev => [newResult, ...prev])
          return 100
        }
        return prev + Math.random() * 10
      })
    }, 200)
  }

  const getAssetIcon = (type: string) => {
    switch (type) {
      case 'power_plant': return <Zap className="h-5 w-5" />
      case 'substation': return <BarChart3 className="h-5 w-5" />
      case 'transmission_line': return <Activity className="h-5 w-5" />
      case 'distribution_network': return <MapPin className="h-5 w-5" />
      default: return <Monitor className="h-5 w-5" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'optimal': return 'bg-green-500'
      case 'degraded': return 'bg-yellow-500'
      case 'critical': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-red-500 bg-red-50'
      case 'medium': return 'border-yellow-500 bg-yellow-50'
      case 'low': return 'border-green-500 bg-green-50'
      default: return 'border-gray-500 bg-gray-50'
    }
  }

  return (
    <div className="space-y-6">
      {/* Digital Twin Header */}
      <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-blue-500">
              <Monitor className="h-5 w-5 text-white" />
            </div>
            <span className="bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
              Digital Twin Integration
            </span>
          </CardTitle>
          <CardDescription>
            Virtual simulation and modeling of energy infrastructure for predictive analysis and scenario planning
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{assets.length}</div>
              <div className="text-sm text-muted-foreground">Digital Assets</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{scenarios.length}</div>
              <div className="text-sm text-muted-foreground">Simulation Scenarios</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">
                {assets.filter(a => a.status === 'optimal').length / assets.length * 100}%
              </div>
              <div className="text-sm text-muted-foreground">System Health</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">{simulationResults.length}</div>
              <div className="text-sm text-muted-foreground">Simulations Run</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="assets" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="assets">Digital Assets</TabsTrigger>
          <TabsTrigger value="scenarios">Simulation Scenarios</TabsTrigger>
          <TabsTrigger value="results">Simulation Results</TabsTrigger>
          <TabsTrigger value="controls">Real-time Controls</TabsTrigger>
        </TabsList>

        <TabsContent value="assets" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            {assets.map((asset) => (
              <Card key={asset.id} className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      {getAssetIcon(asset.type)}
                      <CardTitle className="text-lg">{asset.name}</CardTitle>
                    </div>
                    <Badge className={`${getStatusColor(asset.status)} text-white`}>
                      {asset.status}
                    </Badge>
                  </div>
                  <CardDescription>{asset.location}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Capacity</p>
                        <p className="font-medium">{asset.capacity} MW</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Current Load</p>
                        <p className="font-medium">{asset.currentLoad} MW</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Efficiency</p>
                        <p className="font-medium">{asset.efficiency}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Health</p>
                        <p className="font-medium">{asset.health}%</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Utilization</span>
                        <span>{Math.round((asset.currentLoad / asset.capacity) * 100)}%</span>
                      </div>
                      <Progress value={(asset.currentLoad / asset.capacity) * 100} className="h-2" />
                    </div>
                    
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline">
                        <Maximize className="h-4 w-4 mr-1" />
                        View Details
                      </Button>
                      <Button size="sm" variant="outline">
                        <Settings className="h-4 w-4 mr-1" />
                        Configure
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scenarios" className="space-y-4">
          <div className="grid gap-4">
            {scenarios.map((scenario) => (
              <Card key={scenario.id} className={getSeverityColor(scenario.severity)}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{scenario.name}</CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant={scenario.severity === 'high' ? 'destructive' : scenario.severity === 'medium' ? 'default' : 'secondary'}>
                        {scenario.severity} severity
                      </Badge>
                      <Badge variant="outline">{scenario.probability}% probability</Badge>
                    </div>
                  </div>
                  <CardDescription>{scenario.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-bold text-red-600">{scenario.impact.economic}%</div>
                        <div className="text-sm text-muted-foreground">Economic Impact</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-orange-600">{scenario.impact.reliability}%</div>
                        <div className="text-sm text-muted-foreground">Reliability Impact</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-bold text-green-600">{scenario.impact.environmental}%</div>
                        <div className="text-sm text-muted-foreground">Environmental Impact</div>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={() => runSimulation(scenario.id)}
                      disabled={isSimulating && selectedScenario === scenario.id}
                      className="w-full"
                    >
                      {isSimulating && selectedScenario === scenario.id ? (
                        <>
                          <Pause className="h-4 w-4 mr-2" />
                          Simulating...
                        </>
                      ) : (
                        <>
                          <Play className="h-4 w-4 mr-2" />
                          Run Simulation
                        </>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="results" className="space-y-4">
          {simulationResults.length > 0 ? (
            <div className="grid gap-4">
              {simulationResults.map((result) => (
                <Card key={result.scenarioId}>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <BarChart3 className="h-5 w-5" />
                      <span>Simulation Results</span>
                    </CardTitle>
                    <CardDescription>
                      {new Date(result.timestamp).toLocaleString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <div className="text-lg font-bold text-blue-600">{result.metrics.systemStability}%</div>
                          <div className="text-sm text-muted-foreground">System Stability</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <div className="text-lg font-bold text-red-600">₵{(result.metrics.economicLoss / 1000000).toFixed(1)}M</div>
                          <div className="text-sm text-muted-foreground">Economic Loss</div>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <div className="text-lg font-bold text-orange-600">{result.metrics.supplyInterruption}%</div>
                          <div className="text-sm text-muted-foreground">Supply Interruption</div>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{result.metrics.recoveryTime}h</div>
                          <div className="text-sm text-muted-foreground">Recovery Time</div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-medium mb-2">Recommendations:</h4>
                        <ul className="space-y-1">
                          {result.recommendations.map((rec, index) => (
                            <li key={index} className="text-sm flex items-start space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-500 mt-0.5 flex-shrink-0" />
                              <span>{rec}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <BarChart3 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No simulation results yet. Run a scenario to see results.</p>
                </div>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="controls" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>System Controls</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium">Grid Load Balancing</label>
                  <Slider defaultValue={[50]} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <label className="text-sm font-medium">Generation Output</label>
                  <Slider defaultValue={[75]} max={100} step={1} className="mt-2" />
                </div>
                <div>
                  <label className="text-sm font-medium">Voltage Regulation</label>
                  <Slider defaultValue={[90]} max={100} step={1} className="mt-2" />
                </div>
                <div className="flex space-x-2">
                  <Button className="flex-1">
                    <Play className="h-4 w-4 mr-2" />
                    Apply Changes
                  </Button>
                  <Button variant="outline">
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Reset
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Activity className="h-5 w-5" />
                  <span>Real-time Monitoring</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-green-600" />
                      <span className="text-sm font-medium">Grid Stability</span>
                    </div>
                    <Badge className="bg-green-500">Optimal</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <AlertTriangle className="h-4 w-4 text-yellow-600" />
                      <span className="text-sm font-medium">Load Distribution</span>
                    </div>
                    <Badge className="bg-yellow-500">Attention</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div className="flex items-center space-x-2">
                      <TrendingUp className="h-4 w-4 text-blue-600" />
                      <span className="text-sm font-medium">Frequency Control</span>
                    </div>
                    <Badge className="bg-blue-500">Normal</Badge>
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