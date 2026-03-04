import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";

const RootLayout = () => {
  const Location = useLocation();
  const isLoginPage = Location.pathname === "/login";
  
  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">
      
      {/* Main Container */}
      <div className="w-full max-w-screen-2xl min-h-screen bg-white">
        {!isLoginPage && (
            <Header />
        )}
        
        <main className="flex-1">
            <Outlet />
        </main>
        
        {!isLoginPage && (
            <Footer />
        )}
      </div>

    </div>
  );
};

export default RootLayout;