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

  it('debe cambiar a modo registro', () => {
    renderWithRouter(<LoginView />)
    fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))
    expect(screen.getByText('FoodTech Registro')).toBeInTheDocument()
  })

  it('debe volver a modo login', () => {
    renderWithRouter(<LoginView />)
    fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))
    fireEvent.click(screen.getByRole('button', { name: /Iniciar sesión/i }))
    expect(screen.getByText('FoodTech Login')).toBeInTheDocument()
  })

  it('debe limpiar campos al cambiar', () => {
    renderWithRouter(<LoginView />)
    const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
    fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))
    expect(emailInput.value).toBe('')
  })
})
