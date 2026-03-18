import { useQuery } from "@tanstack/react-query"
import { addPelanggaran, deletePelanggaran, getJenisPelanggaran, getPelanggaranByJenis, updatePelanggaran } from "@/features/pelanggaran/services/pelanggaran.service";
import type { JenisPelanggaran, Pelanggaran } from "@/types/models"
import type { UpdatePelanggaranFormValues, AddPelanggaranFormValues } from "@/features/pelanggaran/schemas/pelanggaran.schema";
import { useBaseMutation } from "@/utils/mutationHelper"

export const useJenisPelanggaran = () => {
    return useQuery<JenisPelanggaran[]>({
        queryKey: ["jenisPelanggaran"],
        queryFn: getJenisPelanggaran,
        staleTime: 5 * 60 * 1000
    })
}

export const useGetPelanggaranByJenisId = (jenisId: number) => {
    return useQuery<Pelanggaran[]>({
        queryKey: ["pelanggaranByJenisId", jenisId],
        queryFn: () => getPelanggaranByJenis(jenisId),
        staleTime: 5 * 60 * 1000
    })
}

export const useUpdatePelanggaran = () => {
    return useBaseMutation<
        void,
        Error,
        { id: number, data: UpdatePelanggaranFormValues }
    >({
        mutationFn: ({ id, data }) => updatePelanggaran(id, data),
        invalidateKeys: [["pelanggaranByJenisId"]],
        onSuccessMessage: "Update pelanggaran berhasil"
    })
}

export const useDeletePelanggaran = () => {
    return useBaseMutation<void, Error, number>({
        mutationFn: deletePelanggaran,
        invalidateKeys: [["pelanggaranByJenisId"]],
        onSuccessMessage: "Delete pelanggaran berhasil"
    })
}

export const useAddPelanggaran = () => {
    return useBaseMutation<void, Error, AddPelanggaranFormValues>({
        mutationFn: addPelanggaran,
        invalidateKeys: [["pelanggaranByJenisId"]],
        onSuccessMessage: "Tambah pelanggaran berhasil"
    })
}