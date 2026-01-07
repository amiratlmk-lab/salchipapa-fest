"use client"

import { useState, useRef } from "react"
import { addLocale, deleteLocale } from "@/actions/admin"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { motion, AnimatePresence } from "framer-motion"

interface AdminDashboardProps {
    locales: any[]
    votes: any[]
}

export function AdminDashboard({ locales, votes }: AdminDashboardProps) {
    const [isAdding, setIsAdding] = useState(false)
    const formRef = useRef<HTMLFormElement>(null)

    // Calculate Stats
    const totalVotes = votes.length
    const voteCounts = locales.map(l => ({
        ...l,
        count: votes.filter(v => v.locale_id === l.id).length
    })).sort((a, b) => b.count - a.count)

    const handleAdd = async (formData: FormData) => {
        setIsAdding(true)
        const res = await addLocale(formData)
        setIsAdding(false)
        if (res.success) {
            formRef.current?.reset()
            alert("¡Local agregado!")
        } else {
            alert("Error: " + res.error)
        }
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`¿Seguro que quieres borrar a "${name}"? Esta acción no se puede deshacer.`)) return

        const res = await deleteLocale(id)
        if (res.success) {
            // UI updates automatically via revalidatePath
        } else {
            alert("Error: " + res.error)
        }
    }

    return (
        <div className="text-white max-w-6xl mx-auto p-6">
            <header className="flex justify-between items-center mb-12">
                <div>
                    <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-orange-500">
                        Panel de Control
                    </h1>
                    <p className="text-slate-400">Salchipapa Fest 2026 Admin</p>
                </div>
                <div className="bg-slate-800 rounded-lg px-4 py-2 border border-slate-700">
                    <span className="block text-xs text-slate-400 uppercase tracking-wider">Total Votos</span>
                    <span className="text-2xl font-mono font-bold text-yellow-500">{totalVotes}</span>
                </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Column: Manage Locales */}
                <div className="space-y-8">
                    <section className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            <span>🏪</span> Nuevo Local
                        </h2>
                        <form ref={formRef} action={handleAdd} className="space-y-4">
                            <Input name="name" placeholder="Nombre del Restaurante" required className="bg-slate-950" />
                            <Input name="description" placeholder="Descripción corta (opcional)" className="bg-slate-950" />
                            <Input name="image" type="file" accept="image/*" className="bg-slate-950 file:bg-slate-800 file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-2 file:text-sm file:font-medium hover:file:bg-slate-700" />
                            <Button disabled={isAdding} className="w-full bg-green-600 hover:bg-green-700">
                                {isAdding ? "Guardando..." : "Agregar Participante"}
                            </Button>
                        </form>
                    </section>

                    <section>
                        <h2 className="text-xl font-bold mb-4 text-slate-300">Participantes Activos ({locales.length})</h2>
                        <div className="space-y-3">
                            <AnimatePresence>
                                {locales.map(locale => (
                                    <motion.div
                                        key={locale.id}
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="bg-slate-900 p-4 rounded-lg border border-slate-800 flex justify-between items-center group"
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={locale.image_url || "/logo.png"} alt="mini" className="w-10 h-10 object-contain rounded bg-white/5 p-1" />
                                            <span className="font-medium">{locale.name}</span>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            onClick={() => handleDelete(locale.id, locale.name)}
                                            className="text-red-400 hover:text-red-300 hover:bg-red-950/30 opacity-0 group-hover:opacity-100 transition-opacity"
                                        >
                                            Borrar
                                        </Button>
                                    </motion.div>
                                ))}
                            </AnimatePresence>
                        </div>
                    </section>
                </div>

                {/* Right Column: Live Data */}
                <div>
                    <section className="bg-slate-900/50 p-6 rounded-xl border border-slate-800 h-full">
                        <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                            <span>🏆</span> Ranking en Vivo
                        </h2>

                        <div className="space-y-6">
                            {voteCounts.map((item, index) => (
                                <div key={item.id} className="relative">
                                    <div className="flex justify-between items-end mb-1">
                                        <span className={`font-bold ${index === 0 ? 'text-yellow-400 text-lg' : 'text-slate-300'}`}>
                                            #{index + 1} {item.name}
                                        </span>
                                        <span className="font-mono text-slate-400">{item.count} votos</span>
                                    </div>
                                    <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            animate={{ width: `${totalVotes > 0 ? (item.count / totalVotes) * 100 : 0}%` }}
                                            className={`h-full ${index === 0 ? 'bg-yellow-500' : 'bg-slate-600'}`}
                                        />
                                    </div>
                                </div>
                            ))}

                            {voteCounts.length === 0 && (
                                <p className="text-center text-slate-500 py-10">Aún no hay votos registrados.</p>
                            )}
                        </div>
                    </section>
                </div>

            </div>
        </div>
    )
}
