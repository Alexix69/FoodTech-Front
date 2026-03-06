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

  it('debe hacer registro exitoso', async () => {
    global.fetch = vi.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve({ message: 'Usuario registrado' })
    })

    const { authService } = await import('../../services/authService')
    const result = await authService.register('test@email.com', 'newuser', 'password123')

    expect(result).toBe(true)
  })
})
