export type ActionButtonsProps = {
    onCancel?: () => void;
    cancelText?: string;
    submitText?: string;
    loadingText?: string;
    isPending?: boolean;
    className?: string;
    disabled?: boolean;
    onClick?: () => void;
    typeButton: "button" | "submit";
}

const ActionButtons = ({
    onCancel,
    cancelText = "Batal",
    submitText = "Simpan",
    loadingText = "Memuat...",
    isPending = false,
    className = "",
    disabled = false,
    onClick,
    typeButton
}: ActionButtonsProps) => {
    return (
        <div className={`flex flex-row justify-center items-center gap-3 md:gap-4 py-4 ${className}`}>
            <button
                type="button"
                className="bg-white border border-slate-200 px-5 py-2 rounded-lg hover:bg-slate-50 text-xs text-slate-600 font-bold transition-all active:scale-95 disabled:opacity-50"
                onClick={onCancel}
                disabled={disabled || isPending}
            >
                {cancelText}
            </button>
            <button
                type={typeButton}
                className="bg-blue-600 px-6 py-2 rounded-lg hover:bg-blue-700 text-xs text-white font-bold shadow-sm shadow-blue-500/20 transition-all active:scale-95 disabled:opacity-50"
                disabled={disabled || isPending}
                onClick={onClick}
            >
                {!isPending ? submitText : loadingText}
            </button>
        </div>
    )
}

export default ActionButtons;
