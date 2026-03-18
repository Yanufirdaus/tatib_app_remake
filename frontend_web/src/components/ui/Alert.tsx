import type { ReactNode } from "react";
import { 
    HiCheckCircle, 
    HiExclamationCircle, 
    HiInformationCircle, 
    HiXCircle 
} from "react-icons/hi";

type AlertType = 'success' | 'error' | 'warning' | 'info';

interface AlertProps {
    type: AlertType;
    message: ReactNode;
    className?: string;
}

const Alert = ({ type, message, className = "" }: AlertProps) => {
    const configs = {
        success: {
            bg: "bg-green-50",
            border: "border-green-200",
            text: "text-green-800",
            icon: <HiCheckCircle className="text-green-500" size={20} />
        },
        error: {
            bg: "bg-red-50",
            border: "border-red-200",
            text: "text-red-800",
            icon: <HiXCircle className="text-red-500" size={20} />
        },
        warning: {
            bg: "bg-amber-50",
            border: "border-amber-200",
            text: "text-amber-800",
            icon: <HiExclamationCircle className="text-amber-500" size={20} />
        },
        info: {
            bg: "bg-blue-50",
            border: "border-blue-200",
            text: "text-blue-800",
            icon: <HiInformationCircle className="text-blue-500" size={20} />
        }
    };

    const config = configs[type];

    return (
        <div className={`flex items-start gap-3 p-4 border rounded-lg ${config.bg} ${config.border} ${config.text} ${className} animate-fade-in`}>
            <div className="mt-0.5">
                {config.icon}
            </div>
            <div className="text-sm font-medium">
                {message}
            </div>
        </div>
    );
};

export default Alert;
