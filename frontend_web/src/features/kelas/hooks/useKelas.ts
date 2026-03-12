import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { addKelas, deleteKelas, getKelas, getKelasById } from "../services/kelas.services"

export const useKelas = () => {
    return useQuery({
        queryKey: ["kelas"],
        queryFn: getKelas,
        staleTime: 5 * 60 * 1000
    })
}

export const useKelasById = (id: number) => {
    return useQuery({
        queryKey: ["kelas", id],
        queryFn: () => getKelasById(id),
        staleTime: 5 * 60 * 1000
    })
}

export const useDeleteKelas = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: deleteKelas,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["kelas"] })
        }
    })
}

export const useAddKelas = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: addKelas,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["kelas"] })
        }
    })
}