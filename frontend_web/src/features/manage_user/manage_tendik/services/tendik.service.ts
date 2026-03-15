import { apiClient } from "../../../../services/apiClient";

export const getTendikByRole = async (role: string) => {
    try {
        const response = await apiClient.get(`/tendik/role/${role}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data tendik")
    }
}

export const deleteTendik = async (id: number) => {
    try {
        const response = await apiClient.delete(`/tendik/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal menghapus data tendik")
    }
}

export const updateTendik = async (id: number, data: any) => {
    try {
        const response = await apiClient.patch(`/tendik/${id}`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal memperbarui data tendik")
    }
}