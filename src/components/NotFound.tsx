import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROLE_HOME_ROUTES } from '../models/UserRole'

export function NotFound() {
  const navigate = useNavigate()
  const { role } = useAuth()

  const handleBack = () => {
    if (role) {
      navigate(ROLE_HOME_ROUTES[role])
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight">
      <div className="text-center space-y-6">
        <span className="material-symbols-outlined text-8xl text-primary">search_off</span>
        <div>
          <h1 className="text-4xl font-bold text-white-text mb-2">404</h1>
          <p className="text-xl text-silver-text">Página no encontrada</p>
        </div>
        <button
          data-testid="not-found-back-btn"
          type="button"
          onClick={handleBack}
          className="px-8 py-3 rounded-xl gold-gradient text-midnight font-semibold hover:opacity-90 transition-all"
        >
          Regresar
        </button>
      </div>
    </div>
  )
}
