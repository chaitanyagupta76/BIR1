"use client";

import { useEffect } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { motion } from "framer-motion";
import Image from "next/image";
import images from "@/config/images.json";
import dynamic from "next/dynamic";
import confetti from "canvas-confetti";

import { PartyPopper } from "lucide-react";

const CountdownTimer = dynamic(() => import("@/components/CountdownTimer").then(mod => mod.CountdownTimer), {
    ssr: false,
    loading: () => <div className="h-24 md:h-32" />
});

export function Hero() {
    const { t, config } = useI18n();

    useEffect(() => {
        // Premium confetti burst on load
        const duration = 3 * 1000;
        const end = Date.now() + duration;

        const frame = () => {
            confetti({
                particleCount: 2,
                angle: 60,
                spread: 55,
                origin: { x: 0 },
                colors: ["#D4AF37", "#001133", "#ffffff"],
            });
            confetti({
                particleCount: 2,
                angle: 120,
                spread: 55,
                origin: { x: 1 },
                colors: ["#D4AF37", "#001133", "#ffffff"],
            });

            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        };
        frame();
    }, []);

    if (!config.sections.hero.enabled) return null;

    return (
        <section
            id="hero"
            className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-navy-900 pt-20"
        >
            {/* Background with Overlay */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={images.hero.background}
                    alt="Venue Background"
                    fill
                    className="object-cover opacity-40"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-b from-navy-900/60 via-transparent to-navy-900" />
            </div>

            {/* Content Container */}
            <div className="relative z-20 flex flex-col items-center justify-center gap-8 px-6 max-w-7xl mx-auto">

                {/* Kid Image Section - Stylish and Rounded */}
                <motion.div
                    initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="relative"
                >
                    <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full border-4 border-gold-400 p-2 shadow-[0_0_30px_rgba(212,175,55,0.4)] bg-navy-800">
                        <div className="w-full h-full rounded-full overflow-hidden relative">
                            <Image
                                src={images.hero.kid}
                                alt={config.event.kidName}
                                fill
                                className="object-cover"
                            />
                        </div>
                    </div>

                    {/* Party Popper Icon Overlay */}
                    <motion.div
                        animate={{
                            y: [0, -10, 0],
                            rotate: [0, 15, 0]
                        }}
                        transition={{
                            duration: 2,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                        className="absolute -top-4 -right-4 bg-gold-400 p-3 rounded-full text-navy-900 shadow-lg z-30"
                    >
                        <PartyPopper size={32} />
                    </motion.div>
                </motion.div>

                {/* Text Content */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-center"
                >
                    <div className="inline-block px-4 py-1 rounded-full border border-gold-400/30 bg-gold-400/10 text-gold-400 text-sm font-bold tracking-widest uppercase mb-4">
                        {t("heroSubtitle")}
                    </div>
                    <h1 className="text-5xl md:text-8xl font-black text-white drop-shadow-2xl mb-6 tracking-tighter">
                        <span className="bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent uppercase">
                            {t("heroTitle")}
                        </span>
                    </h1>

                    <CountdownTimer />
                </motion.div>
            </div>
        </section>
    );
}
