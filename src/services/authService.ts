import { UserRole } from '../models/UserRole'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'
const REMEMBER_ME_DAYS = 30
export const authService = {
  async login(email: string, password: string, rememberMe: boolean = false): Promise<boolean> {
    
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier: email, password }),
      })

      if (!response.ok) {
        if (response.status === 403) {
          const err = await response.json()
          throw err
        }
        if (response.status === 401 || response.status === 400) {
          throw new Error('Credenciales inválidas')
        }
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()

      if (data.role) {
        localStorage.setItem('auth_role', data.role)
      }

      if (rememberMe) {
        const expiryDate = Date.now() + (REMEMBER_ME_DAYS * 24 * 60 * 60 * 1000)
        localStorage.setItem('auth_token', data.token)
        localStorage.setItem('auth_token_expiry', expiryDate.toString())
      } else {
        localStorage.setItem('auth_token', data.token)
        localStorage.removeItem('auth_token_expiry')
      }
      return true
    } catch (error) {
      if (error instanceof TypeError || (error instanceof Error && error.message.includes('Failed to fetch'))) {
        throw new Error('Error de conexión')
      }
      if (error instanceof Error) {
        throw error
      }
      if (error && typeof error === 'object' && 'error' in error) {
        throw error
      }
      throw new Error('Error desconocido')
    }
  },

  logout(): void {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_role')
  },

  getToken(): string | null {
    const expiry = localStorage.getItem('auth_token_expiry')
    if (expiry && Date.now() > parseInt(expiry)) {
      localStorage.removeItem('auth_token')
      localStorage.removeItem('auth_token_expiry')
      return null
    }
    return localStorage.getItem('auth_token')
  },

  isAuthenticated(): boolean {
    return this.getToken() !== null
  },

  async register(email: string, username: string, password: string, role?: UserRole): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password, ...(role ? { role } : {}) }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.error ?? err.message ?? 'Error de registro')
      }

      return true
    } catch (error) {
      if (error instanceof TypeError || (error instanceof Error && error.message.includes('Failed to fetch'))) {
        throw new Error('Error de conexión')
      }
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Error desconocido')
    }
  },

  getRole(): UserRole | null {
    const role = localStorage.getItem('auth_role')
    if (role === UserRole.MESERO || role === UserRole.COCINERO || role === UserRole.BARTENDER) {
      return role as UserRole
    }
    return null
  },

  async assignRole(userId: number, role: UserRole): Promise<{ token: string; role: UserRole }> {
    try {
      const response = await fetch(`${API_BASE_URL}/api/users/${userId}/role`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ role }),
      })

      if (!response.ok) {
        const err = await response.json()
        throw new Error(err.message ?? 'Error al asignar rol')
      }

      const data = await response.json()

      localStorage.setItem('auth_token', data.token)
      localStorage.setItem('auth_role', data.role)

      return data
    } catch (error) {
      if (error instanceof TypeError || (error instanceof Error && error.message.includes('Failed to fetch'))) {
        throw new Error('Error de conexión')
      }
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Error desconocido')
    }
  },
}
