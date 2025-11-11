'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  FileText, 
  Download, 
  Calendar, 
  Filter,
  Search,
  Eye,
  Edit,
  Trash2,
  Plus,
  BarChart3,
  PieChart,
  Activity,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  File,
  Image,
  Mail,
  Share,
  Printer,
  Database
} from 'lucide-react'

interface ReportTemplate {
  id: string
  name: string
  category: 'financial' | 'operational' | 'performance' | 'compliance' | 'strategic'
  description: string
  format: 'pdf' | 'excel' | 'csv' | 'json'
  schedule: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'ad-hoc'
  lastGenerated: string
  size: string
  status: 'active' | 'draft' | 'archived'
  author: string
  recipients: number
}

interface GeneratedReport {
  id: string
  templateId: string
  title: string
  generatedAt: string
  format: string
  size: string
  status: 'completed' | 'processing' | 'failed'
  downloaded: number
  shared: boolean
  expiry: string
}

interface ExportOption {
  id: string
  name: string
  format: string
  icon: React.ReactNode
  description: string
  features: string[]
}

export default function ComprehensiveReporting() {
  const [templates, setTemplates] = useState<ReportTemplate[]>([])
  const [reports, setReports] = useState<GeneratedReport[]>([])
  const [loading, setLoading] = useState(true)
  const [generating, setGenerating] = useState(false)
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)

  useEffect(() => {
    const mockTemplates: ReportTemplate[] = [
      {
        id: 'template-1',
        name: 'Monthly Financial Summary',
        category: 'financial',
        description: 'Comprehensive financial performance report with revenue, expenditure, and profit analysis',
        format: 'pdf',
        schedule: 'monthly',
        lastGenerated: '2024-01-15',
        size: '2.4 MB',
        status: 'active',
        author: 'Finance Department',
        recipients: 12
      },
      {
        id: 'template-2',
        name: 'Agency Performance Dashboard',
        category: 'performance',
        description: 'Multi-agency performance metrics with KPIs and benchmarks',
        format: 'excel',
        schedule: 'weekly',
        lastGenerated: '2024-01-18',
        size: '1.8 MB',
        status: 'active',
        author: 'Performance Unit',
        recipients: 8
      },
      {
        id: 'template-3',
        name: 'Operational Efficiency Report',
        category: 'operational',
        description: 'Operational metrics, efficiency ratios, and optimization opportunities',
        format: 'pdf',
        schedule: 'monthly',
        lastGenerated: '2024-01-12',
        size: '3.1 MB',
        status: 'active',
        author: 'Operations Team',
        recipients: 15
      },
      {
        id: 'template-4',
        name: 'Compliance Status Report',
        category: 'compliance',
        description: 'Regulatory compliance status, audit findings, and remediation plans',
        format: 'pdf',
        schedule: 'quarterly',
        lastGenerated: '2023-12-20',
        size: '4.2 MB',
        status: 'active',
        author: 'Compliance Officer',
        recipients: 6
      },
      {
        id: 'template-5',
        name: 'Strategic Outlook Analysis',
        category: 'strategic',
        description: 'Strategic analysis, market trends, and future projections',
        format: 'pdf',
        schedule: 'quarterly',
        lastGenerated: '2024-01-10',
        size: '5.8 MB',
        status: 'active',
        author: 'Strategy Department',
        recipients: 10
      },
      {
        id: 'template-6',
        name: 'Real-time Energy Analytics',
        category: 'operational',
        description: 'Live energy data analysis with predictive insights',
        format: 'json',
        schedule: 'daily',
        lastGenerated: '2024-01-20',
        size: '890 KB',
        status: 'active',
        author: 'Data Analytics Team',
        recipients: 5
      }
    ]

    const mockReports: GeneratedReport[] = [
      {
        id: 'report-1',
        templateId: 'template-1',
        title: 'Monthly Financial Summary - January 2024',
        generatedAt: '2024-01-15T10:30:00Z',
        format: 'PDF',
        size: '2.4 MB',
        status: 'completed',
        downloaded: 45,
        shared: true,
        expiry: '2024-04-15'
      },
      {
        id: 'report-2',
        templateId: 'template-2',
        title: 'Agency Performance Dashboard - Week 3',
        generatedAt: '2024-01-18T14:15:00Z',
        format: 'Excel',
        size: '1.8 MB',
        status: 'completed',
        downloaded: 28,
        shared: false,
        expiry: '2024-04-18'
      },
      {
        id: 'report-3',
        templateId: 'template-3',
        title: 'Operational Efficiency Report - January 2024',
        generatedAt: '2024-01-12T09:45:00Z',
        format: 'PDF',
        size: '3.1 MB',
        status: 'completed',
        downloaded: 67,
        shared: true,
        expiry: '2024-04-12'
      },
      {
        id: 'report-4',
        templateId: 'template-4',
        title: 'Q4 2023 Compliance Status Report',
        generatedAt: '2023-12-20T16:20:00Z',
        format: 'PDF',
        size: '4.2 MB',
        status: 'completed',
        downloaded: 89,
        shared: true,
        expiry: '2024-03-20'
      },
      {
        id: 'report-5',
        templateId: 'template-5',
        title: 'Strategic Outlook Analysis - Q1 2024',
        generatedAt: '2024-01-10T11:00:00Z',
        format: 'PDF',
        size: '5.8 MB',
        status: 'completed',
        downloaded: 123,
        shared: true,
        expiry: '2024-04-10'
      }
    ]

    setTemplates(mockTemplates)
    setReports(mockReports)
    setLoading(false)
  }, [])

  const exportOptions: ExportOption[] = [
    {
      id: 'export-1',
      name: 'PDF Report',
      format: 'PDF',
      icon: <FileText className="h-5 w-5" />,
      description: 'Professional PDF reports with charts and formatting',
      features: ['Interactive TOC', 'Embedded Charts', 'Digital Signature']
    },
    {
      id: 'export-2',
      name: 'Excel Workbook',
      format: 'Excel',
      icon: <Database className="h-5 w-5" />,
      description: 'Spreadsheet with raw data and pivot tables',
      features: ['Multiple Sheets', 'Formulas', 'Conditional Formatting']
    },
    {
      id: 'export-3',
      name: 'CSV Data',
      format: 'CSV',
      icon: <File className="h-5 w-5" />,
      description: 'Raw data export for further analysis',
      features: ['Delimited Format', 'UTF-8 Encoding', 'Large Dataset Support']
    },
    {
      id: 'export-4',
      name: 'JSON API',
      format: 'JSON',
      icon: <Share className="h-5 w-5" />,
      description: 'Structured data for integration with other systems',
      features: ['REST API', 'Real-time Updates', 'Webhook Support']
    },
    {
      id: 'export-5',
      name: 'Image Export',
      format: 'PNG',
      icon: <Image className="h-5 w-5" alt="Export icon" />,
      description: 'High-quality images of charts and visualizations',
      features: ['Multiple Formats', 'High Resolution', 'Transparent Background']
    },
    {
      id: 'export-6',
      name: 'Email Report',
      format: 'Email',
      icon: <Mail className="h-5 w-5" />,
      description: 'Automated email delivery with attachments',
      features: ['Scheduled Delivery', 'Custom Templates', 'Tracking']
    }
  ]

  const generateReport = async (templateId: string) => {
    setGenerating(true)
    setSelectedTemplate(templateId)
    
    // Simulate report generation
    setTimeout(() => {
      setGenerating(false)
      setSelectedTemplate(null)
      
      // Add new report to list
      const template = templates.find(t => t.id === templateId)
      if (template) {
        const newReport: GeneratedReport = {
          id: `report-${reports.length + 1}`,
          templateId: templateId,
          title: `${template.name} - ${new Date().toLocaleDateString()}`,
          generatedAt: new Date().toISOString(),
          format: template.format.toUpperCase(),
          size: Math.floor(Math.random() * 5 + 1) + '.' + Math.floor(Math.random() * 9) + ' MB',
          status: 'completed',
          downloaded: 0,
          shared: false,
          expiry: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
        }
        setReports([newReport, ...reports])
      }
    }, 3000)
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'financial': return <DollarSign className="h-4 w-4" />
      case 'operational': return <Activity className="h-4 w-4" />
      case 'performance': return <BarChart3 className="h-4 w-4" />
      case 'compliance': return <CheckCircle className="h-4 w-4" />
      case 'strategic': return <TrendingUp className="h-4 w-4" />
      default: return <FileText className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'draft': return 'bg-yellow-500'
      case 'archived': return 'bg-gray-500'
      case 'completed': return 'bg-green-500'
      case 'processing': return 'bg-blue-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'draft': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'archived': return <File className="h-4 w-4 text-gray-500" />
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'processing': return <Clock className="h-4 w-4 text-blue-500 animate-spin" />
      case 'failed': return <AlertCircle className="h-4 w-4 text-red-500" />
      default: return <File className="h-4 w-4 text-gray-500" />
    }
  }

  const formatFileSize = (size: string) => {
    return size
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <FileText className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-lg font-medium">Reporting System Initializing...</p>
          <p className="text-sm text-muted-foreground">Loading report templates and export options</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Comprehensive Reporting
          </h2>
          <p className="text-muted-foreground">Generate, customize, and export professional reports</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
            <FileText className="h-3 w-3 mr-1" />
            Professional
          </Badge>
          <Button className="professional-button">
            <Plus className="h-4 w-4 mr-2" />
            New Template
          </Button>
        </div>
      </div>

      <Tabs defaultValue="templates" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-md p-1 rounded-lg">
          <TabsTrigger value="templates" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Templates
          </TabsTrigger>
          <TabsTrigger value="reports" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Reports
          </TabsTrigger>
          <TabsTrigger value="export" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Export Options
          </TabsTrigger>
          <TabsTrigger value="scheduling" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Scheduling
          </TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {templates.map((template) => (
              <Card key={template.id} className="sophisticated-card hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                        {getCategoryIcon(template.category)}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{template.name}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1 capitalize">
                          {template.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(template.status)} text-white border-0 text-xs`}>
                      {template.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{template.description}</p>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Format</p>
                      <p className="text-sm font-medium uppercase">{template.format}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Schedule</p>
                      <p className="text-sm font-medium capitalize">{template.schedule}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Size</span>
                      <span className="text-xs font-medium">{formatFileSize(template.size)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-muted-foreground">Recipients</span>
                      <span className="text-xs font-medium">{template.recipients}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">{formatDate(template.lastGenerated)}</span>
                    <div className="flex space-x-1">
                      <Button 
                        size="sm" 
                        variant="outline" 
                        className="text-xs"
                        onClick={() => generateReport(template.id)}
                        disabled={generating && selectedTemplate === template.id}
                      >
                        {generating && selectedTemplate === template.id ? (
                          <Clock className="h-3 w-3 animate-spin" />
                        ) : (
                          <>
                            <FileText className="h-3 w-3 mr-1" />
                            Generate
                          </>
                        )}
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <Eye className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="reports" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {reports.map((report) => (
              <Card key={report.id} className="sophisticated-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500">
                        <FileText className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{report.title}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(report.status)}
                          <span className="text-xs text-muted-foreground capitalize">
                            {report.status}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {report.format}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {report.shared && <Share className="h-4 w-4 text-blue-500" />}
                      <span className="text-xs text-muted-foreground">{report.downloaded} downloads</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Generated</p>
                      <p className="text-sm font-medium">{formatDate(report.generatedAt)}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Format</p>
                      <p className="text-sm font-medium">{report.format}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Size</p>
                      <p className="text-sm font-medium">{report.size}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expires</p>
                      <p className="text-sm font-medium">{report.expiry}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">
                      {report.shared ? 'Shared with stakeholders' : 'Private report'}
                    </span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Download
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Share className="h-3 w-3 mr-1" />
                        Share
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="export" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {exportOptions.map((option) => (
              <Card key={option.id} className="sophisticated-card hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                      {option.icon}
                    </div>
                    <div>
                      <CardTitle className="text-sm">{option.name}</CardTitle>
                      <Badge variant="outline" className="text-xs mt-1">
                        {option.format}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{option.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Features:</p>
                    <ul className="text-xs text-muted-foreground space-y-1">
                      {option.features.map((feature, index) => (
                        <li key={index} className="flex items-center space-x-2">
                          <div className="w-1 h-1 rounded-full bg-blue-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">Export</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Download className="h-3 w-3 mr-1" />
                      Export
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="scheduling" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="sophisticated-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5 text-purple-500" />
                  <span>Automated Scheduling</span>
                </CardTitle>
                <CardDescription>Set up automatic report generation and delivery</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="text-2xl font-bold text-green-600">24</div>
                    <div className="text-sm text-muted-foreground">Active Schedules</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-2xl font-bold text-blue-600">156</div>
                    <div className="text-sm text-muted-foreground">Reports/Month</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Daily Reports</span>
                    <span className="text-xs font-medium">6</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Weekly Reports</span>
                    <span className="text-xs font-medium">8</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Monthly Reports</span>
                    <span className="text-xs font-medium">10</span>
                  </div>
                </div>
                <Button className="w-full professional-button">
                  <Calendar className="h-4 w-4 mr-2" />
                  Manage Schedules
                </Button>
              </CardContent>
            </Card>

            <Card className="sophisticated-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Mail className="h-5 w-5 text-blue-500" />
                  <span>Email Delivery</span>
                </CardTitle>
                <CardDescription>Configure email delivery and notifications</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="text-2xl font-bold text-purple-600">89</div>
                    <div className="text-sm text-muted-foreground">Recipients</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-red-50">
                    <div className="text-2xl font-bold text-orange-600">98%</div>
                    <div className="text-sm text-muted-foreground">Delivery Rate</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Emails Sent</span>
                    <span className="text-xs font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Open Rate</span>
                    <span className="text-xs font-medium text-green-600">78%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Click Rate</span>
                    <span className="text-xs font-medium text-blue-600">45%</span>
                  </div>
                </div>
                <Button className="w-full professional-button">
                  <Mail className="h-4 w-4 mr-2" />
                  Email Settings
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}