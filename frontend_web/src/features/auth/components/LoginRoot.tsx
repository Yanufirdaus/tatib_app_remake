import LoginForm from "./LoginForm";
import { motion } from "framer-motion";

const LoginRoot = () => {
    return (
        <div className="min-h-screen w-full flex flex-col items-center justify-center relative overflow-hidden bg-gray-100">
            <motion.div
                animate={{
                    scale: [1, 1.2, 1],
                    rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
            />
            <motion.div
                animate={{
                    scale: [1, 1.3, 1],
                    rotate: [0, -90, 0],
                }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute -bottom-24 -right-24 w-120 h-120 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"
            />

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="z-10 flex flex-col items-center gap-8 w-full max-w-md px-6"
            >
                <div className="text-center space-y-2">
                    <h1 className="text-slate-800 font-black text-3xl md:text-4xl tracking-tight">
                        LOGIN <span className="text-blue-600">ADMIN</span>
                    </h1>
                </div>

                <LoginForm />

                <p className="text-slate-400 text-[10px] uppercase tracking-widest font-bold">
                    &copy; 2026 Tatib Apps. All rights reserved.
                </p>
            </motion.div>
        </div>
    )
}

export default LoginRoot;