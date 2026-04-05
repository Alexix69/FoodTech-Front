import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { UserRole } from '../models/UserRole'
import { RoleSelect } from '../components/RoleSelect'
import { fieldErrorFor, generalError } from '../helpers/fieldError'

export const LoginView = () => {
  const [email, setEmail] = useState('')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [demoMode, setDemoMode] = useState(false)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [selectedRole, setSelectedRole] = useState<UserRole | ''>('')
  const [roleError, setRoleError] = useState('')

  const [searchParams] = useSearchParams()
  const stepRole = searchParams.get('step') === 'role'
  const userIdParam = searchParams.get('userId')

  const { login, register, assignRole, isLoading, error, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (stepRole) {
      setIsRegisterMode(true)
    }
  }, [stepRole])

  useEffect(() => {
    if (isAuthenticated && !stepRole) {
      navigate('/login')
    }
  }, [isAuthenticated, navigate, stepRole])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (demoMode) {
      localStorage.setItem('auth_token', 'demo-token-12345')
      navigate('/mesero')
      return
    }

    if (stepRole) {
      if (!selectedRole) {
        setRoleError('Debe seleccionar un rol para continuar')
        return
      }
      setRoleError('')
      await assignRole(Number(userIdParam), selectedRole)
      return
    }

    if (isRegisterMode) {
      if (!selectedRole) {
        setRoleError('Debe seleccionar un rol para continuar')
        return
      }
      setRoleError('')
      await register(email, username, password, selectedRole)
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
    setSelectedRole('')
    setRoleError('')
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight">
      <div className="w-full max-w-md bg-charcoal border border-white/5 rounded-2xl p-10 shadow-2xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white-text">
            {stepRole ? 'Selecciona tu Rol' : isRegisterMode ? 'FoodTech Registro' : 'FoodTech Login'}
          </h1>
          <p className="text-silver-text text-sm mt-2">
            {stepRole ? 'Asigna un rol para continuar' : isRegisterMode ? 'Crea tu cuenta en el sistema' : 'Accede al sistema de cocina'}
          </p>
        </div>

        <form data-testid="login-form" onSubmit={handleSubmit} className="space-y-6">
          {!stepRole && (
            <div>
              <label className="block text-sm text-silver-text mb-2">
                {!isRegisterMode ? 'Email / Username' : 'Email'}
              </label>
              <input
                data-testid="email-input"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required={!demoMode}
                disabled={demoMode}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-40"
                placeholder="tu@email.com"
              />
              {fieldErrorFor(error, 'email') && (
                <p data-testid="field-error-email" className="text-red-400 text-sm mt-1">{fieldErrorFor(error, 'email')}</p>
              )}
            </div>
          )}

          {isRegisterMode && !stepRole && (
            <div>
              <label className="block text-sm text-silver-text mb-2">Username</label>
              <input
                data-testid="username-input"
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required={isRegisterMode && !demoMode}
                disabled={demoMode}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-40"
                placeholder="tu usuario"
              />
              {fieldErrorFor(error, 'username') && (
                <p data-testid="field-error-username" className="text-red-400 text-sm mt-1">{fieldErrorFor(error, 'username')}</p>
              )}
            </div>
          )}

          {!isRegisterMode && !stepRole && (
            <div>
              <label className="block text-sm text-silver-text mb-2">Contraseña</label>
              <input
                data-testid="password-input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={!demoMode}
                disabled={demoMode}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-40"
                placeholder="••••••••"
              />
              {fieldErrorFor(error, 'password') && (
                <p data-testid="field-error-password" className="text-red-400 text-sm mt-1">{fieldErrorFor(error, 'password')}</p>
              )}
            </div>
          )}

          {isRegisterMode && !stepRole && (
            <div>
              <label className="block text-sm text-silver-text mb-2">Contraseña</label>
              <input
                data-testid="password-input"
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required={isRegisterMode && !demoMode}
                disabled={demoMode}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white-text focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent disabled:opacity-40"
                placeholder="••••••••"
              />
              {fieldErrorFor(error, 'password') && (
                <p data-testid="field-error-password" className="text-red-400 text-sm mt-1">{fieldErrorFor(error, 'password')}</p>
              )}
            </div>
          )}

          {(isRegisterMode || stepRole) && (
            <div>
              <label className="block text-sm text-silver-text mb-2">Rol</label>
              <RoleSelect
                id="role"
                value={selectedRole}
                onChange={(val) => {
                  setSelectedRole(val as UserRole)
                  setRoleError('')
                }}
              />
              {roleError && (
                <p data-testid="role-error" className="text-red-400 text-sm mt-1">{roleError}</p>
              )}
              {fieldErrorFor(error, 'role') && (
                <p data-testid="field-error-role" className="text-red-400 text-sm mt-1">{fieldErrorFor(error, 'role')}</p>
              )}
            </div>
          )}

          {generalError(error) && (
            <div data-testid="error-message" className="text-red-400 text-sm text-center">
              {generalError(error)}
            </div>
          )}

          {!isRegisterMode && !demoMode && !stepRole && (
            <div className="flex items-center gap-3">
              <input
                data-testid="remember-me-checkbox"
                type="checkbox"
                id="rememberMe"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 accent-primary"
              />
              <label htmlFor="rememberMe" className="text-sm text-silver-text">Recordarme</label>
            </div>
          )}

          {!stepRole && (
            <div className="flex items-center gap-3">
              <input
                data-testid="demo-mode-checkbox"
                type="checkbox"
                id="demoMode"
                checked={demoMode}
                onChange={(e) => {
                  setDemoMode(e.target.checked)
                  if (e.target.checked) setRememberMe(false)
                }}
                className="h-4 w-4 accent-primary"
              />
              <label htmlFor="demoMode" className="text-sm text-silver-text">Modo Demo(sin API)</label>
            </div>
          )}

          <button
            data-testid="submit-btn"
            type="submit"
            disabled={isLoading}
            className="w-full py-3 rounded-xl bg-primary text-black font-semibold hover:opacity-90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading
              ? (isRegisterMode ? 'Registrando...' : stepRole ? 'Actualizando...' : 'Iniciando sesión...')
              : (stepRole ? 'Actualizar' : isRegisterMode ? 'Registrarse' : 'Iniciar sesión')}
          </button>

          {!stepRole && (
            <div className="text-center">
              <button
                data-testid="toggle-mode-btn"
                type="button"
                onClick={toggleMode}
                className="text-sm text-primary hover:underline"
              >
                {isRegisterMode ? '¿Ya tienes cuenta? Iniciar sesión' : '¿No tienes cuenta? Regístrate'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

