import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthStore } from "@/store/auth.store";
import { logout } from "@/features/auth/services/auth.service";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";


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
    <header className="sticky top-0 z-50 w-full h-16 bg-teal-500/90 backdrop-blur-md flex items-center justify-between px-8 border-b border-teal-400/20 shadow-sm transition-all duration-300">
        
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-3"
      >
        <a 
          className="cursor-pointer group flex items-center gap-2"
          onClick={() => user ? navigate("/home") : navigate("/")}
        >
          <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:bg-white/30 transition-colors">
             <div className="w-4 h-4 bg-white rounded-sm shadow-sm" />
          </div>
          <h1 className="text-xl md:text-2xl text-white font-bold tracking-tight bg-clip-text">
            Tatib Admin
          </h1>
        </a>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="flex items-center gap-6"
      >
        {user ? (
          <div className="flex items-center gap-4">
            {isHomePage && (
                  <button
                      className="px-4 py-2 text-sm font-semibold text-white bg-white/10 hover:bg-white/20 rounded-xl transition-all active:scale-95 border border-white/10"
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
                    className="px-5 py-2 text-sm font-bold text-teal-600 bg-white hover:bg-gray-50 rounded-xl transition-all shadow-lg hover:shadow-white/20 active:scale-95"
                >
                    Login Admin
                </Link>
          </div>
        )}
      </motion.div>
      
    </header>
  );
};

export default Header;