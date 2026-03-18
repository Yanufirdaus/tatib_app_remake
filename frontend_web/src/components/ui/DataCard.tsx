import type { DataCardProps } from "@/types/input.types";
import { motion } from "framer-motion";

const DataCard = ({
    text,
    actionIcon,
    onActionClick,
    isActionDisabled = false,
    onCardClick
}: DataCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.005, backgroundColor: "rgba(248, 250, 252, 0.5)" }} // slate-50/50
            whileTap={{ scale: 0.995 }}
            className={`flex flex-row min-w-xs md:min-w-xl rounded-xl border border-slate-200 bg-white shadow-sm transition-all ${onCardClick ? 'cursor-pointer' : ''}`}
            onClick={onCardClick}
        >
            <div className="basis-5/6 py-5 pl-5 text-sm md:text-base text-gray-800 font-semibold truncate leading-relaxed">
                {text}
            </div>
            {onActionClick ? (
                <button
                    type="button"
                    className="basis-1/6 py-5 flex items-center justify-center disabled:opacity-50 transition-all hover:text-red-500 active:scale-90"
                    onClick={(e) => {
                        e.stopPropagation();
                        onActionClick();
                    }}
                    disabled={isActionDisabled}
                >
                    {actionIcon}
                </button>
            ) : (
                <div className="basis-1/6 py-5 flex items-center justify-center text-gray-400">
                    {actionIcon}
                </div>
            )}
        </motion.div>
    );
};

export default DataCard;
