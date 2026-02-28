"use client";

import { useI18n } from "@/i18n/I18nContext";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/sections/Hero";
import { Timeline } from "@/sections/Timeline";
import { Venue } from "@/sections/Venue";
import { Livestream } from "@/sections/Livestream";
import { Waiting } from "@/sections/Waiting";
import Adventure from "@/sections/Adventure";
import { Loader } from "@/components/Loader";
import { BackgroundMusic } from "@/components/BackgroundMusic";
import { MessageSquare } from "lucide-react";

export default function Home() {
    const { language, t, config } = useI18n();

    return (
        <main lang={language} className="relative min-h-screen bg-navy-900">
            <Loader />
            <Navbar />

            <div className="flex flex-col">
                <Hero />
                <Timeline />
                <Venue />
                <Livestream />
                <Adventure />
                <Waiting />
            </div>

            <BackgroundMusic />

            {/* Floating RSVP Button */}
            <a
                href={`https://wa.me/?text=Hi, I am RSVPing for ${config.event.kidName}'s 1st Birthday!`}
                target="_blank"
                rel="noopener noreferrer"
                className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-16 h-16 bg-green-500 text-white rounded-full shadow-2xl hover:scale-110 transition-transform hover:bg-green-600 hover:shadow-green-500/50"
            >
                <MessageSquare fill="currentColor" />
            </a>

            {/* Footer */}
            <footer className="py-12 bg-navy-950 border-t border-gold-400/10 text-center">
                <p className="text-navy-400 text-sm font-medium tracking-widest uppercase">
                    &copy; 2026 {config.event.kidName}&apos;s Celebration | Crafted with ❤️
                </p>
            </footer>
        </main>
    );
}
