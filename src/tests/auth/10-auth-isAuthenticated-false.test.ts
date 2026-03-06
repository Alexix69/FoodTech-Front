import { describe, it, expect, vi, beforeEach } from 'vitest'

describe('authService', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.restoreAllMocks()
  })

  it('debe retornar false cuando no hay token', async () => {
    const { authService } = await import('../../services/authService')
    expect(authService.isAuthenticated()).toBe(false)
  })
})
