"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Share2, BarChart2, CheckCircle2 } from "lucide-react"

interface VoteSuccessModalProps {
    isOpen: boolean
    onClose: () => void
    localeName: string
    localeImage: string
}

export function VoteSuccessModal({ isOpen, onClose, localeName, localeImage }: VoteSuccessModalProps) {
    if (!isOpen) return null

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/95 backdrop-blur-md p-4 animate-in fade-in duration-300">
                <div className="w-full max-w-md relative flex flex-col items-center">

                    {/* Header Title */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-center gap-2 mb-8"
                    >
                        <h2 className="text-3xl md:text-4xl font-black text-[#fbcc04] font-lilita uppercase tracking-wide drop-shadow-[0_2px_10px_rgba(251,204,4,0.5)]">
                            ¡VOTO REGISTRADO!
                        </h2>
                        <div className="bg-green-500 rounded-full p-1 shadow-[0_0_15px_rgba(34,197,94,0.6)]">
                            <CheckCircle2 className="w-6 h-6 text-white stroke-[3]" />
                        </div>
                    </motion.div>

                    {/* Main Card */}
                    <div className="w-full bg-[#0a0a0a] border-2 border-yellow-500/50 rounded-3xl shadow-[0_0_50px_rgba(234,179,8,0.15)] p-8 relative overflow-hidden">

                        {/* Glow Effects */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-yellow-500 shadow-[0_0_20px_rgba(234,179,8,1)]" />
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-yellow-500/5 via-transparent to-transparent pointer-events-none" />

                        {/* Locale Image / Logo */}
                        <div className="relative w-48 h-48 mx-auto mb-6">
                            <div className="absolute inset-0 border-2 border-yellow-500/30 rounded-2xl transform rotate-3" />
                            <div className="absolute inset-0 border-2 border-yellow-500/30 rounded-2xl transform -rotate-3" />
                            <div className="relative h-full w-full bg-black rounded-2xl border-2 border-yellow-500 shadow-[0_0_30px_rgba(234,179,8,0.2)] overflow-hidden p-2">
                                <div className="w-full h-full relative rounded-xl overflow-hidden bg-white">
                                    <Image
                                        src={localeImage || "/placeholder-logo.png"}
                                        alt={localeName}
                                        fill
                                        className="object-contain p-2"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Text Content */}
                        <div className="text-center space-y-4">
                            <div>
                                <p className="text-slate-400 text-sm font-medium uppercase tracking-widest mb-1">Votaste por</p>
                                <h3 className="text-2xl md:text-3xl font-black text-[#fbcc04] font-lilita uppercase tracking-wide leading-none">
                                    {localeName}
                                </h3>
                            </div>

                            <div className="h-px w-full bg-gradient-to-r from-transparent via-yellow-500/30 to-transparent" />

                            <p className="text-slate-300 text-sm leading-relaxed px-2">
                                Tu voto ha sido registrado correctamente y cuenta para el <span className="text-yellow-400 font-bold">Salchipapa Fest 2026</span>.
                            </p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="w-full mt-8 space-y-4 px-4">
                        <Button
                            className="w-full h-14 bg-gradient-to-r from-orange-600 to-yellow-500 hover:from-orange-500 hover:to-yellow-400 text-white text-lg font-black uppercase tracking-wider rounded-full shadow-[0_0_25px_rgba(234,88,12,0.4)] border border-yellow-300/30 transform transition-all hover:scale-[1.02] active:scale-[0.98]"
                            onClick={() => window.location.href = '#ranking'} // Placeholder action
                        >
                            <span className="flex items-center gap-2">
                                🔥 Ver Ranking
                            </span>
                        </Button>

                        <Button
                            variant="outline"
                            className="w-full h-12 bg-slate-900/50 border-slate-700 hover:bg-slate-800 text-slate-300 font-bold uppercase tracking-wide rounded-full backdrop-blur-sm"
                            onClick={() => {
                                if (navigator.share) {
                                    navigator.share({
                                        title: 'Salchipapa Fest 2026',
                                        text: `Acabo de votar por ${localeName} en el Salchipapa Fest!`,
                                        url: window.location.href
                                    })
                                }
                            }}
                        >
                            <span className="flex items-center gap-2">
                                <Share2 className="w-4 h-4" /> Compartir Evento
                            </span>
                        </Button>
                    </div>

                </div>
            </div>
        </AnimatePresence>
    )
}
