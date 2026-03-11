import { useForm } from "react-hook-form";
import { useGetPelanggaranByJenisId, useJenisPelanggaran } from "../hooks/usePelanggaran";
import FilterSection from "./FilterSection";
import ListPelanggaran from "./ListPelanggaran";
import { useEffect } from "react";

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
    
    console.log("Selected:", selectedJenis);

    const { data: pelanggaran, isLoading: isLoadingPelanggaran, error: pelanggaranError } = useGetPelanggaranByJenisId(selectedJenis);

    return (
        <div className="flex flex-col min-w-screen min-h-screen items-center py-8 gap-6">
            <h1 className="text-lg md:text-2xl font-bold text-center">Manajemen Pelanggaran</h1>
            <FilterSection isLoading={isLoading} options={options} register={register}/>
            <ListPelanggaran isLoadingPelanggaran={isLoadingPelanggaran} pelanggaran={pelanggaran} />
            {pelanggaranError?.message ? <div>{pelanggaranError?.message}</div> : <></>}
        </div>
    )
}

export default PelanggaranRoot;