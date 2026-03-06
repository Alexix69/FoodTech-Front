import { describe, it, expect, vi, beforeEach } from 'vitest'

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

  it('debe hacer request con los datos correctos al endpoint register', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'ok' })
    })
    global.fetch = mockFetch

    const { authService } = await import('../../services/authService')
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
