import HeroSection from "./HeroSection";
import SemesterSection from "./SemesterSection";
import MenuSection from "./MenuSection";

const AdminHomeRoot = () => {
    return (
        <div className="flex flex-col md:flex-row min-h-screen items-center justify-center">
            <MenuSection />
            <div className="basis-4/5 flex flex-col flex-1 items-center justify-center gap-8">
                <HeroSection />
                <SemesterSection />
            </div>
        </div>
        
    )
}

export default AdminHomeRoot;