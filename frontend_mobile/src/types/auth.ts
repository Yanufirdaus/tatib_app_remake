import { Profile } from './models';

export interface AuthResponse {
  user: Profile;
  token: string;
}

export interface AuthState {
  user: Profile | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setAuth: (user: Profile, token: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}
