import { useState } from "react";
import Input from "../../../components/ui/Input";
import { FaEdit, FaSave, FaSpinner, FaTrashAlt } from "react-icons/fa";
import { useDeletePelanggaran } from "../hooks/usePelanggaran";
import type { EditPelanggaranComponentProps } from "../type/pelanggaran.type";

const BodyTable = (
    {
        pelanggaran,
        editId,
        register,
        setEditId,
        isPending,
        setValue,
        errors
    }: EditPelanggaranComponentProps) => {
    const [deleteId, setDeleteId] = useState<number | null>(null);



    const { mutate: deletePelanggaran, isPending: isPendingDeletePelanggaran } = useDeletePelanggaran();

    const handleDeletePelanggaraan = (id: number) => {
        setDeleteId(id)
        if (confirm("Yakin ingin menghapus pelanggaran ini?")) {
            deletePelanggaran(id, {
                onError: (error: any) => {
                    const message = error?.response?.data?.message || error?.message || "Terjadi kesalahan";

                    alert(message);
                }
            });
        }
    }

    return (
        <tbody>
            {pelanggaran.map((data: any) => (
                <tr>
                    <td className="border border-gray-300 px-2 py-4 text-sm md:text-base text-center">
                        {data.nomor}
                    </td>
                    <td className="border border-gray-300 px-2 py-4 text-sm md:text-base">
                        {editId === data.id ? (
                            <Input
                                {...register("pelanggaran")}
                                defaultValue={data.pelanggaran}
                                error={errors?.pelanggaran?.message}
                            />
                        ) : (
                            <>{data.pelanggaran}</>
                        )}
                    </td>
                    <td className="border border-gray-300 items-center text-center py-4 text-sm md:text-base px-2">
                        {editId === data.id ? (
                            <Input
                                {...register("poin")}
                                defaultValue={data.poin}
                                error={errors?.poin?.message}
                            />
                        ) : (
                            <>{data.poin}</>
                        )}
                    </td>
                    <td className="border border-gray-300 py-4">
                        {editId === data.id ? (isPending ? (
                            <div className="w-full flex flex-row justify-center items-center">
                                <FaSpinner
                                    size={18}
                                    className="animate-spin text-gray-500"
                                    type="button"
                                />
                            </div>
                        ) : <div className="w-full flex flex-row justify-center items-center">
                            <button type="submit">
                                <FaSave
                                    size={18}
                                    className="cursor-pointer text-green-600"
                                />
                            </button>
                        </div>
                        ) : (
                            <div className="w-full flex flex-row justify-center items-center">
                                <FaEdit
                                    size={18}
                                    className="cursor-pointer text-black"
                                    type="button"
                                    onClick={() => {
                                        setEditId(data.id)

                                        setValue("pelanggaran", data.pelanggaran)
                                        setValue("poin", String(data.poin))
                                    }}
                                />
                            </div>
                        )}
                    </td>
                    <td className="border border-gray-300 py-4">
                        <div className="w-full flex flex-row justify-center items-center">
                            {deleteId === data.id ? (isPendingDeletePelanggaran ? (
                                <div className="w-full flex flex-row justify-center items-center">
                                    <FaSpinner
                                        size={18}
                                        className="animate-spin text-gray-500"
                                        type="button"
                                    />
                                </div>
                            ) : (<div className="w-full flex flex-row justify-center items-center">
                                <FaTrashAlt
                                    color="red" size={18}
                                    onClick={
                                        () => handleDeletePelanggaraan(data.id)
                                    }
                                />
                            </div>
                            )) : (
                                <FaTrashAlt
                                    color="red" size={18}
                                    onClick={
                                        () => handleDeletePelanggaraan(data.id)
                                    }
                                />
                            )
                            }
                        </div>
                    </td>
                </tr>
            ))}
        </tbody>
    )
}

export default BodyTable;