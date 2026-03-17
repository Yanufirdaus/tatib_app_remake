import { apiClient } from "../../../../services/apiClient";
import type { CreateTendikFormValues, UpdateTendikFormValues } from "../../schema/user.schema";

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

export const updateTendik = async (id: number, data: UpdateTendikFormValues) => {
    try {
        const response = await apiClient.put(`/tendik/${id}`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal memperbarui data tendik")
    }
}

export const addTendik = async (data: CreateTendikFormValues) => {
    try {
        const payload = {
            tendik: data.tendik.map((t) => ({
                ...t,
                image_profile: "https://res.cloudinary.com/drw93apjn/image/upload/v1773338893/profileawal_ossrac.jpg",
                password: t.nip,
            }))
        }

        const response = await apiClient.post(`/register/tendik`, payload);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal menambahkan data tendik")
    }
}