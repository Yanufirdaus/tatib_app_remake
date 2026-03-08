import { apiClient } from "../../../services/apiClient";
import type { UpdateSemesterFormValues } from "../../login/schema/update.semester.schema";

export const getSemester = async () => {
    try {
        const response = await apiClient.get("/current");
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data semester")
    }
};

export const updateSemester = async (data: UpdateSemesterFormValues) => {
    try {
        const response = await apiClient.put("/current", data);
        return response.data;
    } catch (error:any) {
        throw new Error(error.response?.data?.message || "gagal mendapatkan data semester")
    }
}