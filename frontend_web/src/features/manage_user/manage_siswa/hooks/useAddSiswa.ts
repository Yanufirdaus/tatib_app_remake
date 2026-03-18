import { useKelas } from "@/features/kelas/hooks/useKelas";
import { useCreateManySiswa } from "./useSiswa";
import { useForm } from "react-hook-form";
import { CreateUserSchema, type CreateUserFormValues } from "@/features/manage_user/schemas/user.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export const useAddSiswa = (setIsAddSiswa: (value: boolean) => void, kelasId: number) => {
    const { data: kelasList, isLoading: isLoadingKelasList } = useKelas();

    const options = kelasList?.map((k) => ({
        value: String(k.id),
        label: k.name
    })) || [];

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