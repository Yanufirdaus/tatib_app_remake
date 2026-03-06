import { apiClient } from "../../../services/apiClient";
import type { LoginFormValues } from "../../login/schema/login.schema";

export const login = async (data: LoginFormValues) => {
    try{
        const response = await apiClient.post("/login", {
            ...data,
            platform: "web"
        });

        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "Login gagal")
    }
}

export const getMe = async () => {
    try {
        const response = await apiClient.get("/me");
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data user")
    }
  
};

export const logout = async () => {
    try {
        const response = await apiClient.post("logout");
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "Logout gagal")
    }
}