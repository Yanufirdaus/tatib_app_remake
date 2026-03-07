import axios from 'axios';
import { API_BASE_URL } from '../config/api';
import { useAuthStore } from '../store/auth.store';
import { useNavigate } from 'react-router-dom';

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    withCredentials: true,
    headers: {
        "Content-Type": "application/json"
    }
})


apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const requestUrl = originalRequest?.url;

    console.error("API Error:", error.response?.data || error.message);

    if (requestUrl === "/refresh-token") {
      useAuthStore.getState().logoutStore();
      return Promise.reject(error);
    }

    if (
      error.response?.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        await apiClient.post("/refresh-token", {}, { withCredentials: true });

        return apiClient(originalRequest);

      } catch (refreshError) {
        useAuthStore.getState().logoutStore();

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);