"use client";

import { useEffect, useState } from "react";
import { LocaleGrid } from "@/components/LocaleGrid";
import { supabase } from "@/lib/supabase";
import { motion } from "framer-motion";

export default function Home() {
  const [locales, setLocales] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data, error } = await supabase.from('locales').select('*').order('name');

        if (error) {
          throw error;
        }

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

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5 }}
        className="py-12 md:py-24 px-6 text-center bg-gradient-to-b from-yellow-500/10 to-transparent flex flex-col items-center overflow-hidden"
      >

        <div className="flex items-center justify-center gap-6 md:gap-16 mb-16 md:mb-10 w-full max-w-4xl">
          {/* Sponsor Left - Uni Cola */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.5 }}
            viewport={{ once: true }}
            className="w-16 h-16 md:w-32 md:h-32 flex-shrink-0"
          >
            <img src="/sponsor-uni.png" alt="Uni Cola" className="w-full h-full object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity" />
          </motion.div>

          {/* Main Logo */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, type: "spring", stiffness: 50, duration: 1.5 }}
            viewport={{ once: true }}
            className="relative w-40 h-40 md:w-72 md:h-72 flex-shrink-0"
          >
            <img
              src="/logo.png"
              alt="Salchipapa Fest 2026 Logo"
              className="object-contain w-full h-full drop-shadow-2xl hover:scale-105 transition-transform duration-300"
            />
          </motion.div>

          {/* Sponsor Right - Epic Marketing */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 1.5 }}
            viewport={{ once: true }}
            className="w-16 h-16 md:w-32 md:h-32 flex-shrink-0"
          >
            <img src="/sponsor-epic.png" alt="Epic Marketing" className="w-full h-full object-contain drop-shadow-md opacity-90 hover:opacity-100 transition-opacity" />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 1.5 }}
        >
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-yellow-400 mb-6 drop-shadow-lg hidden">
            Salchipapa Fest
          </h1>
          <p className="text-xl md:text-3xl text-white max-w-3xl mx-auto leading-relaxed font-bold px-4">
            ¡Vota por tu salchipapa favorita!
            <br className="block mb-6 md:mb-3" />
            <span className="text-xl md:text-3xl text-yellow-400">Tú eliges el sabor que manda</span>
          </p>
        </motion.div>
      </motion.header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-500">
            <div className="animate-spin text-4xl mb-4">🍟</div>
            <p>Cargando participantes...</p>
          </div>
        ) : error ? (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded text-red-200 text-center max-w-md mx-auto">
            <p className="font-bold mb-2">Error de conexión</p>
            <p className="text-sm opacity-80">{error}</p>
          </div>
        ) : (
          <LocaleGrid locales={locales} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900">
        <p>© 2026 Salchipapa Fest • Votación segura • v1.3 (Live)</p>
      </footer>
    </div>
  );
}
