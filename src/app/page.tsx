"use client";

import { useEffect, useState } from "react";
import { LocaleGrid } from "@/components/LocaleGrid";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";
import { Hand } from "lucide-react";
import { Particles } from "@/components/Particles";

export default function Home() {
  const [locales, setLocales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('locales').select('*').order('name');
        if (error) throw error;
        setLocales(data || []);
      } catch (err: any) {
        console.error("Error fetching locales:", err);
        setError(err.message || "Error desconocido");
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
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-black/60 z-10" /> {/* Dark Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{ backgroundImage: "url('/bg-home.jpg')" }}
        />
        <Particles />
      </div>

      {/* Main Content Layer */}
      <div className="relative z-10 flex flex-col min-h-screen">

        {/* Hero Section */}
        <main className="flex-grow flex flex-col items-center justify-center px-4 pt-8 pb-12 text-center max-w-md mx-auto w-full">

          {/* Integrated Header: Sponsors + Main Logo */}
          <div className="relative w-full max-w-[340px] aspect-square flex justify-center items-center mb-0">

            {/* Allied Logos (Positioned Top-Left) */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="absolute top-4 left-0 z-10 flex items-start gap-2"
            >
              <img src="/sponsor-uni.png" alt="Uni Cola" className="h-14 w-14 object-contain drop-shadow-md" />
              <img src="/sponsor-epic.png" alt="Epic Marketing" className="h-12 w-12 object-contain drop-shadow-md mt-1" />
            </motion.div>

            {/* Main Logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.4 }}
              className="relative w-full h-full z-0 translate-x-4"
            >
              <img
                src="/logo.png"
                alt="Salchipapa Fest 2026"
                className="w-full h-full object-contain drop-shadow-[0_0_25px_rgba(234,179,8,0.4)] filter brightness-110"
              />
            </motion.div>
          </div>

          {/* Golden Crown */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.8 }}
            className="mb-8 -mt-4 relative z-20"
          >
            <img src="/crown.png" alt="Crown" className="w-20 h-auto drop-shadow-lg mx-auto" />
            <div className="h-[1px] w-28 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mx-auto mt-3" />
          </motion.div>

          {/* Main Text (H1) */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9 }}
            className="text-3xl md:text-5xl font-black text-yellow-400 uppercase leading-none tracking-tight mb-6 drop-shadow-md"
          >
            ¡Vota por la mejor<br />salchipapa de Panamá!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1 }}
            className="text-base md:text-lg text-slate-300 font-medium mb-12 max-w-xs mx-auto leading-relaxed"
          >
            Solo una será coronada como la reina del Salchipapa Fest 2026 🔥👑
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={scrollToVoting}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ delay: 1.3, type: "spring" }}
            className="group relative bg-gradient-to-r from-orange-500 to-yellow-500 text-black font-black text-xl py-5 px-12 rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] flex items-center gap-3 hover:shadow-[0_0_30px_rgba(245,158,11,0.7)] transition-shadow"
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
