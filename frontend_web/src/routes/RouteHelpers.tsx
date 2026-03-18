import { Suspense, type ReactNode } from "react";
import LoadingSpinner from "@/components/ui/LoadingSpinner.tsx";
import { motion, AnimatePresence } from "framer-motion";

export const PageLoader = () => (
    <LoadingSpinner fullScreen type="three-dots" size={60} />
);

export const LazyElement = ({ children }: { children: ReactNode }) => (
    <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />}>
            <motion.div
                initial={{ opacity: 0, x: 5 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -5 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
            >
                {children}
            </motion.div>
        </Suspense>
    </AnimatePresence>
);


