import { FaCircleNotch, FaTrashAlt } from "react-icons/fa";
import { useDeleteKelas, useKelas } from "../hooks/useKelas";
import { Oval } from "react-loader-spinner";
import AddKelas from "./AddKelas";

const ListKelas = ({ 
    addKelasCount, 
    cancelAddHandler 
} : { 
    addKelasCount: number, 
    cancelAddHandler: () => void }
) => {
    const { data, isLoading, error } = useKelas();

    const { mutate: deleteKelas, isPending, error: deleteKelasError } = useDeleteKelas();

    const handleDeleteKelas = (id: number) => {
        if (confirm("Yakin ingin menghapus kelas ini?")) {
            deleteKelas(id, {
                onError: (error:any) => {
                    const message = error?.response?.data?.message || error?.message || "Terjadi kesalahan";

                    alert(message);
                }
            });
        }
    }

    return (
        <div className="flex flex-col gap-2 mx-6">
            <AddKelas addKelasCount={addKelasCount} cancelAddHandler={cancelAddHandler}/>
            
            {isLoading ? (
                <div className="flex flex-col gap-2">
                    <Oval
                        height="50"
                        width="50"
                        color="#2dd4bf"
                        ariaLabel="oval-loading"
                        wrapperStyle={{}}
                        wrapperClass=""
                    />
                </div>
            ) : (
                <div className="flex flex-col gap-2">
                    {data.map((data: any) => (
                        <div className="flex flex-row min-w-xs md:min-w-xl rounded-md border border-black">
                            <div className="basis-5/6 py-4 pl-4 text-sm md: text-base">
                                {data.name}
                            </div>
                            <a 
                                className="basis-1/6 py-4 flex items-center justify-center" 
                                onClick={
                                    () => handleDeleteKelas(data.id)
                                }
                                aria-disabled={isPending}
                            >
                                {!isPending ? <FaTrashAlt className="fill-red-500 hover:fill-red-800" /> : <FaCircleNotch className="fill-black-500" />}
                            </a>
                        </div>
                    ))}
                </div>
            )}
        </div>
        
    )
}

export default ListKelas;