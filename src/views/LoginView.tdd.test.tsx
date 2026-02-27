import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

const renderWithRouter = (ui: React.ReactElement) => render(<BrowserRouter>{ui}</BrowserRouter>)

describe('LoginView TDD', () => {
  it('debe renderizar el formulario de login - RED', async () => {
    const { LoginView } = await import('./LoginView')
    renderWithRouter(<LoginView />)
    expect(screen.getByRole('button', { name: /Iniciar sesión/i })).toBeInTheDocument()
  })
})
