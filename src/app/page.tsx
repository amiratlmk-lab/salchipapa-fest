"use client";

import { useEffect, useState } from "react";
import { LocaleGrid } from "@/components/LocaleGrid";
import { supabase } from "@/lib/supabase";

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
    <div className="min-h-screen bg-slate-950 text-white font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="py-12 px-6 text-center bg-gradient-to-b from-yellow-500/10 to-transparent flex flex-col items-center">
        <div className="relative w-48 h-48 mb-6 animate-pulse">
          <img
            src="/logo.png"
            alt="Salchipapa Fest 2026 Logo"
            className="object-contain w-full h-full drop-shadow-xl"
          />
        </div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-yellow-400 mb-4 drop-shadow-lg hidden">
          Salchipapa Fest
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Vota por tu salchipapa favorita. ¡Elige el sabor que manda en la ciudad!
        </p>
      </header>

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
