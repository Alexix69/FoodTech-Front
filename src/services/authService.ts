const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'

export const authService = {
  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Credenciales inválidas')
        }
        throw new Error(`Error: ${response.status}`)
      }

      const data = await response.json()
      localStorage.setItem('auth_token', data.token)
      return true
    } catch (error) {
      if (error instanceof TypeError || error instanceof Error && error.message.includes('Failed to fetch')) {
        throw new Error('Error de conexión')
      }
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Error desconocido')
    }
  },

  logout(): void {
    localStorage.removeItem('auth_token')
  },

  getToken(): string | null {
    return localStorage.getItem('auth_token')
  },

  isAuthenticated(): boolean {
    return this.getToken() !== null
  },
  
}
