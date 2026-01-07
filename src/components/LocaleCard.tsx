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
    rank: number
}

export function LocaleCard({ locale, onVoteClick, rank }: LocaleCardProps) {


    return (
        <div className="group relative overflow-hidden rounded-xl border border-orange-500/30 bg-black/60 backdrop-blur-sm transition-all duration-300 flex flex-col items-center p-2 md:p-6 shadow-[0_0_15px_rgba(234,88,12,0.1)] hover:shadow-[0_0_30px_rgba(234,88,12,0.3)] hover:border-orange-500/80">

            {/* Sparkles Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-400/20 blur-2xl rounded-full pointer-events-none group-hover:bg-yellow-400/40 transition-all" />

            {/* Rank Badge */}
            <div className={`absolute top-2 left-2 z-10 text-[10px] md:text-sm font-bold w-5 h-5 md:w-7 md:h-7 rounded-full flex items-center justify-center shadow-lg border border-orange-500/50 bg-black/80 text-white/90`}>
                {rank}
            </div>

            {/* Image Container */}
            <div className="relative w-full aspect-square mb-2 md:mb-4 p-1">
                <div className="absolute inset-0 border border-orange-500/20 rounded-lg pointer-events-none" />
                <div className="relative w-full h-full rounded-md overflow-hidden bg-slate-900">
                    <Image
                        src={locale.image_url}
                        alt={locale.name}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                </div>
            </div>

            {/* Content */}
            <div className="text-center w-full min-h-[80px] flex flex-col justify-between">
                <div>
                    <h3 className="text-xs md:text-xl font-black text-white mb-1 uppercase tracking-wider leading-tight">{locale.name}</h3>
                    {locale.description && (
                        <p className="text-orange-200/60 text-[8px] md:text-xs mb-2 line-clamp-2 leading-tight hidden md:block">{locale.description}</p>
                    )}
                </div>

                <Button
                    className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-[10px] md:text-base font-black italic tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_10px_rgba(234,179,8,0.2)] border border-yellow-400/30 uppercase h-6 md:h-10 py-0"
                    onClick={() => onVoteClick(locale)}
                >
                    🔥 <span className="hidden md:inline">¡VOTAR!</span><span className="md:hidden">VOTAR</span>
                </Button>

                <div className="mt-1 flex items-center justify-center gap-1 text-[8px] md:text-[10px] text-green-400 font-medium">
                    <span className="w-1 h-1 md:w-1.5 md:h-1.5 rounded-full bg-green-500" /> Voto seguro
                </div>
            </div>
        </div>
    )
}
