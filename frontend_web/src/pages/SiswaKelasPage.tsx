import { useParams } from "react-router-dom";
import SiswaKelasRoot from "../features/manage_user/manage_siswa/components/siswa_kelas/SiswaKelasRoot";

const SiswaKelasPage = () => {
    const { id } = useParams();

    return (
        <div>
            <SiswaKelasRoot id={Number(id)} />
        </div>
    )
}

export default SiswaKelasPage;