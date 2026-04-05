import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import App from './App'

describe('App', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('renders login page when not authenticated', () => {
    render(<App />)
    expect(screen.getByRole('heading', { name: /foodtech login/i })).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/tu@email.com/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /iniciar sesión/i })).toBeInTheDocument()
  })

  it('renders navigation when authenticated', () => {
    localStorage.setItem('auth_token', 'test-token')
    localStorage.setItem('auth_role', 'MESERO')
    window.history.pushState({}, '', '/mesero')
    render(<App />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
