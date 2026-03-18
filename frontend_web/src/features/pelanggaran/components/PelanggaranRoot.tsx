import FilterSection from "./FilterSection";
import ListPelanggaran from "./ListPelanggaran";
import TambahPelanggaran from "./TambahPelanggaran";
import Alert from "@/components/ui/Alert";
import PageContainer from "@/components/ui/PageContainer";
import FeatureHeader from "@/components/ui/FeatureHeader";
import { usePelanggaranRoot } from "@/features/pelanggaran/hooks/usePelanggaranRoot";

const PelanggaranRoot = () => {
    const {
        isLoadingJenis,
        jenisError,
        registerFilter,
        options,
        pelanggaran,
        isLoadingPelanggaran,
        pelanggaranError,
        registerAdd,
        handleSubmit,
        addErrors,
        resetAdd,
        fields,
        remove,
        handleAppend
    } = usePelanggaranRoot();

    return (
        <PageContainer className="py-6 md:py-8">
            <FeatureHeader 
                title="Manajemen Pelanggaran" 
                onActionClick={handleAppend}
            />

            {jenisError && <Alert type="error" message={`Error: ${jenisError.message}`} />}

            <FilterSection isLoading={isLoadingJenis} options={options} register={registerFilter} />

            {fields.length > 0 && (
                <TambahPelanggaran
                    options={options}
                    reset={resetAdd}
                    fields={fields}
                    remove={remove}
                    register={registerAdd}
                    handleSubmit={handleSubmit}
                    errors={addErrors}
                />
            )}

            <ListPelanggaran isLoadingPelanggaran={isLoadingPelanggaran} pelanggaran={pelanggaran || []} />

            {pelanggaranError && <Alert type="error" message={`Error: ${pelanggaranError.message}`} />}
        </PageContainer>
    )
}

export default PelanggaranRoot;
