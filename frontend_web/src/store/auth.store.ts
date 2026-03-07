import { create } from "zustand"

type User = {
  id: number
  role: string
}

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  authChecked: boolean

  setUser: (user: User) => void
  setAuthChecked: () => void
  logoutStore: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  authChecked: false,

  setUser: (user) =>
    set({
      user,
      isAuthenticated: true
    }),

  setAuthChecked: () =>
    set({
      authChecked: true
    }),

  logoutStore: () =>
    set({
      user: null,
      isAuthenticated: false
    })
}))