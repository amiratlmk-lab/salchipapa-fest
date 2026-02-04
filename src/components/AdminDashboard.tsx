"use client"

import { useState, useRef } from "react"
import { addLocale, deleteLocale, editLocale, injectVotes } from "@/actions/admin"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { motion, AnimatePresence } from "framer-motion"
import { Pencil, Trash2, X, Plus, Save, Syringe } from "lucide-react"

interface AdminDashboardProps {
    locales: any[]
    votes: any[]
}

export function AdminDashboard({ locales, votes }: AdminDashboardProps) {
    const [isSaving, setIsSaving] = useState(false)
    const [editingLocale, setEditingLocale] = useState<any | null>(null)
    const [injectingLocale, setInjectingLocale] = useState<any | null>(null)
    const formRef = useRef<HTMLFormElement>(null)
    const injectFormRef = useRef<HTMLFormElement>(null)

    // Calculate Stats
    const totalVotes = votes.length
    const voteCounts = locales.map(l => ({
        ...l,
        count: votes.filter(v => v.locale_id === l.id).length
    })).sort((a, b) => b.count - a.count)

    const handleSave = async (formData: FormData) => {
        setIsSaving(true)

        // If editing, append the ID and current image URL
        if (editingLocale) {
            formData.append("id", editingLocale.id)
            if (!formData.get("image")?.valueOf()) {
                // logic handled in server action: if no new file, verify if we need to send old url
                // server action reads 'current_image_url' if provided
                formData.append("current_image_url", editingLocale.image_url)
            }
        }

        const res = editingLocale
            ? await editLocale(formData)
            : await addLocale(formData)

        setIsSaving(false)

        if (res.success) {
            formRef.current?.reset()
            setEditingLocale(null)
            alert(editingLocale ? "¡Local actualizado!" : "¡Local agregado!")
        } else {
            alert("Error: " + res.error)
        }
    }

    const handleInject = async (formData: FormData) => {
        if (!injectingLocale) return
        const amount = parseInt(formData.get("amount") as string)

        if (!confirm(`¿Estás seguro de inyectar ${amount} votos a ${injectingLocale.name}?`)) return

        setIsSaving(true)
        const res = await injectVotes(injectingLocale.id, amount)
        setIsSaving(false)

        if (res.success) {
            setInjectingLocale(null)
            alert(`¡Se han inyectado ${amount} votos exitosamente!`)
        } else {
            alert("Error: " + res.error)
        }
    }

    const startEditing = (locale: any) => {
        setEditingLocale(locale)
        setInjectingLocale(null)
        // Optionally scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const cancelEditing = () => {
        setEditingLocale(null)
        formRef.current?.reset()
    }

    const handleDelete = async (id: string, name: string) => {
        if (!confirm(`¿Seguro que quieres borrar a "${name}"? Esta acción no se puede deshacer.`)) return

        const res = await deleteLocale(id)
        if (res.success) {
            if (editingLocale?.id === id) cancelEditing()
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

            {/* Injection Modal */}
            {injectingLocale && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-slate-900 border border-yellow-500/50 p-6 rounded-xl w-full max-w-md shadow-2xl relative"
                    >
                        <button
                            onClick={() => setInjectingLocale(null)}
                            className="absolute top-4 right-4 text-slate-400 hover:text-white"
                        >
                            <X className="w-5 h-5" />
                        </button>

                        <h3 className="text-xl font-bold text-yellow-500 mb-2 flex items-center gap-2">
                            <Syringe className="w-5 h-5" /> Inyectar Votos
                        </h3>
                        <p className="text-sm text-slate-300 mb-6">
                            Agregando votos manuales para: <span className="font-bold text-white">{injectingLocale.name}</span>
                        </p>

                        <form action={handleInject} className="space-y-4">
                            <div>
                                <label className="text-sm text-slate-400 mb-1 block">Cantidad de Votos</label>
                                <Input
                                    name="amount"
                                    type="number"
                                    min="1"
                                    max="10000"
                                    placeholder="Ej: 50"
                                    required
                                    className="bg-slate-950 border-slate-700 text-lg font-mono text-yellow-500"
                                    autoFocus
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <Button
                                    type="button"
                                    variant="outline"
                                    onClick={() => setInjectingLocale(null)}
                                    className="flex-1 bg-transparent border-slate-700 hover:bg-slate-800 text-slate-300"
                                >
                                    Cancelar
                                </Button>
                                <Button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-500 hover:to-orange-500 text-white font-bold"
                                >
                                    {isSaving ? "Inyectando..." : "CONFIRMAR INYECCIÓN"}
                                </Button>
                            </div>
                        </form>
                    </motion.div>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* Left Column: Manage Locales */}
                <div className="space-y-8">
                    <section className={`p-6 rounded-xl border transition-colors ${editingLocale ? 'bg-yellow-900/10 border-yellow-500/50' : 'bg-slate-900/50 border-slate-800'}`}>
                        <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                            {editingLocale ? <Pencil className="w-5 h-5 text-yellow-500" /> : <Plus className="w-5 h-5 text-green-500" />}
                            <span className={editingLocale ? "text-yellow-500" : "text-white"}>
                                {editingLocale ? "Editar Local" : "Nuevo Local"}
                            </span>
                        </h2>

                        <form ref={formRef} action={handleSave} className="space-y-4" key={editingLocale?.id || 'new'}>
                            <Input
                                name="name"
                                placeholder="Nombre del Restaurante"
                                required
                                className="bg-slate-950"
                                defaultValue={editingLocale?.name || ""}
                            />
                            <Input
                                name="description"
                                placeholder="Descripción corta (opcional)"
                                className="bg-slate-950"
                                defaultValue={editingLocale?.description || ""}
                            />

                            <div className="space-y-2">
                                <label className="text-sm text-slate-400 ml-1">Logo / Imagen</label>
                                <div className="flex gap-4 items-center">
                                    {editingLocale?.image_url && (
                                        <div className="relative w-12 h-12 rounded bg-slate-800 border border-slate-700 overflow-hidden flex-shrink-0">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={editingLocale.image_url} alt="current" className="w-full h-full object-contain" />
                                        </div>
                                    )}
                                    <Input
                                        name="image"
                                        type="file"
                                        accept="image/*"
                                        className="bg-slate-950 file:bg-slate-800 file:text-white file:border-0 file:rounded-md file:px-2 file:py-1 file:mr-2 file:text-sm file:font-medium hover:file:bg-slate-700 flex-grow"
                                    />
                                </div>
                                {editingLocale && <p className="text-xs text-yellow-500/80 ml-1">* Sube una imagen solo si quieres cambiar la actual.</p>}
                            </div>

                            <div className="flex gap-2 pt-2">
                                <Button disabled={isSaving} className={`flex-1 ${editingLocale ? 'bg-yellow-600 hover:bg-yellow-700' : 'bg-green-600 hover:bg-green-700'}`}>
                                    {isSaving ? "Guardando..." : (editingLocale ? "Actualizar Datos" : "Agregar Participante")}
                                </Button>

                                {editingLocale && (
                                    <Button type="button" variant="outline" onClick={cancelEditing} className="bg-transparent border-slate-700 hover:bg-slate-800 text-slate-300">
                                        Cancelar
                                    </Button>
                                )}
                            </div>
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
                                        className={`p-4 rounded-lg border flex justify-between items-center group transition-colors ${editingLocale?.id === locale.id ? 'bg-yellow-900/20 border-yellow-500/30' : 'bg-slate-900 border-slate-800'}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            {/* eslint-disable-next-line @next/next/no-img-element */}
                                            <img src={locale.image_url || "/logo.png"} alt="mini" className="w-10 h-10 object-contain rounded bg-white/5 p-1" />
                                            <span className="font-medium">{locale.name}</span>
                                        </div>

                                        <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                onClick={() => setInjectingLocale(locale)}
                                                className="h-8 w-8 p-0 text-yellow-500 hover:text-yellow-400 hover:bg-yellow-950/30"
                                                title="Inyectar Votos"
                                            >
                                                <Syringe className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => startEditing(locale)}
                                                className="h-8 w-8 p-0 text-blue-400 hover:text-blue-300 hover:bg-blue-950/30"
                                                title="Editar"
                                            >
                                                <Pencil className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                onClick={() => handleDelete(locale.id, locale.name)}
                                                className="h-8 w-8 p-0 text-red-400 hover:text-red-300 hover:bg-red-950/30"
                                                title="Borrar"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
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
