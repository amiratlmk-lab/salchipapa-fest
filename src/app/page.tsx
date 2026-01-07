"use client";

import { useState } from "react";
import { LocaleGrid } from "@/components/LocaleGrid";

// FALLBACK DATA - Puesta a mano porque Supabase API está caída (PostgREST Unhealthy)
const STATIC_LOCALES = [
  {
    id: '05a09546-7eb8-4bf9-a5df-bbe59f8149d1',
    name: 'El Rey del Sabor',
    image_url: 'https://images.unsplash.com/photo-1623961990059-28356e22bc84?auto=format&fit=crop&q=80&w=600',
    description: 'La clásica con salsa de la casa.'
  },
  {
    id: '91e2221d-1515-4b29-9df9-6e6b29a2cbec',
    name: 'Mega Papas',
    image_url: 'https://images.unsplash.com/photo-1541592106381-b31e9615242c?auto=format&fit=crop&q=80&w=600',
    description: 'Papas rústicas con salchicha suiza.'
  },
  {
    id: 'ff0b0c9a-d73c-4aca-a1f9-6e2d3306d6fd',
    name: 'Salchipapa La Bestia',
    image_url: 'https://images.unsplash.com/photo-1594951664366-5e0441e88863?auto=format&fit=crop&q=80&w=600',
    description: 'Con extra queso y tocineta crujiente.'
  }
];

export default function Home() {
  // Usamos los datos estáticos directamente para que cargue SÍ o SÍ.
  const locales = STATIC_LOCALES;

  return (
    <div className="min-h-screen bg-slate-950 text-white font-[family-name:var(--font-geist-sans)]">
      {/* Header */}
      <header className="py-12 px-6 text-center bg-gradient-to-b from-yellow-500/10 to-transparent">
        <div className="text-6xl mb-4 animate-bounce">🍟</div>
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-yellow-400 mb-4 drop-shadow-lg">
          Salchipapa Fest
        </h1>
        <p className="text-xl text-slate-300 max-w-2xl mx-auto">
          Vota por tu salchipapa favorita. ¡Elige el sabor que manda en la ciudad!
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 pb-20">
        <LocaleGrid locales={locales} />
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900">
        <p>© 2026 Salchipapa Fest • Votación segura • Modo Emergencia Activo</p>
      </footer>
    </div>
  );
}
