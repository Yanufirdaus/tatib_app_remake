import { useFieldArray, useForm, useWatch } from "react-hook-form";
import { useGetPelanggaranByJenisId, useJenisPelanggaran } from "./usePelanggaran";
import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { AddPelanggaranSchema, type AddPelanggaranFormValues } from "@/features/pelanggaran/schemas/pelanggaran.schema";
import type { PelanggaranFilterForm } from "../type/pelanggaran.type";

export const usePelanggaranRoot = () => {
    const { data: jenisData, isLoading: isLoadingJenis, error: jenisError } = useJenisPelanggaran();

    const { register: registerFilter, control: filterControl, setValue } = useForm<PelanggaranFilterForm>();
    const selectedJenis = useWatch({
        control: filterControl,
        name: "jenisPelanggaran"
    });

    const options =
        jenisData?.map((item) => ({
            value: String(item.id),
            label: item.jenis_pelanggaran,
        })) ?? [];

    useEffect(() => {
        if (jenisData && jenisData.length > 0 && !selectedJenis) {
            setValue("jenisPelanggaran", String(jenisData[0].id));
        }
    }, [jenisData, selectedJenis, setValue]);

    const { 
        data: pelanggaran, 
        isLoading: isLoadingPelanggaran, 
        error: pelanggaranError 
    } = useGetPelanggaranByJenisId(selectedJenis ? Number(selectedJenis) : 0);

    const {
        register: registerAdd,
        handleSubmit,
        control,
        formState: { errors: addErrors },
        reset: resetAdd
    } = useForm<AddPelanggaranFormValues>({
        resolver: zodResolver(AddPelanggaranSchema),
        defaultValues: { pelanggaran: [] }
    });

    const { fields, append, remove } = useFieldArray<AddPelanggaranFormValues>({
        control,
        name: "pelanggaran"
    });

    const handleAppend = () => {
        append({
            jenisId: selectedJenis || (jenisData?.[0]?.id ? String(jenisData[0].id) : ""),
            pelanggaran: "",
            poin: "",
            nomor: ""
        });
    };

    return {
        // Filter & Options
        jenisData,
        isLoadingJenis,
        jenisError,
        registerFilter,
        options,
        selectedJenis,

        // Pelanggaran Data
        pelanggaran,
        isLoadingPelanggaran,
        pelanggaranError,

        // Add Pelanggaran Form
        registerAdd,
        handleSubmit,
        addErrors,
        resetAdd,
        fields,
        remove,
        handleAppend
    };
};
