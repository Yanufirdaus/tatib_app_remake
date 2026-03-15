import TitlePage from "../../../../../components/ui/TitlePage";
import ListTendik from "./ListTendik";

const TendikPerRoleRoot = ({ role }: { role: string }) => {
    return (
        <div className="flex flex-col min-h-screen w-full py-6 md:py-8 gap-8">
            <div className="flex flex-row w-full">
                <div className="basis-2/8"></div>
                <div className="basis-6/8">
                    <TitlePage title={`Tendik ${role.toUpperCase()}`} />
                </div>
                <div className="basis-2/8">
                </div>
            </div>
            <ListTendik role={role} />
        </div>
    )
}

export default TendikPerRoleRoot;