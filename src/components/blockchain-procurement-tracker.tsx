'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  CheckCircle, 
  Clock, 
  AlertTriangle, 
  Hash,
  Link,
  Eye,
  Download,
  Share,
  FileText,
  Users,
  DollarSign,
  Truck,
  Package
} from 'lucide-react'

interface BlockchainTransaction {
  id: string
  hash: string
  blockNumber: number
  timestamp: string
  type: 'procurement' | 'contract' | 'payment' | 'verification'
  agency: string
  amount: number
  status: 'confirmed' | 'pending' | 'verified' | 'disputed'
  parties: string[]
  documents: string[]
  smartContract: string
}

interface ProcurementRecord {
  id: string
  title: string
  agency: string
  category: string
  value: number
  blockchainHash: string
  verificationStatus: 'verified' | 'pending' | 'failed'
  transparencyScore: number
  complianceScore: number
  timeline: Array<{
    stage: string
    status: 'completed' | 'in-progress' | 'pending'
    timestamp: string
    verified: boolean
  }>
}

export default function BlockchainProcurementTracker() {
  const [transactions, setTransactions] = useState<BlockchainTransaction[]>([])
  const [procurementRecords, setProcurementRecords] = useState<ProcurementRecord[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate blockchain transactions
    const mockTransactions: BlockchainTransaction[] = [
      {
        id: 'tx-1',
        hash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        blockNumber: 15420,
        timestamp: '2024-01-20T14:30:00Z',
        type: 'procurement',
        agency: 'ECG',
        amount: 28500000,
        status: 'confirmed',
        parties: ['ECG', 'Siemens Ltd', 'PURC'],
        documents: ['Contract.pdf', 'Technical_Specs.pdf', 'Bid_Evaluation.pdf'],
        smartContract: '0x9876543210fedcba0987654321fedcba0987654321'
      },
      {
        id: 'tx-2',
        hash: '0x2b3c4d5e6f7890ab1234567890abcdef1234567890abcdef1234567890abcdef',
        blockNumber: 15419,
        timestamp: '2024-01-20T13:45:00Z',
        type: 'verification',
        agency: 'GRIDCo',
        amount: 125000000,
        status: 'verified',
        parties: ['GRIDCo', 'Independent Auditor', 'Blockchain Validator'],
        documents: ['Audit_Report.pdf', 'Compliance_Certificate.pdf'],
        smartContract: '0x1234567890abcdef1234567890abcdef1234567890'
      },
      {
        id: 'tx-3',
        hash: '0x3c4d5e6f7890ab1234567890abcdef1234567890abcdef1234567890abcdef12',
        blockNumber: 15418,
        timestamp: '2024-01-20T12:15:00Z',
        type: 'payment',
        agency: 'VRA',
        amount: 42000000,
        status: 'confirmed',
        parties: ['VRA', 'Contractor', 'Treasury'],
        documents: ['Payment_Voucher.pdf', 'Completion_Certificate.pdf'],
        smartContract: '0xabcdef1234567890abcdef1234567890abcdef1234'
      }
    ]

    const mockProcurementRecords: ProcurementRecord[] = [
      {
        id: 'proc-1',
        title: 'Emergency Power Transformers',
        agency: 'ECG',
        category: 'Equipment',
        value: 28500000,
        blockchainHash: '0x1a2b3c4d5e6f7890abcdef1234567890abcdef1234567890abcdef1234567890',
        verificationStatus: 'verified',
        transparencyScore: 98,
        complianceScore: 95,
        timeline: [
          { stage: 'Tender Publication', status: 'completed', timestamp: '2024-01-10', verified: true },
          { stage: 'Bid Evaluation', status: 'completed', timestamp: '2024-01-12', verified: true },
          { stage: 'Contract Award', status: 'completed', timestamp: '2024-01-15', verified: true },
          { stage: 'Delivery', status: 'in-progress', timestamp: '2024-01-20', verified: false },
          { stage: 'Final Verification', status: 'pending', timestamp: '2024-01-25', verified: false }
        ]
      },
      {
        id: 'proc-2',
        title: 'Smart Metering System',
        agency: 'ECG',
        category: 'Technology',
        value: 68000000,
        blockchainHash: '0x2b3c4d5e6f7890ab1234567890abcdef1234567890abcdef1234567890abcdef',
        verificationStatus: 'verified',
        transparencyScore: 96,
        complianceScore: 92,
        timeline: [
          { stage: 'Tender Publication', status: 'completed', timestamp: '2024-01-08', verified: true },
          { stage: 'Bid Evaluation', status: 'completed', timestamp: '2024-01-10', verified: true },
          { stage: 'Contract Award', status: 'completed', timestamp: '2024-01-12', verified: true },
          { stage: 'Implementation', status: 'in-progress', timestamp: '2024-01-18', verified: false },
          { stage: 'Testing & Commissioning', status: 'pending', timestamp: '2024-02-01', verified: false }
        ]
      },
      {
        id: 'proc-3',
        title: 'Gas Turbine Maintenance',
        agency: 'VRA',
        category: 'Services',
        value: 42000000,
        blockchainHash: '0x3c4d5e6f7890ab1234567890abcdef1234567890abcdef1234567890abcdef12',
        verificationStatus: 'pending',
        transparencyScore: 88,
        complianceScore: 85,
        timeline: [
          { stage: 'Service Request', status: 'completed', timestamp: '2024-01-05', verified: true },
          { stage: 'Vendor Selection', status: 'completed', timestamp: '2024-01-08', verified: true },
          { stage: 'Contract Signing', status: 'completed', timestamp: '2024-01-10', verified: true },
          { stage: 'Service Execution', status: 'in-progress', timestamp: '2024-01-15', verified: false },
          { stage: 'Quality Assurance', status: 'pending', timestamp: '2024-01-25', verified: false }
        ]
      }
    ]

    setTransactions(mockTransactions)
    setProcurementRecords(mockProcurementRecords)
    setLoading(false)
  }, [])

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500'
      case 'verified': return 'bg-blue-500'
      case 'pending': return 'bg-yellow-500'
      case 'disputed': return 'bg-red-500'
      case 'failed': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'confirmed': return <CheckCircle className="h-4 w-4 text-green-500" />
      case 'verified': return <CheckCircle className="h-4 w-4 text-blue-500" />
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />
      case 'disputed': return <AlertTriangle className="h-4 w-4 text-red-500" />
      case 'failed': return <AlertTriangle className="h-4 w-4 text-red-500" />
      default: return <Clock className="h-4 w-4 text-gray-500" />
    }
  }

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'procurement': return <Package className="h-4 w-4" />
      case 'contract': return <FileText className="h-4 w-4" />
      case 'payment': return <DollarSign className="h-4 w-4" />
      case 'verification': return <Shield className="h-4 w-4" />
      default: return <Hash className="h-4 w-4" />
    }
  }

  const formatHash = (hash: string) => {
    return `${hash.substring(0, 10)}...${hash.substring(hash.length - 8)}`
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-lg font-medium">Blockchain Verification Initializing...</p>
          <p className="text-sm text-muted-foreground">Connecting to distributed ledger network</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Blockchain Procurement Tracker
          </h2>
          <p className="text-muted-foreground">Transparent and immutable procurement records</p>
        </div>
        <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
          <Shield className="h-3 w-3 mr-1" />
          Blockchain Secured
        </Badge>
      </div>

      <Tabs defaultValue="transactions" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-card/80 backdrop-blur-md p-1 rounded-lg">
          <TabsTrigger value="transactions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Transactions
          </TabsTrigger>
          <TabsTrigger value="procurements" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Procurements
          </TabsTrigger>
          <TabsTrigger value="verification" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Verification
          </TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {transactions.map((transaction) => (
              <Card key={transaction.id} className="sophisticated-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500">
                        {getTypeIcon(transaction.type)}
                      </div>
                      <div>
                        <CardTitle className="text-sm capitalize">{transaction.type}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          {getStatusIcon(transaction.status)}
                          <span className="text-xs text-muted-foreground">
                            Block #{transaction.blockNumber}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(transaction.status)} text-white border-0 text-xs`}>
                      {transaction.status}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Agency</p>
                      <p className="text-sm font-medium">{transaction.agency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Amount</p>
                      <p className="text-sm font-medium">₵{(transaction.amount / 1000000).toFixed(1)}M</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Parties</p>
                      <p className="text-sm font-medium">{transaction.parties.length}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Documents</p>
                      <p className="text-sm font-medium">{transaction.documents.length}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Transaction Hash</span>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-black/20 px-2 py-1 rounded">
                          {formatHash(transaction.hash)}
                        </code>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Link className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Smart Contract</span>
                      <div className="flex items-center space-x-2">
                        <code className="text-xs bg-black/20 px-2 py-1 rounded">
                          {formatHash(transaction.smartContract)}
                        </code>
                        <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                          <Eye className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">{transaction.timestamp}</span>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </Button>
                      <Button size="sm" variant="outline" className="text-xs">
                        <Download className="h-3 w-3 mr-1" />
                        Export
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="procurements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {procurementRecords.map((record) => (
              <Card key={record.id} className="sophisticated-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                        <Package className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{record.title}</CardTitle>
                        <Badge variant="outline" className="text-xs mt-1">
                          {record.category}
                        </Badge>
                      </div>
                    </div>
                    <Badge className={`${getStatusColor(record.verificationStatus)} text-white border-0 text-xs`}>
                      {record.verificationStatus}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                      <div className="text-lg font-bold text-green-600">{record.transparencyScore}%</div>
                      <div className="text-xs text-muted-foreground">Transparency</div>
                    </div>
                    <div className="text-center p-3 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                      <div className="text-lg font-bold text-blue-600">{record.complianceScore}%</div>
                      <div className="text-xs text-muted-foreground">Compliance</div>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Blockchain Hash</p>
                    <div className="flex items-center space-x-2">
                      <code className="text-xs bg-black/20 px-2 py-1 rounded flex-1">
                        {formatHash(record.blockchainHash)}
                      </code>
                      <Button size="sm" variant="ghost" className="h-6 w-6 p-0">
                        <Link className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Timeline</p>
                    <div className="space-y-1">
                      {record.timeline.map((stage, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${
                            stage.status === 'completed' ? 'bg-green-500' : 
                            stage.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-500'
                          }`} />
                          <span className="text-xs">{stage.stage}</span>
                          {stage.verified && (
                            <CheckCircle className="h-3 w-3 text-green-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">{record.agency}</span>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Eye className="h-3 w-3 mr-1" />
                      Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="verification" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="sophisticated-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Shield className="h-5 w-5 text-green-500" />
                  <span>Verification Status</span>
                </CardTitle>
                <CardDescription>Real-time blockchain verification metrics</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-green-50 to-blue-50">
                    <div className="text-2xl font-bold text-green-600">98%</div>
                    <div className="text-sm text-muted-foreground">Verification Rate</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-blue-50 to-purple-50">
                    <div className="text-2xl font-bold text-blue-600">24/7</div>
                    <div className="text-sm text-muted-foreground">Monitoring</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Total Transactions</span>
                    <span className="text-xs font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Verified</span>
                    <span className="text-xs font-medium text-green-600">1,222</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Pending</span>
                    <span className="text-xs font-medium text-yellow-600">25</span>
                  </div>
                </div>
                <Button className="w-full professional-button">
                  <Shield className="h-4 w-4 mr-2" />
                  Verify All
                </Button>
              </CardContent>
            </Card>

            <Card className="sophisticated-card">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Users className="h-5 w-5 text-purple-500" />
                  <span>Stakeholder Access</span>
                </CardTitle>
                <CardDescription>Multi-party verification and transparency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-purple-50 to-pink-50">
                    <div className="text-2xl font-bold text-purple-600">45</div>
                    <div className="text-sm text-muted-foreground">Agencies</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-gradient-to-br from-orange-50 to-red-50">
                    <div className="text-2xl font-bold text-orange-600">128</div>
                    <div className="text-sm text-muted-foreground">Vendors</div>
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Active Participants</span>
                    <span className="text-xs font-medium">173</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Verification Nodes</span>
                    <span className="text-xs font-medium">12</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-muted-foreground">Network Health</span>
                    <span className="text-xs font-medium text-green-600">Excellent</span>
                  </div>
                </div>
                <Button className="w-full professional-button">
                  <Users className="h-4 w-4 mr-2" />
                  Manage Access
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}