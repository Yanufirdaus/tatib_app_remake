import { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MenuSection = () => {
    const [open, setOpen] = useState(false);

    const navigate = useNavigate()
    return (
        <div className="basis-1/5 flex flex-col min-h-12 md:min-h-screen min-w-screen md:min-w-auto items-center justify-center bg-[#537D96] md:bg-[#537D96]">
            <button
                className="md:hidden text-white py-4"
                onClick={() => setOpen(!open)}
            >
                <FaBars/>
            </button>

            {open && (
                <div className="flex flex-col gap-4 md:hidden justify-center items-center bg-gray-800 w-full py-4">
                    <a className="text-white">Manajemen Siswa</a>
                    <a className="text-white">Manajemen Tendik</a>
                    <a className="text-white" onClick={()=>{navigate("/kelas")}}>Manajemen Kelas</a>
                    <a className="text-white" onClick={()=>{navigate("/pelanggaran")}}>Manajemen Peraturan</a>
                </div>
            )}

            <div className="hidden md:flex md:flex-col gap-8 text-white md:w-5/5">
                <a className="text-white hover:bg-gray-800 md:px-8 py-4">Manajemen Siswa</a>
                <a className="text-white hover:bg-gray-800 md:px-8 py-4">Manajemen Tendik</a>
                <a className="text-white hover:bg-gray-800 md:px-8 py-4" onClick={()=>{navigate('/kelas')}}>Manajemen Kelas</a>
                <a className="text-white hover:bg-gray-800 md:px-8 py-4" onClick={()=>{navigate("/pelanggaran")}}>Manajemen Peraturan</a>
            </div>
        </div>
    )
}

export default MenuSection;