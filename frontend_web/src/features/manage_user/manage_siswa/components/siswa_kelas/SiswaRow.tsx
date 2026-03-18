import { FaEdit, FaSave, FaTrash, FaUndo } from "react-icons/fa";
import Input from "@/components/ui/Input";
import SelectOption from "@/components/ui/SelectOption";
import { Controller, useForm } from "react-hook-form";
import { UpdateUserSchema, type UpdateUserFormValues } from "@/features/manage_user/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeleteSiswa, useUpdateSiswa } from "@/features/manage_user/manage_siswa/hooks/useSiswa";
import { useState } from "react";
import type { SiswaRowProps } from "@/features/manage_user/type/user.type";
import ConfirmModal from "@/components/ui/ConfirmModal";
import LoadingSpinner from "@/components/ui/LoadingSpinner";
import { TABLE_CLASSES } from "@/constants/ui";

const SiswaRow = ({
    s,
    editId,
    setEditId,
    isLoadingKelas,
    options, fields,
    controlKelas,
    index
}: SiswaRowProps) => {
    const { mutate: updateSiswa, isPending: isPendingUpdateSiswa } = useUpdateSiswa();
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateUserFormValues>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            name: s.profileSiswa.name,
            nisn: s.nisn,
            kelasId: String(s.kelasId),
        },
    });

    const { mutate: deleteSiswa, isPending: isPendingDeleteSiswa } = useDeleteSiswa();
    const [deleteId, setDeleteId] = useState<number | null>(null);
    const [isConfirmOpen, setIsConfirmOpen] = useState(false);

    const handleDelete = () => {
        setIsConfirmOpen(true);
    }

    const confirmDelete = () => {
        setDeleteId(s.id);
        deleteSiswa(s.id, {
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

    const onSubmit = (data: UpdateUserFormValues) => {
        updateSiswa({ id: s.id, data }, {
            onSuccess: () => {
                setEditId(null);
            },
        })
    }

    return (
        <tr key={s.id} className={TABLE_CLASSES.TR_HOVER}>
            <ConfirmModal
                isOpen={isConfirmOpen}
                title="Hapus Siswa"
                message={`Apakah anda yakin ingin menghapus siswa ${s.profileSiswa.name.toUpperCase()}?`}
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
            />
            <td className={TABLE_CLASSES.TD}>
                {editId === s.id ? (
                    <Input
                        {...register("name")}
                        defaultValue={s.profileSiswa.name}
                        error={errors?.name?.message}
                        className="!py-1 text-sm"
                    />
                ) : (
                    <span className="font-medium text-slate-700 text-start">{s.profileSiswa.name.toUpperCase()}</span>
                )}
            </td>
            <td className={TABLE_CLASSES.TD + " text-center"}>
                {editId === s.id ? (
                    <Input
                        {...register("nisn")}
                        defaultValue={s.nisn}
                        error={errors?.nisn?.message}
                        className="!py-1 text-sm"
                    />
                ) : (
                    <span className="text-slate-500 font-mono text-xs">{s.nisn}</span>
                )}
            </td>
            <td className={TABLE_CLASSES.TD + " text-center"}>
                {editId === s.id ? (
                    <SelectOption
                        selectOption={isLoadingKelas ? [] : options}
                        defaultValue={String(s.kelasId)}
                        {...register("kelasId")}
                        className="!py-1"
                    />
                ) : (
                    fields.length > 0 ? (
                        <Controller
                            name={`kelasUpdate.${index}.kelasIds`}
                            control={controlKelas}
                            render={({ field }) => (
                                <SelectOption
                                    selectOption={isLoadingKelas ? [] : options}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                    className="!py-1"
                                />
                            )}
                        />
                    ) : <span className="inline-flex items-center px-2 py-0.5 rounded bg-slate-100 text-slate-600 font-bold text-[10px]">{s.kelas.name.toUpperCase()}</span>
                )}
            </td>
            <td className={TABLE_CLASSES.TD + " text-center"}>
                <span className="font-bold text-blue-600">{s.poin}</span>
            </td>
            <td className={TABLE_CLASSES.TD}>
                <div className="flex justify-center items-center">
                    {editId === s.id ? (
                        isPendingUpdateSiswa ? (
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
                            onClick={() => setEditId(s.id)}
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
                    {editId === s.id ? (
                        <button
                            onClick={() => setEditId(null)}
                            className="p-2 text-slate-400 hover:text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                            title="Batal"
                        >
                            <FaUndo size={14} />
                        </button>
                    ) : (
                        deleteId === s.id && isPendingDeleteSiswa ? (
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
    );
};

export default SiswaRow;