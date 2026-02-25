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
    it('debe retornar true cuando hay token', () => {
      localStorage.setItem('auth_token', 'valid-token')
      
      expect(authService.isAuthenticated()).toBe(true)
    })

    it('debe retornar false cuando no hay token', () => {
      expect(authService.isAuthenticated()).toBe(false)
    })
  })
})
