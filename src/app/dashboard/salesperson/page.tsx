import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function SalespersonDashboard() {
  const supabase = await createClient()
  
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/auth/login')
  }

  const handleSignOut = async () => {
    'use server'
    const supabase = await createClient()
    await supabase.auth.signOut()
    redirect('/auth/login')
  }

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/dashboard" className="text-2xl font-bold">
            SwapRunn
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">{user.email}</span>
            <form action={handleSignOut}>
              <Button variant="outline" type="submit">
                Sign Out
              </Button>
            </form>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-8">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold">Salesperson Dashboard</h1>
            <p className="text-muted-foreground">
              Track customer vehicle deliveries and coordinate seamlessly
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>My Customers</CardTitle>
                <CardDescription>
                  Active customer vehicle deliveries
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">No active deliveries</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>In Transit</CardTitle>
                <CardDescription>Vehicles currently being delivered</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">No vehicles in transit</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Delivered This Month</CardTitle>
                <CardDescription>Successfully completed deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">No deliveries this month</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Customer Notifications</CardTitle>
                <CardDescription>Updates to share with customers</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No new notifications</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
