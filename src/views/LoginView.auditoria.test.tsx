import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { LoginView } from './LoginView'
import { BrowserRouter } from 'react-router-dom'

// ============================================
// VERIFICAR: Test de Arquitectura
// ¿Qué verifica? Que se llame correctamente al hook useAuth (puerto)
// ============================================

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

// Este test VERIFICA que el componente llama correctamente al hook useAuth
describe('LoginView - VERIFICAR (Arquitectura)', () => {
  beforeEach(() => {
    mockLogin.mockResolvedValue(undefined)
    mockRegister.mockResolvedValue(undefined)
  })

  it('debe llamar login con los parametros correctos al hacer submit', async () => {
    render(
      <BrowserRouter>
        <LoginView />
      </BrowserRouter>
    )
    
    const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
    const passwordInput = document.querySelector('input[id="password"]') as HTMLInputElement
    
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.submit(screen.getByRole('button', { name: /Iniciar sesión/i }))
    
    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('test@test.com', 'password123', false)
    })
  })
})

// ============================================
// VALIDAR: Test de Negocio
// ¿Qué valida? Que el registro funcione correctamente (regla de negocio)
// ============================================

describe('LoginView - VALIDAR (Negocio)', () => {
  beforeEach(() => {
    mockLogin.mockResolvedValue(undefined)
    mockRegister.mockResolvedValue(undefined)
  })

  it('debe registrar usuario con datos correctos', async () => {
    render(
      <BrowserRouter>
        <LoginView />
      </BrowserRouter>
    )
    
    // Cambiar a modo registro
    fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))
    
    // Llenar formulario
    fireEvent.change(document.querySelector('input[id="email"]') as HTMLInputElement, { target: { value: 'usuario@test.com' } })
    fireEvent.change(document.querySelector('input[id="username"]') as HTMLInputElement, { target: { value: 'usuario1' } })
    fireEvent.change(document.querySelector('input[id="password"]') as HTMLInputElement, { target: { value: 'password123' } })
    
    // Submit
    fireEvent.submit(screen.getByRole('button', { name: /Registrarse/i }))
    
    await waitFor(() => {
      expect(mockRegister).toHaveBeenCalledWith('usuario@test.com', 'usuario1', 'password123')
    })
  })

  it('debe limpiar campos al cambiar de modo', () => {
    render(
      <BrowserRouter>
        <LoginView />
      </BrowserRouter>
    )
    
    // Escribir algo
    const emailInput = document.querySelector('input[id="email"]') as HTMLInputElement
    fireEvent.change(emailInput, { target: { value: 'test@test.com' } })
    
    // Cambiar modo
    fireEvent.click(screen.getByRole('button', { name: /Regístrate/i }))
    
    // VALIDAR: Campo debe estar vacío
    expect(emailInput.value).toBe('')
  })
})
