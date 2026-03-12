import { useQuery } from "@tanstack/react-query"
import { getSiswaByKelas } from "../services/siswa.service"

export const useSiswaByKelas = (id: number) => {
    return useQuery({
        queryKey: ["siswa", id],
        queryFn: () => getSiswaByKelas(id),
        staleTime: 5 * 60 * 1000
    })
}