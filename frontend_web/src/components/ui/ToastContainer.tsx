import { useToastStore } from "@/store/toast.store";

const ToastContainer = () => {
    const toasts = useToastStore((state) => state.toasts);
    const removeToast = useToastStore((state) => state.removeToast);

    if (toasts.length === 0) return null;

    const typeStyles = {
        success: "bg-green-600 border-green-700 text-white",
        error: "bg-red-600 border-red-700 text-white",
        info: "bg-blue-600 border-blue-700 text-white",
        warning: "bg-yellow-500 border-yellow-600 text-white",
    };

    return (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-9999 flex flex-col gap-2 w-full max-w-sm px-4">
            {toasts.map((toast) => (
                <div
                    key={toast.id}
                    onClick={() => removeToast(toast.id)}
                    className={`flex items-center justify-between p-4 rounded shadow-lg border animate-in fade-in slide-in-from-top-4 cursor-pointer transition-all hover:opacity-90 ${typeStyles[toast.type]}`}
                >
                    <span className="text-sm font-medium">{toast.message}</span>
                    <button className="ml-4 text-white opacity-70 hover:opacity-100">
                        &times;
                    </button>
                </div>
            ))}
        </div>
    );
};

export default ToastContainer;
