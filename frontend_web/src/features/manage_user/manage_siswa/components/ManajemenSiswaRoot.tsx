import ListKelas from "./ListKelas";
import TambahBanyakSiswa from "./TambahBanyakSiswa";
import PageContainer from "@/components/ui/PageContainer";
import FeatureHeader from "@/components/ui/FeatureHeader";

const ManajemenSiswaRoot = () => {
    return (
        <PageContainer className="py-6">
            <FeatureHeader title="Manajemen Siswa" showAction={false} />
            <TambahBanyakSiswa />
            <ListKelas />
        </PageContainer>
    )
}

export default ManajemenSiswaRoot;