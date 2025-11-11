import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function DealershipDashboard() {
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
            <h1 className="text-3xl font-bold">Dealership Dashboard</h1>
            <p className="text-muted-foreground">
              Manage vehicle transport requests and coordinate with drivers
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Active Requests</CardTitle>
                <CardDescription>
                  Current vehicle transport requests
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">No active requests</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pending Pickups</CardTitle>
                <CardDescription>Vehicles awaiting pickup</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">All vehicles picked up</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completed Today</CardTitle>
                <CardDescription>Successfully delivered vehicles</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">No deliveries today</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest transport updates</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No recent activity</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
