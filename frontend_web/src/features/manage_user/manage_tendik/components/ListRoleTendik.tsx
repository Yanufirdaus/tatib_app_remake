import { FaChevronRight } from "react-icons/fa";
import DataCard from "@/components/ui/DataCard";
import { useNavigate } from "react-router-dom";

const ListRoleTendik = () => {
    const navigate = useNavigate();
    const listRoleTendik: { id: number, role: string }[] = [
        { id: 1, role: "kesiswaan" },
        { id: 2, role: "bk" },
        { id: 3, role: "kepsek" }
    ]

    return (
        <div className="flex flex-col gap-2 mt-4 w-full md:w-auto items-center">
            <div className="flex flex-col gap-2">
                {listRoleTendik.map((item) => (
                    <DataCard
                        key={item.id}
                        text={item.role}
                        actionIcon={<FaChevronRight className="fill-gray-600 transition-colors" />}
                        onCardClick={() => navigate(`/manajemen-tendik/role/${item.role}`)}
                    />
                ))}
            </div>
        </div>
    )
}

export default ListRoleTendik;