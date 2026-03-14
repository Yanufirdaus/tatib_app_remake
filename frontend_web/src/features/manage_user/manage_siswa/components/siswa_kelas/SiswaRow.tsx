import { FaBackspace, FaEdit, FaSave, FaSpinner, FaTrashAlt } from "react-icons/fa";
import Input from "../../../../../components/ui/Input";
import SelectOption from "../../../../../components/ui/option";
import { tdClass } from "../../constants/table";
import { Controller, useForm } from "react-hook-form";
import { UpdateUserSchema, type UpdateUserFormValues } from "../../../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useDeleteSiswa, useUpdateSiswa } from "../../hooks/useSiswa";
import { useState } from "react";
import type { SiswaRowProps } from "../../../type/user.type";

const SiswaRow = ({
    s,
    editId,
    setEditId,
    isLoadingKelas,
    options, fields,
    controlKelas,
    index
}: SiswaRowProps) => {
    const { mutate: updateSiswa, isPending: isPendingUpdateSiswa } = useUpdateSiswa(s.id);
    const { register, handleSubmit, formState: { errors } } = useForm<UpdateUserFormValues>({
        resolver: zodResolver(UpdateUserSchema),
        defaultValues: {
            name: s.profileSiswa.name,
            nisn: s.nisn,
            kelasId: String(s.kelasId),
        },
    });

    const { mutate: deleteSiswa, isPending: isPendingDeleteSiswa } = useDeleteSiswa(s.id);
    const [deleteId, setDeleteId] = useState<number | null>(null);

    const handleDelete = () => {
        setDeleteId(s.id);
        if (confirm("Apakah anda yakin ingin menghapus siswa ini?")) {
            deleteSiswa(s.id, {
                onSuccess: () => {
                    alert("Delete siswa berhasil")
                    setDeleteId(null);
                },
                onError: (err: any) => {
                    console.error(err);
                    alert(err.message)
                }
            })
        }
    }

    const onSubmit = (data: UpdateUserFormValues) => {
        console.log(data);
        updateSiswa(data, {
            onSuccess: () => {
                alert("Edit siswa berhasil")
                setEditId(null);
            },
            onError: (err: any) => {
                console.error(err);
                alert(err.message)
            }
        })
    }

    return (
        <tr key={s.id}>
            <td className={tdClass}>
                {editId === s.id ? (
                    <Input
                        {...register("name")}
                        defaultValue={s.profileSiswa.name}
                        error={errors?.name?.message}
                    />
                ) : (
                    s.profileSiswa.name.toUpperCase()
                )}
            </td>
            <td className={tdClass}>
                {editId === s.id ? (
                    <Input
                        {...register("nisn")}
                        defaultValue={s.nisn}
                        error={errors?.nisn?.message}
                    />
                ) : (
                    s.nisn
                )}
            </td>
            <td className={`${tdClass} text-center`}>
                {editId === s.id ? (
                    <SelectOption
                        className="w-full py-2"
                        selectOption={isLoadingKelas ? [] : options}
                        defaultValue={String(s.kelasId)}
                        {...register("kelasId")}
                    />
                ) : (
                    fields.length > 0 ? (
                        <Controller
                            name={`kelasUpdate.${index}.kelasIds`}
                            control={controlKelas}
                            render={({ field }) => (
                                <SelectOption
                                    className="w-full py-2"
                                    selectOption={isLoadingKelas ? [] : options}
                                    value={field.value}
                                    onChange={field.onChange}
                                    onBlur={field.onBlur}
                                    ref={field.ref}
                                />
                            )}
                        />
                    ) : s.kelas.name.toUpperCase()
                )}
            </td>
            <td className={`${tdClass} text-center`}>{s.poin}</td>
            <td className={`${tdClass} text-center`}>
                {editId === s.id ? (
                    isPendingUpdateSiswa ? (
                        <FaSpinner className="inline fill-blue-500 hover:fill-gray-800 cursor-pointer animate-spin" />
                    ) : (
                        <FaSave className="inline fill-blue-500 hover:fill-blue-800 cursor-pointer"
                            onClick={handleSubmit(onSubmit)}
                        />
                    )
                ) : (
                    <FaEdit
                        className="inline fill-blue-500 hover:fill-blue-800 cursor-pointer"
                        onClick={() => setEditId(s.id)}
                    />
                )}
            </td>
            <td className={`${tdClass} text-center`}>
                {editId === s.id ? (
                    <FaBackspace className="inline fill-red-500 hover:fill-red-800 cursor-pointer"
                        onClick={() => setEditId(null)}
                    />
                ) : (
                    deleteId === s.id ? (
                        isPendingDeleteSiswa ? (
                            <FaSpinner className="inline fill-red-500 hover:fill-red-800 cursor-pointer animate-spin" />
                        ) : (
                            <FaTrashAlt className="inline fill-red-500 hover:fill-red-800 cursor-pointer" />
                        )
                    ) : (
                        <FaTrashAlt
                            className="inline fill-red-500 hover:fill-red-800 cursor-pointer"
                            onClick={handleDelete}
                        />
                    )
                )}
            </td>
        </tr>
    );
};

export default SiswaRow;