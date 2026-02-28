"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import images from "@/config/images.json";

export function Loader() {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 2500); // 2.5 seconds loading time
        return () => clearTimeout(timer);
    }, []);

    return (
        <AnimatePresence>
            {isLoading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[9999] bg-navy-900 flex flex-col items-center justify-center"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                        className="relative w-64 h-64 md:w-80 md:h-80"
                    >
                        {/* Glowing Background */}
                        <div className="absolute inset-0 bg-gold-400/20 blur-[100px] rounded-full animate-pulse" />

                        <div className="relative w-full h-full rounded-3xl overflow-hidden glass border-2 border-gold-400/30">
                            <Image
                                src={images.assets.loader}
                                alt="Loading Boss Baby"
                                fill
                                className="object-cover"
                                priority
                            />
                        </div>

                        {/* Animated Border */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                            className="absolute -inset-4 border-2 border-dashed border-gold-400/20 rounded-full"
                        />
                    </motion.div>

                    <motion.div
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 text-center"
                    >
                        <h2 className="text-2xl md:text-3xl font-black text-gold-400 uppercase tracking-widest mb-2">
                            The Boss is Arriving...
                        </h2>
                        <div className="flex gap-2 justify-center">
                            {[0, 1, 2].map((i) => (
                                <motion.div
                                    key={i}
                                    animate={{ y: [0, -10, 0] }}
                                    transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.2 }}
                                    className="w-3 h-3 rounded-full bg-gold-400"
                                />
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
