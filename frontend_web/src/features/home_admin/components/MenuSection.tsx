import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MENU_ITEMS = [
    { path: "/manajemen-siswa", label: "Manajemen Siswa" },
    { path: "/manajemen-tendik", label: "Manajemen Tendik" },
    { path: "/kelas", label: "Manajemen Kelas" },
    { path: "/pelanggaran", label: "Manajemen Peraturan" },
];

const MenuSection = () => {
    const [open, setOpen] = useState(false);

    const linkBaseClass = "text-white py-4 transition-all duration-200 border-l-4 border-transparent";
    const activeClass = "bg-white/10 border-white font-bold md:pl-10";
    const inactiveClass = "hover:bg-white/5 md:px-8";

    return (
        <div className="md:basis-1/5 w-full flex flex-col md:min-h-screen relative bg-[#537D96] shadow-xl z-20">
            {/* Mobile Header Toggle */}
            <div className="md:hidden flex items-center justify-between px-6 py-4 border-b border-white/10">
                <span className="text-white font-bold text-sm tracking-widest uppercase">Menu</span>
                <button
                    className="text-white p-2 hover:bg-white/10 rounded-full transition-colors"
                    onClick={() => setOpen(!open)}
                >
                    {open ? <FaTimes size={18} /> : <FaBars size={18} />}
                </button>
            </div>

            {/* Mobile Nav */}
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-col md:hidden bg-slate-800/95 overflow-hidden backdrop-blur-sm"
                    >
                        {MENU_ITEMS.map((item) => (
                            <NavLink
                                key={item.path}
                                to={item.path}
                                onClick={() => setOpen(false)}
                                className={({ isActive }) =>
                                    `${linkBaseClass} px-8 text-sm ${isActive ? activeClass : 'hover:bg-white/5'}`
                                }
                            >
                                {item.label}
                            </NavLink>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Desktop Nav */}
            <div className="hidden md:flex md:flex-col pt-8 text-white">
                <div className="px-8 mb-10">
                    <h2 className="text-xs font-black tracking-widest text-white/40 uppercase">Admin Dashboard</h2>
                </div>
                {MENU_ITEMS.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `${linkBaseClass} ${isActive ? activeClass : inactiveClass}`
                        }
                    >
                        {item.label}
                    </NavLink>
                ))}
            </div>
        </div>
    )
}

export default MenuSection;