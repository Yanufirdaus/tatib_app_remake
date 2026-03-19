import { motion } from "framer-motion";

const HeroSection = () => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="relative w-full overflow-hidden rounded-3xl p-10 md:p-16 flex flex-col items-center justify-center bg-white/40 backdrop-blur-md border border-white/50 transition-all"
    >

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="z-10 text-center"
      >
        <h1 className="text-2xl md:text-5xl font-black tracking-tight leading-tight">
          Selamat Datang di <br />
          <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            Dashboard Admin
          </span>
        </h1>
      </motion.div>
    </motion.div>
  );
};

export default HeroSection;