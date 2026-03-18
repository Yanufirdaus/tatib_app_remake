import { useQuery } from "@tanstack/react-query"
import { getSemester, updateSemester } from "@/features/home_admin/services/semester.service";
import type { Semester } from "@/types/models"
import type { UpdateSemesterFormValues } from "@/features/home_admin/schemas/update.semester.schema";
import { useBaseMutation } from "@/utils/mutationHelper"

export const useSemester = () => {
    return useQuery<Semester>({
        queryKey: ["semester"],
        queryFn: getSemester,
        staleTime: 5 * 60 * 1000
    })
}

export const useEditSemester = () => {
    return useBaseMutation<void, Error, UpdateSemesterFormValues>({
        mutationFn: updateSemester,
        invalidateKeys: [["semester"]],
        onSuccessMessage: "Update semester berhasil"
    })
}