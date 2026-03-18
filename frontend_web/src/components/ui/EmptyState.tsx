import type { ReactNode } from "react";
import { HiOutlineDatabase } from "react-icons/hi";

interface EmptyStateProps {
    title?: string;
    message?: string;
    icon?: ReactNode;
    action?: ReactNode;
}

const EmptyState = ({ 
    title = "Data Kosong", 
    message = "Belum ada data tersedia saat ini.", 
    icon = <HiOutlineDatabase size={48} className="text-gray-400" />,
    action
}: EmptyStateProps) => {
    return (
        <div className="flex flex-col items-center justify-center py-12 px-4 text-center animate-fade-in">
            <div className="mb-4 p-4 bg-gray-50 rounded-full">
                {icon}
            </div>
            <h3 className="text-lg font-semibold text-gray-700 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 max-w-xs mb-6">{message}</p>
            {action && (
                <div className="mt-2">
                    {action}
                </div>
            )}
        </div>
    );
};

export default EmptyState;
