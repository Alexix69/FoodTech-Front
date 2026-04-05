import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Navigation } from './Navigation'
import { useAuth } from '../hooks/useAuth'
import { UserRole } from '../models/UserRole'

vi.mock('../hooks/useAuth')

vi.mock('./LogoutButton', () => ({
  LogoutButton: () => <button>Logout</button>,
}))

const renderNav = () =>
  render(
    <MemoryRouter>
      <Navigation />
    </MemoryRouter>
  )

const mockAuth = (role: UserRole | null) => {
  vi.mocked(useAuth).mockReturnValue({
    isAuthenticated: role !== null,
    isLoading: false,
    token: role ? 'tok' : null,
    role,
    error: null,
    login: vi.fn(),
    register: vi.fn(),
    logout: vi.fn(),
    assignRole: vi.fn(),
  })
}

describe('Navigation', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('MESERO solo ve el enlace a /mesero', () => {
    mockAuth(UserRole.MESERO)
    renderNav()

    expect(screen.getByRole('link', { name: /mesero/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /cocina/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /barra/i })).not.toBeInTheDocument()
  })

  it('COCINERO solo ve el enlace a /cocina', () => {
    mockAuth(UserRole.COCINERO)
    renderNav()

    expect(screen.getByRole('link', { name: /cocina/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /mesero/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /barra/i })).not.toBeInTheDocument()
  })

  it('BARTENDER solo ve el enlace a /barra', () => {
    mockAuth(UserRole.BARTENDER)
    renderNav()

    expect(screen.getByRole('link', { name: /barra/i })).toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /mesero/i })).not.toBeInTheDocument()
    expect(screen.queryByRole('link', { name: /cocina/i })).not.toBeInTheDocument()
  })

  it('no hay enlaces cruzados para ningún rol', () => {
    mockAuth(UserRole.COCINERO)
    renderNav()

    const links = screen.queryAllByRole('link')
    const hrefs = links.map(l => l.getAttribute('href'))

    expect(hrefs).not.toContain('/mesero')
    expect(hrefs).not.toContain('/barra')
  })
})
