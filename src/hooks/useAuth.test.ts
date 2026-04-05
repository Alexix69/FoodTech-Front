import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from './useAuth'
import { UserRole, ROLE_HOME_ROUTES } from '../models/UserRole'

declare global {
  interface Global {
    fetch: ReturnType<typeof vi.fn>
  }
  var global: Global
}

const mockNavigate = vi.fn()

vi.mock('react-router-dom', () => ({
  useNavigate: () => mockNavigate,
}))

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
    mockNavigate.mockReset()
  })

  describe('initial state', () => {
    it('debe iniciar con isAuthenticated false cuando no hay token', () => {
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.token).toBeNull()
      expect(result.current.isLoading).toBe(false)
    })

    it('debe iniciar con isAuthenticated true cuando hay token', () => {
      localStorage.setItem('auth_token', 'existing-token')
      
      const { result } = renderHook(() => useAuth())
      
      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.token).toBe('existing-token')
    })
  })

  describe('login', () => {
    it('debe hacer login exitosamente y crear sesión', async () => {
      const mockToken = 'jwt-token-abc123'
      
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ token: mockToken })
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login('test@restaurant.com', 'password123')
      })

      expect(result.current.isAuthenticated).toBe(true)
      expect(result.current.token).toBe(mockToken)
      expect(result.current.error).toBeNull()
    })

    it('debe manejar error de login SIN crear sesión', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 401
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login('wrong@email.com', 'wrongpass')
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.error).toBe('Credenciales inválidas')
      expect(result.current.token).toBeNull()
      expect(localStorage.getItem('auth_token')).toBeNull()
    })

    it('debe manejar estado de loading durante login', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ token: 'token' })
      })

      const { result } = renderHook(() => useAuth())

      expect(result.current.isLoading).toBe(false)

      await act(async () => {
        await result.current.login('test@email.com', 'password')
      })

      expect(result.current.isLoading).toBe(false)
      expect(result.current.isAuthenticated).toBe(true)
    })
  })

  describe('logout', () => {
    it('debe hacer logout correctamente Y limpiar sesión', () => {
      localStorage.setItem('auth_token', 'token-to-remove')
      
      const { result } = renderHook(() => useAuth())
      
      act(() => {
        result.current.logout()
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.token).toBeNull()
      expect(localStorage.getItem('auth_token')).toBeNull()
    })
  })

  describe('register', () => {
    it('debe hacer registro exitosamente', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ message: 'Usuario registrado' })
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.register('test@email.com', 'newuser', 'password123')
      })

      expect(result.current.error).toBeNull()
    })

    it('debe manejar error de red durante registro', async () => {
      global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.register('test@email.com', 'existinguser', 'password123')
      })

      expect(result.current.isAuthenticated).toBe(false)
      expect(result.current.error).not.toBeNull()
      expect(result.current.token).toBeNull()
    })

    it('debe manejar estado de loading durante registro', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ message: 'ok' })
      })

      const { result } = renderHook(() => useAuth())

      expect(result.current.isLoading).toBe(false)

      await act(async () => {
        await result.current.register('test@email.com', 'testuser', 'password')
      })

      expect(result.current.isLoading).toBe(false)
    })
  })

  describe('role-based navigation', () => {
    it('debe establecer role en estado tras login exitoso', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ token: 'tok', role: UserRole.COCINERO })
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login('cocinero@test.com', 'password')
      })

      expect(result.current.role).toBe(UserRole.COCINERO)
    })

    it('debe navegar a /cocina tras login como COCINERO', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: true,
        json: () => Promise.resolve({ token: 'tok', role: UserRole.COCINERO })
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login('cocinero@test.com', 'password')
      })

      expect(mockNavigate).toHaveBeenCalledWith(ROLE_HOME_ROUTES[UserRole.COCINERO])
    })

    it('debe navegar a /registro?userId=5&step=role cuando login retorna ROLE_NOT_ASSIGNED', async () => {
      global.fetch = vi.fn().mockResolvedValue({
        ok: false,
        status: 403,
        json: () => Promise.resolve({ error: 'ROLE_NOT_ASSIGNED', userId: 5 })
      })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.login('user@test.com', 'password')
      })

      expect(mockNavigate).toHaveBeenCalledWith('/registro?userId=5&step=role')
    })

    it('debe limpiar role en estado tras logout', async () => {
      localStorage.setItem('auth_token', 'tok')
      localStorage.setItem('auth_role', UserRole.MESERO)

      const { result } = renderHook(() => useAuth())

      act(() => {
        result.current.logout()
      })

      expect(result.current.role).toBeNull()
    })

    it('debe navegar a ruta del rol tras registro exitoso', async () => {
      global.fetch = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ message: 'ok' })
        })
        .mockResolvedValueOnce({
          ok: true,
          json: () => Promise.resolve({ token: 'tok', role: UserRole.BARTENDER })
        })

      const { result } = renderHook(() => useAuth())

      await act(async () => {
        await result.current.register('b@test.com', 'bartender', 'password', UserRole.BARTENDER)
      })

      expect(mockNavigate).toHaveBeenCalledWith(ROLE_HOME_ROUTES[UserRole.BARTENDER])
    })
  })
})
