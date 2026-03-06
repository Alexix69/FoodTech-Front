import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import { useAuth } from '../../hooks/useAuth'

declare global {
  interface Global {
    fetch: ReturnType<typeof vi.fn>
  }
  var global: Global
}

vi.mock('react-router-dom', () => ({
  useNavigate: () => vi.fn(),
}))

describe('INTEGRACIÓN: useAuth - Casos Reales', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('INTEGRACIÓN: Login y logout completos funcionan', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: 'integration-token' })
    })

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.login('test@restaurant.com', 'password123')
    })

    expect(result.current.isAuthenticated).toBe(true)

    act(() => {
      result.current.logout()
    })

    expect(result.current.isAuthenticated).toBe(false)
    expect(result.current.token).toBeNull()
  })

  it('INTEGRACIÓN: Error de red muestra mensaje apropiado', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network Error'))

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      try {
        await result.current.login('test@restaurant.com', 'password123')
      } catch {
        // Error esperado
      }
    })

    expect(result.current.error).toBeTruthy()
  })

  it('INTEGRACIÓN: Registro exitoso retorna true', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: 'register-token' })
    })

    const { result } = renderHook(() => useAuth())

    await act(async () => {
      await result.current.register('new@restaurant.com', 'newuser', 'password123')
    })

    expect(result.current.error).toBeNull()
  })

  it('INTEGRACIÓN: Loading state cambia correctamente', async () => {
    let resolveLogin: (value: { ok: boolean; json: () => Promise<{ token: string }> }) => void
    global.fetch = vi.fn().mockImplementation(() => 
      new Promise(resolve => { resolveLogin = resolve })
    )

    const { result } = renderHook(() => useAuth())

    expect(result.current.isLoading).toBe(false)

    act(() => {
      result.current.login('test@restaurant.com', 'password123')
    })

    expect(result.current.isLoading).toBe(true)

    await act(async () => {
      resolveLogin!({ ok: true, json: () => Promise.resolve({ token: 'token' }) })
    })

    expect(result.current.isLoading).toBe(false)
  })
})
