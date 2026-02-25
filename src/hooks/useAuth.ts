import { useState, useEffect } from 'react'
import { authService } from '../services/authService'

interface UseAuthReturn {
  isAuthenticated: boolean
  token: string | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  logout: () => void
}

export const useAuth = (): UseAuthReturn => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => 
    authService.isAuthenticated()
  )
  const [token, setToken] = useState<string | null>(() => 
    authService.getToken()
  )
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const storedToken = authService.getToken()
    setIsAuthenticated(storedToken !== null)
    setToken(storedToken)
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    setIsLoading(true)
    setError(null)

    try {
      await authService.login(email, password)
      const newToken = authService.getToken()
      setToken(newToken)
      setIsAuthenticated(true)
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Error desconocido'
      setError(message)
      setIsAuthenticated(false)
      setToken(null)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = (): void => {
    authService.logout()
    setToken(null)
    setIsAuthenticated(false)
    setError(null)
  }

  return {
    isAuthenticated,
    token,
    isLoading,
    error,
    login,
    logout,
  }
}
