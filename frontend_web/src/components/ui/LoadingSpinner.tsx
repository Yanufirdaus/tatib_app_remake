import { ThreeDots, Oval } from 'react-loader-spinner';

interface LoadingSpinnerProps {
    fullScreen?: boolean;
    size?: number | string;
    color?: string;
    type?: 'three-dots' | 'oval';
    noPadding?: boolean;
    className?: string;
}

const LoadingSpinner = ({
    fullScreen = false,
    size = 80,
    color = "#2dd4bf",
    type = 'three-dots',
    noPadding = false,
    className = ""
}: LoadingSpinnerProps) => {
    const renderSpinner = () => {
        switch (type) {
            case 'oval':
                return (
                    <Oval
                        visible={true}
                        height={size}
                        width={size}
                        color={color}
                        secondaryColor={color}
                        ariaLabel="oval-loading"
                        strokeWidth={4}
                    />
                );
            case 'three-dots':
            default:
                return (
                    <ThreeDots
                        visible={true}
                        height={size}
                        width={size}
                        color={color}
                        radius="9"
                        ariaLabel="three-dots-loading"
                    />
                );
        }
    };

    if (fullScreen) {
        return (
            <div className={`flex flex-1 min-h-[400px] w-full items-center justify-center ${className}`}>
                {renderSpinner()}
            </div>
        );
    }

    return (
        <div className={noPadding ? className : `flex justify-center items-center py-4 w-full ${className}`}>
            {renderSpinner()}
        </div>
    );
};

export default LoadingSpinner;
