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
        console.error("API Error:", error.response?.data || error.message);
        const originalRequest = error.config
        const requestUrl = originalRequest.url
        console.log("url:",requestUrl)

        if (
            error.response?.status === 401 && 
            !originalRequest._retry
        ) {
            originalRequest._retry = true

            try {
                await apiClient.post(
                    "/refresh-token", {}, {withCredentials: true}
                )
                console.log("original request: ", originalRequest)
                
                const response = await apiClient(originalRequest);

                
                const { logoutStore } = useAuthStore()
                const navigate = useNavigate()

                if (requestUrl === "logout") {
                    logoutStore();
                    navigate("/", { replace: true });
                }

                return response;
            } catch {
                useAuthStore.getState().logoutStore()
            }
        }
        return Promise.reject(error);
    }
)