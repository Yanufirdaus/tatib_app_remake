import ListSiswa from "./ListSiswa";
import AddSiswa from "./AddSiswa";
import ActionButtons from "@/components/ui/ActionButtons";
import { useSiswaKelasRoot } from "@/features/manage_user/manage_siswa/hooks/useSiswaKelasRoot";
import PageContainer from "@/components/ui/PageContainer";
import FeatureHeader from "@/components/ui/FeatureHeader";

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
        <PageContainer className="py-6 px-6">
            <FeatureHeader
                title={`Siswa Kelas ${isLoadingKelas ? "" : kelas?.name.toUpperCase()}`}
                onActionClick={() => setIsAddSiswa(true)}
                showAction={!isAddSiswa}
            />
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
            <ListSiswa siswa={siswa || []} isLoadingSiswa={isLoadingSiswa} fields={fields} controlKelas={control} />
        </PageContainer>
    )
}

export default SiswaKelasRoot;
