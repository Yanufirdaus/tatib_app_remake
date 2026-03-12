import { FaPlusSquare } from "react-icons/fa"
import ListKelas from "./ListKelas"
import { useFieldArray, useForm } from "react-hook-form"
import { AddManyKelasSchema, type AddKelasFormValues } from "../schema/add.kelas.schema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAddKelas } from "../hooks/useKelas"
import TitlePage from "../../../components/ui/TitlePage"

const ManajemenKelasRoot = () => {
    const { mutate, isPending, error: addKelasError } = useAddKelas();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm<AddKelasFormValues>({
        resolver: zodResolver(AddManyKelasSchema),
        defaultValues: { kelas: [] }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "kelas"
    });

    const onSubmit = (data: AddKelasFormValues) => {
        console.log(data)
        mutate(data, {
            onSuccess: () => {
                reset({
                    kelas: []
                })
                alert("Kelas berhasil ditambahkan")

                console.log(addKelasError?.message)
            },
            onError: (error: any) => {
                const message = error?.response?.data?.message || error?.message || "Terjadi kesalahan";
                alert(message);
            }
        }
        )
    }

    return (
        <div className="flex flex-col w-full min-h-screen items-center py-8 gap-6">
            <div className="flex flex-row w-full">
                <div className="basis-2/7"></div>
                <div className="basis-3/7">
                    <TitlePage title="Manajemen Kelas" />
                </div>
                <div className="flex flex-row basis-2/7 justify-center items-center">
                    <FaPlusSquare
                        className="size-6 fill-green-600"
                        onClick={() => {
                            append({
                                name: "",
                                grade: "10"
                            })
                        }} />
                </div>
            </div>
            <ListKelas fields={fields} register={register} cancelAddHandler={() => { remove() }} onSubmit={handleSubmit(onSubmit)} isPendingAddKelas={isPending} errors={errors} />
        </div>
    )
}

export default ManajemenKelasRoot