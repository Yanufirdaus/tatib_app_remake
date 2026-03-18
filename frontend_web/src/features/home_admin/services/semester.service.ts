import { apiClient } from "@/services/apiClient";
import type { UpdateSemesterFormValues } from "@/features/home_admin/schemas/update.semester.schema";
import { handleApiError } from "@/utils/apiErrorHandler";
import type { Semester } from "@/types/models";

export const getSemester = async (): Promise<Semester> => {
    try {
        const response = await apiClient.get<Semester>("/current");
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mendapatkan data semester");
    }
};

export const updateSemester = async (data: UpdateSemesterFormValues): Promise<void> => {
    try {
        const response = await apiClient.put("/current", data);
        return response.data;
    } catch (error: unknown) {
        return handleApiError(error, "gagal mengubah data semester");
    }
}