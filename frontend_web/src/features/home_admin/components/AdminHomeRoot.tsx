import HeroSection from "./HeroSection";
import SemesterSection from "./SemesterSection";
import MenuSection from "./MenuSection";
import PageContainer from "@/components/ui/PageContainer";

const AdminHomeRoot = () => {
    return (
        <PageContainer className="md:flex-row md:justify-center">
            <MenuSection />
            <div className="md:basis-4/5 flex flex-col flex-1 items-center justify-center gap-8 px-6 py-6">
                <HeroSection />
                <SemesterSection />
            </div>
        </PageContainer>
    )
}

export default AdminHomeRoot;