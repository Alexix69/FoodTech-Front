import { useState, useRef, useEffect } from 'react'
import { UserRole } from '../models/UserRole'

interface RoleSelectProps {
  id?: string
  value: string
  onChange: (value: string) => void
}

const ROLE_OPTIONS = [
  { value: UserRole.MESERO, label: 'Mesero' },
  { value: UserRole.COCINERO, label: 'Cocinero' },
  { value: UserRole.BARTENDER, label: 'Bartender' },
]

export function RoleSelect({ id, value, onChange }: RoleSelectProps) {
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const selectedLabel = ROLE_OPTIONS.find(o => o.value === value)?.label

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={containerRef} className="relative">
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="sr-only"
        tabIndex={-1}
        aria-hidden="true"
      >
        <option value="">Selecciona un rol</option>
        {ROLE_OPTIONS.map(o => (
          <option key={o.value} value={o.value}>{o.label}</option>
        ))}
      </select>

      <button
        type="button"
        data-testid="role-select-trigger"
        onClick={() => setOpen(p => !p)}
        className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-left focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent flex justify-between items-center"
      >
        <span className={value ? 'text-white-text' : 'text-silver-text'}>
          {selectedLabel ?? 'Selecciona un rol'}
        </span>
        <span className="material-symbols-outlined text-silver-text text-lg">
          {open ? 'keyboard_arrow_up' : 'keyboard_arrow_down'}
        </span>
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 rounded-xl bg-charcoal border border-white/10 shadow-xl overflow-hidden">
          {ROLE_OPTIONS.map(o => (
            <button
              key={o.value}
              type="button"
              data-testid={`role-option-${o.value.toLowerCase()}`}
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
              className={`w-full px-4 py-3 text-left text-sm transition-colors ${
                value === o.value
                  ? 'gold-gradient text-midnight font-bold'
                  : 'text-white-text hover:bg-white/10'
              }`}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
