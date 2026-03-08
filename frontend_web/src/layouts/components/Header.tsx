import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/auth.store";
import { logout } from "../../features/auth/services/auth.services";
import { useQueryClient } from "@tanstack/react-query";


const Header = () => {
  const { user, logoutStore } = useAuthStore()
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const location = useLocation();
  const isHomePage = location.pathname === "/home";

  const handleLogout = async () => {
    try {
      await logout();
    } catch (err) {
      console.error(err);
    } finally {
      logoutStore();
      queryClient.clear();
      navigate("/", { replace: true });
    }
  };

  return (
    <header className="w-full h-12 md:h-16 bg-teal-400 flex items-center justify-between px-6">
        
      <div className="flex items-center gap-3">
        <h1 className="text-lg md:text-xl text-white font-semibold">
          Tatib Admin
        </h1>
      </div>

      {user ? (
        <div className="flex items-center gap-4">
          {isHomePage && (
                <button
                    className="text-sm md:text-base text-white hover:text-gray-200"
                    onClick={handleLogout}
                >
                    Logout
                </button>
            )

          }
              
        </div>
      ) : (
        <div className="flex items-center gap-4">
              <Link 
                  to="/login" 
                  className="text-sm md:text-base text-white hover:text-gray-200"
              >
                  Login Admin
              </Link>
        </div>
      )}
      
    </header>
  );
};

export default Header;