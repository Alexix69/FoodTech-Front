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

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('LoginView TDD', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    mockLogin.mockResolvedValue(undefined)
    mockRegister.mockResolvedValue(undefined)
  })

  // TEST 1: RENDER (3 tests)
  describe('Test 1: Render', () => {
    it('debe renderizar el formulario de login', () => {
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

  // TEST 2: CAMBIO MODO (3 tests)
  describe('Test 2: Cambio modo', () => {
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

  // TEST 3: FORMULARIO (3 tests)
  describe('Test 3: Formulario', () => {
    it('debe actualizar el email', () => {
      renderWithRouter(<LoginView />)
      const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      expect(emailInput.value).toBe('test@email.com')
    })
    it('debe actualizar la contrasena', () => {
      renderWithRouter(<LoginView />)
      const passwordInput = document.querySelector('input[id="password"]') as HTMLInputElement
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      expect(passwordInput.value).toBe('password123')
    })
    it('debe mostrar username en modo registro', () => {
      renderWithRouter(<LoginView />)
      fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))
      expect(document.querySelector('input[id="username"]')).toBeInTheDocument()
    })
  })

  // TEST 4: SUBMIT (4 tests)
  describe('Test 4: Submit', () => {
    it('debe llamar login al hacer submit', async () => {
      renderWithRouter(<LoginView />)
      fireEvent.change(document.querySelector('input[id="email"]') as HTMLInputElement, { target: { value: 'test@email.com' } })
      fireEvent.change(document.querySelector('input[id="password"]') as HTMLInputElement, { target: { value: 'password123' } })
      fireEvent.submit(screen.getByRole('button', { name: /Iniciar sesión/i }))
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('test@email.com', 'password123', false)
      })
    })
    it('debe llamar login con rememberMe', async () => {
      renderWithRouter(<LoginView />)
      fireEvent.click(document.querySelector('input[id="rememberMe"]') as HTMLInputElement)
      fireEvent.change(document.querySelector('input[id="password"]') as HTMLInputElement, { target: { value: 'password123' } })
      fireEvent.submit(screen.getByRole('button', { name: /Iniciar sesión/i }))
      await waitFor(() => {
        expect(mockLogin).toHaveBeenCalledWith('', 'password123', true)
      })
    })
    it('debe llamar register al hacer submit en modo registro', async () => {
      renderWithRouter(<LoginView />)
      fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))
      fireEvent.change(document.querySelector('input[id="email"]') as HTMLInputElement, { target: { value: 'test@email.com' } })
      fireEvent.change(document.querySelector('input[id="username"]') as HTMLInputElement, { target: { value: 'testuser' } })
      fireEvent.change(document.querySelector('input[id="password"]') as HTMLInputElement, { target: { value: 'password123' } })
      fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }))
      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith('test@email.com', 'testuser', 'password123')
      })
    })
    it('debe usar demo token al hacer submit en modo demo', async () => {
      renderWithRouter(<LoginView />)
      fireEvent.click(document.querySelector('input[id="demoMode"]') as HTMLInputElement)
      fireEvent.submit(screen.getByRole('button', { name: /Iniciar sesión/i }))
      await waitFor(() => {
        expect(localStorage.getItem('auth_token')).toBe('demo-token-12345')
      })
    })
  })

  // TEST 5: BOTON (2 tests)
  describe('Test 5: Boton', () => {
    it('debe mostrar Iniciar sesion cuando no esta cargando', () => {
      renderWithRouter(<LoginView />)
      expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument()
    })
    it('debe mostrar Registrarse en modo registro', () => {
      renderWithRouter(<LoginView />)
      fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))
      expect(screen.getByRole('button', { name: /Registrarse/i })).toBeInTheDocument()
    })
  })
})
