import { FaCircleNotch, FaTrashAlt } from "react-icons/fa";
import { useDeleteKelas, useKelas } from "../hooks/useKelas";
import { Oval } from "react-loader-spinner";
import AddKelas from "./AddKelas";
import type { AddKelasProps } from "../type/add.kelas.props.type";
import DataCard from "../../../components/ui/DataCard";

const ListKelas = ({
  fields,
  register,
  cancelAddHandler,
  onSubmit,
  isPendingAddKelas,
  errors
}: AddKelasProps) => {
    const { data, isLoading } = useKelas();

    const { mutate: deleteKelas, isPending } = useDeleteKelas();

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
            <AddKelas fields={fields} register={register} cancelAddHandler={cancelAddHandler} onSubmit={onSubmit} isPendingAddKelas={isPendingAddKelas} errors={errors}/>
            
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
                    {data.map((item: any) => (
                        <DataCard 
                            key={item.id}
                            text={item.name}
                            actionIcon={!isPending ? <FaTrashAlt className="fill-red-500 hover:fill-red-800" /> : <FaCircleNotch className="fill-black-500 animate-spin" />}
                            onActionClick={() => handleDeleteKelas(item.id)}
                            isActionDisabled={isPending}
                        />
                    ))}
                </div>
            )}
        </div>
        
    )
}

export default ListKelas;