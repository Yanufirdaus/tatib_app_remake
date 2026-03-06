import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuthStore } from "../store/auth.store";
import { useMe } from "../features/auth/hooks/useMe";
import { useEffect } from "react";

const RootLayout = () => {
  const Location = useLocation();
  const isLoginPage = Location.pathname === "/login";

  const { user, setUser } = useAuthStore()

  const { data, isLoading } = useMe()
  
  console.log(data)

  const navigate = useNavigate()

  useEffect(() => {
    if (isLoading) return
    if (data && !user) {
      setUser({ id: data.id, role: data.role })
    }

    if (user) {
      if (location.pathname === "/" || location.pathname === "/login") {
        navigate("/home", { replace: true })
      }
      return
    }

    if (!user) {
      if (location.pathname === "/home") {
        navigate("/", { replace: true })
      }
    }

  }, [user, data, isLoading, location.pathname])
  
  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      
      <div className="w-full max-w-screen-2xl min-h-screen bg-white">
        {!isLoginPage && (
            <Header />
        )}
        
        <main className="flex-1">
            {/* <Outlet /> */}
            {isLoading ? (
            <div className="flex flex-1 h-svh items-center justify-center">
                Loading...
              </div>
            ) : (
              <div className="flex-1">
                <Outlet />
              </div>
            )}
        </main>
        
        {!isLoginPage && (
            <Footer />
        )}
      </div>

    </div>
  );
};

export default RootLayout;