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
        <div className={`flex flex-row justify-center items-top h-fit gap-2 md:gap-4 py-3 ${className}`}>
            <button
                type="button"
                className="bg-red-600 px-2 py-1 rounded-sm hover:bg-red-900 text-xs text-white font-medium disabled:opacity-50"
                onClick={onCancel}
                disabled={disabled || isPending}
            >
                {cancelText}
            </button>
            <button
                type={typeButton}
                className="bg-blue-500 px-2 py-1 rounded-sm hover:bg-blue-700 text-xs text-white font-medium disabled:opacity-50"
                disabled={disabled || isPending}
                onClick={onClick}
            >
                {!isPending ? submitText : loadingText}
            </button>
        </div>
    )
}

export default ActionButtons;
