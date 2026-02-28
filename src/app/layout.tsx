import type { Metadata } from "next";
import { Inter, Noto_Sans_Telugu } from "next/font/google";
import "./globals.css";
import { I18nProvider } from "@/i18n/I18nContext";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
    display: 'swap',
});

const telugu = Noto_Sans_Telugu({
    weight: ["400", "700"],
    subsets: ["telugu"],
    variable: "--font-telugu",
    display: 'swap',
});

export const metadata: Metadata = {
    title: "Arnav's 1st Birthday | Boss Baby Celebration",
    description: "Join us in celebrating Arnav's 1st Birthday!",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className="scroll-smooth" suppressHydrationWarning>
            <body className={`${inter.variable} ${telugu.variable} antialiased`} suppressHydrationWarning>
                <I18nProvider>
                    {children}
                </I18nProvider>
            </body>
        </html>
    );
}
