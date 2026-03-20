import { create } from 'zustand';
import { storage, StorageKeys } from '../utils/storage';
import { Profile } from '../types/models';
import { AuthState } from '../types/auth';

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: true,

  setAuth: async (user, token) => {
    await storage.save(StorageKeys.ACCESS_TOKEN, token);
    await storage.save(StorageKeys.USER_DATA, JSON.stringify(user));
    set({ user, isAuthenticated: true, isLoading: false });
  },

  logout: async () => {
    await storage.clear();
    set({ user: null, isAuthenticated: false, isLoading: false });
  },

  checkAuth: async () => {
    try {
      set({ isLoading: true });
      const token = await storage.get(StorageKeys.ACCESS_TOKEN);
      const userData = await storage.get(StorageKeys.USER_DATA);

      if (token && userData) {
        set({ 
          user: JSON.parse(userData), 
          isAuthenticated: true, 
          isLoading: false 
        });
      } else {
        set({ isAuthenticated: false, isLoading: false });
      }
    } catch (error) {
      set({ isAuthenticated: false, isLoading: false });
    }
  },
}));
