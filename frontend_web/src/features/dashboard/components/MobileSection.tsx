import mobileDisplay from "@/assets/mobile_display.png"
import PlatformStore from "../../../components/platform_store/PlatforomStore";

const MobileSection = () => {
    return (
        <div className="flex flex-col items-center px-6 py-6 md:px-12 md:py-12">
            <p className="text-2xl md:text-4xl font-bold text-gray-800 text-center">
                Mobile Apps Untuk Tendik dan Siswa
            </p>
            <div className="flex-1 flex justify-center mt-6 md:mt-12">
                <img 
                    src={mobileDisplay}
                    alt="Logo" 
                    className="p-2 md:pb-6 w-70 md:w-150 opacity-85"
                />
            </div>

            <PlatformStore />
        </div>
    );
};

export default MobileSection;