"use client";

import { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import images from "@/config/images.json";

export function BackgroundMusic() {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    useEffect(() => {
        // Use local path if exists, otherwise fallback to a royalty-free CDN URL
        const audioPath = images.assets.music || "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3";
        audioRef.current = new Audio(audioPath);
        audioRef.current.loop = true;

        return () => {
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        };
    }, []);

    const toggleMusic = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.log("User interaction required for audio"));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-6 left-6 z-50">
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleMusic}
                className="w-12 h-12 rounded-full glass-dark border border-gold-400/30 flex items-center justify-center text-gold-400 shadow-lg relative overflow-hidden group"
            >
                <AnimatePresence mode="wait">
                    {isPlaying ? (
                        <motion.div
                            key="playing"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <Volume2 size={20} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="paused"
                            initial={{ opacity: 0, rotate: -90 }}
                            animate={{ opacity: 1, rotate: 0 }}
                            exit={{ opacity: 0, rotate: 90 }}
                        >
                            <VolumeX size={20} />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Visualizer animation when playing */}
                {isPlaying && (
                    <div className="absolute inset-x-0 bottom-1 flex justify-center gap-[2px] h-3 items-end opacity-50">
                        {[1, 2, 3, 4].map((i) => (
                            <motion.div
                                key={i}
                                animate={{ height: ["20%", "80%", "40%", "100%", "20%"] }}
                                transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                                className="w-[2px] bg-gold-400"
                            />
                        ))}
                    </div>
                )}
            </motion.button>
        </div>
    );
}
