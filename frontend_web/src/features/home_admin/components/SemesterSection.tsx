import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Input from "../../../components/ui/Input";
import { useEditSemester, useSemester } from "../hooks/useSemester";
import { useForm } from "react-hook-form";
import { UpdateSemesterSchema, type UpdateSemesterFormValues } from "../../login/schema/update.semester.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const SemesterSection = () => {
    const [ onEdit, setOnEdit]  = useState(false);
    const { data, isLoading, error: semesterError } = useSemester();

    const { mutate, isPending, error: editSemesterError } = useEditSemester();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<UpdateSemesterFormValues>({
        resolver: zodResolver(UpdateSemesterSchema)
    })

    const onSubmit = (data: UpdateSemesterFormValues) => {
        mutate(data, {
            onSuccess: () => {
                setOnEdit(false)
            },
            onError: (err: any) => {
                console.error(err);
            }
        })
    }


    return (
        <form id="update-semester-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col md:flex-row w-full justify-center items-center md:items-top gap-2 md:gap-4 md:px-6">
                <p>Tahun Ajaran</p>
                <div className="flex flex-row justify-center items:center md:items-top gap-2 md:gap-4">
                    {!onEdit ? (
                            <div className="flex flex-row justify-center items-center md:items-top gap-2 md:gap-4">
                                <p>{data?.tahun_ajaran}</p>
                                <p>/</p>
                                <p>{data?.semester}</p>
                            </div>
                            
                        ) : (
                            <div className="flex flex-row justify-center items-center md:items-top gap-2 md:gap-4 px-18 md:px-0">
                                <Input 
                                    {...register("tahun_ajaran")}
                                    placeholder="ex: 2024-2025"
                                    className="text-xs w-auto"
                                    error={errors.tahun_ajaran?.message}
                                />
                                <p>/</p>
                                <Input 
                                    {...register("semester")}
                                    placeholder="ganjil/genap"
                                    className="text-xs w-auto"
                                    error={errors.semester?.message}
                                />
                            </div>
                            
                        )

                    }
                    
                    {!onEdit ? (
                            <button 
                                className="bg-blue-500 px-1 py-1 rounded-sm hover:bg-blue-700"
                                onClick={()=>setOnEdit(true)}
                            >
                                <FaEdit color="white"/>
                            </button>
                        ):(
                            <></>
                        )
                    }
                    
                </div>
                {!onEdit ? (
                        <></>
                    ) : (
                        <div className="flex flex-row justify-center items-top h-fit gap-2 md:gap-4">
                            <button 
                                className="bg-red-600 px-2 py-1 rounded-sm hover:bg-red-900 text-xs text-white font-medium"
                                onClick={()=>setOnEdit(false)}
                            >
                                Batal
                            </button>
                            <button 
                                type="submit"
                                className="bg-blue-500 px-2 py-1 rounded-sm hover:bg-blue-700 text-xs text-white font-medium"
                                disabled= {isPending}
                            >
                                {!isPending ? "Simpan" : "Update..."}
                            </button>
                        </div>
                    )
                }
                {editSemesterError && (
                    <p className="text-red-500 text-[10px] mt-1">
                        {editSemesterError.message}
                    </p>
                )}
                
            </div>
        </form>
    )
}

export default SemesterSection;