import { describe, it, expect, vi, beforeEach } from 'vitest'

declare global {
  interface Global {
    fetch: ReturnType<typeof vi.fn>
  }
  var global: Global
}

describe('VERIFICAR: Arquitectura - Llamada a puerto API', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('VERIFICAR: Login hace fetch al endpoint correcto', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ token: 'mock-token' })
    })
    global.fetch = mockFetch

    const { authService } = await import('../../services/authService')
    await authService.login('test@restaurant.com', 'password123')

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/login'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' }
      })
    )
  })

  it('VERIFICAR: Register hace fetch al endpoint correcto', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'ok' })
    })
    global.fetch = mockFetch

    const { authService } = await import('../../services/authService')
    await authService.register('test@email.com', 'username', 'password')

    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('/api/auth/register'),
      expect.objectContaining({
        method: 'POST'
      })
    )
  })
})
