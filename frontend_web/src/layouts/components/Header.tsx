import { Link, useLocation } from "react-router-dom";

const Header = () => {

  return (
    <header className="w-full h-16 bg-teal-400 flex items-center justify-between px-6">
        
      <div className="flex items-center gap-3">
        <h1 className="text-lg md:text-xl text-white font-semibold">
          Tatib Admin
        </h1>
      </div>
      <div className="flex items-center gap-4">
            <Link 
                to="/login" 
                className="text-sm md:text-base text-white hover:text-gray-200"
            >
                Login Admin
            </Link>
      </div>
      

    </header>
  );
};

export default Header;