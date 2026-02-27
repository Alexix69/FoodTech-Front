import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginView } from './LoginView'
import { BrowserRouter } from 'react-router-dom'

const mockLogin = vi.fn()
const mockRegister = vi.fn()

vi.mock('../hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    login: mockLogin,
    register: mockRegister,
    isLoading: false,
    error: null,
    isAuthenticated: false,
  })),
}))

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('LoginView TDD', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    mockLogin.mockResolvedValue(undefined)
    mockRegister.mockResolvedValue(undefined)
  })

  // ============================================
  // GRUPO 1: RENDER (3 tests)
  // ============================================
  describe('Render', () => {
    it('debe renderizar el formulario de login', () => {
      renderWithRouter(<LoginView />)
      expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument()
    })

    it('debe mostrar el titulo de FoodTech Login', () => {
      renderWithRouter(<LoginView />)
      expect(screen.getByText('FoodTech Login')).toBeInTheDocument()
    })

    it('debe mostrar el enlace para registrarse', () => {
      renderWithRouter(<LoginView />)
      expect(screen.getByRole('button', { name: /Regístrate/i })).toBeInTheDocument()
    })
  })

  // ============================================
  // GRUPO 2: CAMBIO DE MODO (3 tests)
  // ============================================
  describe('Cambio de modo', () => {
    it('debe cambiar a modo registro al hacer click en el toggle', () => {
      renderWithRouter(<LoginView />)
      const toggleButton = screen.getByRole('button', { name: /Regístrate/i })
      fireEvent.click(toggleButton)
      expect(screen.getByText('FoodTech Registro')).toBeInTheDocument()
      expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument()
    })

    it('debe volver a modo login al hacer click en toggle desde registro', () => {
      renderWithRouter(<LoginView />)
      const toggleToRegister = screen.getByRole('button', { name: /Regístrate/i })
      fireEvent.click(toggleToRegister)
      const toggleToLogin = screen.getByRole('button', { name: /Iniciar sesión/i })
      fireEvent.click(toggleToLogin)
      expect(screen.getByText('FoodTech Login')).toBeInTheDocument()
    })

    it('debe limpiar campos al cambiar de modo', () => {
      renderWithRouter(<LoginView />)
      const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      const toggleButton = screen.getByRole('button', { name: /Regístrate/i })
      fireEvent.click(toggleButton)
      expect(emailInput.value).toBe('')
    })
  })

  // ============================================
  // GRUPO 3: FORMULARIO (3 tests)
  // ============================================
  describe('Formulario', () => {
    it('debe actualizar el email al escribir', () => {
      renderWithRouter(<LoginView />)
      const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      expect(emailInput.value).toBe('test@email.com')
    })

    it('debe actualizar la contrasena al escribir', () => {
      renderWithRouter(<LoginView />)
      const passwordInput = document.querySelector('input[id="password"]') as HTMLInputElement
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      expect(passwordInput.value).toBe('password123')
    })

    it('debe mostrar username en modo registro', () => {
      renderWithRouter(<LoginView />)
      const toggleButton = screen.getByRole('button', { name: /Regístrate/i })
      fireEvent.click(toggleButton)
      expect(document.querySelector('input[id="username"]')).toBeInTheDocument()
    })
  })

  // ============================================
  // GRUPO 4: SUBMIT (4 tests)
  // ============================================
  describe('Submit del formulario', () => {
    it('debe llamar login al hacer submit en modo login', async () => {
      renderWithRouter(<LoginView />)
      const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      const passwordInput = document.querySelector('input[id="password"]') as HTMLInputElement
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i })
      fireEvent.submit(submitButton)
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@email.com', 'password123', false)
      })
    })

    it('debe llamar login con rememberMe al hacer submit con checkbox marcado', async () => {
      renderWithRouter(<LoginView />)
      const rememberMeCheckbox = document.querySelector('input[id="rememberMe"]') as HTMLInputElement
      fireEvent.click(rememberMeCheckbox)
      const passwordInput = document.querySelector('input[id="password"]') as HTMLInputElement
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i })
      fireEvent.submit(submitButton)
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('', 'password123', true)
      })
    })

    it('debe llamar register al hacer submit en modo registro', async () => {
      renderWithRouter(<LoginView />)
      const toggleButton = screen.getByRole('button', { name: /Regístrate/i })
      fireEvent.click(toggleButton)
      const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      const usernameInput = document.querySelector('input[id="username"]') as HTMLInputElement
      fireEvent.change(usernameInput, { target: { value: 'testuser' } })
      const passwordInput = document.querySelector('input[id="password"]') as HTMLInputElement
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      const submitButton = screen.getByRole('button', { name: /Registrarse/i })
      fireEvent.submit(submitButton)
      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith('test@email.com', 'testuser', 'password123')
      })
    })

    it('debe usar demo token al hacer submit en modo demo', async () => {
      renderWithRouter(<LoginView />)
      const demoCheckbox = document.querySelector('input[id="demoMode"]') as HTMLInputElement
      fireEvent.click(demoCheckbox)
      const submitButton = screen.getByRole('button', { name: /Iniciar sesión/i })
      fireEvent.submit(submitButton)
      await waitFor(() => {
        expect(localStorage.getItem('auth_token')).toBe('demo-token-12345')
      })
    })
  })

  // ============================================
  // GRUPO 5: BOTON (2 tests)
  // ============================================
  describe('Boton de submit', () => {
    it('debe mostrar Iniciar sesion cuando no esta cargando', () => {
      renderWithRouter(<LoginView />)
      expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument()
    })

    it('debe mostrar Registrarse en modo registro', () => {
      renderWithRouter(<LoginView />)
      const toggleButton = screen.getByRole('button', { name: /Regístrate/i })
      fireEvent.click(toggleButton)
      expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument()
    })
  })
})
