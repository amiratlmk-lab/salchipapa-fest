"use client"

import { useEffect, useState, Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trophy, ChevronLeft, Flame } from "lucide-react"
import { getRanking, RankedLocale } from "@/actions/ranking"
import { Particles } from "@/components/Particles"
import { useSearchParams } from "next/navigation"

function RankingContent() {
    const [ranking, setRanking] = useState<RankedLocale[]>([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()

    // Get user's vote from context
    const votedName = searchParams.get('votedName')
    // const votedVotes = searchParams.get('votedVotes')

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRanking()
            setRanking(data)
            setLoading(false)
        }
        fetchData()

        const interval = setInterval(fetchData, 10000)
        return () => clearInterval(interval)
    }, [])

    const getRankIcon = (index: number) => {
        if (index === 0) return <div className="w-8 h-8 rounded-full bg-gradient-to-b from-yellow-300 to-yellow-600 flex items-center justify-center text-black font-bold border border-yellow-200 shadow-[0_0_10px_rgba(234,179,8,0.5)]">1</div>
        if (index === 1) return <div className="w-8 h-8 rounded-full bg-gradient-to-b from-slate-300 to-slate-400 flex items-center justify-center text-black font-bold border border-slate-200 shadow-[0_0_10px_rgba(148,163,184,0.5)]">2</div>
        if (index === 2) return <div className="w-8 h-8 rounded-full bg-gradient-to-b from-orange-300 to-orange-500 flex items-center justify-center text-black font-bold border border-orange-200 shadow-[0_0_10px_rgba(249,115,22,0.5)]">3</div>
        return <span className="text-slate-400 font-bold text-lg w-8 text-center">{index + 1}.</span>
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-sans selection:bg-yellow-500/30">

            {/* Background Layer (Same as Home) */}
            <div className="fixed inset-0 z-0">
                {/* Mobile Background */}
                <div className="absolute inset-0 block md:hidden">
                    <Image
                        src="/bg-home-mobile-4k.jpg"
                        alt="Mobile Background"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                        unoptimized
                    />
                </div>
                {/* Desktop Background */}
                <div className="absolute inset-0 hidden md:block">
                    <Image
                        src="/bg-home-4k.jpg"
                        alt="Desktop Background"
                        fill
                        className="object-cover"
                        priority
                        quality={100}
                        unoptimized
                    />
                </div>
                <div className="absolute inset-0 bg-black/60" /> {/* Slight overlay for readability */}
                <Particles />
            </div>

            <main className="relative z-10 flex flex-col items-center justify-center min-h-screen py-8 px-4">

                {/* Golden Frame Container - Narrower (max-w-md) to match reference */}
                <div className="w-full max-w-md relative">

                    {/* Outer Glow */}
                    <div className="absolute -inset-[3px] bg-gradient-to-b from-yellow-600 via-yellow-400 to-yellow-600 rounded-[2rem] opacity-60 blur-sm" />

                    {/* Main Card */}
                    <div className="relative bg-slate-950/90 backdrop-blur-xl border-2 border-yellow-500/50 rounded-[2rem] p-6 shadow-[0_0_50px_rgba(234,179,8,0.2)] flex flex-col max-h-[85vh]">

                        {/* Decoration Top */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-[2px] bg-gradient-to-r from-transparent via-yellow-500 to-transparent shadow-[0_0_10px_rgba(234,179,8,1)]" />

                        {/* Header */}
                        <div className="text-center mb-6 flex-shrink-0">
                            <div className="flex justify-center mb-3">
                                <Trophy className="w-10 h-10 text-[#fbcc04] drop-shadow-[0_0_10px_rgba(251,204,4,0.6)]" />
                            </div>
                            <h1 className="text-xl md:text-2xl font-bold text-[#eec170] uppercase tracking-wide mb-1 font-lilita drop-shadow-sm">
                                Ranking Oficial – Salchipapa Fest 2026
                            </h1>
                            <div className="flex items-center justify-center gap-2 opacity-80">
                                <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-yellow-500/50" />
                                <p className="text-xs text-yellow-100/70 font-medium tracking-widest uppercase">
                                    Resultados en tiempo real
                                </p>
                                <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-yellow-500/50" />
                            </div>
                        </div>

                        {/* Ranking List - Scrollable */}
                        <div className="flex-grow overflow-y-auto pr-2 custom-scrollbar space-y-2 mb-6">
                            {loading ? (
                                <div className="text-center py-12 text-slate-500 animate-pulse flex flex-col items-center gap-3">
                                    <div className="w-8 h-8 border-2 border-yellow-500 border-t-transparent rounded-full animate-spin" />
                                    Cargando posiciones...
                                </div>
                            ) : ranking.map((locale, index) => (
                                <motion.div
                                    key={locale.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className={`relative flex items-center gap-3 p-3 rounded-lg border transition-all ${index < 3
                                            ? "bg-gradient-to-r from-yellow-900/20 to-transparent border-yellow-500/30"
                                            : "bg-transparent border-slate-800 hover:bg-white/5"
                                        }`}
                                >
                                    {/* Rank Number */}
                                    <div className="flex-shrink-0 w-8 flex justify-center">
                                        {getRankIcon(index)}
                                    </div>

                                    {/* Logo */}
                                    <div className={`relative w-10 h-10 rounded-full border overflow-hidden bg-black p-0.5 ${index < 3 ? 'border-yellow-500/40' : 'border-slate-700'}`}>
                                        <Image
                                            src={locale.image_url}
                                            alt={locale.name}
                                            fill
                                            className="object-contain p-0.5"
                                        />
                                    </div>

                                    {/* Name */}
                                    <div className="flex-grow min-w-0">
                                        <h3 className={`font-bold truncate text-sm uppercase tracking-wide ${index < 3 ? "text-[#fbcc04]" : "text-slate-200"}`}>
                                            {locale.name}
                                        </h3>
                                    </div>

                                    {/* Votes */}
                                    <div className="text-right flex-shrink-0">
                                        <span className={`block text-lg font-bold tabular-nums ${index < 3 ? "text-white" : "text-slate-300"}`}>
                                            {locale.votes.toLocaleString()}
                                        </span>
                                        <span className="text-[10px] text-slate-500 font-medium uppercase block -mt-1">votos</span>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer Section (Fixed at bottom of card) */}
                        <div className="flex-shrink-0 space-y-3 pt-4 border-t border-white/10">

                            {/* User Vote Info */}
                            {votedName && (
                                <div className="py-2 px-3 rounded-lg bg-gradient-to-r from-orange-950/50 to-red-950/20 border border-orange-500/30 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Flame className="w-4 h-4 text-orange-500 animate-pulse" />
                                        <span className="text-orange-200 text-xs font-medium">Tu voto:</span>
                                        <span className="text-[#fbcc04] font-bold text-sm uppercase tracking-wide">{votedName}</span>
                                    </div>
                                    <div className="text-orange-200/80 text-xs">
                                        {/* Place for user specific count if we had it, or just generic check */}
                                        ✅
                                    </div>
                                </div>
                            )}

                            {/* Back Button */}
                            <Link href="/" className="block">
                                <button className="w-full py-3 rounded-full border border-yellow-600/30 bg-black/40 hover:bg-yellow-900/10 text-[#fbcc04] text-sm font-bold uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center gap-2">
                                    Volver al Inicio
                                </button>
                            </Link>
                        </div>

                    </div>
                </div>
            </main>
        </div>
    )
}

export default function RankingPage() {
    return (
        <Suspense fallback={
            <div className="min-h-screen bg-slate-950 flex items-center justify-center text-yellow-500">
                <Trophy className="w-10 h-10 animate-bounce" />
            </div>
        }>
            <RankingContent />
        </Suspense>
    )
}
