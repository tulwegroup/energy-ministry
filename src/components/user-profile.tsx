'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { useAuth } from '@/lib/auth-context'
import { 
  User, 
  Shield, 
  Building, 
  Settings, 
  LogOut,
  Bell,
  Lock,
  Activity,
  CheckCircle,
  AlertTriangle,
  Clock,
  Zap,
  Brain,
  MapPin,
  Mail,
  Phone
} from 'lucide-react'

export default function UserProfile() {
  const { user, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('profile')

  if (!user) {
    return null
  }

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'minister': return 'bg-purple-500'
      case 'director': return 'bg-blue-500'
      case 'manager': return 'bg-green-500'
      case 'analyst': return 'bg-orange-500'
      case 'viewer': return 'bg-gray-500'
      default: return 'bg-gray-500'
    }
  }

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'minister': return <Shield className="h-4 w-4" />
      case 'director': return <Building className="h-4 w-4" />
      case 'manager': return <Settings className="h-4 w-4" />
      case 'analyst': return <Activity className="h-4 w-4" />
      case 'viewer': return <User className="h-4 w-4" />
      default: return <User className="h-4 w-4" />
    }
  }

  const permissionGroups = [
    {
      name: 'Executive',
      permissions: ['executive_summary'],
      icon: <BarChart3 className="h-4 w-4" />
    },
    {
      name: 'Financial',
      permissions: ['financial_overview'],
      icon: <DollarSign className="h-4 w-4" />
    },
    {
      name: 'Operations',
      permissions: ['procurements', 'projects'],
      icon: <Activity className="h-4 w-4" />
    },
    {
      name: 'Advanced Analytics',
      permissions: ['ai_analytics', 'advanced_insights'],
      icon: <Brain className="h-4 w-4" />
    },
    {
      name: 'Real-time',
      permissions: ['real_time_data'],
      icon: <Zap className="h-4 w-4" />
    },
    {
      name: 'Collaboration',
      permissions: ['collaboration'],
      icon: <Users className="h-4 w-4" />
    },
    {
      name: 'Digital Twin',
      permissions: ['digital_twin'],
      icon: <Monitor className="h-4 w-4" />
    },
    {
      name: 'ESG',
      permissions: ['esg'],
      icon: <Leaf className="h-4 w-4" />
    }
  ]

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Avatar className="h-16 w-16">
                <AvatarImage src={`/api/placeholder/avatar/${user.id}`} />
                <AvatarFallback className="text-lg">
                  {user.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle className="text-xl">{user.name}</CardTitle>
                <div className="flex items-center space-x-2 mt-1">
                  <Badge className={`${getRoleColor(user.role)} text-white`}>
                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                  </Badge>
                  <span className="text-sm text-muted-foreground">{user.agency}</span>
                </div>
              </div>
            </div>
            <Button variant="outline" onClick={logout}>
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">{user.permissions.length}</div>
              <div className="text-sm text-muted-foreground">Permissions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">
                {permissionGroups.filter(group => 
                  group.permissions.some(perm => user.permissions.includes(perm))
                ).length}
              </div>
              <div className="text-sm text-muted-foreground">Modules Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">24/7</div>
              <div className="text-sm text-muted-foreground">System Access</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">
                {user.permissions.includes('all') ? 'Full' : 'Limited'}
              </div>
              <div className="text-sm text-muted-foreground">Access Level</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="profile">Profile</TabsTrigger>
          <TabsTrigger value="permissions">Permissions</TabsTrigger>
          <TabsTrigger value="activity">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="profile" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <User className="h-5 w-5" />
                  <span>Personal Information</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Building className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Agency</p>
                    <p className="text-sm text-muted-foreground">{user.agency}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Role</p>
                    <p className="text-sm text-muted-foreground capitalize">{user.role}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <div>
                    <p className="font-medium">Location</p>
                    <p className="text-sm text-muted-foreground">Accra, Ghana</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Button variant="outline" className="w-full justify-start">
                    <Bell className="h-4 w-4 mr-2" />
                    Notification Preferences
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Lock className="h-4 w-4 mr-2" />
                    Change Password
                  </Button>
                  <Button variant="outline" className="w-full justify-start">
                    <Shield className="h-4 w-4 mr-2" />
                    Security Settings
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="permissions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <span>Access Permissions</span>
              </CardTitle>
              <CardDescription>
                Your current access permissions across the dashboard modules
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4">
                {permissionGroups.map((group) => {
                  const hasAccess = group.permissions.some(perm => user.permissions.includes(perm))
                  return (
                    <div key={group.name} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        {group.icon}
                        <div>
                          <p className="font-medium">{group.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {group.permissions.map(perm => perm.replace('_', ' ')).join(', ')}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {hasAccess ? (
                          <CheckCircle className="h-5 w-5 text-green-500" />
                        ) : (
                          <AlertTriangle className="h-5 w-5 text-yellow-500" />
                        )}
                        <Badge variant={hasAccess ? 'default' : 'secondary'}>
                          {hasAccess ? 'Granted' : 'Restricted'}
                        </Badge>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="activity" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Activity className="h-5 w-5" />
                <span>Recent Activity</span>
              </CardTitle>
              <CardDescription>
                Your recent actions and system interactions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  {
                    action: 'Viewed Executive Summary',
                    time: '2 minutes ago',
                    module: 'Executive Summary',
                    icon: <BarChart3 className="h-4 w-4" />
                  },
                  {
                    action: 'Accessed AI Analytics',
                    time: '15 minutes ago',
                    module: 'AI Analytics',
                    icon: <Brain className="h-4 w-4" />
                  },
                  {
                    action: 'Reviewed Financial Overview',
                    time: '1 hour ago',
                    module: 'Financial Overview',
                    icon: <DollarSign className="h-4 w-4" />
                  },
                  {
                    action: 'Logged into Dashboard',
                    time: '2 hours ago',
                    module: 'Authentication',
                    icon: <LogIn className="h-4 w-4" />
                  }
                ].map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 border rounded-lg">
                    <div className="p-2 rounded-lg bg-blue-50">
                      {activity.icon}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">{activity.action}</p>
                      <p className="text-sm text-muted-foreground">{activity.module}</p>
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

// Import required icons
import { BarChart3, Brain, DollarSign, LogIn, Users, Monitor, Leaf } from 'lucide-react'