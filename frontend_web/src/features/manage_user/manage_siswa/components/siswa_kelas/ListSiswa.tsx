import { Oval } from "react-loader-spinner";
import { HEADERS, thClass } from "../../constants/table";
import { useState } from "react";
import { useKelas } from "../../../../kelas/hooks/useKelas";
import SiswaRow from "./SiswaRow";
import type { ListSiswaProps } from "../../../type/user.type";

const ListSiswa = ({ siswa, isLoadingSiswa, fields, controlKelas }: ListSiswaProps) => {
    const [editId, setEditId] = useState<number | null>(null);

    const { data: kelas, isLoading: isLoadingKelas } = useKelas();

    const options = kelas?.map((k: any) => ({
        value: String(k.id),
        label: k.name
    }))

    return (
        <div >
            {isLoadingSiswa ? (
                <div className="flex justify-center h-screen">
                    <Oval
                        color="#2dd4bf"
                        height={50}
                        width={50}
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-2 w-full px-4 md:px-0">
                    <div className="w-full overflow-x-auto flex justify-start md:justify-center">
                        <table className="border-collapse md:border-separate table-auto border border-gray-400 w-full md:w-150 text-sm md:text-base">
                            <thead>
                                <tr>
                                    {HEADERS.map((header) => (
                                        <th key={header} className={thClass}>{header}</th>
                                    ))}
                                    {editId ? (
                                        <th className={thClass}>Batal</th>
                                    ) : (
                                        <th className={thClass}>Hapus</th>
                                    )}
                                </tr>
                            </thead>
                            <tbody>
                                {siswa.map((s: any, index: number) => (
                                    <SiswaRow
                                        key={s.id}
                                        s={s}
                                        editId={editId}
                                        setEditId={setEditId}
                                        isLoadingKelas={isLoadingKelas}
                                        options={options}
                                        fields={fields}
                                        controlKelas={controlKelas}
                                        index={index}
                                    />
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