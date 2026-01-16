import { checkAuth } from "@/actions/admin"
import { AdminLogin } from "@/components/AdminLogin"
import { AdminDashboard } from "@/components/AdminDashboard"
import { supabase } from "@/lib/supabase"

// Force dynamic rendering so data is always fresh
export const dynamic = 'force-dynamic'

export default async function AdminPage() {
    const isAuthenticated = await checkAuth()

    if (!isAuthenticated) {
        return <AdminLogin />
    }

    // Fetch data for the dashboard
    // Note: RLS must allow reading these tables. 
    // Votes are public read in our setup, Locales are public read.
    const { data: locales } = await supabase.from('locales').select('*').order('name')
    // Override Supabase's default 1000-record limit to fetch all votes
    const { data: votes } = await supabase.from('votes').select('*').limit(100000)

    return (
        <div className="min-h-screen bg-slate-950 text-white">
            <AdminDashboard
                locales={locales || []}
                votes={votes || []}
            />
        </div>
    )
}
