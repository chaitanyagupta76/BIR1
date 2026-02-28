"use client";

import { useState, useEffect } from "react";
import { useI18n } from "@/i18n/I18nContext";

export function CountdownTimer() {
    const { config } = useI18n();
    const [timeLeft, setTimeLeft] = useState<{
        days: number;
        hours: number;
        minutes: number;
        seconds: number;
    }>({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        const targetDate = new Date(config.event.date + "T" + "11:00:00").getTime();

        const interval = setInterval(() => {
            const now = new Date().getTime();
            const distance = targetDate - now;

            if (distance < 0) {
                clearInterval(interval);
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                return;
            }

            setTimeLeft({
                days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                seconds: Math.floor((distance % (1000 * 60)) / 1000),
            });
        }, 1000);

        return () => clearInterval(interval);
    }, [config.event.date]);

    const units = [
        { label: "Days", value: timeLeft.days },
        { label: "Hours", value: timeLeft.hours },
        { label: "Mins", value: timeLeft.minutes },
        { label: "Secs", value: timeLeft.seconds },
    ];

    if (!mounted) return <div className="h-24 md:h-32" />; // Skeleton or empty space to avoid jump

    return (
        <div className="flex gap-4 justify-center mt-8">
            {units.map((unit) => (
                <div key={unit.label} className="flex flex-col items-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 glass border border-gold-400/30 rounded-2xl flex items-center justify-center text-3xl md:text-4xl font-black text-gold-400 shadow-[0_0_15px_rgba(212,175,55,0.2)]">
                        {unit.value.toString().padStart(2, "0")}
                    </div>
                    <span className="text-[10px] md:text-xs uppercase tracking-widest text-navy-300 mt-2 font-bold">
                        {unit.label}
                    </span>
                </div>
            ))}
        </div>
    );
}
