import { useQuery } from "@tanstack/react-query"
import { getMe } from "@/features/auth/services/auth.service";
import type { User } from "@/types/models"

export const useMe = () => {
    return useQuery<User>({
        queryKey: ["me"],
        queryFn: getMe,
        retry: false
    })
}