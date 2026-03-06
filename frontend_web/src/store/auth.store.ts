import { create } from "zustand"

type User = {
  id: number
  role: string
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  setUser: (user: User) => void
  logoutStore: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true
    }),

  logoutStore: () =>
    set({
      user: null,
      isAuthenticated: false
    })
}))