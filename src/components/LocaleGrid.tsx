import { useState } from "react"
import { motion, Variants } from "framer-motion"
import { LocaleCard } from "./LocaleCard"
import { VoteModal } from "./VoteModal"
import { VoteSuccessModal } from "./VoteSuccessModal"
import { submitVote } from "@/actions/vote"

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
    const [showSuccessModal, setShowSuccessModal] = useState(false)
    const [votedLocalInfo, setVotedLocalInfo] = useState<{ name: string, image: string } | null>(null)

    const handleVoteClick = (locale: Locale) => {
        setSelectedLocale(locale)
        setIsVoteModalOpen(true)
    }

    const handleVoteSubmit = async (name: string, contact: string) => {
        if (!selectedLocale) return
        setIsSubmitting(true)

        try {
            // Use Server Action instead of direct client call
            const result = await submitVote(selectedLocale.id, name, contact)

            if (!result.success) {
                alert(result.error)
            } else {
                // Success flow
                setVotedLocalInfo({
                    name: selectedLocale.name,
                    image: selectedLocale.image_url
                })
                setIsVoteModalOpen(false)
                setSelectedLocale(null)
                setShowSuccessModal(true)
            }
        } catch (e) {
            console.error(e)
            alert("Hubo un error inesperado al comprobar tu voto.")
        } finally {
            setIsSubmitting(false)
        }
    }

    if (locales.length === 0) {
        return (
            <div className="text-center py-20">
                <h2 className="text-2xl font-bold text-white">No hay participantes registrados aún.</h2>
            </div>
        )
    }

    const container: Variants = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    }

    const item: Variants = {
        hidden: { opacity: 0, y: 50 },
        show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 50 } }
    }

    return (
        <>
            <motion.div
                variants={container}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-50px" }}
                className="grid grid-cols-3 gap-2 md:gap-6 lg:gap-8"
            >
                {locales.map((locale, index) => (
                    <motion.div key={locale.id} variants={item}>
                        <LocaleCard
                            locale={locale}
                            onVoteClick={handleVoteClick}
                            rank={index + 1}
                        />
                    </motion.div>
                ))}
            </motion.div>

            <VoteModal
                isOpen={isVoteModalOpen}
                onClose={() => setIsVoteModalOpen(false)}
                onVote={handleVoteSubmit}
                localeName={selectedLocale?.name || ""}
                isSubmitting={isSubmitting}
            />

            <VoteSuccessModal
                isOpen={showSuccessModal}
                onClose={() => setShowSuccessModal(false)}
                localeName={votedLocalInfo?.name || ""}
                localeImage={votedLocalInfo?.image || ""}
            />
        </>
    )
}
