import { LocaleGrid } from "@/components/LocaleGrid";
import { supabase } from "@/lib/supabase";

export const revalidate = 0; // Disable static caching for real-time results if we wanted, but for list updates it's good.

export default async function Home() {
  // Check for DB connection immediately
  const hasEnvVars = process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!hasEnvVars) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center p-8 text-center">
        <div className="text-6xl mb-6">⚠️</div>
        <h1 className="text-3xl font-bold text-yellow-500 mb-4">Configuración Pendiente</h1>
        <p className="max-w-lg text-slate-400">
          La aplicación ha sido generada pero necesitas conectar tu base de datos Supabase.
        </p>
        <div className="mt-8 bg-slate-900 p-4 rounded text-left font-mono text-sm border border-slate-800">
          <p className="text-gray-500">Configura estas variables de entorno en Vercel:</p>
          <p className="text-green-400 mt-2">NEXT_PUBLIC_SUPABASE_URL</p>
          <p className="text-green-400">NEXT_PUBLIC_SUPABASE_ANON_KEY</p>
        </div>
      </div>
    )
  }

  // Fetch locales
  const { data: locales, error } = await supabase.from('locales').select('*').order('name');

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
        {error ? (
          <div className="p-4 bg-red-900/50 border border-red-500 rounded text-red-200 text-center">
            Error cargando participantes: {error.message}
          </div>
        ) : (
          <LocaleGrid locales={locales || []} />
        )}
      </main>

      {/* Footer */}
      <footer className="py-8 text-center text-slate-600 text-sm border-t border-slate-900">
        <p>© 2026 Salchipapa Fest • Votación segura</p>
      </footer>
    </div>
  );
}
