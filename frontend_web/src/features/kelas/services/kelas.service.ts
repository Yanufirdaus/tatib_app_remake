import { apiClient } from "@/services/apiClient";
import type { AddKelasFormValues } from "@/features/kelas/schemas/add.kelas.schema";
import { handleApiError } from "@/utils/apiErrorHandler";
import type { Kelas } from "@/types/models";

export const getKelas = async (): Promise<Kelas[]> => {
    try {
        const response = await apiClient.get<Kelas[]>("/kelas");
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mendapatkan data kelas");
    }
};

export const getKelasById = async (id: number): Promise<Kelas> => {
    try {
        const response = await apiClient.get<Kelas>(`/kelas/${id}`);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mendapatkan data kelas");
    }
};

export const deleteKelas = async (id: number): Promise<void> => {
    try {
        const response = await apiClient.delete(`/kelas/${id}`);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal menghapus data kelas");
    }
};

export const addKelas = async (data: AddKelasFormValues): Promise<void> => {
    try {
        const response = await apiClient.post(`/kelas/batch`, data);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal menambahkan data kelas");
    }
}