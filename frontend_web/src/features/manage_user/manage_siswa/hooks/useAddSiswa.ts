import { useKelas } from "../../../kelas/hooks/useKelas";
import { useCreateManySiswa } from "./useSiswa";
import { useForm } from "react-hook-form";
import { CreateUserSchema, type CreateUserFormValues } from "../../schema/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAddSiswa = (setIsAddSiswa: (value: boolean) => void, kelasId: number) => {
    const { data: kelasList, isLoading: isLoadingKelasList } = useKelas();

    const options = kelasList?.map((k: any) => ({
        value: k.id,
        label: k.name
    }));

    const { mutate: createManySiswa, isPending: isPendingCreateManySiswa } = useCreateManySiswa();

    const { register, handleSubmit, formState: { errors } } = useForm<CreateUserFormValues>({
        resolver: zodResolver(CreateUserSchema),
        defaultValues: {
            siswa: [
                {
                    name: "",
                    nisn: "",
                    kelasId: String(kelasId),
                }
            ]
        }
    });

    const handleAddSiswa = (data: CreateUserFormValues) => {
        createManySiswa(data, {
            onSuccess: () => {
                setIsAddSiswa(false);
                alert("Siswa berhasil ditambahkan");
            },
            onError: (error: any) => {
                const message = error?.response?.data?.message || error?.message || "Terjadi kesalahan";
                alert(message);
            }
        });
    };

    return {
        options,
        isLoadingKelasList,
        isPendingCreateManySiswa,
        register,
        handleSubmit,
        errors,
        handleAddSiswa,
    };
};