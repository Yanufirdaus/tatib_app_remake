import { useState } from "react";
import { FaCircleNotch, FaTrashAlt } from "react-icons/fa";
import { useDeleteKelas, useKelas } from "@/features/kelas/hooks/useKelas";
import AddKelas from "./AddKelas";
import type { AddKelasProps } from "@/features/kelas/type/add.kelas.props.type";
import DataCard from "@/components/ui/DataCard";
import ConfirmModal from "@/components/ui/ConfirmModal";
import Skeleton from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";

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

    const [isConfirmOpen, setIsConfirmOpen] = useState(false);
    const [selectedId, setSelectedId] = useState<number | null>(null);

    const handleDeleteKelas = (id: number) => {
        setSelectedId(id);
        setIsConfirmOpen(true);
    }

    const confirmDelete = () => {
        if (selectedId) {
            deleteKelas(selectedId);
            setIsConfirmOpen(false);
        }
    }

    return (
        <div className="flex flex-col gap-6 w-full md:w-150">
            <div className="px-6">
                <AddKelas fields={fields} register={register} cancelAddHandler={cancelAddHandler} onSubmit={onSubmit} isPendingAddKelas={isPendingAddKelas} errors={errors} />
            </div>

            <ConfirmModal
                isOpen={isConfirmOpen}
                title="Hapus Kelas"
                message="Yakin ingin menghapus kelas ini? Tindakan ini tidak dapat dibatalkan dan semua data siswa terkait akan terpengaruh."
                onClose={() => setIsConfirmOpen(false)}
                onConfirm={confirmDelete}
            />

            <div className="flex flex-col gap-2 mx-6">
                {isLoading ? (
                    <div className="flex flex-col gap-2">
                        {[...Array(5)].map((_, i) => (
                            <Skeleton key={i} height={60} className="w-full" />
                        ))}
                    </div>
                ) : data?.length === 0 ? (
                    <EmptyState
                        title="Kelas Belum Tersedia"
                        message="Silakan tambahkan kelas baru melalui form di atas."
                    />
                ) : (
                    <div className="flex flex-col gap-2 animate-fade-in">
                        {data?.map((item) => (
                            <DataCard
                                key={item.id}
                                text={item.name}
                                actionIcon={!isPending ? <FaTrashAlt className="fill-red-500 hover:fill-red-800 group-hover:scale-110 transition-transform" /> : <FaCircleNotch className="fill-blue-500 animate-spin" />}
                                onActionClick={() => handleDeleteKelas(item.id)}
                                isActionDisabled={isPending}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>

    )
}

export default ListKelas;