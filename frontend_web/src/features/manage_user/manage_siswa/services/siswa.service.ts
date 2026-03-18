import { apiClient } from "@/services/apiClient";
import type { CreateUserFormValues, UpdateManySiswaKelasFormValues, UpdateUserFormValues } from "@/features/manage_user/schemas/user.schema";
import { handleApiError } from "@/utils/apiErrorHandler";
import type { Siswa } from "@/types/models";

export const getSiswaByKelas = async (id: number): Promise<Siswa[]> => {
    try {
        const response = await apiClient.get<Siswa[]>(`/kelas/${id}/students`);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mendapatkan data siswa");
    }
}

export const createManySiswa = async (data: CreateUserFormValues): Promise<void> => {
    try {
        const payload = {
            siswa: data.siswa.map((s) => ({
                ...s,
                role: "siswa",
                image_profile: "https://res.cloudinary.com/drw93apjn/image/upload/v1773338893/profileawal_ossrac.jpg",
                poin: 0,
                password: s.nisn,
            }))
        };

        const response = await apiClient.post(`/register/students`, payload);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal menambahkan data siswa");
    }
}

export const updateSiswa = async (id: number, data: UpdateUserFormValues): Promise<void> => {
    try {
        const response = await apiClient.put(`/students/${id}`, data);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mengupdate data siswa");
    }
}

export const deleteSiswa = async (id: number): Promise<void> => {
    try {
        const response = await apiClient.delete(`/students/${id}`);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal menghapus data siswa");
    }
}

export const updateManySiswaKelas = async (data: UpdateManySiswaKelasFormValues): Promise<void> => {
    try {
        const response = await apiClient.put(`/students/kelas`, data);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mengupdate data siswa");
    }
}