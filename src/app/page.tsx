"use client";

import { useEffect, useState } from "react";
import { LocaleGrid } from "@/components/LocaleGrid";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import Image from "next/image";
import { Hand } from "lucide-react";
import { Particles } from "@/components/Particles";

export default function Home() {
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

  const scrollToVoting = () => {
    document.getElementById("voting-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white font-sans relative overflow-x-hidden selection:bg-yellow-500/30">

      {/* Background Layer */}
      <div className="fixed top-0 left-0 w-full h-[100svh] md:h-screen md:inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark Overlay */}

        {/* Mobile Background (Vertical) */}
        <div className="absolute inset-0 z-0 block md:hidden">
          <Image
            src="/bg-home-mobile.jpg"
            alt="Mobile Background"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Desktop Background (Horizontal) */}
        <div className="absolute inset-0 z-0 hidden md:block">
          <Image
            src="/bg-home.png"
            alt="Desktop Background"
            fill
            className="object-contain"
            priority
          />
        </div>

        <Particles />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center px-4 pt-10 pb-12 text-center max-w-md mx-auto w-full">


          {/* Integrated Header: Sponsors + Main Logo */}
          <div className="relative w-full max-w-[360px] aspect-square flex justify-center items-center mb-0">

            {/* Allied Logos (Positioned Top-Left, Lowered & Closer) */}
            <motion.div
              initial={{ opacity: 0, x: -30, filter: "blur(10px)" }}
              animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
              className="absolute top-12 left-1 z-20 flex items-start gap-2"
            >
              <Image src="/sponsor-uni.png" alt="Uni Cola" width={56} height={56} className="object-contain drop-shadow-lg" />
              <Image src="/sponsor-epic.png" alt="Epic Marketing" width={48} height={48} className="object-contain drop-shadow-lg mt-1" />
            </motion.div>

            {/* Main Logo (Raised, Pushed Right) */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{
                type: "spring",
                stiffness: 260,
                damping: 20,
                delay: 0.4
              }}
              className="relative w-[70%] h-[70%] z-10 translate-x-6 -translate-y-8"
            >
              <motion.div
                className="w-full h-full relative"
                animate={{ y: [0, -8, 0] }}
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 2 // Wait for entry to finish
                }}
              >
                <Image
                  src="/logo.png"
                  alt="Salchipapa Fest 2026"
                  fill
                  className="object-contain drop-shadow-[0_0_25px_rgba(234,179,8,0.4)] filter brightness-110"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Golden Crown */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1, type: "spring" }}
            className="mb-6 -mt-24 relative z-20"
          >
            <Image src="/crown.png" alt="Crown" width={240} height={180} className="w-[240px] h-auto drop-shadow-lg mx-auto" />
          </motion.div>

          {/* Main Text (H1) */}
          <motion.h1
            initial={{ opacity: 0, y: 40, filter: "blur(10px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ delay: 1, duration: 1, ease: "easeOut" }}
            className="text-3xl md:text-5xl font-black text-yellow-400 uppercase leading-none tracking-tight mb-6 drop-shadow-md"
          >
            ¡Vota por la mejor<br />salchipapa de Panamá!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 1, ease: "easeOut" }}
            className="text-base md:text-lg text-slate-300 font-medium mb-12 max-w-xs mx-auto leading-relaxed"
          >
            Solo una será coronada como la reina del Salchipapa Fest 2026 🔥👑
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToVoting}
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(245,158,11,0.6)" }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 1.4, type: "spring", stiffness: 200, damping: 20 }}
            className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-black text-xl py-5 px-12 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-3 transition-shadow"
          >
            <span>🔥 EMPIEZA A VOTAR</span>
            <Hand className="w-6 h-6 rotate-90" />

            {/* Button Particles/Glow */}
            <div className="absolute inset-0 rounded-full border border-white/20" />
          </motion.button>

        </main>

        {/* Voting Section (Locale Grid) */}
        <section id="voting-section" className="bg-slate-950/80 backdrop-blur-md min-h-screen py-10 px-4 rounded-t-3xl border-t border-white/5 relative z-20">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-bold text-white mb-3">Participantes</h2>
              <div className="h-1.5 w-16 bg-yellow-500 mx-auto rounded-full" />
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center py-20 text-slate-500">
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

          {/* Footer */}
          <footer className="py-10 text-center text-slate-500 text-xs mt-10">
            <p>© 2026 Salchipapa Fest • Votación segura • Panamá</p>
          </footer>
        </section>

      </div>
    </div>
  );
}
