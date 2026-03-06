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

  it('debe lanzar error cuando credenciales son inválidas', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 401
    })

    const { authService } = await import('../../services/authService')

    await expect(
      authService.login('wrong@email.com', 'wrongpass')
    ).rejects.toThrow('Credenciales inválidas')
  })
})
