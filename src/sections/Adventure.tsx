"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useI18n } from "@/i18n/I18nContext";
import imagesConfig from "@/config/images.json";

export default function Adventure() {
    const { t, config } = useI18n();

    if (!config.sections.adventure?.enabled) return null;

    return (
        <section id="adventure" className="py-24 bg-navy-900 overflow-hidden">
            <div className="container mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-5xl font-black text-gold-400 mb-4 uppercase tracking-tighter">
                        {t("adventureTitle")}
                    </h2>
                    <p className="text-navy-200 text-lg md:text-xl font-medium max-w-2xl mx-auto">
                        {t("adventureSubtitle")}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {imagesConfig.adventure.photos.map((photo, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            whileHover={{ y: -10 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative group aspect-[4/5] rounded-3xl overflow-hidden glass border-2 border-gold-400/20 shadow-2xl"
                        >
                            <Image
                                src={photo}
                                alt={`Adventure ${index + 1}`}
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                <span className="text-gold-400 font-bold tracking-widest uppercase text-xs">
                                    Adventure #{index + 1}
                                </span>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="mt-16 text-center"
                >
                    <div className="inline-block p-1 rounded-full bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600 shadow-[0_0_20px_rgba(212,175,55,0.3)]">
                        <div className="px-8 py-3 rounded-full bg-navy-900">
                            <span className="text-gold-400 font-black uppercase tracking-widest text-sm">
                                To Be Continued...
                            </span>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
