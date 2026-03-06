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
})
