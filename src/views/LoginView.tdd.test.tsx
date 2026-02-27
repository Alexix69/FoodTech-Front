import { describe, it, expect, vi } from 'vitest'
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

describe('LoginView TDD - Test 1', () => {
  it('debe renderizar el formulario de login - RED', () => {
    renderWithRouter(<LoginView />)
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument()
  })
})
