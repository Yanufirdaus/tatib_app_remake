import { useQuery } from "@tanstack/react-query"
import { addKelas, deleteKelas, getKelas, getKelasById } from "@/features/kelas/services/kelas.service";
import type { Kelas } from "@/types/models"
import type { AddKelasFormValues } from "@/features/kelas/schemas/add.kelas.schema";
import { useBaseMutation } from "@/utils/mutationHelper"

export const useKelas = () => {
    return useQuery<Kelas[]>({
        queryKey: ["kelas"],
        queryFn: getKelas,
        staleTime: 5 * 60 * 1000
    })
}

export const useKelasById = (id: number) => {
    return useQuery<Kelas>({
        queryKey: ["kelas", id],
        queryFn: () => getKelasById(id),
        staleTime: 5 * 60 * 1000
    })
}

export const useDeleteKelas = () => {
    return useBaseMutation<void, Error, number>({
        mutationFn: deleteKelas,
        invalidateKeys: [["kelas"]],
        onSuccessMessage: "Kelas berhasil dihapus"
    })
}

export const useAddKelas = () => {
    return useBaseMutation<void, Error, AddKelasFormValues>({
        mutationFn: addKelas,
        invalidateKeys: [["kelas"]],
        onSuccessMessage: "Kelas berhasil ditambahkan"
    })
}