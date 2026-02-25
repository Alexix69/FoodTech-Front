import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const LoginView = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [demoMode, setDemoMode] = useState(false)

  const { login, isLoading, error, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/mesero')
    }
  }, [isAuthenticated, navigate])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (demoMode) {
      localStorage.setItem('auth_token', 'demo-token-12345')
      navigate('/mesero')
      return
    }

    await login(email, password)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight">
      
      <div className="w-full max-w-md bg-charcoal border border-white/5 rounded-2xl p-10 shadow-2xl">
        
        {/* Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white-text">
            FoodTech Login
          </h1>
          <p className="text-silver-text text-sm mt-2">
            Accede al sistema de cocina
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Email */}
          <div>
            <label className="block text-sm text-silver-text mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required={!demoMode}
              disabled={demoMode}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white-text 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         disabled:opacity-40"
              placeholder="tu@email.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm text-silver-text mb-2">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required={!demoMode}
              disabled={demoMode}
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white-text 
                         focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent
                         disabled:opacity-40"
              placeholder="••••••••"
            />
          </div>

          {/* Error */}
          {error && (
            <div className="text-red-400 text-sm text-center">
              {error}
            </div>
          )}

          {/* Demo mode */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              checked={demoMode}
              onChange={(e) => setDemoMode(e.target.checked)}
              className="h-4 w-4 accent-primary"
            />
            <span className="text-sm text-silver-text">
              Modo Demo (sin API)
            </span>
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-primary text-black font-semibold
                       hover:opacity-90 transition-all duration-200
                       disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Iniciando sesión...' : 'Iniciar sesión'}
          </button>
        </form>
      </div>
    </div>
  )
}