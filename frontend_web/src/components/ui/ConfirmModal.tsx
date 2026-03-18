interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onClose: () => void;
    onConfirm: () => void;
    type?: "danger" | "warning" | "info";
    confirmText?: string;
    cancelText?: string;
}

const ConfirmModal = ({
    isOpen,
    title,
    message,
    onClose,
    onConfirm,
    type = "danger",
    confirmText = "Hapus",
    cancelText = "Batal"
}: ConfirmModalProps) => {
    if (!isOpen) return null;

    const typeColors = {
        danger: "bg-red-600 hover:bg-red-700",
        warning: "bg-yellow-500 hover:bg-yellow-600",
        info: "bg-blue-600 hover:bg-blue-700",
    };

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in duration-200">
            <div className="bg-white rounded-lg shadow-xl w-full max-w-md overflow-hidden animate-in zoom-in-95 duration-200">
                <div className="p-6">
                    <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
                    <p className="text-sm text-gray-500">{message}</p>
                </div>
                <div className="px-6 py-4 bg-gray-50 flex justify-end gap-3">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={() => {
                            onConfirm();
                            onClose();
                        }}
                        className={`px-4 py-2 text-sm font-medium text-white rounded transition-colors ${typeColors[type]}`}
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ConfirmModal;
