"use server"

import { cookies } from "next/headers"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

const ADMIN_PIN = process.env.ADMIN_PASSWORD || "admin123"

export async function login(pin: string) {
    if (pin === ADMIN_PIN) {
        // Set a cookie that lasts for 24 hours
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
        const cookieStore = await cookies()
        cookieStore.set("admin_session", "true", { expires, httpOnly: true })
        return { success: true }
    }
    return { success: false, error: "PIN incorrecto" }
}

export async function logout() {
    const cookieStore = await cookies()
    cookieStore.delete("admin_session")
}

export async function checkAuth() {
    const cookieStore = await cookies()
    const session = cookieStore.get("admin_session")
    return session?.value === "true"
}

export async function addLocale(formData: FormData) {
    const isAuth = await checkAuth()
    if (!isAuth) return { success: false, error: "No autorizado" }

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const imageFile = formData.get("image") as File

    if (!name) return { success: false, error: "El nombre es obligatorio" }

    let image_url = "/logo.png" // Default

    // Handle File Upload
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        try {
            const fileExt = imageFile.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('locales')
                .upload(filePath, imageFile)

            if (uploadError) {
                console.error("Upload error:", uploadError)
                return { success: false, error: "Error subiendo imagen: " + uploadError.message }
            }

            const { data: { publicUrl } } = supabase.storage
                .from('locales')
                .getPublicUrl(filePath)

            image_url = publicUrl
        } catch (error) {
            console.error("Upload exception:", error)
            return { success: false, error: "Error procesando la imagen" }
        }
    } else {
        // Fallback to text input if provided (legacy support)
        const urlInput = formData.get("image_url") as string
        if (urlInput) image_url = urlInput
    }

    const { error } = await supabase
        .from("locales")
        .insert({ name, description, image_url })

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
}

export async function editLocale(formData: FormData) {
    const isAuth = await checkAuth()
    if (!isAuth) return { success: false, error: "No autorizado" }

    const id = formData.get("id") as string
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const imageFile = formData.get("image") as File

    if (!id) return { success: false, error: "ID no válido" }
    if (!name) return { success: false, error: "El nombre es obligatorio" }

    let image_url = formData.get("current_image_url") as string || "/logo.png"

    // Handle New File Upload if present
    if (imageFile && imageFile.size > 0 && imageFile.name !== "undefined") {
        try {
            const fileExt = imageFile.name.split('.').pop()
            const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
            const filePath = `${fileName}`

            const { error: uploadError } = await supabase.storage
                .from('locales')
                .upload(filePath, imageFile)

            if (uploadError) {
                console.error("Upload error:", uploadError)
                return { success: false, error: "Error subiendo imagen: " + uploadError.message }
            }

            const { data: { publicUrl } } = supabase.storage
                .from('locales')
                .getPublicUrl(filePath)

            image_url = publicUrl
        } catch (error) {
            console.error("Upload exception:", error)
            return { success: false, error: "Error procesando la imagen" }
        }
    }

    const { error } = await supabase
        .from("locales")
        .update({ name, description, image_url })
        .eq("id", id)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
}

export async function deleteLocale(id: string) {
    const isAuth = await checkAuth()
    if (!isAuth) return { success: false, error: "No autorizado" }

    // First delete all votes associated with this locale
    const { error: votesError } = await supabase
        .from("votes")
        .delete()
        .eq("locale_id", id)

    if (votesError) {
        console.error("Error deleting votes:", votesError)
        return { success: false, error: "Error borrando votos asociados: " + votesError.message }
    }

    // Then delete the locale
    const { error } = await supabase
        .from("locales")
        .delete()
        .eq("id", id)

    if (error) {
        return { success: false, error: error.message }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
}

export async function injectVotes(localeId: string, amount: number) {
    const isAuth = await checkAuth()
    if (!isAuth) return { success: false, error: "No autorizado" }

    if (!amount || amount <= 0) return { success: false, error: "Cantidad inválida" }
    if (amount > 10000) return { success: false, error: "Máximo 10,000 votos por inyección" }

    // Create array of votes for batch insert
    const votes = Array.from({ length: amount }).map(() => ({
        locale_id: localeId,
        voter_name: 'Voto Manual Admin',
        voter_contact: 'admin@system.internal'
    }))

    // Supabase allows batch inserts
    // We might need to chunk if it's too large, but 10,000 should be okay for most standard configs
    // If not, we can chunk it safely to 1000 at a time

    const CHUNK_SIZE = 1000
    for (let i = 0; i < votes.length; i += CHUNK_SIZE) {
        const chunk = votes.slice(i, i + CHUNK_SIZE)
        const { error } = await supabase
            .from("votes")
            .insert(chunk)

        if (error) {
            console.error("Injection error:", error)
            return { success: false, error: `Error en inyección (lote ${i}): ` + error.message }
        }
    }

    revalidatePath("/")
    revalidatePath("/admin")
    return { success: true }
}
