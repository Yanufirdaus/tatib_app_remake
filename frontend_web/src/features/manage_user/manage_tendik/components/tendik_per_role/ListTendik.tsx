import { useState } from "react";
import { thClass } from "../../../manage_siswa/constants/table";
import { useGetTendikByRole } from "../../hooks/useTendik";
import { Oval } from "react-loader-spinner";
import type { TendikType } from "../../../type/user.type";
import TableRowTendik from "./TableRowTendik";

const ListTendik = ({ role }: { role: string }) => {
    const { data: tendik, isLoading: isLoadingTendik } = useGetTendikByRole(role);
    const [editId, setEditId] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-2 w-full px-4 md:px-0">
            {isLoadingTendik ? (
                <div className="flex justify-center py-10">
                    <Oval color="#2dd4bf" height={50} width={50} />
                </div>
            ) : (
                <div className="w-full overflow-x-auto flex justify-start md:justify-center">
                    <table className="border-collapse md:border-separate table-auto border border-gray-400 w-full md:w-150 text-sm md:text-base">
                        <thead>
                            <tr>
                                <th className={thClass}>No</th>
                                <th className={thClass}>Nama</th>
                                <th className={thClass}>NIP</th>
                                <th className={thClass}>Jabatan</th>
                                <th className={thClass}>Edit</th>
                                <th className={thClass}>Hapus</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tendik?.map((t: TendikType, index: number) => (
                                <TableRowTendik key={t.id} t={t} index={index} editId={editId} setEditId={setEditId} />
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default ListTendik;