"use client"

import { useState } from "react"
import { LocaleCard } from "./LocaleCard"
import { VoteModal } from "./VoteModal"
import { supabase } from "@/lib/supabase"
import { cn } from "@/lib/utils"

// Define types here or import (better to keep simple for now)
interface Locale {
    id: string
    name: string
    image_url: string
    description?: string
}

interface LocaleGridProps {
    locales: Locale[]
}

export function LocaleGrid({ locales }: LocaleGridProps) {
    const [selectedLocale, setSelectedLocale] = useState<Locale | null>(null)
    const [isVoteModalOpen, setIsVoteModalOpen] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleVoteClick = (locale: Locale) => {
        setSelectedLocale(locale)
        setIsVoteModalOpen(true)
    }

    const handleVoteSubmit = async (name: string, contact: string) => {
        if (!selectedLocale) return
        setIsSubmitting(true)

        try {
            const { error } = await supabase
                .from('votes')
                .insert({
                    locale_id: selectedLocale.id,
                    voter_name: name,
                    voter_contact: contact
                })

            if (error) {
                alert("Error al registrar el voto: " + error.message)
            } else {
                alert("¡Gracias por tu voto!")
                setIsVoteModalOpen(false)
                setSelectedLocale(null)
            }
        } catch (e) {
            console.error(e)
            alert("Hubo un error inesperado.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (locales.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-slate-500">No hay participantes registrados aún.</h2>
            </div>
        )
    }

    return (
        <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {locales.map((locale) => (
                    <LocaleCard
                        key={locale.id}
                        locale={locale}
                        onVoteClick={handleVoteClick}
                    />
                ))}
            </div>

            <VoteModal
                isOpen={isVoteModalOpen}
                onClose={() => setIsVoteModalOpen(false)}
                onVote={handleVoteSubmit}
                localeName={selectedLocale?.name || ""}
                isSubmitting={isSubmitting}
            />
        </>
    )
}
