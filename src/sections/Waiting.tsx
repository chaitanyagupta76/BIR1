"use client";

import { useI18n } from "@/i18n/I18nContext";
import { motion } from "framer-motion";
import Image from "next/image";
import images from "@/config/images.json";

export function Waiting() {
    const { t, config } = useI18n();

    if (!config.sections.waiting.enabled) return null;

    return (
        <section id="waiting" className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-navy-900 py-24">
            {/* Background with Soft Glow */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={images.waiting.background}
                    alt="Waiting Section BG"
                    fill
                    className="object-cover opacity-30 grayscale hover:grayscale-0 transition-all duration-1000"
                />
                <div className="absolute inset-0 bg-navy-900/40" />
            </div>

            <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1 }}
                className="relative z-10 text-center px-6"
            >
                <div className="mb-8">
                    <div className="h-1 w-24 bg-gold-400 mx-auto rounded-full mb-8 opacity-50" />
                    <h2 className="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter drop-shadow-[0_0_20px_rgba(255,255,255,0.3)]">
                        {t("waitingTitle")}
                    </h2>
                    <div className="h-1 w-24 bg-gold-400 mx-auto rounded-full mt-8 opacity-50" />
                </div>

                <p className="text-gold-400 text-xl md:text-2xl font-medium tracking-widest italic animate-pulse">
                    See you at {config.event.venueName}
                </p>

                {/* Boss Baby Aesthetic Ornament */}
                <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                    className="mt-16 inline-block w-20 h-20 border-t-2 border-r-2 border-gold-400/30 rounded-full"
                />
            </motion.div>
        </section>
    );
}
