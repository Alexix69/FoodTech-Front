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
