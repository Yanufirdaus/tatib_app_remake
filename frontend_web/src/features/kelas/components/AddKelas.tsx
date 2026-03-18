import Input from "@/components/ui/Input"
import ActionButtons from "@/components/ui/ActionButtons"
import type { AddKelasProps } from "@/features/kelas/type/add.kelas.props.type";
import { motion, AnimatePresence } from "framer-motion";

const AddKelas = ({
    fields,
    register,
    cancelAddHandler,
    onSubmit,
    isPendingAddKelas,
    errors
}: AddKelasProps) => {

    return (
        <form
            className="w-full flex justify-center px-4"
            onSubmit={onSubmit}
        >
            <AnimatePresence>
                {fields?.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="w-full max-w-2xl bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm overflow-hidden"
                    >
                        <div className="flex flex-col">
                            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-1">Batch Addition</h3>
                            <p className="text-slate-800 font-bold md:text-xl">Form Penambahan Kelas Baru</p>
                        </div>

                        <div className="flex flex-row gap-4 px-2">
                            <div className="basis-1/3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Grade (10/11/12)
                            </div>
                            <div className="basis-2/3 text-[10px] font-black uppercase tracking-widest text-slate-400">
                                Nama Kelas
                            </div>
                        </div>

                        <div className="flex flex-col gap-4">
                            {fields?.map((field, index) => (
                                <motion.div
                                    key={field.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex flex-row gap-4 items-start"
                                >
                                    <div className="basis-1/3">
                                        <Input
                                            {...register(`kelas.${index}.grade` as const)}
                                            placeholder="ex: 10"
                                            error={errors?.kelas?.[index]?.grade?.message}
                                            className="!py-2.5 text-sm"
                                        />
                                    </div>
                                    <div className="basis-2/3">
                                        <Input
                                            {...register(`kelas.${index}.name` as const)}
                                            placeholder="ex: XI SAINKES 1"
                                            error={errors?.kelas?.[index]?.name?.message}
                                            className="!py-2.5 text-sm"
                                        />
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        <div className="mt-4 pt-6 border-t border-slate-200">
                            <ActionButtons
                                onCancel={cancelAddHandler}
                                isPending={isPendingAddKelas}
                                submitText="Simpan Batch"
                                loadingText="Menyimpan..."
                                typeButton="submit"
                                className="!py-0"
                            />
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </form>
    )
}

export default AddKelas;
