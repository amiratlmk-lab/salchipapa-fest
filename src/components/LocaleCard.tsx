import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Locale {
    id: string
    name: string
    image_url: string
    description?: string
}

interface LocaleCardProps {
    locale: Locale
    onVoteClick: (locale: Locale) => void
}

export function LocaleCard({ locale, onVoteClick }: LocaleCardProps) {
    // Deterministic badge logic avoiding impure Math.random() during render
    const badgeType = locale.id.charCodeAt(0) % 3 === 0 ? "NUEVO" : null;

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-orange-500/30 bg-black/40 backdrop-blur-sm hover:border-orange-500/80 hover:bg-black/60 transition-all duration-300 flex flex-col items-center p-6 shadow-[0_0_15px_rgba(234,88,12,0.1)] hover:shadow-[0_0_30px_rgba(234,88,12,0.2)]">

            {/* Badge (Optional) */}
            {badgeType && (
                <div className="absolute top-4 left-4 bg-orange-600 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 shadow-lg border border-orange-400">
                    <span>🔥</span> {badgeType}
                </div>
            )}

            {/* Image Container (Diamond/Square look from reference) */}
            <div className="relative w-full aspect-square mb-4 p-2">
                <div className="absolute inset-0 border border-orange-500/20 rounded-xl" /> {/* Inner decorative border */}
                <div className="relative w-full h-full rounded-lg overflow-hidden">
                    <Image
                        src={locale.image_url}
                        alt={locale.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="text-center w-full">
                <h3 className="text-xl font-black text-white mb-1 uppercase tracking-wider">{locale.name}</h3>
                {locale.description && (
                    <p className="text-orange-200/60 text-xs mb-4 line-clamp-2">{locale.description}</p>
                )}

                <Button
                    className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white font-black italic tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_15px_rgba(234,179,8,0.4)] border border-yellow-400/50 uppercase"
                    onClick={() => onVoteClick(locale)}
                >
                    🔥 ¡VOTAR!
                </Button>

                <div className="mt-3 flex items-center justify-center gap-1 text-[10px] text-green-400 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Voto seguro
                </div>
            </div>
        </div>
    )
}
