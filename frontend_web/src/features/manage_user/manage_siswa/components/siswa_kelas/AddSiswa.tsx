import ActionButtons from "../../../../../components/ui/ActionButtons";
import Input from "../../../../../components/ui/Input";
import SelectOption from "../../../../../components/ui/option";
import { useAddSiswa } from "../../hooks/useAddSiswa";

const AddSiswa = ({ setIsAddSiswa, kelasId }: { setIsAddSiswa: (value: boolean) => void, kelasId: number }) => {
    const {
        options,
        isLoadingKelasList,
        isPendingCreateManySiswa,
        register,
        handleSubmit,
        errors,
        handleAddSiswa,
    } = useAddSiswa(setIsAddSiswa, kelasId);

    return (
        <form className="flex flex-col w-full items-center justify-center gap-3" onSubmit={handleSubmit(handleAddSiswa)}>
            <div className="text-sm md:text-base font-bold text-center">
                Tambah Siswa
            </div>
            <div className="grid grid-flow-row grid-cols-10 auto-rows-auto w-full md:w-150 gap-2 px-4 md:px-0 items-center">
                <div className="col-span-4 text-sm md:text-base font-bold">
                    Nama
                </div>
                <div className="col-span-3 text-sm md:text-base font-bold">
                    NISN
                </div>
                <div className="col-span-3 text-sm md:text-base font-bold">
                    Kelas
                </div>
            </div>
            <div className="grid grid-flow-row grid-cols-10 auto-rows-auto w-full md:w-150 gap-2 px-4 md:px-0">
                <div className="col-span-4">
                    <Input
                        {...register("siswa.0.name")}
                        placeholder="Nama"
                        className="text-xs md:text-sm"
                        error={errors.siswa?.[0]?.name?.message}
                    />
                </div>
                <div className="col-span-3">
                    <Input
                        {...register("siswa.0.nisn")}
                        placeholder="NISN"
                        className="text-xs md:text-sm"
                        error={errors.siswa?.[0]?.nisn?.message}
                    />
                </div>
                <div className="col-span-3">
                    <SelectOption
                        {...register("siswa.0.kelasId")}
                        selectOption={isLoadingKelasList ? [] : options}
                        className="w-full py-2"
                    />
                </div>
            </div>
            <ActionButtons
                submitText="Tambah"
                loadingText="Menambahkan..."
                cancelText="Batal"
                onCancel={() => setIsAddSiswa(false)}
                isPending={isPendingCreateManySiswa}
                typeButton="submit"
            />
        </form>
    )
}

export default AddSiswa;