import TitlePage from "../../../../components/ui/TitlePage";
import ListKelas from "./ListKelas";

const ManajemenSiswaRoot = () => {
    return (
        <div className="flex flex-col min-h-screen w-full py-6 md:py-8">
            <TitlePage title="Manajemen Siswa" />
            <ListKelas />
        </div>
    )
}

export default ManajemenSiswaRoot;