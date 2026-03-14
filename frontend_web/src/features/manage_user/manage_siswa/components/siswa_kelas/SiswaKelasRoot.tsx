import { FaPlusSquare } from "react-icons/fa";
import TitlePage from "../../../../../components/ui/TitlePage";
import ListSiswa from "./ListSiswa";
import AddSiswa from "./AddSiswa";
import ActionButtons from "../../../../../components/ui/ActionButtons";
import { useSiswaKelasRoot } from "../../hooks/useSiswaKelasRoot";

const SiswaKelasRoot = ({ id }: { id: number }) => {
    const {
        isAddSiswa,
        setIsAddSiswa,
        isEditKelasSiswa,
        kelas,
        isLoadingKelas,
        siswa,
        isLoadingSiswa,
        isPending,
        fields,
        control,
        handleSaveKelas,
        handleCancelKelas,
        handleStartKenaikanKelas,
    } = useSiswaKelasRoot(id);

    return (
        <div className="flex flex-col min-h-screen w-full py-6 md:py-8 gap-8">
            <div className="flex flex-row w-full">
                <div className="basis-2/8"></div>
                <div className="basis-6/8">
                    <TitlePage title={`Siswa Kelas ${isLoadingKelas ? "" : kelas?.name.toUpperCase()}`} />
                </div>
                <div className="basis-2/8">
                    {
                        isAddSiswa ? (
                            <></>
                        ) : (
                            <FaPlusSquare
                                className="size-6 fill-green-600 cursor-pointer"
                                onClick={() => { setIsAddSiswa(true) }}
                            />
                        )
                    }
                </div>
            </div>
            <div className="flex justify-center">
                {
                    isEditKelasSiswa ? (
                        <ActionButtons
                            onClick={handleSaveKelas}
                            onCancel={handleCancelKelas}
                            cancelText="Batal"
                            submitText="Simpan"
                            loadingText="Memuat..."
                            isPending={isPending}
                            className=""
                            typeButton="button"
                            disabled={isPending}
                        />
                    ) : (
                        <button
                            className="bg-blue-500 text-white px-2 py-1 rounded-md text-xs md:text-sm"
                            onClick={handleStartKenaikanKelas}
                        >Kenaikan Kelas</button>
                    )
                }
            </div>
            {
                isAddSiswa && (
                    <AddSiswa setIsAddSiswa={setIsAddSiswa} kelasId={id} />
                )
            }
            <ListSiswa siswa={siswa} isLoadingSiswa={isLoadingSiswa} fields={fields} controlKelas={control} />
        </div>
    )
}

export default SiswaKelasRoot;