import { apiClient } from "@/services/apiClient";
import type { CreateTendikFormValues, UpdateTendikFormValues } from "@/features/manage_user/schemas/user.schema";
import { handleApiError } from "@/utils/apiErrorHandler";
import type { Tendik } from "@/types/models";

export const getTendikByRole = async (role: string): Promise<Tendik[]> => {
    try {
        const response = await apiClient.get<Tendik[]>(`/tendik/role/${role}`);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mendapatkan data tendik");
    }
}

export const deleteTendik = async (id: number): Promise<void> => {
    try {
        const response = await apiClient.delete(`/tendik/${id}`);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal menghapus data tendik");
    }
}

export const updateTendik = async (id: number, data: UpdateTendikFormValues): Promise<void> => {
    try {
        const response = await apiClient.put(`/tendik/${id}`, data);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal memperbarui data tendik");
    }
}

export const addTendik = async (data: CreateTendikFormValues): Promise<void> => {
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
    } catch (error: unknown) {
        return handleApiError(error, "gagal menambahkan data tendik");
    }
}