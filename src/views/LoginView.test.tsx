import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginView } from '../views/LoginView'
import { BrowserRouter, MemoryRouter } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const mockLogin = vi.fn()
const mockRegister = vi.fn()
const mockAssignRole = vi.fn()

const createMockUseAuth = (overrides = {}) => ({
  login: mockLogin,
  register: mockRegister,
  assignRole: mockAssignRole,
  isLoading: false,
  error: null,
  isAuthenticated: false,
  role: null,
  token: null,
  logout: vi.fn(),
  ...overrides,
})

vi.mock('../hooks/useAuth')

const renderWithRouter = (ui: React.ReactElement) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>)
}

describe('LoginView', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
    mockLogin.mockResolvedValue(undefined)
    mockRegister.mockResolvedValue(undefined)
    vi.mocked(useAuth).mockImplementation(() => createMockUseAuth())
  })

  describe('Render', () => {
    it('debe renderizar el formulario de login', () => {
      renderWithRouter(<LoginView />)
      
      expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument()
    })

    it('debe mostrar el título de FoodTech Login', () => {
      renderWithRouter(<LoginView />)
      
      expect(screen.getByText('FoodTech Login')).toBeInTheDocument()
    })

    it('debe mostrar el enlace para registrarse', () => {
      renderWithRouter(<LoginView />)
      
      expect(screen.getByRole('button', { name: /Regístrate/i })).toBeInTheDocument()
    })
  })

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

  describe('Formulario', () => {
    it('debe actualizar el email al escribir', () => {
      renderWithRouter(<LoginView />)
      
      const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      
      expect(emailInput.value).toBe('test@email.com')
    })

    it('debe actualizar la contraseña al escribir', () => {
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

  describe('Submit del formulario', () => {
    it('debe llamar login al hacer submit en modo login', async () => {
      renderWithRouter(<LoginView />)
      
      const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      
      const passwordInput = document.querySelector('input[id="password"]') as HTMLInputElement
      fireEvent.change(passwordInput, { target: { value: 'password123' } })
      
      const form = document.querySelector('form') as HTMLFormElement
      fireEvent.submit(form)
      
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
      
      const form = document.querySelector('form') as HTMLFormElement
      fireEvent.submit(form)
      
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

      const roleSelect = document.querySelector('select[id="role"]') as HTMLSelectElement
      fireEvent.change(roleSelect, { target: { value: 'MESERO' } })
      
      const form = document.querySelector('form') as HTMLFormElement
      fireEvent.submit(form)
      
      await waitFor(() => {
        expect(mockRegister).toHaveBeenCalledWith('test@email.com', 'testuser', 'password123', 'MESERO')
      })
    })

    it('debe usar demo token al hacer submit en modo demo', async () => {
      renderWithRouter(<LoginView />)
      
      const demoCheckbox = document.querySelector('input[id="demoMode"]') as HTMLInputElement
      fireEvent.click(demoCheckbox)
      
      const form = document.querySelector('form') as HTMLFormElement
      fireEvent.submit(form)
      
      await waitFor(() => {
        expect(localStorage.getItem('auth_token')).toBe('demo-token-12345')
      })
    })
  })

  describe('Botón de submit', () => {
    it('debe mostrar "Iniciar sesión" cuando no está cargando', () => {
      renderWithRouter(<LoginView />)
      
      expect(screen.getByText('Iniciar sesión')).toBeInTheDocument()
    })

    it('debe mostrar "Registrarse" en modo registro', () => {
      renderWithRouter(<LoginView />)
      
      const toggleButton = screen.getByRole('button', { name: /Regístrate/i })
      fireEvent.click(toggleButton)
      
      expect(screen.getByText('Registrarse')).toBeInTheDocument()
    })
  })

  describe('Error display', () => {
    it('debe mostrar mensaje de error cuando hay error', () => {
      vi.mocked(useAuth).mockImplementation(() => createMockUseAuth({ error: 'Credenciales inválidas' }))

      renderWithRouter(<LoginView />)
      
      expect(screen.getByText('Credenciales inválidas')).toBeInTheDocument()
    })
  })

  describe('Loading state', () => {
    it('debe mostrar "Iniciando sesión..." cuando está cargando', () => {
      vi.mocked(useAuth).mockImplementation(() => createMockUseAuth({ isLoading: true }))

      renderWithRouter(<LoginView />)
      
      expect(screen.getByText('Iniciando sesión...')).toBeInTheDocument()
    })
  })

  describe('Role dropdown in register mode', () => {
    it('debe mostrar select de rol en modo registro', () => {
      renderWithRouter(<LoginView />)
      fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))

      expect(document.querySelector('select#role')).toBeInTheDocument()
    })

    it('el select de rol no tiene valor seleccionado por defecto', () => {
      renderWithRouter(<LoginView />)
      fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))

      const select = document.querySelector('select#role') as HTMLSelectElement
      expect(select.value).toBe('')
    })

    it('muestra error "Debe seleccionar un rol para continuar" al submit sin rol', async () => {
      renderWithRouter(<LoginView />)
      fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))

      const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
      fireEvent.change(emailInput, { target: { value: 'test@email.com' } })
      const usernameInput = document.querySelector('input[id="username"]') as HTMLInputElement
      fireEvent.change(usernameInput, { target: { value: 'testuser' } })
      const passwordInput = document.querySelector('input[id="password"]') as HTMLInputElement
      fireEvent.change(passwordInput, { target: { value: 'password123' } })

      const form = document.querySelector('form') as HTMLFormElement
      fireEvent.submit(form)

      await waitFor(() => {
        expect(screen.getByText('Debe seleccionar un rol para continuar')).toBeInTheDocument()
      })
    })

    it('en modo ?step=role muestra campos readonly y botón Actualizar', () => {
      render(
        <MemoryRouter initialEntries={['/registro?userId=5&step=role']}>
          <LoginView />
        </MemoryRouter>
      )

      expect(screen.getByRole('button', { name: /Actualizar/i })).toBeInTheDocument()
      expect(document.querySelector('input[id="password"]')).not.toBeInTheDocument()
    })

    it('en modo ?step=role no muestra campo password', () => {
      render(
        <MemoryRouter initialEntries={['/registro?userId=5&step=role']}>
          <LoginView />
        </MemoryRouter>
      )

      expect(document.querySelector('input[id="password"]')).not.toBeInTheDocument()
    })
  })
})
