import { FaPlusSquare } from "react-icons/fa";
import TitlePage from "./TitlePage";

interface FeatureHeaderProps {
    title: string;
    onActionClick?: () => void;
    actionIcon?: React.ReactNode;
    showAction?: boolean;
}

const FeatureHeader = ({
    title,
    onActionClick,
    actionIcon = <FaPlusSquare className="size-6 fill-green-600 cursor-pointer" />,
    showAction = true
}: FeatureHeaderProps) => {
    return (
        <div className="flex flex-row w-full items-center">
            <div className="basis-2/8"></div>
            <div className="basis-6/8">
                <TitlePage title={title} />
            </div>
            <div className="basis-2/8 flex justify-center">
                {showAction && onActionClick && (
                    <div onClick={onActionClick}>
                        {actionIcon}
                    </div>
                )}
            </div>
        </div>
    );
};

export default FeatureHeader;
