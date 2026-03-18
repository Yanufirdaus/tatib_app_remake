import { useToastStore } from "@/store/toast.store";

export const useToast = () => {
    const addToast = useToastStore((state) => state.addToast);

    return {
        success: (message: string) => addToast(message, "success"),
        error: (message: string) => addToast(message, "error"),
        info: (message: string) => addToast(message, "info"),
        warning: (message: string) => addToast(message, "warning"),
    };
};
