export const useAuth = () => ({
  login: async (email: string, password: string, rememberMe: boolean) => {},
  register: async (email: string, username: string, password: string) => {},
  isLoading: false,
  error: null,
  isAuthenticated: false,
})
