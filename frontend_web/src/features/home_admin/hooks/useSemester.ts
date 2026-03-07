import { useQuery } from "@tanstack/react-query"
import { getSemester } from "../services/semester.service"

export const useSemester = () => {
    return useQuery ({
        queryKey: ["semester"],
        queryFn: getSemester,
        staleTime: 5*60*1000
    })
}