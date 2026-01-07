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
                const realData = data || [];
                const duplicatedData = [
                    ...realData,
                    ...realData.map((l: any) => ({ ...l, id: `${l.id}-copy` }))
                ];
                setLocales(duplicatedData);
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
            <div className="relative z-10 flex flex-col min-h-screen pt-2 md:pt-12">

                {/* Header Section */}
                <div className="text-center px-4 mb-2">

                    {/* Crown */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: -20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        transition={{ duration: 0.8, type: "spring" }}
                        className="relative z-20 -mb-10 md:-mb-20"
                    >
                        <Image src="/crown-header.png" alt="Crown" width={500} height={250} className="w-[280px] md:w-[500px] h-auto drop-shadow-lg mx-auto" />
                    </motion.div>

                    {/* Title */}
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2, duration: 0.8 }}
                        className="text-2xl md:text-5xl lg:text-7xl text-[#fbcc04] uppercase leading-none tracking-tight mb-6 drop-shadow-md font-lilita max-w-5xl mx-auto"
                    >
                        ¡VOTA POR TU LOCAL FAVORITO<br />DE SALCHIPAPAS EN PANAMÁ!
                    </motion.h1>

                    {/* Subtitle */}
                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        className="text-white text-sm md:text-xl lg:text-2xl max-w-3xl mx-auto font-medium leading-relaxed px-4"
                    >
                        Elige cuál es el mejor negocio especialista en salchipapas del <span className="font-bold">Salchipapa Fest 2026</span> <span className="text-3xl ml-1">🏆</span>
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
