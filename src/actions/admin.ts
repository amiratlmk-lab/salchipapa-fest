"use server"

import { cookies } from "next/headers"
import { supabase } from "@/lib/supabase"
import { revalidatePath } from "next/cache"

const ADMIN_PIN = process.env.ADMIN_PASSWORD || "admin123"

export async function login(pin: string) {
    if (pin === ADMIN_PIN) {
        // Set a cookie that lasts for 24 hours
        const expires = new Date(Date.now() + 24 * 60 * 60 * 1000)
        cookies().set("admin_session", "true", { expires, httpOnly: true })
        return { success: true }
    }
    return { success: false, error: "PIN incorrecto" }
}

export async function logout() {
    cookies().delete("admin_session")
}

export async function checkAuth() {
    const session = cookies().get("admin_session")
    return session?.value === "true"
}

export async function addLocale(formData: FormData) {
    const isAuth = await checkAuth()
    if (!isAuth) return { success: false, error: "No autorizado" }

    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const image_url = formData.get("image_url") as string || "/logo.png"

    if (!name) return { success: false, error: "El nombre es obligatorio" }

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

export async function deleteLocale(id: string) {
    const isAuth = await checkAuth()
    if (!isAuth) return { success: false, error: "No autorizado" }

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
