"use server"

import { supabase } from "@/lib/supabase"

export interface RankedLocale {
    id: string
    name: string
    image_url: string
    votes: number
}

export async function getRanking(): Promise<RankedLocale[]> {
    try {
        // 1. Fetch all locales
        const { data: locales, error: localesError } = await supabase
            .from('locales')
            .select('id, name, image_url')

        if (localesError) throw localesError
        if (!locales) return []

        // 2. Fetch vote counts (grouping manually for now to avoid complex SQL setup for user)
        // Optimization: In a real high-scale app, use `rpc` or a `.select('*, votes(count)')` if relation exists.
        // Let's try to get raw counts.

        const ranking: RankedLocale[] = []

        for (const locale of locales) {
            const { count, error } = await supabase
                .from('votes')
                .select('*', { count: 'exact', head: true })
                .eq('locale_id', locale.id)

            if (!error) {
                ranking.push({
                    ...locale,
                    votes: count || 0
                })
            } else {
                ranking.push({ ...locale, votes: 0 })
            }
        }

        // 3. Sort by votes descending
        return ranking.sort((a, b) => b.votes - a.votes)

    } catch (error) {
        console.error("Error fetching ranking:", error)
        return []
    }
}
