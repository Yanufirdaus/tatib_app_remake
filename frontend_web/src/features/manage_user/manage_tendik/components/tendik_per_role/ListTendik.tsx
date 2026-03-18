import { useState } from "react";
import { useGetTendikByRole } from "@/features/manage_user/manage_tendik/hooks/useTendik";
import { TABLE_CLASSES } from "@/constants/ui";
import { type TendikRole } from "@/constants/roles";
import TableRowTendik from "./TableRowTendik";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

const ListTendik = ({ role }: { role: TendikRole }) => {
    const { data: tendik, isLoading: isLoadingTendik } = useGetTendikByRole(role);
    const [editId, setEditId] = useState<number | null>(null);

    return (
        <div className="flex flex-col gap-2 w-full px-4 md:px-0">
            {isLoadingTendik ? (
                <div className="flex flex-col gap-2 w-full max-w-4xl mx-auto">
                    {[...Array(5)].map((_, i) => (
                        <Skeleton key={i} height={50} className="w-full" />
                    ))}
                </div>
            ) : tendik?.length === 0 ? (
                <EmptyState 
                    title="Tenaga Pendidik Kosong" 
                    message={`Belum ada data untuk role ${role.toLowerCase()} saat ini.`} 
                />
            ) : (
                <div className="w-full overflow-x-auto pb-4 custom-scrollbar animate-fade-in">
                    <table className={`${TABLE_CLASSES.TABLE} min-w-[800px] max-w-7xl mx-auto`}>
                        <thead className={TABLE_CLASSES.THEAD}>
                            <tr>
                                <th className={TABLE_CLASSES.TH}>No</th>
                                <th className={TABLE_CLASSES.TH}>Nama</th>
                                <th className={TABLE_CLASSES.TH}>NIP</th>
                                <th className={TABLE_CLASSES.TH}>Jabatan</th>
                                <th className={TABLE_CLASSES.TH}>{editId ? "Simpan" : "Edit"}</th>
                                <th className={TABLE_CLASSES.TH}>{editId ? "Batal" : "Hapus"}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tendik?.map((t, index: number) => (
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