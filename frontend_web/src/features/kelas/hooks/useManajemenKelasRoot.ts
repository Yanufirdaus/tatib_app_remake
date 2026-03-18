import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddManyKelasSchema, type AddKelasFormValues } from "@/features/kelas/schemas/add.kelas.schema";
import { useAddKelas } from "@/features/kelas/hooks/useKelas";

export const useManajemenKelasRoot = () => {
    const { mutate, isPending } = useAddKelas();

    const {
        register,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm<AddKelasFormValues>({
        resolver: zodResolver(AddManyKelasSchema),
        defaultValues: { kelas: [] }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "kelas"
    });

    const onSubmit = (data: AddKelasFormValues) => {
        mutate(data, {
            onSuccess: () => {
                reset({
                    kelas: []
                });
            }
        });
    };

    const handleAddRow = () => {
        append({
            name: "",
            grade: "10"
        });
    };

    return {
        register,
        handleSubmit,
        fields,
        remove,
        onSubmit,
        isPending,
        errors,
        handleAddRow
    };
};
