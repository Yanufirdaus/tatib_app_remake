import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { deletePelanggaran, getJenisPelanggaran, getPelanggaranByJenis, updatePelanggaran } from "../services/pelanggaran.service"
import type { JenisPelanggaranType } from "../../../types/variable.type"
import type { UpdatePelanggaranPayload } from "../type/pelanggaran.type"

export const useJenisPelanggaran = () => {
    return useQuery <JenisPelanggaranType[]> ({
        queryKey: ["jenisPelanggaran"],
        queryFn: getJenisPelanggaran,
        staleTime: 5*60*1000
    })
}

export const useGetPelanggaranByJenisId = (jenisId: number) => {
    return useQuery ({
        queryKey: ["pelanggaranByJenisId", jenisId],
        queryFn: () => getPelanggaranByJenis(jenisId),
        staleTime: 5*60*1000
    })
}

export const useUpdatePelanggaran = () => {
    const queryClient = useQueryClient();
    
    return useMutation<
        unknown,                    
        Error,                      
        UpdatePelanggaranPayload    
    >({
        mutationFn: ({ id, data }) => updatePelanggaran(id, data),

        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pelanggaranByJenisId"] })
        }
    })
}

export const useDeletePelanggaran = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: deletePelanggaran,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["pelanggaranByJenisId"] })
        }
    })
}