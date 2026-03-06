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

describe('useAuth', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
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
})
