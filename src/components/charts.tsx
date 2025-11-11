'use client'

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, ChartLegend, ChartLegendContent } from '@/components/ui/chart'

const chartColors = {
  revenue: '#2563eb',
  expenditure: '#dc2626',
  capex: '#059669',
  opex: '#d97706',
  arrears: '#7c3aed',
  receivables: '#0891b2',
  renewable: '#10b981',
  fossil: '#f59e0b',
  hydro: '#3b82f6',
  thermal: '#ef4444'
}

export function RevenueAnalysisChart() {
  const data = [
    { month: 'Jan', revenue: 220, subsidy: 35, target: 200 },
    { month: 'Feb', revenue: 235, subsidy: 32, target: 210 },
    { month: 'Mar', revenue: 248, subsidy: 38, target: 220 },
    { month: 'Apr', revenue: 242, subsidy: 41, target: 225 },
    { month: 'May', revenue: 265, subsidy: 36, target: 230 },
    { month: 'Jun', revenue: 278, subsidy: 34, target: 235 }
  ]

  const chartConfig = {
    revenue: { label: 'Revenue (₵M)', color: chartColors.revenue },
    subsidy: { label: 'Subsidy (₵M)', color: chartColors.expenditure },
    target: { label: 'Target (₵M)', color: chartColors.capex }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="revenue" stroke={chartColors.revenue} strokeWidth={2} />
        <Line type="monotone" dataKey="subsidy" stroke={chartColors.expenditure} strokeWidth={2} />
        <Line type="monotone" dataKey="target" stroke={chartColors.capex} strokeWidth={2} strokeDasharray="5 5" />
      </LineChart>
    </ChartContainer>
  )
}

export function ExpenditureBreakdownChart() {
  const data = [
    { name: 'CAPEX', value: 65, color: chartColors.capex },
    { name: 'OPEX', value: 35, color: chartColors.opex }
  ]

  const chartConfig = {
    capex: { label: 'Capital Expenditure', color: chartColors.capex },
    opex: { label: 'Operational Expenditure', color: chartColors.opex }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={5}
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  )
}

export function ArrearsReceivablesChart() {
  const data = [
    { category: '0-30 days', arrears: 45, receivables: 120 },
    { category: '31-60 days', arrears: 78, receivables: 85 },
    { category: '61-90 days', arrears: 120, receivables: 45 },
    { category: '90+ days', arrears: 200, receivables: 25 }
  ]

  const chartConfig = {
    arrears: { label: 'Arrears (₵M)', color: chartColors.arrears },
    receivables: { label: 'Receivables (₵M)', color: chartColors.receivables }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="category" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="arrears" fill={chartColors.arrears} />
        <Bar dataKey="receivables" fill={chartColors.receivables} />
      </BarChart>
    </ChartContainer>
  )
}

export function ProjectFundingChart() {
  const data = [
    { project: 'Pokuase', budget: 45, utilized: 38.25, remaining: 6.75 },
    { project: 'Kumasi', budget: 38, utilized: 27.36, remaining: 10.64 },
    { project: 'Takoradi', budget: 67, utilized: 60.97, remaining: 6.03 },
    { project: 'Tema', budget: 52, utilized: 31.2, remaining: 20.8 },
    { project: 'Sunyani', budget: 29, utilized: 20.3, remaining: 8.7 }
  ]

  const chartConfig = {
    utilized: { label: 'Utilized (₵M)', color: chartColors.capex },
    remaining: { label: 'Remaining (₵M)', color: chartColors.receivables }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <BarChart data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="project" type="category" width={80} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="utilized" fill={chartColors.capex} stackId="a" />
        <Bar dataKey="remaining" fill={chartColors.receivables} stackId="a" />
      </BarChart>
    </ChartContainer>
  )
}

export function SDG7PerformanceChart() {
  const data = [
    { metric: 'Access to Electricity', current: 87.2, target: 100 },
    { metric: 'Renewable Energy', current: 23.5, target: 35 },
    { metric: 'Energy Efficiency', current: 68.4, target: 85 },
    { metric: 'Clean Cooking', current: 42.8, target: 75 },
    { metric: 'Affordability', current: 76.3, target: 90 },
    { metric: 'Reliability', current: 82.4, target: 95 }
  ]

  const chartConfig = {
    current: { label: 'Current Performance', color: chartColors.renewable },
    target: { label: 'Target', color: chartColors.capex }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <RadarChart data={data}>
        <PolarGrid />
        <PolarAngleAxis dataKey="metric" tick={{ fontSize: 10 }} />
        <PolarRadiusAxis angle={90} domain={[0, 100]} />
        <Radar
          name="Current Performance"
          dataKey="current"
          stroke={chartColors.renewable}
          fill={chartColors.renewable}
          fillOpacity={0.3}
          strokeWidth={2}
        />
        <Radar
          name="Target"
          dataKey="target"
          stroke={chartColors.capex}
          fill={chartColors.capex}
          fillOpacity={0.1}
          strokeWidth={2}
          strokeDasharray="5 5"
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </RadarChart>
    </ChartContainer>
  )
}

export function EnergyMixChart() {
  const data = [
    { source: 'Hydro', percentage: 35.2, capacity: 1354 },
    { source: 'Thermal', percentage: 41.3, capacity: 1589 },
    { source: 'Renewable', percentage: 23.5, capacity: 904 }
  ]

  const chartConfig = {
    hydro: { label: 'Hydro', color: chartColors.hydro },
    thermal: { label: 'Thermal', color: chartColors.thermal },
    renewable: { label: 'Renewable', color: chartColors.renewable }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          innerRadius={40}
          outerRadius={80}
          paddingAngle={5}
          dataKey="percentage"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={
              entry.source === 'Hydro' ? chartColors.hydro :
              entry.source === 'Thermal' ? chartColors.thermal :
              chartColors.renewable
            } />
          ))}
        </Pie>
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
      </PieChart>
    </ChartContainer>
  )
}

export function ProductionChart() {
  const data = [
    { day: 'Mon', oil: 85, gas: 45 },
    { day: 'Tue', oil: 88, gas: 48 },
    { day: 'Wed', oil: 92, gas: 52 },
    { day: 'Thu', oil: 87, gas: 47 },
    { day: 'Fri', oil: 90, gas: 50 },
    { day: 'Sat', oil: 95, gas: 55 },
    { day: 'Sun', oil: 93, gas: 53 }
  ]

  const chartConfig = {
    oil: { label: 'Oil (kboepd)', color: '#1e40af' },
    gas: { label: 'Gas (MMscfd)', color: '#dc2626' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="day" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="oil" stroke="#1e40af" strokeWidth={2} />
        <Line type="monotone" dataKey="gas" stroke="#dc2626" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export function RevenueChart() {
  const data = [
    { month: 'Jan', revenue: 85, costs: 42 },
    { month: 'Feb', revenue: 88, costs: 44 },
    { month: 'Mar', revenue: 92, costs: 45 },
    { month: 'Apr', revenue: 87, costs: 43 },
    { month: 'May', revenue: 90, costs: 46 },
    { month: 'Jun', revenue: 95, costs: 48 }
  ]

  const chartConfig = {
    revenue: { label: 'Revenue ($M)', color: chartColors.revenue },
    costs: { label: 'Costs ($M)', color: chartColors.expenditure }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="revenue" fill={chartColors.revenue} />
        <Bar dataKey="costs" fill={chartColors.expenditure} />
      </BarChart>
    </ChartContainer>
  )
}

export function ReservesChart() {
  const data = [
    { type: 'Proven', volume: 660, value: 45 },
    { type: 'Probable', volume: 340, value: 23 },
    { type: 'Possible', volume: 200, value: 14 }
  ]

  const chartConfig = {
    volume: { label: 'Volume (M barrels)', color: chartColors.capex },
    value: { label: 'Value ($B)', color: chartColors.revenue }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="type" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="volume" fill={chartColors.capex} />
        <Bar dataKey="value" fill={chartColors.revenue} />
      </BarChart>
    </ChartContainer>
  )
}

export function ExplorationChart() {
  const data = [
    { block: 'Deepwater Tano', status: 'Exploration', progress: 75 },
    { block: 'South West Tano', status: 'Appraisal', progress: 45 },
    { block: 'Saltpond', status: 'Development', progress: 90 },
    { block: 'Keta Basin', status: 'Exploration', progress: 30 },
    { block: 'Tano Basin', status: 'Production', progress: 95 }
  ]

  const chartConfig = {
    progress: { label: 'Progress (%)', color: chartColors.renewable }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <BarChart data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="block" type="category" width={100} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="progress" fill={chartColors.renewable} />
      </BarChart>
    </ChartContainer>
  )
}

export function PricingChart() {
  const data = [
    { month: 'Jan', petrol: 12.20, diesel: 12.65, kerosene: 11.05, lpg: 10.20 },
    { month: 'Feb', petrol: 12.35, diesel: 12.80, kerosene: 11.15, lpg: 10.35 },
    { month: 'Mar', petrol: 12.45, diesel: 12.90, kerosene: 11.25, lpg: 10.45 },
    { month: 'Apr', petrol: 12.55, diesel: 13.00, kerosene: 11.35, lpg: 10.55 },
    { month: 'May', petrol: 12.70, diesel: 13.10, kerosene: 11.40, lpg: 10.65 },
    { month: 'Jun', petrol: 12.85, diesel: 13.20, kerosene: 11.45, lpg: 10.80 }
  ]

  const chartConfig = {
    petrol: { label: 'Petrol (₵/L)', color: '#2563eb' },
    diesel: { label: 'Diesel (₵/L)', color: '#dc2626' },
    kerosene: { label: 'Kerosene (₵/L)', color: '#059669' },
    lpg: { label: 'LPG (₵/kg)', color: '#d97706' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="petrol" stroke="#2563eb" strokeWidth={2} />
        <Line type="monotone" dataKey="diesel" stroke="#dc2626" strokeWidth={2} />
        <Line type="monotone" dataKey="kerosene" stroke="#059669" strokeWidth={2} />
        <Line type="monotone" dataKey="lpg" stroke="#d97706" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export function ComplianceChart() {
  const data = [
    { month: 'Jan', pricing: 85, quality: 90, safety: 87, environmental: 82 },
    { month: 'Feb', pricing: 87, quality: 91, safety: 88, environmental: 84 },
    { month: 'Mar', pricing: 86, quality: 92, safety: 89, environmental: 85 },
    { month: 'Apr', pricing: 88, quality: 93, safety: 90, environmental: 86 },
    { month: 'May', pricing: 87, quality: 92, safety: 89, environmental: 85 },
    { month: 'Jun', pricing: 87, quality: 92, safety: 89, environmental: 85 }
  ]

  const chartConfig = {
    pricing: { label: 'Pricing Compliance', color: '#2563eb' },
    quality: { label: 'Quality Standards', color: '#059669' },
    safety: { label: 'Safety Regulations', color: '#dc2626' },
    environmental: { label: 'Environmental Standards', color: '#10b981' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="pricing" stroke="#2563eb" strokeWidth={2} />
        <Line type="monotone" dataKey="quality" stroke="#059669" strokeWidth={2} />
        <Line type="monotone" dataKey="safety" stroke="#dc2626" strokeWidth={2} />
        <Line type="monotone" dataKey="environmental" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export function MarketShareChart() {
  const data = [
    { company: 'GOIL', percentage: 28.5, volume: 125.3 },
    { company: 'TotalEnergies', percentage: 18.2, volume: 80.1 },
    { company: 'Shell', percentage: 15.8, volume: 69.5 },
    { company: 'Engen', percentage: 12.4, volume: 54.6 },
    { company: 'Puma Energy', percentage: 10.3, volume: 45.2 },
    { company: 'Others', percentage: 14.8, volume: 65.0 }
  ]

  const chartConfig = {
    percentage: { label: 'Market Share (%)', color: '#7c3aed' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <BarChart data={data} layout="horizontal">
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis type="number" />
        <YAxis dataKey="company" type="category" width={100} />
        <ChartTooltip content={<ChartTooltipContent />} />
        <Bar dataKey="percentage" fill="#7c3aed" />
      </BarChart>
    </ChartContainer>
  )
}

export function QualityChart() {
  const data = [
    { month: 'Jan', octane: 92, sulphur: 89, water: 95, density: 91 },
    { month: 'Feb', octane: 93, sulphur: 90, water: 96, density: 92 },
    { month: 'Mar', octane: 94, sulphur: 91, water: 96, density: 93 },
    { month: 'Apr', octane: 93, sulphur: 90, water: 95, density: 92 },
    { month: 'May', octane: 94, sulphur: 91, water: 96, density: 93 },
    { month: 'Jun', octane: 94, sulphur: 91, water: 96, density: 93 }
  ]

  const chartConfig = {
    octane: { label: 'Octane Rating', color: '#2563eb' },
    sulphur: { label: 'Sulphur Content', color: '#dc2626' },
    water: { label: 'Water Content', color: '#059669' },
    density: { label: 'Density', color: '#d97706' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="octane" stroke="#2563eb" strokeWidth={2} />
        <Line type="monotone" dataKey="sulphur" stroke="#dc2626" strokeWidth={2} />
        <Line type="monotone" dataKey="water" stroke="#059669" strokeWidth={2} />
        <Line type="monotone" dataKey="density" stroke="#d97706" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export function SalesChart() {
  const data = [
    { month: 'Jan', petrol: 42, diesel: 48, kerosene: 8, lpg: 15 },
    { month: 'Feb', petrol: 44, diesel: 50, kerosene: 7, lpg: 16 },
    { month: 'Mar', petrol: 46, diesel: 52, kerosene: 8, lpg: 17 },
    { month: 'Apr', petrol: 45, diesel: 51, kerosene: 8, lpg: 18 },
    { month: 'May', petrol: 47, diesel: 53, kerosene: 9, lpg: 19 },
    { month: 'Jun', petrol: 48, diesel: 54, kerosene: 9, lpg: 20 }
  ]

  const chartConfig = {
    petrol: { label: 'Petrol (M liters)', color: '#2563eb' },
    diesel: { label: 'Diesel (M liters)', color: '#dc2626' },
    kerosene: { label: 'Kerosene (M liters)', color: '#059669' },
    lpg: { label: 'LPG (M kg)', color: '#d97706' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="petrol" stroke="#2563eb" strokeWidth={2} />
        <Line type="monotone" dataKey="diesel" stroke="#dc2626" strokeWidth={2} />
        <Line type="monotone" dataKey="kerosene" stroke="#059669" strokeWidth={2} />
        <Line type="monotone" dataKey="lpg" stroke="#d97706" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export function NetworkChart() {
  const data = [
    { region: 'Greater Accra', stations: 85, performance: 87 },
    { region: 'Ashanti', stations: 72, performance: 84 },
    { region: 'Western', stations: 48, performance: 82 },
    { region: 'Eastern', stations: 45, performance: 79 },
    { region: 'Northern', stations: 35, performance: 76 },
    { region: 'Volta', stations: 28, performance: 74 },
    { region: 'Bono', stations: 32, performance: 78 },
    { region: 'Central', stations: 25, performance: 77 }
  ]

  const chartConfig = {
    stations: { label: 'Number of Stations', color: '#ea580c' },
    performance: { label: 'Performance (%)', color: '#f97316' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" angle={-45} textAnchor="end" height={80} />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="stations" fill="#ea580c" />
        <Bar dataKey="performance" fill="#f97316" />
      </BarChart>
    </ChartContainer>
  )
}

export function PerformanceChart() {
  const data = [
    { month: 'Jan', sales: 85, efficiency: 78, satisfaction: 86, quality: 92 },
    { month: 'Feb', sales: 87, efficiency: 79, satisfaction: 87, quality: 93 },
    { month: 'Mar', sales: 88, efficiency: 80, satisfaction: 87, quality: 92 },
    { month: 'Apr', sales: 86, efficiency: 79, satisfaction: 86, quality: 91 },
    { month: 'May', sales: 89, efficiency: 81, satisfaction: 88, quality: 93 },
    { month: 'Jun', sales: 90, efficiency: 82, satisfaction: 88, quality: 94 }
  ]

  const chartConfig = {
    sales: { label: 'Sales Volume', color: '#ea580c' },
    efficiency: { label: 'Operational Efficiency', color: '#f97316' },
    satisfaction: { label: 'Customer Satisfaction', color: '#fb923c' },
    quality: { label: 'Service Quality', color: '#fed7aa' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="sales" stroke="#ea580c" strokeWidth={2} />
        <Line type="monotone" dataKey="efficiency" stroke="#f97316" strokeWidth={2} />
        <Line type="monotone" dataKey="satisfaction" stroke="#fb923c" strokeWidth={2} />
        <Line type="monotone" dataKey="quality" stroke="#fed7aa" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export function InventoryChart() {
  const data = [
    { product: 'Petrol', current: 85, capacity: 100, reorder: 30 },
    { product: 'Diesel', current: 78, capacity: 100, reorder: 30 },
    { product: 'Kerosene', current: 92, capacity: 100, reorder: 30 },
    { product: 'LPG', current: 68, capacity: 100, reorder: 30 }
  ]

  const chartConfig = {
    current: { label: 'Current Inventory', color: '#ea580c' },
    reorder: { label: 'Reorder Point', color: '#dc2626' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="product" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="current" fill="#ea580c" />
        <Bar dataKey="reorder" fill="#dc2626" />
      </BarChart>
    </ChartContainer>
  )
}

export function ElectricityChart() {
  const data = [
    { month: 'Jan', demand: 2800, supply: 2750, available: 2850 },
    { month: 'Feb', demand: 2750, supply: 2700, available: 2800 },
    { month: 'Mar', demand: 2850, supply: 2800, available: 2900 },
    { month: 'Apr', demand: 2900, supply: 2847, available: 2950 },
    { month: 'May', demand: 2950, supply: 2847, available: 3000 },
    { month: 'Jun', demand: 3000, supply: 2847, available: 3050 }
  ]

  const chartConfig = {
    demand: { label: 'Demand (MW)', color: '#eab308' },
    supply: { label: 'Supply (MW)', color: '#f59e0b' },
    available: { label: 'Available (MW)', color: '#fbbf24' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="demand" stroke="#eab308" strokeWidth={2} />
        <Line type="monotone" dataKey="supply" stroke="#f59e0b" strokeWidth={2} />
        <Line type="monotone" dataKey="available" stroke="#fbbf24" strokeWidth={2} strokeDasharray="5 5" />
      </LineChart>
    </ChartContainer>
  )
}

export function LossesChart() {
  const data = [
    { month: 'Jan', commercial: 22.5, technical: 26.5, total: 49.0 },
    { month: 'Feb', commercial: 23.0, technical: 26.0, total: 49.0 },
    { month: 'Mar', commercial: 22.8, technical: 26.2, total: 49.0 },
    { month: 'Apr', commercial: 23.2, technical: 25.8, total: 49.0 },
    { month: 'May', commercial: 23.5, technical: 25.5, total: 49.0 },
    { month: 'Jun', commercial: 24.5, technical: 24.5, total: 49.0 }
  ]

  const chartConfig = {
    commercial: { label: 'Commercial Losses (%)', color: '#dc2626' },
    technical: { label: 'Technical Losses (%)', color: '#f59e0b' },
    total: { label: 'Total Losses (%)', color: '#ef4444' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="commercial" stroke="#dc2626" strokeWidth={2} />
        <Line type="monotone" dataKey="technical" stroke="#f59e0b" strokeWidth={2} />
        <Line type="monotone" dataKey="total" stroke="#ef4444" strokeWidth={2} strokeDasharray="5 5" />
      </LineChart>
    </ChartContainer>
  )
}

export function CustomerChart() {
  const data = [
    { month: 'Jan', residential: 3650, commercial: 275, industrial: 42, total: 3967 },
    { month: 'Feb', residential: 3680, commercial: 278, industrial: 43, total: 4001 },
    { month: 'Mar', residential: 3720, commercial: 280, industrial: 44, total: 4044 },
    { month: 'Apr', residential: 3760, commercial: 282, industrial: 44, total: 4086 },
    { month: 'May', residential: 3800, commercial: 284, industrial: 45, total: 4129 },
    { month: 'Jun', residential: 3850, commercial: 285, industrial: 45, total: 4180 }
  ]

  const chartConfig = {
    residential: { label: 'Residential (K)', color: '#3b82f6' },
    commercial: { label: 'Commercial (K)', color: '#10b981' },
    industrial: { label: 'Industrial (K)', color: '#f59e0b' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="residential" stroke="#3b82f6" strokeWidth={2} />
        <Line type="monotone" dataKey="commercial" stroke="#10b981" strokeWidth={2} />
        <Line type="monotone" dataKey="industrial" stroke="#f59e0b" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export function TransmissionChart() {
  const data = [
    { region: 'Northern', capacity: 850, load: 720, utilization: 84.7 },
    { region: 'Eastern', capacity: 650, load: 580, utilization: 89.2 },
    { region: 'Western', capacity: 750, load: 620, utilization: 82.7 },
    { region: 'Central', capacity: 1200, load: 980, utilization: 81.7 },
    { region: 'Southern', capacity: 1400, load: 1150, utilization: 82.1 }
  ]

  const chartConfig = {
    capacity: { label: 'Capacity (MW)', color: '#1e40af' },
    load: { label: 'Load (MW)', color: '#3b82f6' },
    utilization: { label: 'Utilization (%)', color: '#60a5fa' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="region" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="capacity" fill="#1e40af" />
        <Bar dataKey="load" fill="#3b82f6" />
      </BarChart>
    </ChartContainer>
  )
}

export function FrequencyChart() {
  const data = [
    { time: '00:00', frequency: 50.02, deviation: 0.04 },
    { time: '04:00', frequency: 50.01, deviation: 0.02 },
    { time: '08:00', frequency: 49.98, deviation: -0.02 },
    { time: '12:00', frequency: 49.97, deviation: -0.03 },
    { time: '16:00', frequency: 50.03, deviation: 0.06 },
    { time: '20:00', frequency: 50.01, deviation: 0.02 }
  ]

  const chartConfig = {
    frequency: { label: 'Frequency (Hz)', color: '#1e40af' },
    deviation: { label: 'Deviation (Hz)', color: '#dc2626' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="frequency" stroke="#1e40af" strokeWidth={2} />
        <Line type="monotone" dataKey="deviation" stroke="#dc2626" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export function ReliabilityChart() {
  const data = [
    { month: 'Jan', availability: 97.5, losses: 3.8, reliability: 96.8 },
    { month: 'Feb', availability: 97.8, losses: 3.6, reliability: 97.2 },
    { month: 'Mar', availability: 98.1, losses: 3.4, reliability: 97.5 },
    { month: 'Apr', availability: 97.9, losses: 3.5, reliability: 97.3 },
    { month: 'May', availability: 98.2, losses: 3.3, reliability: 97.6 },
    { month: 'Jun', availability: 97.8, losses: 3.6, reliability: 97.8 }
  ]

  const chartConfig = {
    availability: { label: 'Availability (%)', color: '#1e40af' },
    losses: { label: 'Losses (%)', color: '#dc2626' },
    reliability: { label: 'Reliability (%)', color: '#10b981' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Line type="monotone" dataKey="availability" stroke="#1e40af" strokeWidth={2} />
        <Line type="monotone" dataKey="losses" stroke="#dc2626" strokeWidth={2} />
        <Line type="monotone" dataKey="reliability" stroke="#10b981" strokeWidth={2} />
      </LineChart>
    </ChartContainer>
  )
}

export function LoadChart() {
  const data = [
    { time: '00:00', load: 2200, available: 2850, margin: 650 },
    { time: '04:00', load: 2100, available: 2850, margin: 750 },
    { time: '08:00', load: 2600, available: 2850, margin: 250 },
    { time: '12:00', load: 2800, available: 2850, margin: 50 },
    { time: '16:00', load: 2850, available: 2850, margin: 0 },
    { time: '20:00', load: 2500, available: 2850, margin: 350 }
  ]

  const chartConfig = {
    load: { label: 'Load (MW)', color: '#1e40af' },
    available: { label: 'Available (MW)', color: '#10b981' },
    margin: { label: 'Margin (MW)', color: '#f59e0b' }
  }

  return (
    <ChartContainer config={chartConfig} className="h-64">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="time" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Area type="monotone" dataKey="available" stackId="1" stroke="#10b981" fill="#10b981" fillOpacity={0.3} />
        <Area type="monotone" dataKey="load" stackId="2" stroke="#1e40af" fill="#1e40af" fillOpacity={0.6} />
      </AreaChart>
    </ChartContainer>
  )
}