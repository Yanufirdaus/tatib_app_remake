import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addTendik, deleteTendik, getTendikByRole, updateTendik } from "../services/tendik.service";

export const useGetTendikByRole = (role: string) => {
    return useQuery({
        queryKey: ["tendik", role],
        queryFn: () => getTendikByRole(role),
        staleTime: 5 * 60 * 1000
    })
}

export const useUpdateTendik = (id: number) => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => updateTendik(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tendik"] });
        }
    })
}

export const useDeleteTendik = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (id: number) => deleteTendik(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tendik"] });
        }
    })
}

export const useAddTendik = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: any) => addTendik(data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["tendik"] });
        }
    })
}