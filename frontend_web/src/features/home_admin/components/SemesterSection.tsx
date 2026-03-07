import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import Input from "../../../components/ui/Input";
import { useSemester } from "../hooks/useSemester";

const SemesterSection = () => {
    const [ onEdit, setOnEdit]  = useState(false);
    const { data, isLoading, error } = useSemester();
    return (
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-2 md:gap-4">
            <p>Tahun Ajaran</p>
            <div className="flex flex-row justify-center items-center gap-2 md:gap-4">
                {!onEdit ? (
                        <div className="flex flex-row justify-center items-center gap-2 md:gap-4">
                            <p>{data?.tahun_ajaran}</p>
                            <p>/</p>
                            <p>{data?.semester}</p>
                        </div>
                        
                    ) : (
                        <div className="flex flex-row justify-center items-center gap-2 md:gap-4 px-18 md:px-0">
                            <Input 
                                placeholder="ex: 2024-2025"
                                className="text-xs w-auto"
                            />
                            <p>/</p>
                            <Input 
                                placeholder="ganjil/genap"
                                className="text-xs w-auto"
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
                    <div className="flex flex-row justify-center items-center gap-2 md:gap-4">
                        <button 
                            className="bg-red-600 px-2 py-1 rounded-sm hover:bg-red-900 text-xs text-white font-medium"
                            onClick={()=>setOnEdit(false)}
                        >
                            Batal
                        </button>
                        <button 
                            className="bg-blue-500 px-2 py-1 rounded-sm hover:bg-blue-700 text-xs text-white font-medium"
                            onClick={()=>setOnEdit(false)}
                        >
                            Simpan
                        </button>
                    </div>
                )
            }
            
        </div>
    )
}

export default SemesterSection;