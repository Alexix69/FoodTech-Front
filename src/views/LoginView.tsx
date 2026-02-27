import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const LoginView = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password, false)
  }

  // toggleMode sin funcionalidad para RED
  const toggleMode = () => {}

  return (
    <div>
      <h1>{isRegisterMode ? 'FoodTech Registro' : 'FoodTech Login'}</h1>
      <form onSubmit={handleSubmit}>
        <button type="submit">
          {isRegisterMode ? 'Registrarse' : 'Iniciar sesión'}
        </button>
      </form>
      <button type="button" onClick={toggleMode}>
        {isRegisterMode ? '¿Ya tienes cuenta? Iniciar sesión' : '¿No tienes cuenta? Regístrate'}
      </button>
    </div>
  )
}
