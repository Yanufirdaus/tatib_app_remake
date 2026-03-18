import ListRoleTendik from "./ListRoleTendik";
import PageContainer from "@/components/ui/PageContainer";
import FeatureHeader from "@/components/ui/FeatureHeader";

const ManajemenTendikRoot = () => {
    return (
        <PageContainer className="py-6">
            <FeatureHeader title="Manajemen Tendik" showAction={false} />
            <ListRoleTendik />
        </PageContainer>
    )
}

export default ManajemenTendikRoot;