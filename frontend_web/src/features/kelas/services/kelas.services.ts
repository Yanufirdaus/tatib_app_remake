import { apiClient } from "../../../services/apiClient";
import type { AddKelasFormValues } from "../../login/schema/add.kelas.schema";

export const getKelas = async () => {
    try {
        const response = await apiClient.get("/kelas");
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data kelas")
    }
};

export const deleteKelas = async (id:number) => {
    try {
        const response = await apiClient.delete(`/kelas/${id}`);
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data kelas")
    }
};

export const addKelas = async (data: AddKelasFormValues) => {
    try {
        const response = await apiClient.post(`/kelas/batch`, data);
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "gagal menambahkan data kelas")
    }
}