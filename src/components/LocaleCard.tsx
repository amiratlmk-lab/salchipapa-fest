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
    // Determine badge content and style based on "rank" (index + 1)
    let badgeContent = null;
    let badgeStyle = "";
    let borderStyle = "border-orange-500/30";
    let glowStyle = "shadow-[0_0_15px_rgba(234,88,12,0.1)]";

    if (rank === 1) {
        badgeContent = "TOP 1";
        badgeStyle = "bg-gradient-to-r from-yellow-400 to-orange-500 text-black border-yellow-300";
        borderStyle = "border-yellow-400/60";
        glowStyle = "shadow-[0_0_25px_rgba(250,204,21,0.3)]";
    } else if (rank === 2) {
        badgeContent = "2";
        badgeStyle = "bg-slate-700 text-white border-slate-500"; // Silver-ish style for #2? Reference shows "2" circle.
        // Actually reference image shows "2" in a circle. Let's adjust styling below.
    } else {
        badgeContent = "NUEVO";
        badgeStyle = "bg-orange-600 text-white border-orange-400";
    }

    return (
        <div className={`group relative overflow-hidden rounded-xl border ${borderStyle} bg-black/60 backdrop-blur-sm transition-all duration-300 flex flex-col items-center p-2 md:p-6 ${glowStyle} hover:shadow-[0_0_30px_rgba(234,88,12,0.3)]`}>

            {/* Sparkles Overlay */}
            <div className="absolute inset-0 bg-[url('/noise.png')] opacity-20 pointer-events-none mix-blend-overlay" />
            <div className="absolute -top-10 -right-10 w-20 h-20 bg-yellow-400/20 blur-2xl rounded-full pointer-events-none group-hover:bg-yellow-400/40 transition-all" />

            {/* Badge */}
            <div className={`absolute top-2 left-2 z-10 text-[10px] md:text-xs font-bold px-2 py-0.5 rounded-md flex items-center justify-center gap-1 shadow-lg border uppercase ${rank === 2 ? "rounded-full w-6 h-6 p-0 border-white/50 bg-slate-800" : badgeStyle}`}>
                {rank === 2 ? <span className="text-sm">2</span> : (
                    <>
                        {rank > 2 && <span>🔥</span>} {badgeContent}
                    </>
                )}
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
                    className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-white text-[10px] md:text-base font-black italic tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_0_10px_rgba(234,179,8,0.4)] border border-yellow-400/50 uppercase h-6 md:h-10 py-0"
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
