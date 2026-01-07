"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Trophy, ChevronLeft, Flame } from "lucide-react"
import { getRanking, RankedLocale } from "@/actions/ranking"
import { Particles } from "@/components/Particles"
import { useSearchParams } from "next/navigation"

export default function RankingPage() {
    const [ranking, setRanking] = useState<RankedLocale[]>([])
    const [loading, setLoading] = useState(true)
    const searchParams = useSearchParams()

    // Get user's vote from context (URL param for now to keep it simple across page navigations)
    // The VoteSuccessModal will pass ?votedId=...&votedName=...
    const votedName = searchParams.get('votedName')
    const votedVotes = searchParams.get('votedVotes') // Optional: pass the current votes of the user's choice to display

    useEffect(() => {
        const fetchData = async () => {
            const data = await getRanking()
            setRanking(data)
            setLoading(false)
        }
        fetchData()

        // Poll for updates every 10 seconds? Optional.
        const interval = setInterval(fetchData, 10000)
        return () => clearInterval(interval)
    }, [])

    const getRankIcon = (index: number) => {
        if (index === 0) return <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-yellow-300 to-yellow-600 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(234,179,8,0.5)]">1</div>
        if (index === 1) return <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-gray-300 to-gray-500 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(156,163,175,0.5)]">2</div>
        if (index === 2) return <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-gradient-to-br from-orange-400 to-orange-700 flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(249,115,22,0.5)]">3</div>
        return <span className="text-slate-400 font-bold text-lg md:text-xl w-8 text-center">{index + 1}.</span>
    }

    return (
        <div className="min-h-screen bg-slate-950 text-white relative overflow-hidden font-sans selection:bg-yellow-500/30">

            {/* Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-900/10 via-slate-950 to-slate-950" />
                <Particles />
            </div>

            <main className="relative z-10 flex flex-col items-center min-h-screen py-8 px-4 md:py-12">

                {/* Golden Frame Container */}
                <div className="w-full max-w-2xl relative">

                    {/* Glowing Border Frame */}
                    <div className="absolute -inset-[2px] bg-gradient-to-b from-yellow-500 via-orange-500 to-yellow-500 rounded-[2.5rem] opacity-75 blur-sm" />
                    <div className="relative bg-slate-950/90 backdrop-blur-xl border border-yellow-500/50 rounded-[2.5rem] p-6 md:p-8 shadow-[0_0_50px_rgba(234,179,8,0.15)] overflow-hidden">

                        {/* Header */}
                        <div className="text-center mb-8 relative">
                            <div className="flex justify-center mb-4">
                                <Trophy className="w-12 h-12 text-[#fbcc04] drop-shadow-[0_0_15px_rgba(251,204,4,0.6)]" />
                            </div>
                            <h1 className="text-2xl md:text-3xl font-bold text-[#eec170] uppercase tracking-wide mb-2 font-lilita drop-shadow-sm">
                                Ranking Oficial – Salchipapa Fest 2026
                            </h1>
                            <div className="h-[1px] w-32 mx-auto bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent mb-2" />
                            <p className="text-sm md:text-base text-slate-400 font-medium tracking-widest uppercase">
                                Resultados en tiempo real
                            </p>
                        </div>

                        {/* Ranking List */}
                        <div className="space-y-3 md:space-y-4 mb-24 md:mb-28">
                            {loading ? (
                                <div className="text-center py-12 text-slate-500 animate-pulse">
                                    Cargando posiciones...
                                </div>
                            ) : ranking.map((locale, index) => (
                                <motion.div
                                    key={locale.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                    className={`relative flex items-center gap-4 p-3 md:p-4 rounded-xl border transition-all ${index < 3
                                            ? "bg-gradient-to-r from-yellow-900/10 to-transparent border-yellow-500/30"
                                            : "bg-white/5 border-white/5"
                                        }`}
                                >
                                    {/* Rank */}
                                    <div className="flex-shrink-0">
                                        {getRankIcon(index)}
                                    </div>

                                    {/* Logo */}
                                    <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-full border border-yellow-500/20 overflow-hidden bg-black p-1">
                                        <Image
                                            src={locale.image_url}
                                            alt={locale.name}
                                            fill
                                            className="object-contain p-1"
                                        />
                                    </div>

                                    {/* Info */}
                                    <div className="flex-grow min-w-0">
                                        <h3 className={`font-bold truncate ${index < 3 ? "text-[#fbcc04] text-lg" : "text-white text-base"}`}>
                                            {locale.name}
                                        </h3>
                                    </div>

                                    {/* Votes */}
                                    <div className="text-right flex-shrink-0">
                                        <span className="block text-lg md:text-xl font-bold text-white tabular-nums">
                                            {locale.votes.toLocaleString()}
                                        </span>
                                        <span className="text-xs text-slate-400 font-medium uppercase">votos</span>
                                    </div>

                                    {/* Top 3 Glow */}
                                    {index < 3 && (
                                        <div className="absolute inset-0 rounded-xl bg-yellow-500/5 pointer-events-none" />
                                    )}
                                </motion.div>
                            ))}
                        </div>

                        {/* Footer (Fixed inside frame) */}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/95 to-transparent pt-12 pb-8 px-6 md:px-8 rounded-b-[2.5rem] z-20">

                            {/* User Vote Info */}
                            {votedName && (
                                <div className="mb-6 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-900/40 to-yellow-900/20 border border-orange-500/30 flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
                                        <span className="text-orange-200 font-medium">Tu voto:</span>
                                        <span className="text-[#fbcc04] font-bold uppercase tracking-wide">{votedName}</span>
                                    </div>
                                    <div className="text-orange-200/80 text-sm">
                                        {/* Place for user specific count if we had it, or just generic check */}
                                        ✅
                                    </div>
                                </div>
                            )}

                            {/* Back Button */}
                            <Link href="/">
                                <button className="w-full group relative flex items-center justify-center gap-2 py-3 px-6 rounded-full border border-yellow-600/50 bg-black/50 hover:bg-yellow-900/20 text-[#fbcc04] font-bold uppercase tracking-wider transition-all hover:scale-[1.02] active:scale-[0.98]">
                                    <div className="absolute inset-0 rounded-full border border-yellow-500/20 blur-[2px] group-hover:blur-[4px] transition-all" />
                                    <span>Volver al Inicio</span>
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    )
}
