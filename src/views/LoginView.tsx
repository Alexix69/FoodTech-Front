import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'

export const LoginView = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { login, isLoading } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await login(email, password, false)
  }

  return (
    <form onSubmit={handleSubmit}>
      <button type="submit">Iniciar sesión</button>
    </form>
  )
}
