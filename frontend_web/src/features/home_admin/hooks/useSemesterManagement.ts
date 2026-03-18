import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEditSemester, useSemester } from "./useSemester";
import { UpdateSemesterSchema, type UpdateSemesterFormValues } from "@/features/home_admin/schemas/update.semester.schema";

export const useSemesterManagement = () => {
    const [onEdit, setOnEdit] = useState(false);
    const { data: semesterData, isLoading } = useSemester();
    const { mutate: editSemester, isPending, error: editSemesterError } = useEditSemester();

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<UpdateSemesterFormValues>({
        resolver: zodResolver(UpdateSemesterSchema)
    });

    const semesterOptions = [
        { value: "ganjil", label: "Ganjil" },
        { value: "genap", label: "Genap" },
    ];

    const toggleEdit = () => {
        if (onEdit) {
            reset();
        }
        setOnEdit(!onEdit);
    };

    const onSubmit = (data: UpdateSemesterFormValues) => {
        editSemester(data, {
            onSuccess: () => {
                setOnEdit(false);
            },
        });
    };

    return {
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
        toggleEdit,
        setOnEdit
    };
};
