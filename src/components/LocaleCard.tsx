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
    return (
        <div className="group overflow-hidden rounded-xl border border-slate-800 bg-slate-900/50 hover:bg-slate-900 hover:border-yellow-500/50 transition-all duration-300">
            <div className="relative aspect-[4/3] w-full overflow-hidden">
                <Image
                    src={locale.image_url}
                    alt={locale.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 to-transparent" />
            </div>

            <div className="p-5">
                <h3 className="text-xl font-bold text-white mb-2">{locale.name}</h3>
                {locale.description && (
                    <p className="text-slate-400 text-sm mb-4 line-clamp-2">{locale.description}</p>
                )}
                <Button
                    className="w-full bg-yellow-500 text-slate-950 font-bold hover:bg-yellow-400 group-hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] transition-all"
                    onClick={() => onVoteClick(locale)}
                >
                    Votar 🍟
                </Button>
            </div>
        </div>
    )
}
