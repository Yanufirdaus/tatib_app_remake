import axios from 'axios';
import { storage, StorageKeys } from '../utils/storage';

// Gunakan IP Address komputer Anda di file .env (EXPO_PUBLIC_API_URL)
const BASE_URL = process.env.EXPO_PUBLIC_API_URL;

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor untuk menyisipkan Token JWT ke setiap request
apiClient.interceptors.request.use(
  async (config) => {
    const token = await storage.get(StorageKeys.ACCESS_TOKEN);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor untuk menangani error respons secara global
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      // Logic logout jika token expired bisa ditambahkan di sini
      await storage.clear();
    }
    return Promise.reject(error);
  }
);

export default apiClient;
