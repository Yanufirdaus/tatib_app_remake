import type { DataCardProps } from "../../types/input.types";

const DataCard = ({
    text,
    actionIcon,
    onActionClick,
    isActionDisabled = false,
    onCardClick
}: DataCardProps) => {
    return (
        <div
            className={`flex flex-row min-w-xs md:min-w-xl rounded-md border border-black bg-white transition-colors ${onCardClick ? 'cursor-pointer hover:bg-gray-100' : ''}`}
            onClick={onCardClick}
        >
            <div className="basis-5/6 py-4 pl-4 text-sm md:text-base text-gray-800 font-medium truncate">
                {text}
            </div>
            {onActionClick ? (
                <button
                    type="button"
                    className="basis-1/6 py-4 flex items-center justify-center disabled:opacity-50 transition-opacity"
                    onClick={(e) => {
                        e.stopPropagation();
                        onActionClick();
                    }}
                    disabled={isActionDisabled}
                >
                    {actionIcon}
                </button>
            ) : (
                <div className="basis-1/6 py-4 flex items-center justify-center">
                    {actionIcon}
                </div>
            )}
        </div>
    );
};

export default DataCard;
