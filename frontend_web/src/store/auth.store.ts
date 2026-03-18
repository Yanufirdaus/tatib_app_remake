import { create } from "zustand"
import type { User } from "@/types/models"

type AuthState = {
  user: User | null
  isAuthenticated: boolean
  authChecked: boolean

  setUser: (user: User) => void
  setAuthChecked: () => void
  logoutStore: () => void

  isAdmin: () => boolean;
  isKesiswaan: () => boolean;
  isBK: () => boolean;
  isKepsek: () => boolean;
}

export const useAuthStore = create<AuthState>((set, get) => ({
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
    }),

  isAdmin: () => get().user?.role === 'admin',
  isKesiswaan: () => get().user?.role === 'kesiswaan',
  isBK: () => get().user?.role === 'bk',
  isKepsek: () => get().user?.role === 'kepsek',
}))