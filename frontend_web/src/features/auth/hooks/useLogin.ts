import { login } from "@/features/auth/services/auth.service";
import { useBaseMutation } from "@/utils/mutationHelper"

export const useLogin = () => {
    return useBaseMutation({
        mutationFn: login
    })
}