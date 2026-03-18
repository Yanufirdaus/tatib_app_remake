import { useState } from "react";
import Input from "@/components/ui/Input";
import { FaEdit, FaSave, FaTrash, FaUndo } from "react-icons/fa";
import { useDeletePelanggaran } from "@/features/pelanggaran/hooks/usePelanggaran";
import type { EditPelanggaranComponentProps } from "@/features/pelanggaran/type/pelanggaran.type";
import ConfirmModal from "@/components/ui/ConfirmModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { TABLE_CLASSES } from "@/constants/ui";

const BodyTable = (
    {
        pelanggaran,
        editId,
        register,
        setEditId,
        isPending,
        setValue,
        errors,
        handleSubmit,
        onSubmit
    }: EditPelanggaranComponentProps) => {
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const { mutate: deletePelanggaran, isPending: isPendingDeletePelanggaran, variables: deleteVars } = useDeletePelanggaran();

    const handleDeletePelanggaraan = (id: number) => {
        setDeleteId(id)
        setIsConfirmOpen(true);
    }

    const confirmDelete = () => {
        if (deleteId) {
            deletePelanggaran(deleteId, {
                onSuccess: () => {
                    setDeleteId(null);
                    setIsConfirmOpen(false);
                },
                onError: () => {
                    setDeleteId(null);
                    setIsConfirmOpen(false);
                }
            });
        }
    }

    return (
        <tbody className="divide-y divide-slate-100">
            <ConfirmModal
                isOpen={isConfirmOpen}
                title="Hapus Pelanggaran"
                message="Yakin ingin menghapus pelanggaran ini? Data yang dihapus tidak bisa dikembalikan."
                onClose={() => {
                    setIsConfirmOpen(false);
                }}
                onConfirm={confirmDelete}
            />
            {pelanggaran.map((data) => (
                <tr key={data.id} className={TABLE_CLASSES.TR_HOVER}>
                    <td className={TABLE_CLASSES.TD + " text-center"}>
                        {data.nomor}
                    </td>
                    <td className={`${TABLE_CLASSES.TD} !text-left !whitespace-normal min-w-[300px]`}>
                        {editId === data.id ? (
                            <Input
                                {...register("pelanggaran")}
                                defaultValue={data.pelanggaran}
                                error={errors?.pelanggaran?.message}
                                className="!py-1.5 text-sm"
                            />
                        ) : (
                            <span className="text-slate-700 font-medium">{data.pelanggaran}</span>
                        )}
                    </td>
                    <td className={TABLE_CLASSES.TD + " text-center"}>
                        {editId === data.id ? (
                            <Input
                                {...register("poin")}
                                defaultValue={String(data.poin)}
                                error={errors?.poin?.message}
                                className="!py-1.5 text-sm w-20 mx-auto"
                            />
                        ) : (
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                                {data.poin} Poin
                            </span>
                        )}
                    </td>
                    <td className={TABLE_CLASSES.TD}>
                        <div className="flex justify-center">
                            {editId === data.id ? (
                                isPending ? (
                                    <LoadingSpinner size={18} />
                                ) : (
                                    <button
                                        type="button"
                                        onClick={handleSubmit(onSubmit)}
                                        className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all active:scale-90"
                                        title="Simpan"
                                    >
                                        <FaSave size={18} />
                                    </button>
                                )
                            ) : (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setEditId(data.id)
                                        setValue("pelanggaran", data.pelanggaran)
                                        setValue("poin", String(data.poin))
                                    }}
                                    className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-90"
                                    title="Edit"
                                >
                                    <FaEdit size={18} />
                                </button>
                            )}
                        </div>
                    </td>
                    <td className={TABLE_CLASSES.TD}>
                        <div className="flex justify-center">
                            {deleteVars === data.id && isPendingDeletePelanggaran ? (
                                <LoadingSpinner size={18} type="oval" noPadding />
                            ) : (
                                editId === data.id ? (
                                    <button
                                        type="button"
                                        onClick={() => setEditId(null)}
                                        className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all active:scale-90"
                                        title="Batal"
                                    >
                                        <FaUndo size={16} />
                                    </button>
                                ) : (
                                    <button
                                        type="button"
                                        onClick={() => handleDeletePelanggaraan(data.id)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all active:scale-90"
                                        title="Hapus"
                                    >
                                        <FaTrash size={16} />
                                    </button>
                                )
                            )}
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default BodyTable;