import { useMutation, useQueryClient, type QueryKey } from "@tanstack/react-query";
import { useToast } from "@/hooks/useToast";

interface UseBaseMutationOptions<TData, TError, TVariables, TContext> {
    mutationFn: (variables: TVariables) => Promise<TData>;
    invalidateKeys?: QueryKey[];
    onSuccessMessage?: string;
    onSuccess?: (data: TData, variables: TVariables, context: TContext) => void;
    onError?: (error: TError, variables: TVariables, context: TContext | undefined) => void;
}

export const useBaseMutation = <TData = void, TError = Error, TVariables = void, TContext = unknown>(
    options: UseBaseMutationOptions<TData, TError, TVariables, TContext>
) => {
    const queryClient = useQueryClient();
    const toast = useToast();

    return useMutation<TData, TError, TVariables, TContext>({
        mutationFn: options.mutationFn,
        onSuccess: (data, variables, context) => {
            if (options.invalidateKeys) {
                options.invalidateKeys.forEach(key => {
                    queryClient.invalidateQueries({ queryKey: key });
                });
            }
            if (options.onSuccessMessage) {
                toast.success(options.onSuccessMessage);
            }
            if (options.onSuccess) {
                options.onSuccess(data, variables, context);
            }
        },
        onError: (error, variables, context) => {
            if (options.onError) {
                options.onError(error, variables, context);
            } else if (error instanceof Error) {
                toast.error(error.message);
            } else {
                toast.error("Terjadi kesalahan tidak terduga");
            }
        }
    });
};
