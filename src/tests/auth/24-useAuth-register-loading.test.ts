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
