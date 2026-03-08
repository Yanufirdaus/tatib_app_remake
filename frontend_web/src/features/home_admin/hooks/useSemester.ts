import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getSemester, updateSemester } from "../services/semester.service"

export const useSemester = () => {
    return useQuery ({
        queryKey: ["semester"],
        queryFn: getSemester,
        staleTime: 5*60*1000
    })
}

export const useEditSemester = () => {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: updateSemester,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["semester"] })
        }
    })
}