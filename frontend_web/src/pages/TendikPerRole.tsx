import { useParams } from "react-router-dom";
import TendikPerRoleRoot from "../features/manage_user/manage_tendik/components/tendik_per_role/TendikPerRoleRoot";
import type { TendikRole } from "../features/manage_user/schema/user.schema";

const TendikPerRole = () => {
    const { role } = useParams();

    return (
        <div>
            <TendikPerRoleRoot role={role as TendikRole} />
        </div>
    )
}

export default TendikPerRole;