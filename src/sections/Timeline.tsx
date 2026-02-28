"use client";

import { useRef } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import imagesConfig from "@/config/images.json";

const images = imagesConfig as any;

export function Timeline() {
    const { t, config, language } = useI18n();
    const containerRef = useRef<HTMLDivElement>(null);

    if (!config.sections.timeline.enabled) return null;

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    // Baby crawling animation
    const babyX = useTransform(scrollYProgress, [0, 0.8, 1], ["-10%", "80%", "85%"]);
    // Rotate/Scale baby slightly during crawl
    const babyRotate = useTransform(scrollYProgress, [0, 0.5, 0.8], [0, 5, 0]);


    return (
        <section
            id="timeline"
            ref={containerRef}
            className="relative bg-navy-800 py-20"
        >
            <div className="sticky top-20 text-center z-10 py-10">
                <h2 className="text-4xl md:text-6xl font-bold text-gold-400 italic">
                    {t("timelineTitle")}
                </h2>
            </div>

            <div className="relative max-w-7xl mx-auto px-6 space-y-[50vh] pt-[20vh] pb-[30vh]">
                {images.timeline.months.map((monthData: any, idx: number) => (
                    <motion.div
                        key={monthData.number}
                        initial={{ opacity: 0, x: idx % 2 === 0 ? -50 : 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.6 }}
                        className={`flex flex-col md:flex-row items-center gap-10 ${idx % 2 === 0 ? "" : "md:flex-row-reverse"
                            }`}
                    >
                        <div className="w-full md:w-1/2 relative group">
                            <div className="absolute -inset-2 bg-gradient-to-r from-gold-400 to-gold-600 rounded-2xl opacity-20 group-hover:opacity-40 blur-lg transition duration-500" />
                            <div className="relative aspect-square rounded-2xl overflow-hidden glass border border-gold-400/30">
                                <Image
                                    src={monthData.url}
                                    alt={`${monthData.number} Month`}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                        </div>
                        <div className="w-full md:w-1/2 text-center md:text-left">
                            <span className="text-7xl font-black text-gold-400/20 block mb-2">
                                {monthData.number}
                            </span>
                            <h3 className="text-3xl font-bold text-white mb-4 uppercase tracking-wider">
                                {monthData.number} {t("monthsLabel")}
                            </h3>
                            <p className="text-navy-200 text-lg leading-relaxed">
                                {monthData.text}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Crawling Baby Animation Container */}
            <div className="sticky bottom-10 left-0 right-0 h-32 pointer-events-none z-50 overflow-hidden">
                <motion.div
                    style={{ x: babyX, rotate: babyRotate }}
                    className="w-40 h-40 relative"
                >
                    {/* If scroll is near end, show standing baby, else crawling */}
                    <motion.div
                        animate={{
                            opacity: scrollYProgress.get() > 0.9 ? 0 : 1
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        {/* Gold Glow/Circle behind baby to mask edges */}
                        <div className="absolute w-32 h-32 bg-gold-400/20 blur-2xl rounded-full" />
                        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-gold-400/20 glass-dark">
                            <Image
                                src={images.timeline.babyCrawler}
                                alt="Crawling Baby"
                                fill
                                className="object-cover scale-110"
                            />
                        </div>
                    </motion.div>
                    <motion.div
                        style={{
                            opacity: useTransform(scrollYProgress, [0.85, 0.95], [0, 1])
                        }}
                        className="absolute inset-0 flex items-center justify-center"
                    >
                        <div className="relative w-40 h-40 md:w-56 md:h-56 rounded-full overflow-hidden border-2 border-gold-400/20 glass-dark">
                            <Image
                                src={images.timeline.babyPlacard}
                                alt="1 Year Baby"
                                fill
                                className="object-cover scale-110"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
