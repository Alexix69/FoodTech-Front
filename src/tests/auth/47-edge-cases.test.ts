import { describe, it, expect, vi, beforeEach } from 'vitest'

declare global {
  interface Global {
    fetch: ReturnType<typeof vi.fn>
  }
  var global: Global
}

describe('EDGE CASES: authService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('EDGE: Login con email vacío debe fallar', async () => {
    const { authService } = await import('../../services/authService')
    await expect(
      authService.login('', 'password123')
    ).rejects.toThrow()
  })

  it('EDGE: Login con password vacío debe fallar', async () => {
    const { authService } = await import('../../services/authService')
    await expect(
      authService.login('test@restaurant.com', '')
    ).rejects.toThrow()
  })

  it('EDGE: Login con email inválido debe fallar', async () => {
    const { authService } = await import('../../services/authService')
    await expect(
      authService.login('no-es-email', 'password123')
    ).rejects.toThrow()
  })

  it('EDGE: getToken con sessionStorage vacío retorna null', async () => {
    const { authService } = await import('../../services/authService')
    expect(authService.getToken()).toBeNull()
  })

  it('EDGE: isAuthenticated con token vacío string vacío', async () => {
    localStorage.setItem('auth_token', '')
    const { authService } = await import('../../services/authService')
    expect(authService.getToken()).toBe('')
  })

  it('EDGE: Token con expiry en el futuro exactamente ahora es válido', async () => {
    const futureDate = Date.now() + 60000
    localStorage.setItem('auth_token', 'future-token')
    localStorage.setItem('auth_token_expiry', futureDate.toString())
    const { authService } = await import('../../services/authService')
    expect(authService.isAuthenticated()).toBe(true)
  })

  it('EDGE: Múltiples logout no rompen nada', async () => {
    const { authService } = await import('../../services/authService')
    authService.logout()
    authService.logout()
    authService.logout()
    expect(localStorage.getItem('auth_token')).toBeNull()
  })

  it('EDGE: Login dos veces seguidas sobrescribe token', async () => {
    global.fetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ token: 'token-1' })
      })
      .mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve({ token: 'token-2' })
      })

    const { authService } = await import('../../services/authService')
    await authService.login('user1@test.com', 'pass1')
    await authService.login('user2@test.com', 'pass2')

    expect(localStorage.getItem('auth_token')).toBe('token-2')
  })
})
