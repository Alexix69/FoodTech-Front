import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import { PublicRoute } from './PublicRoute'
import { useAuth } from '../hooks/useAuth'
import { UserRole } from '../models/UserRole'

vi.mock('../hooks/useAuth')

const renderWithRoutes = (initialPath: string) =>
  render(
    <MemoryRouter initialEntries={[initialPath]}>
      <Routes>
        <Route
          path="/login"
          element={
            <PublicRoute>
              <div>Formulario de Login</div>
            </PublicRoute>
          }
        />
        <Route
          path="/registro"
          element={
            <PublicRoute>
              <div>Formulario de Registro</div>
            </PublicRoute>
          }
        />
        <Route path="/mesero" element={<div>Vista Mesero</div>} />
        <Route path="/cocina" element={<div>Vista Cocina</div>} />
      </Routes>
    </MemoryRouter>
  )

describe('PublicRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renderiza el contenido cuando el usuario no está autenticado', () => {
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

    renderWithRoutes('/login')

    expect(screen.getByText('Formulario de Login')).toBeInTheDocument()
  })

  it('redirige a /mesero cuando un MESERO autenticado navega a /login', () => {
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

    renderWithRoutes('/login')

    expect(screen.queryByText('Formulario de Login')).not.toBeInTheDocument()
    expect(screen.getByText('Vista Mesero')).toBeInTheDocument()
  })

  it('redirige a /cocina cuando un COCINERO autenticado navega a /registro', () => {
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

    renderWithRoutes('/registro')

    expect(screen.queryByText('Formulario de Registro')).not.toBeInTheDocument()
    expect(screen.getByText('Vista Cocina')).toBeInTheDocument()
  })
})
