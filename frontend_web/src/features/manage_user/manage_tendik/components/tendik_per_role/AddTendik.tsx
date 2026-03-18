import { FaTrash } from "react-icons/fa";
import { type FieldArrayWithId, type UseFormRegister, type FieldErrors, type UseFormReset } from "react-hook-form";
import { type CreateTendikFormValues, type TendikRole } from "@/features/manage_user/schemas/user.schema";
import Input from "@/components/ui/Input";
import ActionButtons from "@/components/ui/ActionButtons";
import { motion, AnimatePresence } from "framer-motion";

interface AddTendikFormProps {
    fields: FieldArrayWithId<CreateTendikFormValues, "tendik", "id">[];
    registerAdd: UseFormRegister<CreateTendikFormValues>;
    errorAdd: FieldErrors<CreateTendikFormValues>;
    remove: (index?: number | number[]) => void;
    onSubmitAdd: () => void;
    isPendingAddTendik: boolean;
    reset: UseFormReset<CreateTendikFormValues>;
    role: TendikRole;
}

const AddTendikForm = ({
    fields,
    registerAdd,
    errorAdd,
    remove,
    onSubmitAdd,
    isPendingAddTendik,
    reset,
    role
}: AddTendikFormProps) => {
    if (fields.length === 0) return null;

    return (
        <form 
            className="w-full flex justify-center py-6"
            onSubmit={(e) => {
                e.preventDefault();
                onSubmitAdd();
            }}
        >
            <AnimatePresence>
                <motion.div 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-4xl bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm overflow-hidden"
                >
                    <div className="flex flex-col">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-1">Batch Addition</h3>
                        <p className="text-slate-800 font-bold md:text-xl">Tambah Tendik {role.toUpperCase()} Baru</p>
                    </div>

                    <div className="flex flex-row gap-4 px-2">
                        <div className="basis-5/12 text-[10px] font-black uppercase tracking-widest text-slate-400">Nama Lengkap</div>
                        <div className="basis-3/12 text-[10px] font-black uppercase tracking-widest text-slate-400">NIP</div>
                        <div className="basis-3/12 text-[10px] font-black uppercase tracking-widest text-slate-400">Role</div>
                        <div className="basis-1/12 text-center text-[10px] font-black uppercase tracking-widest text-slate-400">Del</div>
                    </div>

                    <div className="flex flex-col gap-4">
                        {fields.map((field, index) => (
                            <motion.div 
                                key={field.id}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="flex flex-row gap-4 items-start"
                            >
                                <div className="basis-5/12">
                                    <Input
                                        placeholder="Masukkan Nama"
                                        {...registerAdd(`tendik.${index}.name`)}
                                        error={errorAdd.tendik?.[index]?.name?.message}
                                        className="!py-2 text-sm"
                                    />
                                </div>
                                <div className="basis-3/12">
                                    <Input
                                        placeholder="Masukkan NIP"
                                        {...registerAdd(`tendik.${index}.nip`)}
                                        error={errorAdd.tendik?.[index]?.nip?.message}
                                        className="!py-2 text-sm"
                                    />
                                </div>
                                <div className="basis-3/12">
                                    <Input
                                        {...registerAdd(`tendik.${index}.role`)}
                                        error={errorAdd.tendik?.[index]?.role?.message}
                                        className="!py-2 text-sm bg-slate-100 !border-slate-300 font-bold text-slate-500"
                                        readOnly
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
                            submitText={`Simpan ${fields.length} Tendik`}
                            loadingText="Menyimpan..."
                            onCancel={() => reset()}
                            isPending={isPendingAddTendik}
                            typeButton="submit"
                            className="!py-0"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        </form>
    );
};

export default AddTendikForm;
