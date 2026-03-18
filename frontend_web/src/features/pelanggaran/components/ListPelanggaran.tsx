import BodyTable from "./BodyTable";
import { useUpdatePelanggaran } from "@/features/pelanggaran/hooks/usePelanggaran";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePelanggaranSchema, type UpdatePelanggaranFormValues } from "@/features/pelanggaran/schemas/pelanggaran.schema";
import { useState } from "react";
import type { ListPelanggaranComponentProps } from "@/features/pelanggaran/type/pelanggaran.type";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import { TABLE_CLASSES } from "@/constants/ui";

const ListPelanggaran = ({ isLoadingPelanggaran, pelanggaran }: ListPelanggaranComponentProps) => {
    const { mutate, isPending } = useUpdatePelanggaran();
    const [editId, setEditId] = useState<number | null>(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        setValue
    } = useForm<UpdatePelanggaranFormValues>({
        resolver: zodResolver(UpdatePelanggaranSchema)
    })

    const onSubmit = (data: UpdatePelanggaranFormValues) => {
        if (editId === null) return;
        mutate({ id: editId, data },
            {
                onSuccess: () => {
                    setEditId(null);
                }
            })
    }

    return (
        <div className="w-full">
            {isLoadingPelanggaran ? (
                <div className="flex flex-col gap-2 w-full max-w-4xl mx-auto">
                    {[...Array(8)].map((_, i) => (
                        <Skeleton key={i} height={50} className="w-full" />
                    ))}
                </div>
            ) : pelanggaran.length === 0 ? (
                <EmptyState
                    title="Pelanggaran Tidak Ditemukan"
                    message="Belum ada data pelanggaran yang terdaftar di database."
                />
            ) : (
                <div className="w-full overflow-x-auto pb-4 custom-scrollbar animate-fade-in">
                    <form className="w-full">
                        <table className={`${TABLE_CLASSES.TABLE} min-w-[900px] max-w-7xl mx-auto`}>
                            <thead className={TABLE_CLASSES.THEAD}>
                                <tr>
                                    <th className={TABLE_CLASSES.TH}>No</th>
                                    <th className={`${TABLE_CLASSES.TH} !text-left`}>Pelanggaran</th>
                                    <th className={TABLE_CLASSES.TH}>Poin</th>
                                    <th className={TABLE_CLASSES.TH}>{editId ? "Simpan" : "Edit"}</th>
                                    <th className={TABLE_CLASSES.TH}>{editId ? "Batal" : "Hapus"}</th>
                                </tr>
                            </thead>
                            <BodyTable
                                pelanggaran={pelanggaran}
                                editId={editId}
                                register={register}
                                setEditId={setEditId}
                                isPending={isPending}
                                setValue={setValue}
                                errors={errors}
                                handleSubmit={handleSubmit}
                                onSubmit={onSubmit}
                            />
                        </table>
                    </form>
                </div>
            )}
        </div>
    )
}

export default ListPelanggaran;
