"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/i18n/I18nContext";
import { cn } from "@/utils/utils";
import { Menu, X, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const { language, setLanguage, t, config } = useI18n();
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const sections = Object.entries(config.sections)
        .filter(([_, value]) => value.enabled)
        .map(([key]) => key);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const toggleLanguage = () => {
        setLanguage(language === "en" ? "te" : "en");
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
                isScrolled ? "glass-dark py-2 shadow-lg" : "bg-transparent"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                {/* Logo */}
                <div className="text-2xl font-bold bg-gradient-to-r from-gold-400 to-gold-600 bg-clip-text text-transparent italic">
                    {config.event.kidName}
                </div>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center gap-8">
                    {sections.map((section) => (
                        <a
                            key={section}
                            href={`#${section}`}
                            className="text-white hover:text-gold-400 transition-colors uppercase text-sm font-medium tracking-widest"
                        >
                            {t(`${section}Title`).split(" ")[0]}
                        </a>
                    ))}
                    <button
                        onClick={toggleLanguage}
                        className="flex items-center gap-2 text-gold-400 border border-gold-400/30 px-3 py-1 rounded-full hover:bg-gold-400/10 transition-all"
                    >
                        <Languages size={16} />
                        <span className="text-xs font-bold uppercase">{language}</span>
                    </button>
                </div>

                {/* Mobile Toggle */}
                <div className="md:hidden flex items-center gap-4">
                    <button onClick={toggleLanguage} className="text-gold-400">
                        <Languages size={20} />
                    </button>
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="text-white"
                    >
                        {isMobileMenuOpen ? <X /> : <Menu />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="absolute top-full left-0 right-0 glass-dark border-t border-gold-400/20 p-6 md:hidden"
                    >
                        <div className="flex flex-col gap-4">
                            {sections.map((section) => (
                                <a
                                    key={section}
                                    href={`#${section}`}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className="text-white hover:text-gold-400 transition-colors uppercase text-lg font-medium"
                                >
                                    {t(`${section}Title`)}
                                </a>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
