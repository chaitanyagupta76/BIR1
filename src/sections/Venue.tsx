"use client";

import { useI18n } from "@/i18n/I18nContext";
import { motion } from "framer-motion";
import { MapPin, Calendar, Clock } from "lucide-react";
import Image from "next/image";
import images from "@/config/images.json";

export function Venue() {
    const { t, config } = useI18n();

    if (!config.sections.venue.enabled) return null;

    return (
        <section id="venue" className="relative py-24 bg-navy-900 overflow-hidden">
            {/* Background Decor */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-gold-600/10 blur-[120px] rounded-full -mr-48 -mt-48" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-navy-400/10 blur-[120px] rounded-full -ml-48 -mb-48" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-gold-300 via-gold-500 to-gold-300 bg-clip-text text-transparent italic"
                    >
                        {t("venueTitle")}
                    </motion.h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                    {/* Details Card */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="glass-dark rounded-3xl p-8 md:p-12 border border-gold-400/30 flex flex-col justify-between"
                    >
                        <div>
                            <h3 className="text-3xl font-bold text-white mb-8 border-b border-gold-400/20 pb-4">
                                {t("venueDetails")}
                            </h3>

                            <div className="space-y-8">
                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
                                        <Calendar size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gold-400 text-sm font-bold uppercase tracking-wider mb-1">
                                            {t("dateLabel")}
                                        </p>
                                        <p className="text-2xl text-white font-medium">{config.event.date}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
                                        <Clock size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gold-400 text-sm font-bold uppercase tracking-wider mb-1">
                                            {t("timeLabel")}
                                        </p>
                                        <p className="text-2xl text-white font-medium">{config.event.time}</p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-4">
                                    <div className="w-12 h-12 rounded-2xl bg-gold-400/10 border border-gold-400/20 flex items-center justify-center text-gold-400 shrink-0">
                                        <MapPin size={24} />
                                    </div>
                                    <div>
                                        <p className="text-gold-400 text-sm font-bold uppercase tracking-wider mb-1">
                                            {t("addressLabel")}
                                        </p>
                                        <p className="text-xl text-navy-100 font-medium">
                                            {config.event.venueName}, <br /> {config.event.address}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <button className="mt-12 w-full py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-700 text-navy-900 font-bold text-lg hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all hover:-translate-y-1">
                            {t("rsvpButton")}
                        </button>
                    </motion.div>

                    {/* Map & Photos */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="space-y-8"
                    >
                        {/* Map */}
                        <div className="w-full h-80 rounded-3xl overflow-hidden glass border border-gold-400/30">
                            <iframe
                                src={config.event.mapEmbedUrl}
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>

                        {/* Gallery Preview */}
                        <div className="grid grid-cols-2 gap-4">
                            {images.venue.photos.map((photo, i) => (
                                <div key={i} className="aspect-video rounded-2xl overflow-hidden glass border border-gold-400/20 relative group">
                                    <Image
                                        src={photo}
                                        alt="Venue Photo"
                                        fill
                                        className="object-cover transition duration-500 group-hover:scale-110"
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
