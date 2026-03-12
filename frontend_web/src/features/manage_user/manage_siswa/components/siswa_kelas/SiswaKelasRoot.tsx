import TitlePage from "../../../../../components/ui/TitlePage";
import { useKelasById } from "../../../../kelas/hooks/useKelas";
import ListSiswa from "./ListSiswa";

const SiswaKelasRoot = ({ id }: { id: number }) => {
    const { data: kelas, isLoading: isLoadingKelas } = useKelasById(id);


    return (
        <div className="flex flex-col min-h-screen w-full py-6 md:py-8 gap-4">
            <TitlePage title={`Siswa Kelas ${isLoadingKelas ? "" : kelas?.name.toUpperCase()}`} />
            <ListSiswa id={id} />
        </div>
    )
}

export default SiswaKelasRoot;