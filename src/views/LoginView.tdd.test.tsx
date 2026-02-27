import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { LoginView } from './LoginView'
import { BrowserRouter } from 'react-router-dom'

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    login: vi.fn(),
    register: vi.fn(),
    isLoading: false,
    error: null,
    isAuthenticated: false,
  })),
}))

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('LoginView TDD - Test 1: Render', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('debe renderizar el formulario de login - GREEN', () => {
    renderWithRouter(<LoginView />)
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument()
  })

  it('debe mostrar el titulo FoodTech Login', () => {
    renderWithRouter(<LoginView />)
    expect(screen.getByText('FoodTech Login')).toBeInTheDocument()
  })

  it('debe mostrar enlace para registrarse', () => {
    renderWithRouter(<LoginView />)
    expect(screen.getByRole('button', { name: /Regístrate/i })).toBeInTheDocument()
  })
})
