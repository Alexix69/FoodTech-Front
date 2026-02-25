import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from './useAuth'

declare global {
  interface Global {
    fetch: ReturnType<typeof vi.fn>
  }
  var global: Global
}

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  // ============================================
  // VERIFICAR: Estados iniciales correctos
  // ============================================
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

  // ============================================
  // VALIDAR: Reglas de negocio - Seguridad
  // ============================================
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

    // VALIDAR: Sesión creada correctamente
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

    // VALIDAR: Error no crea sesión - REGLA DE NEGOCIO: Seguridad
    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.error).toBe('Credenciales inválidas')
    expect(result.current.token).toBeNull()
    expect(localStorage.getItem('auth_token')).toBeNull()
  })

  it('debe hacer logout correctamente Y limpiar sesión', () => {
    localStorage.setItem('auth_token', 'token-to-remove')
    
    const { result } = renderHook(() => useAuth())
    
    act(() => {
      result.current.logout()
    })

    // VALIDAR: Logout limpia todo - REGLA DE NEGOCIO: Seguridad
    expect(result.current.isAuthenticated).toBe(false)
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
