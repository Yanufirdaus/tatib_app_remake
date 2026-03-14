import { useState } from "react";
import { useSiswaByKelas, useUpdateManySiswaKelas } from "../hooks/useSiswa";
import { useFieldArray, useForm } from "react-hook-form";
import { UpdateManySiswaKelasSchema, type UpdateManySiswaKelasFormValues } from "../../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useKelasById } from "../../../kelas/hooks/useKelas";

export const useSiswaKelasRoot = (id: number) => {
    const [isAddSiswa, setIsAddSiswa] = useState(false);
    const [isEditKelasSiswa, setIsEditKelasSiswa] = useState(false);

    const { data: kelas, isLoading: isLoadingKelas } = useKelasById(id);
    const { data: siswa, isLoading: isLoadingSiswa } = useSiswaByKelas(id);
    const { mutate, isPending } = useUpdateManySiswaKelas();

    const {
        handleSubmit: handleSubmitKelas,
        control,
    } = useForm<UpdateManySiswaKelasFormValues>({
        resolver: zodResolver(UpdateManySiswaKelasSchema),
        defaultValues: {
            kelasUpdate: []
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "kelasUpdate"
    });

    const onSubmitKelas = (data: UpdateManySiswaKelasFormValues) => {
        mutate(data, {
            onSuccess: () => {
                setIsEditKelasSiswa(false);
                remove();
                alert("Data berhasil diupdate");
            },
            onError: (error) => {
                console.error(error);
                alert("Data gagal diupdate");
            }
        });
    };

    const handleSaveKelas = () => {
        handleSubmitKelas(onSubmitKelas)();
    };

    const handleCancelKelas = () => {
        remove();
        setIsEditKelasSiswa(false);
    };

    const handleStartKenaikanKelas = () => {
        if (siswa && siswa.length > 0) {
            siswa.forEach((s: any) => {
                append({
                    siswaIds: String(s.id),
                    kelasIds: String(s.kelasId)
                });
            });
        }
        setIsEditKelasSiswa(true);
    };

    return {
        // State
        isAddSiswa,
        setIsAddSiswa,
        isEditKelasSiswa,

        // Data
        kelas,
        isLoadingKelas,
        siswa,
        isLoadingSiswa,

        // Kenaikan Kelas
        isPending,
        fields,
        control,
        handleSaveKelas,
        handleCancelKelas,
        handleStartKenaikanKelas,
    };
};
