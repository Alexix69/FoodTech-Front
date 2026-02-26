import { describe, it, expect, vi, beforeEach } from 'vitest'
import { authService } from '../services/authService'

declare global {
  interface Global {
    fetch: ReturnType<typeof vi.fn>
  }
  var global: Global
}

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  describe('login', () => {
    it('debe hacer login exitoso y guardar token en localStorage', async () => {
      const mockToken = 'fake-jwt-token-12345'
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ token: mockToken })
      })

      const result = await authService.login('test@restaurant.com', 'password123')

      expect(result).toBe(true)
      expect(localStorage.getItem('auth_token')).toBe(mockToken)
    })

    it('debe lanzar error cuando credenciales son inválidas', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401
      })

      await expect(
        authService.login('wrong@email.com', 'wrongpass')
      ).rejects.toThrow('Credenciales inválidas')
    })

    it('debe lanzar error cuando hay error de red', async () => {
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))

      await expect(
        authService.login('test@email.com', 'password')
      ).rejects.toThrow('Error de conexión')
    })

    it('debe guardar token sin expiración cuando rememberMe es false', async () => {
      const mockToken = 'fake-jwt-token-12345'
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ token: mockToken })
      })

      await authService.login('test@restaurant.com', 'password123', false)

      expect(localStorage.getItem('auth_token')).toBe(mockToken)
      expect(localStorage.getItem('auth_token_expiry')).toBeNull()
    })

    it('debe guardar token con expiración cuando rememberMe es true', async () => {
      const mockToken = 'fake-jwt-token-remember'
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ token: mockToken })
      })

      await authService.login('test@restaurant.com', 'password123', true)

      expect(localStorage.getItem('auth_token')).toBe(mockToken)
      expect(localStorage.getItem('auth_token_expiry')).not.toBeNull()
    })
  })

  describe('logout', () => {
    it('debe remover token de localStorage', () => {
      localStorage.setItem('auth_token', 'some-token')
      
      authService.logout()
      
      expect(localStorage.getItem('auth_token')).toBeNull()
    })
  })

  describe('getToken', () => {
    it('debe retornar el token guardado', () => {
      localStorage.setItem('auth_token', 'my-token')
      
      expect(authService.getToken()).toBe('my-token')
    })

    it('debe retornar null cuando no hay token', () => {
      expect(authService.getToken()).toBeNull()
    })
  })

  describe('isAuthenticated', () => {
    it('debe retornar true cuando hay token válido', () => {
      localStorage.setItem('auth_token', 'valid-token')
      
      expect(authService.isAuthenticated()).toBe(true)
    })

    it('debe retornar false cuando no hay token', () => {
      expect(authService.isAuthenticated()).toBe(false)
    })

    it('debe retornar false cuando el token está expirado', () => {
      const expiredDate = Date.now() - 1000
      localStorage.setItem('auth_token', 'expired-token')
      localStorage.setItem('auth_token_expiry', expiredDate.toString())
      
      expect(authService.isAuthenticated()).toBe(false)
    })
  })

  describe('register', () => {
    it('debe hacer registro exitoso y guardar token en localStorage', async () => {
      const mockToken = 'fake-jwt-token-registration'
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ token: mockToken })
      })

      const result = await authService.register('test@email.com', 'newuser', 'password123')

      expect(result).toBe(true)
      expect(localStorage.getItem('auth_token')).toBe(mockToken)
    })

    it('debe lanzar error cuando el username ya existe', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 400,
        json: () => Promise.resolve({ message: 'El usuario ya existe' })
      })

      await expect(
        authService.register('test@email.com', 'existinguser', 'password123')
      ).rejects.toThrow('El usuario ya existe')
    })

    it('debe lanzar error cuando hay error de red', async () => {
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))

      await expect(
        authService.register('test@email.com', 'testuser', 'password')
      ).rejects.toThrow('Error de conexión')
    })

    it('debe hacer request con los datos correctos al endpoint register', async () => {
      const mockFetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ token: 'token' })
      })
      global.fetch = mockFetch

      await authService.register('test@email.com', 'testuser', 'testpass')

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining('/auth/register'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: 'test@email.com',
            username: 'testuser',
            password: 'testpass'
          })
        })
      )
    })
  })
})
