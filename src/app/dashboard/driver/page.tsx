import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import Link from 'next/link'

export default async function DriverDashboard() {
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
            <h1 className="text-3xl font-bold">Driver Dashboard</h1>
            <p className="text-muted-foreground">
              Find transport jobs, manage routes, and earn on your schedule
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardHeader>
                <CardTitle>Available Jobs</CardTitle>
                <CardDescription>
                  New transport opportunities
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">No jobs available</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Deliveries</CardTitle>
                <CardDescription>Current assignments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">0</div>
                <p className="text-sm text-muted-foreground">No active deliveries</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Earnings This Month</CardTitle>
                <CardDescription>Total earnings from deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-4xl font-bold">$0</div>
                <p className="text-sm text-muted-foreground">No earnings yet</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-8">
            <Card>
              <CardHeader>
                <CardTitle>Delivery History</CardTitle>
                <CardDescription>Your completed deliveries</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">No delivery history</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
