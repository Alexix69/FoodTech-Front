import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import type { ReactNode } from 'react'
import { ROLE_HOME_ROUTES } from '../models/UserRole'

interface PublicRouteProps {
  children: ReactNode
}

export const PublicRoute = ({ children }: PublicRouteProps) => {
  const { isAuthenticated, isLoading, role } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Cargando...</div>
      </div>
    )
  }

  if (isAuthenticated && role) {
    return <Navigate to={ROLE_HOME_ROUTES[role]} replace />
  }

  return <>{children}</>
}
