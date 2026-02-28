import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const LoginView = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [demoMode, setDemoMode] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)

  const { login, register, isLoading } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (demoMode) {
      localStorage.setItem('auth_token', 'demo-token-12345')
      navigate('/mesero')
      return
    }
    if (isRegisterMode) {
      await register(email, username, password)
    } else {
      await login(email, password, rememberMe)
    }
  }

  const toggleMode = () => {
    setIsRegisterMode(!isRegisterMode)
    setEmail('')
    setUsername('')
    setPassword('')
    setRememberMe(false)
  }

  return (
    <div>
      <h1>{isRegisterMode ? 'FoodTech Registro' : 'FoodTech Login'}</h1>
      <form onSubmit={handleSubmit}>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        
        {isRegisterMode && (
          <input id="username" type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        )}
        
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        
        {!isRegisterMode && !demoMode && (
          <input id="rememberMe" type="checkbox" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
        )}
        
        <input id="demoMode" type="checkbox" checked={demoMode} onChange={(e) => {
          setDemoMode(e.target.checked)
          if (e.target.checked) setRememberMe(false)
        }} />
        
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
