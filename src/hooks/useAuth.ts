import { useState, useEffect } from 'react'
import { authService } from '../services/authService'
import { useNavigate } from 'react-router-dom'
import { UserRole, ROLE_HOME_ROUTES } from '../models/UserRole'
interface UseAuthReturn {
  isAuthenticated: boolean
  token: string | null
  role: UserRole | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string, rememberMe?: boolean) => Promise<void>
  register: (email: string, username: string, password: string, role?: UserRole) => Promise<void>
  logout: () => void
  assignRole: (userId: number, role: UserRole) => Promise<void>
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() =>
    authService.isAuthenticated()
  )
  const [token, setToken] = useState<string | null>(() =>
    authService.getToken()
  )
  const [role, setRole] = useState<UserRole | null>(() =>
    authService.getRole()
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  useEffect(() => {
    const storedToken = authService.getToken()
    setIsAuthenticated(storedToken !== null)
    setToken(storedToken)
    setRole(authService.getRole())
  }, [])

  const login = async (email: string, password: string, rememberMe: boolean = false): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      await authService.login(email, password, rememberMe)
      const newToken = authService.getToken()
      const newRole = authService.getRole()
      setToken(newToken)
      setRole(newRole)
      setIsAuthenticated(true)
      if (newRole) {
        navigate(ROLE_HOME_ROUTES[newRole])
      }
    } catch (err) {
      if (err && typeof err === 'object' && 'error' in err && (err as Record<string, unknown>).error === 'ROLE_NOT_ASSIGNED') {
        const userId = (err as Record<string, unknown>).userId
        navigate(`/registro?userId=${userId}&step=role`)
        return
      }
      setError(err ? 'Credenciales inválidas' : '')
      setIsAuthenticated(false)
      setToken(null)
      setRole(null)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = (): void => {
    authService.logout()
    setToken(null)
    setRole(null)
    setIsAuthenticated(false)
    setError(null)
  }

  const register = async (email: string, username: string, password: string, role?: UserRole): Promise<void> => {
    setIsLoading(true)
    setError(null)
    try {
      await authService.register(email, username, password, role)
      await authService.login(email, password, false)
      const newToken = authService.getToken()
      const newRole = authService.getRole()
      setToken(newToken)
      setRole(newRole)
      setIsAuthenticated(true)
      if (newRole) {
        navigate(ROLE_HOME_ROUTES[newRole])
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      setIsAuthenticated(false)
      setToken(null)
      setRole(null)
    } finally {
      setIsLoading(false)
    }
  }

  const assignRole = async (userId: number, role: UserRole): Promise<void> => {
    setIsLoading(true)
    setError(null)
    try {
      await authService.assignRole(userId, role)
      const newToken = authService.getToken()
      const newRole = authService.getRole()
      setToken(newToken)
      setRole(newRole)
      setIsAuthenticated(true)
      if (newRole) {
        navigate(ROLE_HOME_ROUTES[newRole])
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return {
    isAuthenticated,
    token,
    role,
    isLoading,
    error,
    login,
    register,
    logout,
    assignRole,
  }
}
