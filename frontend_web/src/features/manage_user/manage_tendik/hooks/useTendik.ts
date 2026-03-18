import { useQuery } from "@tanstack/react-query";
import { addTendik, deleteTendik, getTendikByRole, updateTendik } from "@/features/manage_user/manage_tendik/services/tendik.service";
import type { Tendik } from "@/types/models";
import type { CreateTendikFormValues, UpdateTendikFormValues } from "@/features/manage_user/schemas/user.schema";
import { useBaseMutation } from "@/utils/mutationHelper";

export const useGetTendikByRole = (role: string) => {
    return useQuery<Tendik[]>({
        queryKey: ["tendik", role],
        queryFn: () => getTendikByRole(role),
        staleTime: 5 * 60 * 1000
    })
}

export const useUpdateTendik = () => {
    return useBaseMutation<void, Error, { id: number, data: UpdateTendikFormValues }>({
        mutationFn: ({ id, data }: { id: number, data: UpdateTendikFormValues }) => updateTendik(id, data),
        invalidateKeys: [["tendik"]],
        onSuccessMessage: "Update tendik berhasil"
    })
}

export const useDeleteTendik = () => {
    return useBaseMutation<void, Error, number>({
        mutationFn: (id: number) => deleteTendik(id),
        invalidateKeys: [["tendik"]],
        onSuccessMessage: "Delete tendik berhasil"
    })
}

export const useAddTendik = () => {
    return useBaseMutation<void, Error, CreateTendikFormValues>({
        mutationFn: (data: CreateTendikFormValues) => addTendik(data),
        invalidateKeys: [["tendik"]],
        onSuccessMessage: "Tambah tendik berhasil"
    })
}