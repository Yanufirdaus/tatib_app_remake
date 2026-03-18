import dashboardImg from "@/assets/dashboard_img.png";
import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <div className="relative overflow-hidden w-full flex flex-col md:flex-row items-center px-8 py-12 md:px-16 md:py-24 bg-gradient-to-br from-teal-400 to-teal-600 shadow-2xl shadow-teal-500/20">

      {/* Decorative Blur Background */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-64 h-64 bg-white/10 blur-3xl rounded-full" />
      <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-teal-300/20 blur-3xl rounded-full" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="relative z-10 flex-1 pb-10 md:pb-0"
      >
        <span className="inline-block px-4 py-1.5 bg-white/10 backdrop-blur-md rounded-full text-white/90 text-sm font-bold tracking-wider mb-6 border border-white/20 uppercase">
          E-Discipline Solutions
        </span>
        <h1 className="text-center md:text-left text-5xl md:text-7xl font-extrabold text-white leading-tight">
          Tatib <span className="text-teal-100">Apps</span>
        </h1>

        <p className="text-center md:text-left mt-8 text-base md:text-xl text-teal-50 font-medium pr-0 md:pr-16 leading-relaxed opacity-90">
          Platform terintegrasi untuk pengelolaan tata tertib sekolah yang efisien, transparan, dan modern. Kami membantu membangun ekosistem kedisiplinan yang positif bagi siswa dan pengajar.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9, x: 20 }}
        animate={{ opacity: 1, scale: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
        className="relative z-10 flex-1 flex justify-center"
      >
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-teal-300 to-white/30 rounded-2xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
          <img
            src={dashboardImg}
            alt="Tatib Apps Dashboard Preview"
            className="relative p-2 md:pb-6 drop-shadow-2xl active:scale-[1.02] transition-transform duration-500"
          />
        </div>
      </motion.div>

    </div>
  );
};

export default HeroSection;