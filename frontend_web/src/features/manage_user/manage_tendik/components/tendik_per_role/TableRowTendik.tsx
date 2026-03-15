import { FaBackspace, FaEdit, FaSave, FaSpinner, FaTrashAlt } from "react-icons/fa";
import { tdClass } from "../../../manage_siswa/constants/table";
import type { TendikType } from "../../../type/user.type";
import { useState } from "react";
import { useDeleteTendik, useUpdateTendik } from "../../hooks/useTendik";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../../../../../components/ui/Input";
import { UpdateTendikSchema, type UpdateTendikFormValues } from "../../../schema/user.schema";

const TableRowTendik = ({
    t,
    index,
    editId,
    setEditId
}: {
    t: TendikType,
    index: number,
    editId: number | null,
    setEditId: (id: number | null) => void
}) => {
    const { mutate: deleteTendik, isPending: isPendingDeleteTendik } = useDeleteTendik();
    const { mutate: updateTendik, isPending: isPendingUpdateTendik } = useUpdateTendik(t.id);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const { register, handleSubmit, formState: { errors } } = useForm<UpdateTendikFormValues>({
        resolver: zodResolver(UpdateTendikSchema),
        defaultValues: {
            name: t.profileSiswa.name,
            nip: t.nip,
            role: t.profileSiswa.role,
        }
    });

    const handleDelete = () => {
        setDeleteId(t.id);
        if (confirm("Apakah anda yakin ingin menghapus tendik ini?")) {
            deleteTendik(t.id, {
                onSuccess: () => {
                    alert("Delete tendik berhasil")
                    setDeleteId(null);
                },
                onError: (err: any) => {
                    console.error(err);
                    alert(err.message)
                    setDeleteId(null);
                }
            })
        } else {
            setDeleteId(null);
        }
    }

    const onSubmit = (data: UpdateTendikFormValues) => {
        updateTendik(data, {
            onSuccess: () => {
                alert("Update tendik berhasil");
                setEditId(null);
            },
            onError: (err: any) => {
                console.error(err);
                alert(err.message);
            }
        });
    }

    return (
        <tr key={t.id}>
            <td className={`${tdClass} text-center`}>{index + 1}</td>
            <td className={tdClass}>
                {editId === t.id ? (
                    <Input
                        {...register("name")}
                        error={errors.name?.message}
                    />
                ) : (
                    t.profileSiswa.name.toUpperCase()
                )}
            </td>
            <td className={tdClass}>
                {editId === t.id ? (
                    <Input
                        {...register("nip")}
                        error={errors.nip?.message}
                    />
                ) : (
                    t.nip
                )}
            </td>
            <td className={`${tdClass} text-center`}>
                {editId === t.id ? (
                    <Input
                        {...register("role")}
                        error={errors.role?.message}
                    />
                ) : (
                    t.profileSiswa.role.toUpperCase()
                )}
            </td>
            <td className={`${tdClass} text-center`}>
                {editId === t.id ? (
                    isPendingUpdateTendik ? (
                        <FaSpinner className="inline fill-blue-500 hover:fill-blue-800 cursor-pointer animate-spin" />
                    ) : (
                        <FaSave
                            className="inline fill-blue-500 hover:fill-blue-800 cursor-pointer"
                            onClick={handleSubmit(onSubmit)}
                        />
                    )
                ) : (
                    <FaEdit
                        className="inline fill-blue-500 hover:fill-blue-800 cursor-pointer"
                        onClick={() => setEditId(t.id)}
                    />
                )}
            </td>
            <td className={`${tdClass} text-center`}>
                {editId === t.id ? (
                    <FaBackspace
                        className="inline fill-red-500 hover:fill-red-800 cursor-pointer"
                        onClick={() => setEditId(null)}
                    />
                ) : (
                    deleteId === t.id && isPendingDeleteTendik ? (
                        <FaSpinner className="inline fill-red-500 hover:fill-red-800 cursor-pointer animate-spin" />
                    ) : (
                        <FaTrashAlt
                            className="inline fill-red-500 hover:fill-red-800 cursor-pointer"
                            onClick={handleDelete}
                        />
                    )
                )}
            </td>
        </tr>
    )
}

export default TableRowTendik;