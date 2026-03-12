import { FaChevronRight } from "react-icons/fa";
import { useKelas } from "../../../../features/kelas/hooks/useKelas";
import { Oval } from "react-loader-spinner";
import DataCard from "../../../../components/ui/DataCard";
import { useNavigate } from "react-router-dom";

const ListKelas = () => {
    const { data, isLoading, error } = useKelas();
    const navigate = useNavigate();

    if (error) {
        return <div className="text-red-500 text-center">Gagal memuat data kelas: {error.message}</div>;
    }

    return (
        <div className="flex flex-col gap-2 mt-4 w-full md:w-auto items-center">
            {isLoading ? (
                <div className="flex flex-col gap-2">
                    <Oval
                        height="50"
                        width="50"
                        color="#2dd4bf"
                        ariaLabel="oval-loading"
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {data?.map((item: any) => (
                        <DataCard
                            key={item.id}
                            text={item.name}
                            actionIcon={<FaChevronRight className="fill-gray-600 transition-colors" />}
                            onCardClick={() => navigate(`/manajemen-siswa/kelas/${item.id}`)}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}

export default ListKelas;