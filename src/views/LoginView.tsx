import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const LoginView = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password, false)
  }

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode)
    setEmail('')
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h1>{isRegisterMode ? 'FoodTech Registro' : 'FoodTech Login'}</h1>
      <form onSubmit={handleSubmit}>
        <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        {isRegisterMode && (
          <input id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
        )}
        <input id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
