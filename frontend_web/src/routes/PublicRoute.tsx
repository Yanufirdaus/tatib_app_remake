import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../store/auth.store";

const PublicRoute = () => {
  const user = useAuthStore((s) => s.user);

  if (user) {
    return <Navigate to="/home" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;