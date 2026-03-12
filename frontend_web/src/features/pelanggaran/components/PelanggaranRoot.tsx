import { useFieldArray, useForm } from "react-hook-form";
import { useGetPelanggaranByJenisId, useJenisPelanggaran } from "../hooks/usePelanggaran";
import FilterSection from "./FilterSection";
import ListPelanggaran from "./ListPelanggaran";
import { useEffect } from "react";
import { FaPlusSquare } from "react-icons/fa";
import TambahPelanggaran from "./TambahPelanggaran";
import { AddPelanggaranSchema, type AddPelanggaranFormValues } from "../schemas/pelanggaran.schema";
import { zodResolver } from "@hookform/resolvers/zod";

const PelanggaranRoot = () => {
    const { data, isLoading, error: jenisError } = useJenisPelanggaran();

    const { register, watch, setValue } = useForm();

    const selectedJenis = watch("jenisPelanggaran");

    if (jenisError) {
        alert(jenisError.message)
    }

    const options =
        data?.map((item) => ({
            value: String(item.id),
            label: item.jenis_pelanggaran,
        })) ?? [];

    useEffect(() => {
        if (data && data.length > 0 && !selectedJenis) {
            setValue("jenisPelanggaran", String(data[0].id));
        }
    }, [data, selectedJenis, setValue]);

    const { data: pelanggaran, isLoading: isLoadingPelanggaran, error: pelanggaranError } = useGetPelanggaranByJenisId(selectedJenis);

    //add pelanggaran
    const {
        register: registerAdd,
        handleSubmit,
        control,
        formState: { errors },
        reset
    } = useForm<AddPelanggaranFormValues>({
        resolver: zodResolver(AddPelanggaranSchema),
        defaultValues: { pelanggaran: [] }
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: "pelanggaran"
    });

    return (
        <div className="flex flex-col w-full min-h-screen items-center py-8 gap-6">
            <div className="flex flex-row w-full">
                <div className="w-full flex flex-row">
                    <div className="basis-2/8"></div>
                    <div className="basis-6/8">
                        <h1 className="text-lg md:text-2xl font-bold text-center">Manajemen Pelanggaran</h1>
                    </div>
                    <div className="flex flex-row basis-2/8 justify-center items-center">
                        <FaPlusSquare
                            className="size-6 fill-green-600 cursor-pointer"
                            onClick={() => {
                                append({
                                    jenisId: selectedJenis || (data?.[0]?.id ? String(data[0].id) : ""),
                                    pelanggaran: "",
                                    poin: "",
                                    nomor: ""
                                });
                            }}
                        />
                    </div>
                </div>
            </div>
            <FilterSection isLoading={isLoading} options={options} register={register} />
            {
                fields.length > 0 ? (
                    <TambahPelanggaran
                        options={options}
                        reset={reset}
                        fields={fields}
                        remove={remove}
                        register={registerAdd}
                        handleSubmit={handleSubmit}
                        errors={errors}
                    />
                ) : (
                    <></>
                )
            }
            <ListPelanggaran isLoadingPelanggaran={isLoadingPelanggaran} pelanggaran={pelanggaran} />
            {pelanggaranError?.message ? <div>{pelanggaranError?.message}</div> : <></>}
        </div>
    )
}

export default PelanggaranRoot;