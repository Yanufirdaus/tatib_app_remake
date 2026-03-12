import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useSiswaByKelas } from "../../hooks/useSiswa";

const ListSiswa = ({ id }: { id: number }) => {
    const { data: siswa, isLoading: isLoadingSiswa } = useSiswaByKelas(id);

    console.log(siswa)

    return (
        <div >
            {isLoadingSiswa ? (
                <p>Loading...</p>
            ) : (
                <div className="flex flex-col gap-2 w-full px-4 md:px-0">
                    <div className="w-full overflow-x-auto">
                        <table className="border-collapse md:border-separate table-auto border border-gray-400 w-full md:w-150 text-sm md:text-base">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">Nama</th>
                                    <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">NISN</th>
                                    <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">Kelas</th>
                                    <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">Poin</th>
                                    <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">Hapus</th>
                                    <th className="border border-gray-300 py-2 px-2 whitespace-nowrap">Edit</th>
                                </tr>
                            </thead>
                            <tbody>
                                {siswa.map((s: any) => (
                                    <tr key={s.id}>
                                        <td className="border border-gray-300 px-2 py-4 text-sm md:text-base whitespace-nowrap">{s.profileSiswa.name}</td>
                                        <td className="border border-gray-300 px-2 py-4 text-sm md:text-base whitespace-nowrap">{s.nisn}</td>
                                        <td className="border border-gray-300 px-2 py-4 text-sm md:text-base whitespace-nowrap">{s.kelas.name}</td>
                                        <td className="border border-gray-300 px-2 py-4 text-sm md:text-base whitespace-nowrap text-center">{s.poin}</td>
                                        <td className="border border-gray-300 px-2 py-4 text-sm md:text-base whitespace-nowrap text-center"><FaTrashAlt className="inline fill-red-500 hover:fill-red-800 cursor-pointer" /></td>
                                        <td className="border border-gray-300 px-2 py-4 text-sm md:text-base whitespace-nowrap text-center"><FaEdit className="inline fill-blue-500 hover:fill-blue-800 cursor-pointer" /></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default ListSiswa;