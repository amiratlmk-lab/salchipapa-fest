"use client";

import { useEffect, useState } from "react";
import { LocaleGrid } from "@/components/LocaleGrid";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import Image from "next/image";
import { Particles } from "@/components/Particles";

export default function VotingPage() {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [locales, setLocales] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchData() {
            try {
                const { data, error } = await supabase.from('locales').select('*').order('name');
                if (error) throw error;
                setLocales(data || []);
            } catch (err: unknown) {
                console.error("Error fetching locales:", err);
                setError((err as Error).message || "Error desconocido");
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-x-hidden selection:bg-yellow-500/30">

            {/* Background Layer */}
            <div className="fixed top-0 left-0 w-full h-[100svh] md:h-screen md:inset-0 z-0">


                {/* Mobile Background */}
                <div className="absolute inset-0 z-0 block md:hidden">
                    <Image
                        src="/bg-home-mobile-4k.jpg"
                        alt="Mobile Background"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                        unoptimized
                    />
                </div>

                {/* Desktop Background */}
                <div className="absolute inset-0 z-0 hidden md:block">
                    <Image
                        src="/bg-home-4k.jpg"
                        alt="Desktop Background"
                        fill
                        className="object-contain"
                        priority
                        quality={100}
                        unoptimized
                    />
                </div>

                <Particles />
            </div>

            {/* Main Content */}
            <div className="relative z-10 flex flex-col min-h-screen pt-2 md:pt-10">

                {/* Header Section */}
                <div className="text-center px-4 mb-2">

                    {/* Integrated Header: Sponsors + Main Logo (Optional, if we want exact mirror, but user just said text/proportions. Let's fix text first) */}

                    {/* Crown */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ delay: 0.8, duration: 1, type: "spring" }}
                        className="relative z-20 -mt-8 md:-mt-28 mb-2"
                    >
                        <Image src="/crown.png" alt="Crown" width={240} height={180} className="w-[180px] md:w-[240px] h-auto drop-shadow-md mx-auto" />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        transition={{ delay: 1, duration: 1, ease: "easeOut" }}
                        className="text-3xl md:text-6xl text-[#fbcc04] uppercase leading-tight tracking-tight mb-4 -mt-10 md:-mt-12 drop-shadow-md font-lilita max-w-5xl mx-auto"
                    >
                        ¡VOTA POR TU LOCAL FAVORITO<br />DE SALCHIPAPAS EN PANAMÁ!
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
                        className="text-base md:text-lg text-white font-medium mb-8 max-w-2xl mx-auto leading-relaxed px-4"
                    >
                        Elige cuál es el mejor negocio especialista en salchipapas del <span className="font-bold text-white">Salchipapa Fest 2026</span> 🏆
                    </motion.p>
                </div>

                {/* Voting Grid */}
                <div className="flex-grow px-4 pb-20 mt-6 md:mt-16">
                    <div className="max-w-5xl mx-auto">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-20 text-white">
                                <div className="animate-spin text-4xl mb-4">🍟</div>
                                <p>Cargando participantes...</p>
                            </div>
                        ) : error ? (
                            <div className="p-4 bg-red-900/50 border border-red-500 rounded text-red-200 text-center max-w-md mx-auto">
                                <p>Error de conexión</p>
                            </div>
                        ) : (
                            <LocaleGrid locales={locales} />
                        )}
                    </div>
                </div>

                {/* Footer */}
                <footer className="py-8 text-center text-white text-xs z-20 relative">
                    <p>© 2026 Salchipapa Fest • Votación segura • Panamá</p>
                </footer>

            </div>
        </div>
    );
}
