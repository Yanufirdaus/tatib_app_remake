import { apiClient } from "@/services/apiClient";
import type { LoginFormValues } from "@/features/auth/schemas/login.schema";
import { handleApiError } from "@/utils/apiErrorHandler";
import type { User } from "@/types/models";

export interface LoginResponse {
    user: User;
    token: string;
}

export const login = async (data: LoginFormValues): Promise<LoginResponse> => {
    try{
        const response = await apiClient.post<LoginResponse>("/login", {
            ...data,
            platform: "web"
        });

        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "Login gagal");
    }
}

export const getMe = async (): Promise<User> => {
    try {
        const response = await apiClient.get<User>("/me");
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mendapatkan data user");
    }
  
};

export const logout = async (): Promise<void> => {
    try {
        const response = await apiClient.post("logout");
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "Logout gagal");
    }
}