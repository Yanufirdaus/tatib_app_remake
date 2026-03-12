import { apiClient } from "../../../services/apiClient";
import type { AddPelanggaranFormValues, UpdatePelanggaranFormValues } from "../schemas/pelanggaran.schema";

export const getJenisPelanggaran = async () => {
    try {
        const response = await apiClient.get("/pelanggaran/jenis");
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data jenis pelanggaran")
    }
};

export const getPelanggaranByJenis = async (id: number) => {
    try {
        const response = await apiClient.get(`/pelanggaran/jenis/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data kelas")
    }
};

export const updatePelanggaran = async (id: number, data: UpdatePelanggaranFormValues) => {
    try {
        const response = await apiClient.put(`/pelanggaran/${id}`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data semester")
    }
}

export const deletePelanggaran = async (id: number) => {
    try {
        const response = await apiClient.delete(`/pelanggaran/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data kelas")
    }
};

export const addPelanggaran = async (data: AddPelanggaranFormValues) => {
    try {
        const response = await apiClient.post(`/pelanggaran`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal menambahkan data kelas")
    }
}