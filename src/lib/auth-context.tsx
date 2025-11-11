'use client'

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from 'next-auth'

interface AuthUser extends User {
  role: 'admin' | 'minister' | 'director' | 'manager' | 'analyst' | 'viewer'
  agency: string
  permissions: string[]
}

interface AuthContextType {
  user: AuthUser | null
  login: (email: string, password: string) => Promise<boolean>
  logout: () => void
  isLoading: boolean
  hasPermission: (permission: string) => boolean
  canAccess: (resource: string, action: string) => boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<AuthUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Check for existing session on mount
    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem('energy-dashboard-user')
        if (savedUser) {
          setUser(JSON.parse(savedUser))
        }
      } catch (error) {
        console.error('Error checking auth:', error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true)
    
    try {
      // Simulate API call - in real app, this would be an actual authentication request
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      // Mock user database
      const users: AuthUser[] = [
        {
          id: '1',
          name: 'Dr. Kwame Ansah',
          email: 'minister@energy.gov.gh',
          role: 'minister',
          agency: 'Ministry of Energy',
          permissions: ['all', 'executive_summary', 'financial_overview', 'procurements', 'projects', 'esg', 'ai_analytics', 'advanced_insights', 'real_time_data', 'collaboration', 'digital_twin', 'user_management']
        },
        {
          id: '2',
          name: 'Mrs. Abena Mensah',
          email: 'director@ecg.com.gh',
          role: 'director',
          agency: 'ECG',
          permissions: ['executive_summary', 'financial_overview', 'procurements', 'projects', 'ai_analytics', 'real_time_data', 'collaboration']
        },
        {
          id: '3',
          name: 'Eng. Michael Osei',
          email: 'manager@gridco.com.gh',
          role: 'manager',
          agency: 'GRIDCo',
          permissions: ['executive_summary', 'financial_overview', 'projects', 'ai_analytics', 'real_time_data']
        },
        {
          id: '4',
          name: 'Mr. Kofi Adom',
          email: 'analyst@vra.com.gh',
          role: 'analyst',
          agency: 'VRA',
          permissions: ['executive_summary', 'financial_overview', 'ai_analytics']
        },
        {
          id: '5',
          name: 'Ms. Akosua Frimpong',
          email: 'viewer@purc.com.gh',
          role: 'viewer',
          agency: 'PURC',
          permissions: ['executive_summary']
        }
      ]

      const foundUser = users.find(u => u.email === email)
      
      if (foundUser && password === 'password123') { // In real app, use proper password hashing
        setUser(foundUser)
        localStorage.setItem('energy-dashboard-user', JSON.stringify(foundUser))
        return true
      }
      
      return false
    } catch (error) {
      console.error('Login error:', error)
      return false
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('energy-dashboard-user')
  }

  const hasPermission = (permission: string): boolean => {
    if (!user) return false
    return user.permissions.includes(permission) || user.permissions.includes('all')
  }

  const canAccess = (resource: string, action: string): boolean => {
    if (!user) return false
    
    const permissionMap: Record<string, Record<string, string[]>> = {
      executive_summary: { view: ['executive_summary'], edit: ['minister', 'director'] },
      agencies: { view: ['executive_summary'], edit: ['minister', 'director', 'manager'] },
      financial_overview: { view: ['financial_overview'], edit: ['minister', 'director'] },
      procurements: { view: ['procurements'], edit: ['minister', 'director', 'manager'] },
      projects: { view: ['projects'], edit: ['minister', 'director', 'manager'] },
      esg: { view: ['esg'], edit: ['minister', 'director'] },
      ai_analytics: { view: ['ai_analytics'], edit: ['minister', 'director', 'analyst'] },
      advanced_insights: { view: ['advanced_insights'], edit: ['minister', 'director'] },
      real_time_data: { view: ['real_time_data'], edit: ['minister', 'director', 'manager'] },
      collaboration: { view: ['collaboration'], edit: ['minister', 'director', 'manager'] },
      digital_twin: { view: ['digital_twin'], edit: ['minister', 'director', 'analyst'] }
    }

    const resourcePermissions = permissionMap[resource]?.[action] || []
    return user.permissions.includes('all') || resourcePermissions.some(p => user.permissions.includes(p))
  }

  const value: AuthContextType = {
    user,
    login,
    logout,
    isLoading,
    hasPermission,
    canAccess
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}