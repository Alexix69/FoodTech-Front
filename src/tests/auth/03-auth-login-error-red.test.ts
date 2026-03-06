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

  it('debe lanzar error cuando hay error de red', async () => {
    global.fetch = vi.fn().mockRejectedValue(new TypeError('Failed to fetch'))

    const { authService } = await import('../../services/authService')

    await expect(
      authService.login('test@email.com', 'password')
    ).rejects.toThrow('Error de conexión')
  })
})
