import FilterSection from "./FilterSection";

const PelanggaranRoot = () => {
    return (
        <div className="flex flex-col min-w-screen min-h-screen items-center py-8 gap-6">
            <h1 className="text-lg md:text-2xl font-bold text-center">Manajemen Pelanggaran</h1>
            <FilterSection />
        </div>
    )
}

export default PelanggaranRoot;