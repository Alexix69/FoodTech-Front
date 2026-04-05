import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { ProtectedRoute } from './ProtectedRoute'
import { useAuth } from '../hooks/useAuth'
import { UserRole } from '../models/UserRole'

vi.mock('../hooks/useAuth')

vi.mock('./AccessDenied', () => ({
  AccessDenied: () => <div data-testid="access-denied">Acceso Denegado</div>,
}))

const renderInRouter = (ui: React.ReactElement, initialPath = '/') =>
  render(<MemoryRouter initialEntries={[initialPath]}>{ui}</MemoryRouter>)

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('redirige a /login cuando el usuario no está autenticado', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: false,
      isLoading: false,
      token: null,
      role: null,
      error: null,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      assignRole: vi.fn(),
    })

    renderInRouter(
      <ProtectedRoute allowedRoles={[UserRole.COCINERO]}>
        <div>Contenido</div>
      </ProtectedRoute>
    )

    expect(screen.queryByText('Contenido')).not.toBeInTheDocument()
  })

  it('renderiza AccessDenied cuando el usuario tiene un rol incorrecto', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      token: 'tok',
      role: UserRole.MESERO,
      error: null,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      assignRole: vi.fn(),
    })

    renderInRouter(
      <ProtectedRoute allowedRoles={[UserRole.COCINERO]}>
        <div>Contenido</div>
      </ProtectedRoute>
    )

    expect(screen.getByTestId('access-denied')).toBeInTheDocument()
    expect(screen.queryByText('Contenido')).not.toBeInTheDocument()
  })

  it('renderiza hijos cuando el usuario tiene el rol correcto', () => {
    vi.mocked(useAuth).mockReturnValue({
      isAuthenticated: true,
      isLoading: false,
      token: 'tok',
      role: UserRole.COCINERO,
      error: null,
      login: vi.fn(),
      register: vi.fn(),
      logout: vi.fn(),
      assignRole: vi.fn(),
    })

    renderInRouter(
      <ProtectedRoute allowedRoles={[UserRole.COCINERO]}>
        <div>Contenido</div>
      </ProtectedRoute>
    )

    expect(screen.getByText('Contenido')).toBeInTheDocument()
  })
})
