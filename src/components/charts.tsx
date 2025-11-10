'use client'

import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
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