import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
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

describe('LoginView TDD - Test 2: Cambio modo', () => {
  beforeEach(() => { vi.clearAllMocks() })

  it('debe cambiar a modo registro al hacer click - RED', () => {
    renderWithRouter(<LoginView />)
    fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))
    expect(screen.getByText('FoodTech Registro')).toBeInTheDocument()
  })
})
