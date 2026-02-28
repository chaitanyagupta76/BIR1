"use client";

import { useI18n } from "@/i18n/I18nContext";
import { motion } from "framer-motion";
import { Radio } from "lucide-react";

export function Livestream() {
    const { t, config } = useI18n();

    if (!config.sections.livestream.enabled) return null;

    return (
        <section id="livestream" className="py-24 bg-navy-800">
            <div className="max-w-5xl mx-auto px-6">
                <div className="text-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-red-600/20 border border-red-600/40 text-red-500 font-bold uppercase text-sm mb-6"
                    >
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                        </span>
                        LIVE
                    </motion.div>

                    <h2 className="text-4xl md:text-5xl font-bold text-white italic">
                        {t("livestreamTitle")}
                    </h2>
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="aspect-video w-full rounded-3xl overflow-hidden glass-dark border border-gold-400/30 shadow-2xl"
                >
                    <iframe
                        src={config.event.livestreamUrl}
                        title="Livestream"
                        width="100%"
                        height="100%"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="border-0"
                    ></iframe>
                </motion.div>

                <div className="mt-12 text-center text-navy-200">
                    <p className="text-lg">
                        Can&apos;t make it in person? Join us virtually as we celebrate Arnav&apos;s special milestone.
                    </p>
                </div>
            </div>
        </section>
    );
}
