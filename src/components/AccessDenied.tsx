import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { ROLE_HOME_ROUTES } from '../models/UserRole'

export function AccessDenied() {
  const { role } = useAuth()
  const navigate = useNavigate()

  const handleRegresar = () => {
    if (role && ROLE_HOME_ROUTES[role]) {
      navigate(ROLE_HOME_ROUTES[role])
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-midnight">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white-text mb-4">Acceso Denegado</h1>
        <p className="text-silver-text mb-8">No tienes permiso para acceder a esta sección.</p>
        <button
          data-testid="regresar-btn"
          onClick={handleRegresar}
          className="px-6 py-3 gold-gradient text-midnight font-semibold rounded-xl hover:opacity-90 transition-all"
        >
          Regresar
        </button>
      </div>
    </div>
  )
}
