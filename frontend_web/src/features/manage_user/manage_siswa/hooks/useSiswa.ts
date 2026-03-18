import { useQuery } from "@tanstack/react-query"
import { createManySiswa, deleteSiswa, getSiswaByKelas, updateManySiswaKelas, updateSiswa } from "@/features/manage_user/manage_siswa/services/siswa.service";
import type { UpdateManySiswaKelasFormValues, UpdateUserFormValues, CreateUserFormValues } from "@/features/manage_user/schemas/user.schema";
import type { Siswa } from "@/types/models"
import { useBaseMutation } from "@/utils/mutationHelper"

export const useSiswaByKelas = (id: number) => {
    return useQuery<Siswa[]>({
        queryKey: ["siswa", id],
        queryFn: () => getSiswaByKelas(id),
        staleTime: 5 * 60 * 1000
    })
}

export const useCreateManySiswa = () => {
    return useBaseMutation<void, Error, CreateUserFormValues>({
        mutationFn: createManySiswa,
        invalidateKeys: [["siswa"]],
        onSuccessMessage: "Siswa berhasil ditambahkan"
    })
}

export const useUpdateSiswa = () => {
    return useBaseMutation<void, Error, { id: number, data: UpdateUserFormValues }>({
        mutationFn: ({ id, data }) => updateSiswa(id, data),
        invalidateKeys: [["siswa"]],
        onSuccessMessage: "Edit siswa berhasil"
    })
}

export const useUpdateManySiswaKelas = () => {
    return useBaseMutation<void, Error, UpdateManySiswaKelasFormValues>({
        mutationFn: updateManySiswaKelas,
        invalidateKeys: [["siswa"]],
        onSuccessMessage: "Data berhasil diupdate"
    })
}

export const useDeleteSiswa = () => {
    return useBaseMutation<void, Error, number>({
        mutationFn: deleteSiswa,
        invalidateKeys: [["siswa"]],
        onSuccessMessage: "Delete siswa berhasil"
    })
}