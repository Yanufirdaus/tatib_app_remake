import ActionButtons from "@/components/ui/ActionButtons";
import Input from "@/components/ui/Input";
import SelectOption from "@/components/ui/SelectOption";
import { useAddPelanggaran } from "@/features/pelanggaran/hooks/usePelanggaran";
import { type AddPelanggaranFormValues } from "@/features/pelanggaran/schemas/pelanggaran.schema";
import type { TambahPelanggaranProps } from "@/features/pelanggaran/type/pelanggaran.type";
import { FaTrash } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

const TambahPelanggaran = ({
    options,
    reset,
    fields,
    remove,
    register,
    handleSubmit,
    errors
}: TambahPelanggaranProps) => {
    const { mutate, isPending } = useAddPelanggaran();

    const onSubmit = (data: AddPelanggaranFormValues) => {
        mutate(data,
            {
                onSuccess: () => {
                    reset({
                        pelanggaran: []
                    })
                }
            }
        )
    }

    return (
        <form
            className="w-full flex justify-center py-6"
            onSubmit={handleSubmit(onSubmit)}
        >
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm overflow-hidden"
                >
                    <div className="flex flex-col">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-1">Batch Addition</h3>
                        <p className="text-slate-800 font-bold md:text-xl">Tambah Daftar Pelanggaran Baru</p>
                    </div>

                    <div className="flex flex-row gap-4 px-2">
                        <div className="basis-1/12 text-[10px] font-black uppercase tracking-widest text-slate-400">No</div>
                        <div className="basis-5/12 text-[10px] font-black uppercase tracking-widest text-slate-400">Pelanggaran</div>
                        <div className="basis-3/12 text-[10px] font-black uppercase tracking-widest text-slate-400">Jenis</div>
                        <div className="basis-1/12 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Poin</div>
                        <div className="basis-1/12 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Del</div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {fields?.map((field, index) => (
                            <motion.div
                                key={field.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-row gap-4 items-start"
                            >
                                <div className="basis-1/12">
                                    <Input
                                        placeholder="01"
                                        {...register(`pelanggaran.${index}.nomor` as const)}
                                        error={errors?.pelanggaran?.[index]?.nomor?.message}
                                        className="py-2! text-sm text-center"
                                    />
                                </div>
                                <div className="basis-5/12">
                                    <Input
                                        placeholder="Contoh: Terlambat masuk sekolah"
                                        {...register(`pelanggaran.${index}.pelanggaran` as const)}
                                        error={errors?.pelanggaran?.[index]?.pelanggaran?.message}
                                        className="py-2! text-sm"
                                    />
                                </div>
                                <div className="basis-3/12">
                                    <SelectOption
                                        selectOption={options}
                                        {...register(`pelanggaran.${index}.jenisId` as const)}
                                        className="py-1!"
                                    />
                                </div>
                                <div className="basis-1/12">
                                    <Input
                                        placeholder="10"
                                        {...register(`pelanggaran.${index}.poin` as const)}
                                        error={errors?.pelanggaran?.[index]?.poin?.message}
                                        className="py-2! text-sm text-center"
                                    />
                                </div>
                                <div className="basis-1/12 pt-2 flex justify-center">
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
                                    >
                                        <FaTrash size={14} />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    <div className="mt-4 pt-6 border-t border-slate-200">
                        <ActionButtons
                            submitText={`Simpan ${fields.length} Pelanggaran`}
                            loadingText="Menyimpan..."
                            onCancel={() => remove()}
                            isPending={isPending}
                            typeButton="submit"
                            className="py-0!"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        </form>
    )
}

export default TambahPelanggaran;