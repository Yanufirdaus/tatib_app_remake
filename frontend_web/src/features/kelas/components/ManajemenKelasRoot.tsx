import ListKelas from "./ListKelas"
import { useManajemenKelasRoot } from "@/features/kelas/hooks/useManajemenKelasRoot";
import PageContainer from "@/components/ui/PageContainer"
import FeatureHeader from "@/components/ui/FeatureHeader"

const ManajemenKelasRoot = () => {
    const {
        register,
        handleSubmit,
        fields,
        remove,
        onSubmit,
        isPending,
        errors,
        handleAddRow
    } = useManajemenKelasRoot();

    return (
        <PageContainer className="py-6 md:py-8">
            <FeatureHeader 
                title="Manajemen Kelas"
                onActionClick={handleAddRow}
            />
            <ListKelas 
                fields={fields} 
                register={register} 
                cancelAddHandler={() => remove()} 
                onSubmit={handleSubmit(onSubmit)} 
                isPendingAddKelas={isPending} 
                errors={errors} 
            />
        </PageContainer>
    )
}

export default ManajemenKelasRoot
