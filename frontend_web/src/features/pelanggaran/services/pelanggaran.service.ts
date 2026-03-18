import { apiClient } from "@/services/apiClient";
import type { AddPelanggaranFormValues, UpdatePelanggaranFormValues } from "@/features/pelanggaran/schemas/pelanggaran.schema";
import { handleApiError } from "@/utils/apiErrorHandler";
import type { Pelanggaran, JenisPelanggaran } from "@/types/models";

export const getJenisPelanggaran = async (): Promise<JenisPelanggaran[]> => {
    try {
        const response = await apiClient.get<JenisPelanggaran[]>("/pelanggaran/jenis");
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mendapatkan data jenis pelanggaran");
    }
};

export const getPelanggaranByJenis = async (id: number): Promise<Pelanggaran[]> => {
    try {
        const response = await apiClient.get<Pelanggaran[]>(`/pelanggaran/jenis/${id}`);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mendapatkan data pelanggaran");
    }
};

export const updatePelanggaran = async (id: number, data: UpdatePelanggaranFormValues): Promise<void> => {
    try {
        const response = await apiClient.put(`/pelanggaran/${id}`, data);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mengubah data pelanggaran");
    }
}

export const deletePelanggaran = async (id: number): Promise<void> => {
    try {
        const response = await apiClient.delete(`/pelanggaran/${id}`);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal menghapus data pelanggaran");
    }
};

export const addPelanggaran = async (data: AddPelanggaranFormValues): Promise<void> => {
    try {
        const response = await apiClient.post(`/pelanggaran`, data);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal menambahkan data pelanggaran");
    }
}