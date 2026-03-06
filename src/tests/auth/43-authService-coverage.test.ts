import { describe, it, expect, vi, beforeEach } from 'vitest'

declare global {
  interface Global {
    fetch: ReturnType<typeof vi.fn>
  }
  var global: Global
}

describe('authService - coverage extra', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('debe manejar error con status diferente a 401', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: false,
      status: 500
    })

    const { authService } = await import('../../services/authService')
    await expect(
      authService.login('test@email.com', 'password')
    ).rejects.toThrow('Error: 500')
  })

  it('debe manejar error desconocido en login', async () => {
    global.fetch = vi.fn().mockRejectedValue('string error')

    const { authService } = await import('../../services/authService')
    await expect(
      authService.login('test@email.com', 'password')
    ).rejects.toThrow('Error desconocido')
  })

  it('debe manejar error desconocido en register', async () => {
    global.fetch = vi.fn().mockRejectedValue('string error')

    const { authService } = await import('../../services/authService')
    await expect(
      authService.register('test@email.com', 'user', 'password')
    ).rejects.toThrow('Error desconocido')
  })
})
