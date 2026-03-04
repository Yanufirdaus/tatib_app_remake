import { Link } from 'react-router-dom';
import './page.css';

const DashboardPage = () => {
  return (
    <>
         <div className="flex flex-col md:flex-row items-center px-6 py-6 md:px-12 bg-teal-400">
  
            <div className="flex-1 pb-6 md:pb-0">
                <p className="text-center md:text-left text-4xl md:text-6xl font-bold text-white">
                    Tatib Apps
                </p>

                <p className="text-center md:text-justify mt-4 text-sm md:text-lg text-white pr-0 md:pr-12">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                </p>
            </div>

            <div className="flex-1 flex justify-center">
                <img 
                    src="/src/assets/dashboard_img.png" 
                    alt="Logo" 
                    className="p-2 md:pb-6 opacity-85"
                />
            </div>
        </div>

        <div className="flex flex-col items-center px-6 py-6 md:px-12 md:py-12">
            <p className="text-2xl md:text-4xl font-bold text-gray-800 text-center">
                Mobile Apps Untuk Tendik dan Siswa
            </p>
            <div className="flex-1 flex justify-center mt-6 md:mt-12">
                <img 
                    src="/src/assets/mobile_display.png" 
                    alt="Logo" 
                    className="p-2 md:pb-6 w-70 md:w-150 opacity-85"
                />
            </div>

            <div className='flex flex-col md:flex-row items-center gap-6 md:gap-12 pt-0 md:pt-12'>
                <p className="text-sm md:text-2xl font-bold text-gray-800 text-center pt-6 md:pt-6">
                    Available on :
                </p>

                <div className='flex flex-row '>
                    <Link
                        to="https://play.google.com/store/games?device=windows"
                    >
                        <img 
                            src="/src/assets/android.png" 
                            alt="Android" 
                            className="p-2 md:pb-6 w-25 md:w-35"
                        />
                    </Link>
                    <Link
                        to="https://www.apple.com/id/app-store/"
                    >
                        <img 
                            src="/src/assets/apple.png" 
                            alt="Ios" 
                            className="p-2 md:pb-6 w-25 md:w-35"
                        />
                    </Link>
                </div>
            </div>
        </div>
    </>
  );
};

export default DashboardPage;