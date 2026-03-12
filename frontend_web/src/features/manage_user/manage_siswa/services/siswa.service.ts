import { apiClient } from "../../../../services/apiClient";

export const getSiswaByKelas = async (id: number) => {
    try {
        const response = await apiClient.get(`/kelas/${id}/students`);
        return response.data;
    } catch (error: any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data siswa")
    }
}