import TitlePage from "../../../../components/ui/TitlePage";
import ListKelas from "./ListKelas";
import TambahBanyakSiswa from "./TambahBanyakSiswa";

const ManajemenSiswaRoot = () => {
    return (
        <div className="flex flex-col min-h-screen w-full gap-4 items-center py-6 md:py-8">
            <TitlePage title="Manajemen Siswa" />
            <TambahBanyakSiswa />
            <ListKelas />
        </div>
    )
}

export default ManajemenSiswaRoot;