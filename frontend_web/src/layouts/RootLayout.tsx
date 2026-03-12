import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { useAuthStore } from "../store/auth.store";
import { ThreeDots } from 'react-loader-spinner';

const RootLayout = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/login";

  const authChecked = useAuthStore((s) => s.authChecked)

  return (
    <div className="min-h-screen w-full bg-gray-100 flex justify-center">

      <div className="flex flex-col min-h-screen w-full bg-white">
        {!isLoginPage && (
          <Header />
        )}

        <main className="flex-1">
          {/* <Outlet /> */}
          {!authChecked ? (
            <div className="flex flex-1 h-svh items-center justify-center">
              <ThreeDots
                visible={true}
                height="80"
                width="80"
                color="#2dd4bf"
                radius="9"
                ariaLabel="three-dots-loading"
                wrapperStyle={{}}
                wrapperClass=""
              />
            </div>
          ) : (
            <div>
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