import { FaEdit, FaSave, FaTrash, FaUndo } from "react-icons/fa";
import { TABLE_CLASSES } from "@/constants/ui";
import type { Tendik } from "@/types/models";
import { useState } from "react";
import { useDeleteTendik, useUpdateTendik } from "@/features/manage_user/manage_tendik/hooks/useTendik";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "@/components/ui/Input";
import { UpdateTendikSchema, type UpdateTendikFormValues } from "@/features/manage_user/schemas/user.schema";
import ConfirmModal from "@/components/ui/ConfirmModal";
import SelectOption from "@/components/ui/SelectOption";
import { ROLES } from "@/constants/roles";
import LoadingSpinner from "@/components/ui/LoadingSpinner";

const TableRowTendik = ({
    t,
    index,
    editId,
    setEditId
}: {
    t: Tendik,
    index: number,
    editId: number | null,
    setEditId: (id: number | null) => void
}) => {
    const { mutate: deleteTendik, isPending: isPendingDeleteTendik } = useDeleteTendik();
    const { mutate: updateTendik, isPending: isPendingUpdateTendik } = useUpdateTendik();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateTendikFormValues>({
        resolver: zodResolver(UpdateTendikSchema),
        defaultValues: {
            name: t.profileSiswa.name,
            nip: t.nip,
            role: t.profileSiswa.role,
        }
    });

    const handleDelete = () => {
        setIsConfirmOpen(true);
    }

    const confirmDelete = () => {
        setDeleteId(t.id);
        deleteTendik(t.id, {
            onSuccess: () => {
                setDeleteId(null);
                setIsConfirmOpen(false);
            },
            onError: () => {
                setDeleteId(null);
                setIsConfirmOpen(false);
            }
        })
    }

    const onSubmit = (data: UpdateTendikFormValues) => {
        updateTendik({ id: t.id, data }, {
            onSuccess: () => {
                setEditId(null);
            }
        });
    }

    return (
        <tr key={t.id} className={TABLE_CLASSES.TR_HOVER}>
            <ConfirmModal
                isOpen={isConfirmOpen}
                title="Hapus Tendik"
                message={`Yakin ingin menghapus tendik ${t.profileSiswa.name.toUpperCase()}?`}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
            />
            <td className={TABLE_CLASSES.TD + " text-center"}>
                <span className="text-slate-400 font-medium">{index + 1}</span>
            </td>
            <td className={TABLE_CLASSES.TD}>
                {editId === t.id ? (
                    <Input
                        {...register("name")}
                        error={errors.name?.message}
                        className="py-1! text-sm"
                    />
                ) : (
                    <span className="font-medium text-slate-700">{t.profileSiswa.name.toUpperCase()}</span>
                )}
            </td>
            <td className={TABLE_CLASSES.TD + " text-center"}>
                {editId === t.id ? (
                    <Input
                        {...register("nip")}
                        error={errors.nip?.message}
                        className="py-1! text-sm"
                    />
                ) : (
                    <span className="text-slate-500 font-mono text-xs">{t.nip}</span>
                )}
            </td>
            <td className={TABLE_CLASSES.TD}>
                <div className="flex justify-center">
                    {editId === t.id ? (
                        <SelectOption
                            {...register("role")}
                            error={errors.role?.message}
                            className="py-1!"
                            selectOption={[
                                { value: ROLES.ADMIN, label: "ADMIN" },
                                { value: ROLES.KESISWAAN, label: "KESISWAAN" },
                                { value: ROLES.BK, label: "BK" },
                                { value: ROLES.KEPSEK, label: "KEPSEK" },
                            ]}
                        />
                    ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded bg-blue-50 text-blue-700 font-bold text-[10px]">
                            {t.profileSiswa.role.toUpperCase()}
                        </span>
                    )}
                </div>
            </td>
            <td className={TABLE_CLASSES.TD}>
                <div className="flex justify-center items-center">
                    {editId === t.id ? (
                        isPendingUpdateTendik ? (
                            <LoadingSpinner size={16} />
                        ) : (
                            <button
                                onClick={handleSubmit(onSubmit)}
                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-all"
                                title="Simpan"
                            >
                                <FaSave size={16} />
                            </button>
                        )
                    ) : (
                        <button
                            onClick={() => setEditId(t.id)}
                            className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                            title="Edit"
                        >
                            <FaEdit size={16} />
                        </button>
                    )}
                </div>
            </td>
            <td className={TABLE_CLASSES.TD}>
                <div className="flex justify-center items-center">
                    {editId === t.id ? (
                        <button
                            onClick={() => setEditId(null)}
                            className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                            title="Batal"
                        >
                            <FaUndo size={14} />
                        </button>
                    ) : (
                        deleteId === t.id && isPendingDeleteTendik ? (
                            <LoadingSpinner size={16} />
                        ) : (
                            <button
                                onClick={handleDelete}
                                className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                title="Hapus"
                            >
                                <FaTrash size={14} />
                            </button>
                        )
                    )}
                </div>
            </td>
        </tr>
    )
}

export default TableRowTendik;