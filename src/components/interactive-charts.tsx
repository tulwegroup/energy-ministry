'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  LineChart, 
  Line, 
  BarChart, 
  Bar, 
  PieChart, 
  Pie, 
  Cell, 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer, 
  AreaChart, 
  Area,
  ScatterChart,
  Scatter,
  ComposedChart,
  FunnelChart,
  Funnel,
  Treemap
} from 'recharts'
import { 
  BarChart3, 
  LineChart as LineChartIcon, 
  PieChart as PieChartIcon, 
  Activity,
  TrendingUp,
  Zap,
  DollarSign,
  Target,
  Eye,
  Download,
  RefreshCw,
  Filter,
  Calendar,
  MapPin,
  Users
} from 'lucide-react'

interface InteractiveChartProps {
  title: string
  description: string
  icon: React.ReactNode
  children: React.ReactNode
  actions?: React.ReactNode
}

interface ChartDataPoint {
  name: string
  value: number
  category?: string
  trend?: number
  target?: number
}

interface TimeSeriesData {
  timestamp: string
  value: number
  predicted?: number
  upper_bound?: number
  lower_bound?: number
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FFC658', '#FF7C7C']

function InteractiveChart({ title, description, icon, children, actions }: InteractiveChartProps) {
  return (
    <Card className="sophisticated-card hover-lift">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
              {icon}
            </div>
            <div>
              <CardTitle className="text-sm">{title}</CardTitle>
              <CardDescription className="text-xs">{description}</CardDescription>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {actions}
            <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
              <Eye className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-64">
          {children}
        </div>
      </CardContent>
    </Card>
  )
}

export default function InteractiveCharts() {
  const [selectedTimeRange, setSelectedTimeRange] = useState('1M')
  const [chartType, setChartType] = useState('line')
  const [loading, setLoading] = useState(false)

  // Enhanced financial data
  const financialData = [
    { month: 'Jan', revenue: 780, expenditure: 620, target: 750, profit: 160 },
    { month: 'Feb', revenue: 820, expenditure: 650, target: 780, profit: 170 },
    { month: 'Mar', revenue: 850, expenditure: 680, target: 820, profit: 170 },
    { month: 'Apr', revenue: 880, expenditure: 700, target: 850, profit: 180 },
    { month: 'May', revenue: 920, expenditure: 720, target: 880, profit: 200 },
    { month: 'Jun', revenue: 950, expenditure: 740, target: 920, profit: 210 }
  ]

  // Real-time energy data
  const energyData = [
    { time: '00:00', demand: 2100, supply: 2200, renewable: 420, thermal: 1780 },
    { time: '04:00', demand: 1950, supply: 2050, renewable: 380, thermal: 1670 },
    { time: '08:00', demand: 2650, supply: 2750, renewable: 520, thermal: 2230 },
    { time: '12:00', demand: 2850, supply: 2950, renewable: 680, thermal: 2270 },
    { time: '16:00', demand: 2750, supply: 2850, renewable: 590, thermal: 2260 },
    { time: '20:00', demand: 2450, supply: 2550, renewable: 450, thermal: 2100 }
  ]

  // Agency performance radar data
  const agencyPerformance = [
    { agency: 'ECG', efficiency: 78, reliability: 82, financial: 85, compliance: 84, innovation: 72 },
    { agency: 'VRA', efficiency: 89, reliability: 91, financial: 88, compliance: 92, innovation: 85 },
    { agency: 'GRIDCo', efficiency: 94, reliability: 96, financial: 90, compliance: 97, innovation: 88 },
    { agency: 'GNPC', efficiency: 92, reliability: 89, financial: 94, compliance: 95, innovation: 90 },
    { agency: 'BOST', efficiency: 86, reliability: 84, financial: 82, compliance: 87, innovation: 78 }
  ]

  // Project portfolio data
  const projectData = [
    { name: 'Pokuase BSP', value: 68, category: 'Transmission', status: 'Active', roi: 18.5 },
    { name: 'Kumasi 330kV', value: 72, category: 'Transmission', status: 'Active', roi: 22.1 },
    { name: 'Takoradi Thermal', value: 91, category: 'Generation', status: 'Active', roi: 15.8 },
    { name: 'Tema-Accra', value: 60, category: 'Transmission', status: 'Delayed', roi: 12.4 },
    { name: 'Sunyani Plant', value: 70, category: 'Generation', status: 'Active', roi: 19.7 },
    { name: 'Tamale Network', value: 45, category: 'Distribution', status: 'At Risk', roi: 8.2 }
  ]

  // Market share data
  const marketShareData = [
    { name: 'ECG', value: 35.2, customers: 4.1M, revenue: 7.8 },
    { name: 'VRA', value: 28.7, customers: 2.8M, revenue: 5.8 },
    { name: 'GRIDCo', value: 18.4, customers: 1.2M, revenue: 4.2 },
    { name: 'GNPC', value: 12.8, customers: 0.8M, revenue: 8.2 },
    { name: 'BOST', value: 4.9, customers: 0.3M, revenue: 2.4 }
  ]

  // Predictive analytics data
  const predictiveData = [
    { month: 'Jul', actual: 980, predicted: 990, upper: 1020, lower: 960 },
    { month: 'Aug', actual: null, predicted: 1020, upper: 1050, lower: 990 },
    { month: 'Sep', actual: null, predicted: 1060, upper: 1090, lower: 1030 },
    { month: 'Oct', actual: null, predicted: 1100, upper: 1130, lower: 1070 },
    { month: 'Nov', actual: null, predicted: 1140, upper: 1170, lower: 1110 },
    { month: 'Dec', actual: null, predicted: 1180, upper: 1210, lower: 1150 }
  ]

  const refreshData = async () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 1500)
  }

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-lg">
          <p className="font-medium text-gray-900">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }}>
              {entry.name}: {entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Interactive Data Visualization
          </h2>
          <p className="text-muted-foreground">Advanced charts with real-time interactivity</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
            <Activity className="h-3 w-3 mr-1" />
            Interactive
          </Badge>
          <Button 
            onClick={refreshData} 
            disabled={loading}
            variant="outline"
            size="sm"
          >
            {loading ? (
              <RefreshCw className="h-4 w-4 animate-spin" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="financial" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-card/80 backdrop-blur-md p-1 rounded-lg">
          <TabsTrigger value="financial" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Financial
          </TabsTrigger>
          <TabsTrigger value="energy" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Energy
          </TabsTrigger>
          <TabsTrigger value="performance" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Performance
          </TabsTrigger>
          <TabsTrigger value="projects" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Projects
          </TabsTrigger>
          <TabsTrigger value="predictive" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Predictive
          </TabsTrigger>
        </TabsList>

        <TabsContent value="financial" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChart
              title="Revenue vs Expenditure"
              description="Monthly financial performance with targets"
              icon={<DollarSign className="h-5 w-5 text-white" />}
              actions={
                <div className="flex space-x-1">
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">1M</Button>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">3M</Button>
                  <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">6M</Button>
                </div>
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={financialData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="revenue" fill="#0088FE" fillOpacity={0.3} stroke="#0088FE" strokeWidth={2} />
                  <Area type="monotone" dataKey="expenditure" fill="#FF8042" fillOpacity={0.3} stroke="#FF8042" strokeWidth={2} />
                  <Line type="monotone" dataKey="target" stroke="#00C49F" strokeWidth={2} strokeDasharray="5 5" />
                </ComposedChart>
              </ResponsiveContainer>
            </InteractiveChart>

            <InteractiveChart
              title="Market Share Distribution"
              description="Revenue distribution across agencies"
              icon={<PieChartIcon className="h-5 w-5 text-white" />}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={marketShareData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {marketShareData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </InteractiveChart>
          </div>
        </TabsContent>

        <TabsContent value="energy" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChart
              title="Real-time Energy Balance"
              description="Live demand vs supply with energy mix"
              icon={<Zap className="h-5 w-5 text-white" />}
              actions={
                <div className="flex items-center space-x-1">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs text-green-500">Live</span>
                </div>
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Area type="monotone" dataKey="demand" fill="#FF8042" fillOpacity={0.3} stroke="#FF8042" strokeWidth={2} />
                  <Area type="monotone" dataKey="supply" fill="#0088FE" fillOpacity={0.3} stroke="#0088FE" strokeWidth={2} />
                  <Line type="monotone" dataKey="renewable" stroke="#00C49F" strokeWidth={3} />
                </AreaChart>
              </ResponsiveContainer>
            </InteractiveChart>

            <InteractiveChart
              title="Energy Mix Composition"
              description="Real-time energy source distribution"
              icon={<Activity className="h-5 w-5 text-white" />}
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={energyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="time" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Bar dataKey="renewable" fill="#00C49F" stackId="a" />
                  <Bar dataKey="thermal" fill="#FF8042" stackId="a" />
                </BarChart>
              </ResponsiveContainer>
            </InteractiveChart>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChart
              title="Agency Performance Radar"
              description="Multi-dimensional performance comparison"
              icon={<Target className="h-5 w-5 text-white" />}
            >
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart data={agencyPerformance}>
                  <PolarGrid stroke="rgba(255,255,255,0.1)" />
                  <PolarAngleAxis dataKey="agency" stroke="rgba(255,255,255,0.6)" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="rgba(255,255,255,0.6)" />
                  <Radar
                    name="Efficiency"
                    dataKey="efficiency"
                    stroke="#0088FE"
                    fill="#0088FE"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Reliability"
                    dataKey="reliability"
                    stroke="#00C49F"
                    fill="#00C49F"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Radar
                    name="Financial"
                    dataKey="financial"
                    stroke="#FFBB28"
                    fill="#FFBB28"
                    fillOpacity={0.3}
                    strokeWidth={2}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>
            </InteractiveChart>

            <InteractiveChart
              title="Performance Trends"
              description="Agency performance over time"
              icon={<TrendingUp className="h-5 w-5 text-white" />}
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={agencyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="agency" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="efficiency" stroke="#0088FE" strokeWidth={3} />
                  <Line type="monotone" dataKey="reliability" stroke="#00C49F" strokeWidth={3} />
                  <Line type="monotone" dataKey="financial" stroke="#FFBB28" strokeWidth={3} />
                  <Line type="monotone" dataKey="compliance" stroke="#FF8042" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </InteractiveChart>
          </div>
        </TabsContent>

        <TabsContent value="projects" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChart
              title="Project Portfolio Overview"
              description="Project progress and ROI analysis"
              icon={<BarChart3 className="h-5 w-5 text-white" />}
            >
              <ResponsiveContainer width="100%" height="100%">
                <ScatterChart data={projectData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="value" name="Progress (%)" stroke="rgba(255,255,255,0.6)" />
                  <YAxis dataKey="roi" name="ROI (%)" stroke="rgba(255,255,255,0.6)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Scatter dataKey="value" fill="#0088FE" />
                </ScatterChart>
              </ResponsiveContainer>
            </InteractiveChart>

            <InteractiveChart
              title="Project Status Distribution"
              description="Current status of all projects"
              icon={<LineChartIcon className="h-5 w-5 text-white" />}
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={projectData}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {projectData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={
                        entry.status === 'Active' ? '#00C49F' :
                        entry.status === 'Delayed' ? '#FFBB28' :
                        entry.status === 'At Risk' ? '#FF8042' : '#0088FE'
                      } />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </InteractiveChart>
          </div>
        </TabsContent>

        <TabsContent value="predictive" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <InteractiveChart
              title="Revenue Forecast"
              description="AI-powered revenue predictions with confidence intervals"
              icon={<TrendingUp className="h-5 w-5 text-white" />}
              actions={
                <Badge className="bg-gradient-to-r from-purple-500 to-blue-500 text-white border-0 text-xs">
                  AI Prediction
                </Badge>
              }
            >
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={predictiveData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="month" stroke="rgba(255,255,255,0.6)" />
                  <YAxis stroke="rgba(255,255,255,0.6)" />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend />
                  <Line type="monotone" dataKey="actual" stroke="#0088FE" strokeWidth={3} />
                  <Line type="monotone" dataKey="predicted" stroke="#00C49F" strokeWidth={3} strokeDasharray="5 5" />
                  <Area type="monotone" dataKey="upper" fill="#00C49F" fillOpacity={0.1} stroke="none" />
                  <Area type="monotone" dataKey="lower" fill="#00C49F" fillOpacity={0.1} stroke="none" />
                </ComposedChart>
              </ResponsiveContainer>
            </InteractiveChart>

            <InteractiveChart
              title="Predictive Analytics Summary"
              description="Key predictions and insights"
              icon={<Activity className="h-5 w-5 text-white" />}
            >
              <div className="h-full flex flex-col justify-center space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="text-2xl font-bold text-green-600">+18.5%</div>
                    <div className="text-sm text-muted-foreground">Predicted Growth</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-2xl font-bold text-blue-600">94.2%</div>
                    <div className="text-sm text-muted-foreground">Confidence</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Peak Revenue</span>
                    <span className="text-sm font-medium">₵1.18B</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Best Month</span>
                    <span className="text-sm font-medium">December</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Risk Factor</span>
                    <span className="text-sm font-medium text-green-600">Low</span>
                  </div>
                </div>
                <Button className="w-full professional-button">
                  <Download className="h-4 w-4 mr-2" />
                  Export Forecast
                </Button>
              </div>
            </InteractiveChart>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}