interface PageContainerProps {
    children: React.ReactNode;
    className?: string;
}

const PageContainer = ({ children, className = "" }: PageContainerProps) => {
    return (
        <div className={`flex flex-col min-h-screen w-full items-center gap-6 md:gap-8 ${className}`}>
            {children}
        </div>
    );
};

export default PageContainer;
