import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export const LogoutButton = () => {
  const { logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-sm
                 text-silver-text hover:text-red-400 hover:bg-white/5 
                 transition-all duration-200"
    >
      <span className="material-symbols-outlined text-lg">logout</span>
      <span className="hidden md:inline">Cerrar sesión</span>
    </button>
  )
}
