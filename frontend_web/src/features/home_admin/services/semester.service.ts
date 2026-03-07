import { apiClient } from "../../../services/apiClient";

export const getSemester = async () => {
    try {
        const response = await apiClient.get("/current");
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data semester")
    }
};