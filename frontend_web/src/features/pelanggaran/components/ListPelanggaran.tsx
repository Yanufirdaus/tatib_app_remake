import BodyTable from "./BodyTable";
import { useUpdatePelanggaran } from "../hooks/usePelanggaran";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePelanggaranSchema, type UpdatePelanggaranFormValues } from "../schemas/pelanggaran.schema";
import { useState } from "react";
import type { ListPelanggaranComponentProps } from "../type/pelanggaran.type";
import { Oval } from "react-loader-spinner";

const ListPelanggaran = ({ isLoadingPelanggaran, pelanggaran }: ListPelanggaranComponentProps) => {
    const { mutate, isPending, error: editPelanggaranError } = useUpdatePelanggaran();
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
        console.log(data)
        mutate({ id: editId, data },
            {
                onSuccess: () => {
                    alert("Edit pelanggaran berhasil")
                    setEditId(null);
                },
                onError: (err: any) => {
                    console.error(err);
                    alert(editPelanggaranError?.message)
                }
            })
    }

    return (
        <div>
            {isLoadingPelanggaran ?
                <Oval
                    color="#2dd4bf"
                    height={50}
                    width={50}
                /> :
                <div className="flex flex-row w-full justify-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table className="border-collapse md:border-separate table-auto border border-gray-400 w-90 md:w-150 text-sm md:text-base px-4 md:px-0">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 py-2 px-2">No</th>
                                    <th className="border border-gray-300 py-2 px-2">Pelanggaran</th>
                                    <th className="border border-gray-300 py-2 px-2">Poin</th>
                                    <th className="border border-gray-300 py-2 px-2">Edit</th>
                                    <th className="border border-gray-300 py-2 px-2">{editId ? "Batal" : "Delete"}</th>
                                </tr>
                            </thead>
                            <BodyTable pelanggaran={pelanggaran} editId={editId} register={register} setEditId={setEditId} isPending={isPending} setValue={setValue} errors={errors} />
                        </table>
                    </form>
                </div>
            }
        </div>
    )
}

export default ListPelanggaran;