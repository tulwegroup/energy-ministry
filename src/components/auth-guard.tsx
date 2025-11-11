'use client'

import { useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import LoginForm from '@/components/login-form'
import { Loader2 } from 'lucide-react'

interface AuthGuardProps {
  children: React.ReactNode
  requiredPermission?: string
  requiredResource?: string
  requiredAction?: string
  fallback?: React.ReactNode
}

export function AuthGuard({ 
  children, 
  requiredPermission, 
  requiredResource, 
  requiredAction,
  fallback 
}: AuthGuardProps) {
  const { user, isLoading, hasPermission, canAccess } = useAuth()

  useEffect(() => {
    // Check if user has required permissions
    if (user && requiredPermission && !hasPermission(requiredPermission)) {
      console.warn(`User lacks required permission: ${requiredPermission}`)
    }
    
    if (user && requiredResource && requiredAction && !canAccess(requiredResource, requiredAction)) {
      console.warn(`User cannot access ${requiredAction} on ${requiredResource}`)
    }
  }, [user, requiredPermission, requiredResource, requiredAction, hasPermission, canAccess])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return <LoginForm />
  }

  if (requiredPermission && !hasPermission(requiredPermission)) {
    return fallback || (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You don't have the required permissions to access this resource.
          </p>
          <p className="text-sm text-muted-foreground">
            Required permission: {requiredPermission}
          </p>
        </div>
      </div>
    )
  }

  if (requiredResource && requiredAction && !canAccess(requiredResource, requiredAction)) {
    return fallback || (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="text-6xl mb-4">🚫</div>
          <h1 className="text-2xl font-bold mb-2">Access Denied</h1>
          <p className="text-muted-foreground mb-4">
            You don't have the required permissions to {requiredAction} this resource.
          </p>
          <p className="text-sm text-muted-foreground">
            Required: {requiredAction} access to {requiredResource}
          </p>
        </div>
      </div>
    )
  }

  return <>{children}</>
}

// Higher-order component for route protection
export function withAuth<P extends object>(
  Component: React.ComponentType<P>,
  options: { requiredPermission?: string; requiredResource?: string; requiredAction?: string } = {}
) {
  return function AuthenticatedComponent(props: P) {
    return (
      <AuthGuard {...options}>
        <Component {...props} />
      </AuthGuard>
    )
  }
}