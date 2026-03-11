import type { ListPelanggaranComponentProps } from "../../../types/input.types"
import BodyTable from "./BodyTable";
import { useUpdatePelanggaran } from "../hooks/usePelanggaran";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UpdatePelanggaranSchema, type UpdatePelanggaranFormValues } from "../schemas/pelanggaran.schema";
import { useState } from "react";

const ListPelanggaran = ({isLoadingPelanggaran, pelanggaran} : ListPelanggaranComponentProps) => {
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
            { isLoadingPelanggaran ? 
                <div>loading</div> : 
                <div className="flex flex-row min-w-screen justify-center">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <table className="border-collapse md:border-separate table-auto border border-gray-400 max-w-sm md:max-w-lg min-w-sm md:min-w-lg text-sm md:text-base px-4 md:px-0">
                            <thead>
                                <tr>
                                    <th className="border border-gray-300 py-2 px-2">Pelanggaran</th>
                                    <th className="border border-gray-300 py-2 px-2">No</th>
                                    <th className="border border-gray-300 py-2 px-2">Poin</th>
                                    <th className="border border-gray-300 py-2 px-2">Edit</th>
                                    <th className="border border-gray-300 py-2 px-2">Delete</th>
                                </tr>
                            </thead>
                            <BodyTable pelanggaran={pelanggaran} editId={editId} register={register} setEditId={setEditId} isPending={isPending} setValue={setValue} errors={errors}/>
                        </table>
                    </form>
                </div>
            }
        </div>
    )
}

export default ListPelanggaran;