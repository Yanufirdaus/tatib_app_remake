import ActionButtons from "@/components/ui/ActionButtons";
import Input from "@/components/ui/Input";
import SelectOption from "@/components/ui/SelectOption";
import { useAddSiswa } from "@/features/manage_user/manage_siswa/hooks/useAddSiswa";

import { motion, AnimatePresence } from "framer-motion";

const AddSiswa = ({ setIsAddSiswa, kelasId }: { setIsAddSiswa: (value: boolean) => void, kelasId: number }) => {
    const {
        options,
        isPendingCreateManySiswa,
        register,
        handleSubmit,
        errors,
        handleAddSiswa,
    } = useAddSiswa(setIsAddSiswa, kelasId);

    return (
        <form
            className="w-full flex justify-center py-6"
            onSubmit={handleSubmit(handleAddSiswa)}
        >
            <AnimatePresence>
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-2xl bg-slate-50 border border-slate-200 rounded-2xl p-6 md:p-8 flex flex-col gap-6 shadow-sm overflow-hidden"
                >
                    <div className="flex flex-col">
                        <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 mb-1">Single Addition</h3>
                        <p className="text-slate-800 font-bold md:text-xl">Tambah Siswa Baru ke Kelas</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <Input
                            {...register("siswa.0.name")}
                            label="Nama Lengkap"
                            placeholder="Contoh: Budi Santoso"
                            error={errors.siswa?.[0]?.name?.message}
                        />

                        <Input
                            {...register("siswa.0.nisn")}
                            label="NISN"
                            placeholder="Contoh: 0123456789"
                            error={errors.siswa?.[0]?.nisn?.message}
                        />

                        <div className="md:col-span-2">
                            <SelectOption
                                {...register("siswa.0.kelasId")}
                                label="Pilih Kelas"
                                selectOption={options}
                                defaultValue={String(kelasId)}
                            />
                        </div>
                    </div>

                    <div className="mt-4 pt-6 border-t border-slate-200">
                        <ActionButtons
                            submitText="Tambah Siswa"
                            loadingText="Menambahkan..."
                            onCancel={() => setIsAddSiswa(false)}
                            isPending={isPendingCreateManySiswa}
                            typeButton="submit"
                            className="py-0!"
                        />
                    </div>
                </motion.div>
            </AnimatePresence>
        </form>
    )
}

export default AddSiswa;