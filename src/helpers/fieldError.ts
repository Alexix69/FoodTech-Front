export function fieldErrorFor(
  error: string | null,
  field: 'email' | 'username' | 'role' | 'password'
): string | null {
  if (!error) return null
  const lower = error.toLowerCase()
  if (field === 'email' && lower.includes('email')) return error
  if (field === 'username' && lower.includes('username')) return error
  if (field === 'role' && lower.includes('role')) return error
  if (field === 'password' && lower.includes('password')) return error
  return null
}

export function generalError(error: string | null): string | null {
  if (!error) return null
  const lower = error.toLowerCase()
  if (
    lower.includes('email') ||
    lower.includes('username') ||
    lower.includes('role') ||
    lower.includes('password')
  ) {
    return null
  }
  return error
}
