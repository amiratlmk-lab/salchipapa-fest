"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import * as React from "react"

interface VoteModalProps {
    isOpen: boolean
    onClose: () => void
    onVote: (name: string, contact: string) => void
    localeName: string
    isSubmitting: boolean
}

export function VoteModal({ isOpen, onClose, onVote, localeName, isSubmitting }: VoteModalProps) {
    const [name, setName] = React.useState("")
    const [contact, setContact] = React.useState("")

    if (!isOpen) return null

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (name && contact) {
            onVote(name, contact)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4">
            <div className="w-full max-w-md bg-black border border-yellow-500/30 rounded-2xl shadow-[0_0_50px_rgba(234,179,8,0.15)] p-8 relative animate-in fade-in zoom-in-95 duration-300 overflow-hidden">

                {/* Background overlay */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-yellow-500/15 to-transparent to-70% pointer-events-none" />

                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-white/50 hover:text-white transition-colors z-10 p-2"
                >
                    ✕
                </button>

                <div className="relative z-10 text-center mb-8">
                    <h2 className="text-2xl md:text-3xl font-black text-transparent bg-clip-text bg-gradient-to-br from-yellow-300 to-orange-500 mb-2 font-lilita uppercase tracking-wide drop-shadow-sm flex items-center justify-center gap-2">
                        👑 Estás a un paso de votar
                    </h2>
                    <p className="text-slate-400 text-sm font-medium leading-relaxed max-w-xs mx-auto">
                        Vas a votar por <span className="text-yellow-400 font-bold">{localeName}</span>.
                        Ingresa tus datos para validar tu participación.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="space-y-2 text-left">
                        <label className="text-xs font-bold text-yellow-500/80 uppercase tracking-wider ml-1">Nombre Completo</label>
                        <Input
                            placeholder="Ej: Juan Pérez"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                            className="bg-black/50 border-yellow-500/30 text-white placeholder:text-slate-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-xl py-6"
                        />
                    </div>

                    <div className="space-y-2 text-left">
                        <label className="text-xs font-bold text-yellow-500/80 uppercase tracking-wider ml-1">WhatsApp o Correo</label>
                        <Input
                            placeholder="Para validar que eres real"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                            className="bg-black/50 border-yellow-500/30 text-white placeholder:text-slate-600 focus:border-orange-500 focus:ring-1 focus:ring-orange-500/50 rounded-xl py-6"
                        />
                    </div>

                    <div className="pt-2">
                        <Button
                            type="submit"
                            disabled={isSubmitting || !name || !contact}
                            className="w-full bg-gradient-to-r from-orange-600 to-yellow-500 text-black font-black text-lg py-6 rounded-full shadow-[0_0_20px_rgba(234,88,12,0.4)] hover:shadow-[0_0_30px_rgba(234,88,12,0.6)] hover:scale-[1.02] transition-all duration-300 border border-yellow-300/50 uppercase tracking-wide group"
                        >
                            {isSubmitting ? (
                                <span className="flex items-center gap-2">Wait... ⏳</span>
                            ) : (
                                <span className="flex items-center gap-2">Confirmar mi voto 🔥</span>
                            )}
                        </Button>
                    </div>

                    <div className="text-center pt-2 border-t border-white/5">
                        <p className="text-[10px] text-slate-500 flex items-center justify-center gap-1.5 font-medium">
                            <span>🔒</span> Votación segura • Un voto por persona
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
