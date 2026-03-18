interface SkeletonProps {
    className?: string;
    width?: string | number;
    height?: string | number;
    variant?: "text" | "circular" | "rectangular";
}

const Skeleton = ({
    className = "",
    width,
    height,
    variant = "rectangular"
}: SkeletonProps) => {
    const variants = {
        text: "rounded h-4 w-full",
        circular: "rounded-full",
        rectangular: "rounded",
    };

    return (
        <div
            className={`animate-pulse bg-gray-200 ${variants[variant]} ${className}`}
            style={{ width, height }}
        />
    );
};

export default Skeleton;
