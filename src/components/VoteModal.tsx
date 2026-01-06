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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
            <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-lg shadow-xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
                <button
                    onClick={onClose}
                    className="absolute right-4 top-4 text-slate-400 hover:text-white"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold text-white mb-2">Votar por {localeName}</h2>
                <p className="text-slate-400 text-sm mb-6">
                    Ingresa tus datos para registrar tu voto. Solo necesitamos tu nombre y un medio de contacto.
                </p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-200">Nombre</label>
                        <Input
                            placeholder="Tu nombre completo"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-slate-200">Teléfono o Email</label>
                        <Input
                            placeholder="3001234567 o correo@ejemplo.com"
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            required
                        />
                    </div>

                    <div className="pt-4 flex justify-end gap-3">
                        <Button type="button" variant="ghost" onClick={onClose} disabled={isSubmitting}>
                            Cancelar
                        </Button>
                        <Button type="submit" disabled={isSubmitting || !name || !contact}>
                            {isSubmitting ? "Enviando..." : "Enviar Voto"}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}
