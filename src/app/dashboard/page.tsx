import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export default async function DashboardPage() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  // For now, redirect to a default dashboard
  // In a real app, you would check the user's role from the database
  // and redirect to the appropriate dashboard
  redirect('/dashboard/driver')
}
