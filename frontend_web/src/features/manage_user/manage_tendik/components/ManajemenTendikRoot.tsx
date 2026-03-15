import TitlePage from "../../../../components/ui/TitlePage";
import ListRoleTendik from "./ListRoleTendik";

const ManajemenTendikRoot = () => {
    return (
        <div className="flex flex-col min-h-screen w-full gap-4 items-center py-6 md:py-8">
            <TitlePage title="Manajemen Tendik" />
            <ListRoleTendik />
        </div>
    )
}

export default ManajemenTendikRoot;