import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { createManySiswa, deleteSiswa, getSiswaByKelas, updateManySiswaKelas, updateSiswa } from "../services/siswa.service"
import type { UpdateManySiswaKelasFormValues } from "../../schema/user.schema"

export const useSiswaByKelas = (id: number) => {
    return useQuery({
        queryKey: ["siswa", id],
        queryFn: () => getSiswaByKelas(id),
        staleTime: 5 * 60 * 1000
    })
}

export const useCreateManySiswa = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => createManySiswa(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["siswa"] });
        }
    })
}

export const useUpdateSiswa = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => updateSiswa(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["siswa"] });
        }
    })
}

export const useDeleteSiswa = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => deleteSiswa(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["siswa"] });
        }
    })
}

export const useUpdateManySiswaKelas = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: UpdateManySiswaKelasFormValues) => updateManySiswaKelas(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["siswa"] });
        }
    })
}