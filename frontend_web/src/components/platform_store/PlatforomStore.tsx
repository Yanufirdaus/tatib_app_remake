import { Link } from "react-router-dom"
import logoAndroid from "@/assets/android.png"
import logoIos from "@/assets/apple.png"

const PlatformStore = () => {
    return (
        <div className='flex flex-col md:flex-row items-center gap-6 md:gap-12 pt-0 md:pt-12'>
            <p className="text-sm md:text-2xl font-bold text-gray-800 text-center pt-6 md:pt-6">
                Available on :
            </p>

            <div className='flex flex-row '>
                <Link
                    to="https://play.google.com/store/games?device=windows"
                >
                    <img 
                        src={logoAndroid}
                        alt="Android" 
                        className="p-2 md:pb-6 w-25 md:w-35"
                    />
                </Link>
                <Link
                    to="https://www.apple.com/id/app-store/"
                >
                    <img 
                        src={logoIos}
                        alt="Ios" 
                        className="p-2 md:pb-6 w-25 md:w-35"
                    />
                </Link>
            </div>
        </div>
    )
}

export default PlatformStore;