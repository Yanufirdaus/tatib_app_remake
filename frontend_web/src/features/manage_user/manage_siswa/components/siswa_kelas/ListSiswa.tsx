import { useState } from "react";
import { useKelas } from "@/features/kelas/hooks/useKelas";
import { HEADERS } from "@/features/manage_user/manage_siswa/constants/table";
import { TABLE_CLASSES } from "@/constants/ui";
import SiswaRow from "./SiswaRow";
import type { ListSiswaProps } from "@/features/manage_user/type/user.type";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

const ListSiswa = ({ siswa, isLoadingSiswa, fields, controlKelas }: ListSiswaProps) => {
    const [editId, setEditId] = useState<number | null>(null);

    const { data: kelas, isLoading: isLoadingKelas } = useKelas();

    const options = kelas?.map((k) => ({
        value: String(k.id),
        label: k.name
    })) || []

    return (
        <div className="w-full">
            {isLoadingSiswa ? (
                <div className="flex flex-col gap-2 w-full max-w-4xl mx-auto px-4 md:px-0">
                    {[...Array(10)].map((_, i) => (
                        <Skeleton key={i} height={40} className="w-full" />
                    ))}
                </div>
            ) : siswa.length === 0 ? (
                <EmptyState 
                    title="Data Siswa Kosong" 
                    message="Belum ada siswa yang terdaftar di kelas ini." 
                />
            ) : (
                <div className="w-full overflow-x-auto pb-4 custom-scrollbar">
                    <table className={`${TABLE_CLASSES.TABLE} min-w-[800px] max-w-7xl mx-auto`}>
                        <thead className={TABLE_CLASSES.THEAD}>
                            <tr>
                                {HEADERS.map((header) => (
                                    <th key={header} className={TABLE_CLASSES.TH}>{header}</th>
                                ))}
                                <th className={TABLE_CLASSES.TH}>{editId ? "Simpan" : "Edit"}</th>
                                <th className={TABLE_CLASSES.TH}>{editId ? "Batal" : "Hapus"}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {siswa.map((s, index) => (
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
            )}
        </div>
    )
}

export default ListSiswa;