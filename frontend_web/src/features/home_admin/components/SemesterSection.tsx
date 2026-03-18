import { FaEdit } from "react-icons/fa";
import Input from "@/components/ui/Input";
import ActionButtons from "@/components/ui/ActionButtons";
import SelectOption from "@/components/ui/SelectOption";
import Skeleton from "@/components/ui/Skeleton";
import Alert from "@/components/ui/Alert";
import { useSemesterManagement } from "@/features/home_admin/hooks/useSemesterManagement";
import { motion, AnimatePresence } from "framer-motion";

const SemesterSection = () => {
    const {
        onEdit,
        semesterData,
        isLoading,
        isPending,
        editSemesterError,
        register,
        errors,
        semesterOptions,
        handleSubmit,
        onSubmit,
        setOnEdit
    } = useSemesterManagement();

    return (
        <div className="w-full max-w-3xl flex flex-col gap-6 items-center">
            {editSemesterError && (
                <div className="w-full animate-shake">
                    <Alert type="error" message={editSemesterError.message} />
                </div>
            )}

            <form 
                id="update-semester-form" 
                onSubmit={handleSubmit(onSubmit)}
                className="w-full py-8 md:py-10 px-6 md:px-12 rounded-2xl bg-slate-50 border border-slate-200 shadow-sm flex flex-col gap-6"
            >
                <div className="flex flex-col md:flex-row w-full justify-between items-center gap-6">
                    <div className="flex flex-col">
                        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-1">Status Akademik</h3>
                        <p className="text-slate-800 font-semibold md:text-lg">Tahun Ajaran & Semester</p>
                    </div>

                    <div className="flex flex-row items-center gap-4 bg-white p-2 md:p-3 rounded-xl border border-slate-200 shadow-sm">
                        <AnimatePresence mode="wait">
                            {!onEdit ? (
                                <motion.div 
                                    key="display"
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 10 }}
                                    className="flex flex-row items-center gap-3 px-4"
                                >
                                    {isLoading ? (
                                        <div className="flex gap-2">
                                            <Skeleton width={80} height={24} />
                                            <p className="text-slate-300">/</p>
                                            <Skeleton width={60} height={24} />
                                        </div>
                                    ) : (
                                        <>
                                            <span className="text-blue-600 font-bold md:text-xl">{semesterData?.tahun_ajaran}</span>
                                            <span className="text-slate-300 font-light text-xl">|</span>
                                            <span className="text-slate-600 font-semibold md:text-lg uppercase">{semesterData?.semester}</span>
                                        </>
                                    )}
                                    
                                    {!onEdit && (
                                        <button
                                            type="button"
                                            className="ml-4 p-2.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-all shadow-sm active:scale-95"
                                            onClick={() => setOnEdit(true)}
                                            title="Ubah Semester"
                                        >
                                            <FaEdit size={16} />
                                        </button>
                                    )}
                                </motion.div>
                            ) : (
                                <motion.div 
                                    key="edit"
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    className="flex flex-col md:flex-row items-center gap-4 p-1"
                                >
                                    <div className="flex flex-row items-center gap-3">
                                        <Input
                                            {...register("tahun_ajaran")}
                                            placeholder="ex: 2024-2025"
                                            className="!py-2 w-32 md:w-40 text-sm"
                                            error={errors.tahun_ajaran?.message}
                                            defaultValue={semesterData?.tahun_ajaran}
                                        />
                                        <span className="text-slate-300 text-xl">/</span>
                                        <SelectOption
                                            {...register("semester")}
                                            selectOption={semesterOptions}
                                            className="!py-2 w-32 md:w-36 text-sm"
                                            defaultValue={semesterData?.semester}
                                        />
                                    </div>
                                    
                                    <ActionButtons
                                        onCancel={() => setOnEdit(false)}
                                        isPending={isPending}
                                        submitText="Simpan"
                                        loadingText="Updating..."
                                        className="!py-0"
                                        typeButton="submit"
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default SemesterSection;