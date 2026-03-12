import ActionButtons from "../../../components/ui/ActionButtons";
import Input from "../../../components/ui/Input";
import SelectOption from "../../../components/ui/option";
import { useAddPelanggaran } from "../hooks/usePelanggaran";
import { type AddPelanggaranFormValues } from "../schemas/pelanggaran.schema";
import type { TambahPelanggaranProps } from "../type/pelanggaran.type";

const TambahPelanggaran = ({
    options,
    reset,
    fields,
    remove,
    register,
    handleSubmit,
    errors
}: TambahPelanggaranProps) => {
    const { mutate, isPending, error } = useAddPelanggaran();

    const onSubmit = (data: AddPelanggaranFormValues) => {
        console.log(data)
        mutate(data,
            {
                onSuccess: () => {
                    reset({
                        pelanggaran: []
                    })
                    alert("Pelanggaran berhasil ditambahkan")

                    console.log(error?.message)
                },
                onError: (error: any) => {
                    const message = error?.response?.data?.message || error?.message || "Terjadi kesalahan";
                    alert(message);
                }
            }
        )
    }

    return (
        <form className="flex flex-col w-full justify-center items-center gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="text-sm md:text-base font-bold text-center">Tambah Pelanggaran</div>
            <div className="flex flex-col gap-4">
                {fields?.map((field, index) => (
                    <div key={field.id} className="w-100 md:w-150 grid grid-cols-11 justify-center px-6 md:px-0 gap-1">
                        <div className="col-span-2 md:col-span-1">
                            <Input
                                placeholder="No"
                                className="text-xs md:text-sm"
                                {...register(`pelanggaran.${index}.nomor` as const)}
                                error={errors?.pelanggaran?.[index]?.nomor?.message}
                            />
                        </div>
                        <div className="col-span-4 md:col-span-5">
                            <Input
                                placeholder="Pelanggaran"
                                className="text-xs md:text-sm"
                                {...register(`pelanggaran.${index}.pelanggaran` as const)}
                                error={errors?.pelanggaran?.[index]?.pelanggaran?.message}
                            />
                        </div>
                        <div className="col-span-3">
                            <div className="flex flex-col w-full h-full gap-4">
                                <SelectOption
                                    selectOption={options}
                                    className="w-full py-2"
                                    {...register(`pelanggaran.${index}.jenisId` as const)}
                                />
                            </div>
                        </div>
                        <div className="col-span-2">
                            <Input
                                placeholder="Poin"
                                className="text-xs md:text-sm"
                                {...register(`pelanggaran.${index}.poin` as const)}
                                error={errors?.pelanggaran?.[index]?.poin?.message}
                            />
                        </div>
                    </div>
                ))}
            </div>
            <ActionButtons
                submitText="Tambah"
                loadingText="Menambahkan..."
                cancelText="Batal"
                onCancel={() => remove()}
                isPending={isPending}
            />
        </form>
    )
}

export default TambahPelanggaran;