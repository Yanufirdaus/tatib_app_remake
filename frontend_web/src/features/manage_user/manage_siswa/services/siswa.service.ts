import { apiClient } from "../../../../services/apiClient";
import type { CreateUserFormValues, UpdateManySiswaKelasFormValues, UpdateUserFormValues } from "../../schema/user.schema";

export const getSiswaByKelas = async (id: number) => {
    try {
        const response = await apiClient.get(`/kelas/${id}/students`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data siswa")
    }
}

export const createManySiswa = async (data: CreateUserFormValues) => {
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
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal menambahkan data siswa")
    }
}

export const updateSiswa = async (id: number, data: UpdateUserFormValues) => {
    try {
        const response = await apiClient.put(`/students/${id}`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal mengupdate data siswa")
    }
}

export const deleteSiswa = async (id: number) => {
    try {
        const response = await apiClient.delete(`/students/${id}`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal menghapus data siswa")
    }
}

export const updateManySiswaKelas = async (data: UpdateManySiswaKelasFormValues) => {
    try {
        const response = await apiClient.put(`/students/kelas`, data);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal mengupdate data siswa")
    }
}