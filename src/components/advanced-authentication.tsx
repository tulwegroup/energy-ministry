'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Shield, 
  Users, 
  Key, 
  Eye, 
  EyeOff,
  CheckCircle,
  AlertTriangle,
  UserPlus,
  Settings,
  Activity,
  BarChart3,
  FileText,
  Zap,
  Database,
  TrendingUp,
  Lock,
  Unlock,
  Clock,
  Mail,
  Phone,
  Building,
  MapPin
} from 'lucide-react'

interface User {
  id: string
  name: string
  email: string
  role: 'admin' | 'minister' | 'director' | 'manager' | 'analyst' | 'viewer'
  agency: string
  department: string
  status: 'active' | 'inactive' | 'suspended'
  lastLogin: string
  permissions: string[]
  sessionCount: number
  riskLevel: 'low' | 'medium' | 'high'
}

interface Role {
  id: string
  name: string
  description: string
  permissions: string[]
  userCount: number
  color: string
}

interface Permission {
  id: string
  name: string
  description: string
  category: 'dashboard' | 'financial' | 'operational' | 'administrative' | 'system'
}

interface ActivityLog {
  id: string
  userId: string
  userName: string
  action: string
  resource: string
  timestamp: string
  ip: string
  location: string
  risk: 'low' | 'medium' | 'high'
}

export default function AdvancedAuthentication() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<Role[]>([])
  const [permissions, setPermissions] = useState<Permission[]>([])
  const [activityLogs, setActivityLogs] = useState<ActivityLog[]>([])
  const [loading, setLoading] = useState(true)
  const [showPassword, setShowPassword] = useState(false)

  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'Dr. Kwame Ansah',
        email: 'minister@energy.gov.gh',
        role: 'minister',
        agency: 'Ministry of Energy',
        department: 'Executive Office',
        status: 'active',
        lastLogin: '2024-01-20T09:30:00Z',
        permissions: ['all'],
        sessionCount: 127,
        riskLevel: 'low'
      },
      {
        id: '2',
        name: 'Mrs. Abena Mensah',
        email: 'director@ecg.com.gh',
        role: 'director',
        agency: 'ECG',
        department: 'Finance & Administration',
        status: 'active',
        lastLogin: '2024-01-20T08:15:00Z',
        permissions: ['executive_summary', 'financial_overview', 'procurements', 'projects', 'ai_analytics', 'real_time_data', 'collaboration'],
        sessionCount: 89,
        riskLevel: 'low'
      },
      {
        id: '3',
        name: 'Eng. Michael Osei',
        email: 'manager@gridco.com.gh',
        role: 'manager',
        agency: 'GRIDCo',
        department: 'Operations',
        status: 'active',
        lastLogin: '2024-01-20T10:45:00Z',
        permissions: ['executive_summary', 'financial_overview', 'projects', 'ai_analytics', 'real_time_data'],
        sessionCount: 156,
        riskLevel: 'medium'
      },
      {
        id: '4',
        name: 'Mr. Kofi Adom',
        email: 'analyst@vra.com.gh',
        role: 'analyst',
        agency: 'VRA',
        department: 'Data Analytics',
        status: 'active',
        lastLogin: '2024-01-19T16:20:00Z',
        permissions: ['executive_summary', 'financial_overview', 'ai_analytics'],
        sessionCount: 234,
        riskLevel: 'low'
      },
      {
        id: '5',
        name: 'Ms. Akosua Frimpong',
        email: 'viewer@purc.com.gh',
        role: 'viewer',
        agency: 'PURC',
        department: 'Public Relations',
        status: 'active',
        lastLogin: '2024-01-18T14:10:00Z',
        permissions: ['executive_summary'],
        sessionCount: 45,
        riskLevel: 'low'
      },
      {
        id: '6',
        name: 'Dr. Yaw Boateng',
        email: 'admin@energy.gov.gh',
        role: 'admin',
        agency: 'Ministry of Energy',
        department: 'IT Department',
        status: 'active',
        lastLogin: '2024-01-20T11:00:00Z',
        permissions: ['all'],
        sessionCount: 78,
        riskLevel: 'low'
      }
    ]

    const mockRoles: Role[] = [
      {
        id: 'role-1',
        name: 'Minister',
        description: 'Full access to all system features and executive oversight',
        permissions: ['all'],
        userCount: 1,
        color: 'bg-purple-500'
      },
      {
        id: 'role-2',
        name: 'Director',
        description: 'Agency-level management with comprehensive access',
        permissions: ['executive_summary', 'financial_overview', 'procurements', 'projects', 'ai_analytics', 'real_time_data', 'collaboration'],
        userCount: 1,
        color: 'bg-blue-500'
      },
      {
        id: 'role-3',
        name: 'Manager',
        description: 'Departmental management with operational access',
        permissions: ['executive_summary', 'financial_overview', 'projects', 'ai_analytics', 'real_time_data'],
        userCount: 1,
        color: 'bg-green-500'
      },
      {
        id: 'role-4',
        name: 'Analyst',
        description: 'Data analysis and reporting access',
        permissions: ['executive_summary', 'financial_overview', 'ai_analytics'],
        userCount: 1,
        color: 'bg-yellow-500'
      },
      {
        id: 'role-5',
        name: 'Viewer',
        description: 'Read-only access to executive summaries',
        permissions: ['executive_summary'],
        userCount: 1,
        color: 'bg-gray-500'
      },
      {
        id: 'role-6',
        name: 'System Admin',
        description: 'Full system administration and configuration',
        permissions: ['all'],
        userCount: 1,
        color: 'bg-red-500'
      }
    ]

    const mockPermissions: Permission[] = [
      {
        id: 'perm-1',
        name: 'Executive Summary',
        description: 'View executive dashboard and summaries',
        category: 'dashboard'
      },
      {
        id: 'perm-2',
        name: 'Financial Overview',
        description: 'Access financial data and reports',
        category: 'financial'
      },
      {
        id: 'perm-3',
        name: 'Procurement Management',
        description: 'Manage procurement processes and contracts',
        category: 'operational'
      },
      {
        id: 'perm-4',
        name: 'Project Management',
        description: 'View and manage project portfolios',
        category: 'operational'
      },
      {
        id: 'perm-5',
        name: 'AI Analytics',
        description: 'Access AI-powered insights and analytics',
        category: 'dashboard'
      },
      {
        id: 'perm-6',
        name: 'Real-time Data',
        description: 'Access live data streams and monitoring',
        category: 'operational'
      },
      {
        id: 'perm-7',
        name: 'User Management',
        description: 'Manage system users and permissions',
        category: 'administrative'
      },
      {
        id: 'perm-8',
        name: 'System Configuration',
        description: 'Configure system settings and parameters',
        category: 'system'
      }
    ]

    const mockActivityLogs: ActivityLog[] = [
      {
        id: 'log-1',
        userId: '1',
        userName: 'Dr. Kwame Ansah',
        action: 'Login',
        resource: 'System',
        timestamp: '2024-01-20T09:30:00Z',
        ip: '192.168.1.100',
        location: 'Accra, Ghana',
        risk: 'low'
      },
      {
        id: 'log-2',
        userId: '2',
        userName: 'Mrs. Abena Mensah',
        action: 'View Report',
        resource: 'Financial Summary',
        timestamp: '2024-01-20T08:15:00Z',
        ip: '192.168.1.101',
        location: 'Kumasi, Ghana',
        risk: 'low'
      },
      {
        id: 'log-3',
        userId: '3',
        userName: 'Eng. Michael Osei',
        action: 'Export Data',
        resource: 'Project Analytics',
        timestamp: '2024-01-20T10:45:00Z',
        ip: '192.168.1.102',
        location: 'Takoradi, Ghana',
        risk: 'medium'
      },
      {
        id: 'log-4',
        userId: '4',
        userName: 'Mr. Kofi Adom',
        action: 'Generate AI Report',
        resource: 'Predictive Analytics',
        timestamp: '2024-01-19T16:20:00Z',
        ip: '192.168.1.103',
        location: 'Tamale, Ghana',
        risk: 'low'
      },
      {
        id: 'log-5',
        userId: '6',
        userName: 'Dr. Yaw Boateng',
        action: 'System Configuration',
        resource: 'User Management',
        timestamp: '2024-01-20T11:00:00Z',
        ip: '192.168.1.104',
        location: 'Accra, Ghana',
        risk: 'low'
      }
    ]

    setUsers(mockUsers)
    setRoles(mockRoles)
    setPermissions(mockPermissions)
    setActivityLogs(mockActivityLogs)
    setLoading(false)
  }, [])

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'admin': return <Shield className="h-4 w-4" />
      case 'minister': return <Users className="h-4 w-4" />
      case 'director': return <BarChart3 className="h-4 w-4" />
      case 'manager': return <Activity className="h-4 w-4" />
      case 'analyst': return <TrendingUp className="h-4 w-4" />
      case 'viewer': return <Eye className="h-4 w-4" />
      default: return <UserPlus className="h-4 w-4" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-500'
      case 'inactive': return 'bg-gray-500'
      case 'suspended': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'bg-green-500'
      case 'medium': return 'bg-yellow-500'
      case 'high': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getRiskIcon = (risk: string) => {
    switch (risk) {
      case 'low': return <CheckCircle className="h-3 w-3 text-green-500" />
      case 'medium': return <AlertTriangle className="h-3 w-3 text-yellow-500" />
      case 'high': return <AlertTriangle className="h-3 w-3 text-red-500" />
      default: return <CheckCircle className="h-3 w-3 text-gray-500" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString()
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Shield className="h-12 w-12 mx-auto mb-4 text-blue-500 animate-pulse" />
          <p className="text-lg font-medium">Authentication System Initializing...</p>
          <p className="text-sm text-muted-foreground">Loading user management and security features</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            Advanced Authentication & User Management
          </h2>
          <p className="text-muted-foreground">Role-based access control and security management</p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white border-0">
            <Shield className="h-3 w-3 mr-1" />
            Secure
          </Badge>
          <Button className="professional-button">
            <UserPlus className="h-4 w-4 mr-2" />
            Add User
          </Button>
        </div>
      </div>

      <Tabs defaultValue="users" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-card/80 backdrop-blur-md p-1 rounded-lg">
          <TabsTrigger value="users" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Roles
          </TabsTrigger>
          <TabsTrigger value="permissions" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Permissions
          </TabsTrigger>
          <TabsTrigger value="activity" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-blue-500 data-[state=active]:text-white">
            Activity
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {users.map((user) => (
              <Card key={user.id} className="sophisticated-card hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500 to-blue-500">
                        {getRoleIcon(user.role)}
                      </div>
                      <div>
                        <CardTitle className="text-sm">{user.name}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs capitalize">
                            {user.role}
                          </Badge>
                          <Badge className={`${getStatusColor(user.status)} text-white border-0 text-xs capitalize`}>
                            {user.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getRiskIcon(user.riskLevel)}
                      <Badge className={`${getRiskColor(user.riskLevel)} text-white border-0 text-xs`}>
                        {user.riskLevel}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Email</p>
                      <p className="text-sm font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Agency</p>
                      <p className="text-sm font-medium">{user.agency}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Department</p>
                      <p className="text-sm font-medium">{user.department}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Sessions</p>
                      <p className="text-sm font-medium">{user.sessionCount}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Last Login</p>
                    <p className="text-sm font-medium">{formatDate(user.lastLogin)}</p>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">
                      {user.permissions.length} permissions
                    </span>
                    <div className="flex space-x-1">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Settings className="h-3 w-3 mr-1" />
                        Edit
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                        <Key className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roles.map((role) => (
              <Card key={role.id} className="sophisticated-card hover-lift">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className={`p-2 rounded-lg ${role.color}`}>
                        <Shield className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{role.name}</CardTitle>
                        <Badge variant="outline" className="text-xs">
                          {role.userCount} users
                        </Badge>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{role.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Key Permissions:</p>
                    <div className="space-y-1">
                      {role.permissions.slice(0, 3).map((permission, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <CheckCircle className="h-3 w-3 text-green-500" />
                          <span className="text-xs text-muted-foreground">{permission}</span>
                        </div>
                      ))}
                      {role.permissions.length > 3 && (
                        <div className="text-xs text-muted-foreground">
                          +{role.permissions.length - 3} more permissions
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">
                      {role.permissions.length} total permissions
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

        <TabsContent value="permissions" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {permissions.map((permission) => (
              <Card key={permission.id} className="sophisticated-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center space-x-2">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
                      <Key className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-sm">{permission.name}</CardTitle>
                      <Badge variant="outline" className="text-xs capitalize">
                        {permission.category}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">{permission.description}</p>
                  
                  <div className="space-y-2">
                    <p className="text-xs font-medium">Assigned to Roles:</p>
                    <div className="flex flex-wrap gap-1">
                      {roles.filter(role => 
                        role.permissions.includes(permission.name.toLowerCase().replace(' ', '_')) || 
                        role.permissions.includes('all')
                      ).map((role, index) => (
                        <Badge key={index} className={`${role.color} text-white border-0 text-xs`}>
                          {role.name}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">
                      {roles.filter(role => 
                        role.permissions.includes(permission.name.toLowerCase().replace(' ', '_')) || 
                        role.permissions.includes('all')
                      ).length} roles assigned
                    </span>
                    <Button size="sm" variant="outline" className="text-xs">
                      <Settings className="h-3 w-3 mr-1" />
                      Manage
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {activityLogs.map((log) => (
              <Card key={log.id} className="sophisticated-card">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-green-500 to-blue-500">
                        <Activity className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-sm">{log.userName}</CardTitle>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {log.action}
                          </Badge>
                          <Badge className={`${getRiskColor(log.risk)} text-white border-0 text-xs`}>
                            {log.risk}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-1">
                      {getRiskIcon(log.risk)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-xs text-muted-foreground">Resource</p>
                      <p className="text-sm font-medium">{log.resource}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">IP Address</p>
                      <p className="text-sm font-medium">{log.ip}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Location</p>
                      <p className="text-sm font-medium">{log.location}</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Timestamp</p>
                      <p className="text-sm font-medium">{formatDate(log.timestamp)}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2 border-t border-white/10">
                    <span className="text-xs text-muted-foreground">
                      User activity monitoring
                    </span>
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
      </Tabs>
    </div>
  )
}