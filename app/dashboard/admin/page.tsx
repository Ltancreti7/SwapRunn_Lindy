/**
 * Admin Dashboard
 * SwapRunn platform admin dashboard for managing dealerships, users, and system
 * Includes dealership approval, user management, and platform analytics
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Building2, Users, TrendingUp, AlertCircle, CheckCircle, XCircle } from 'lucide-react'

export default function AdminDashboard() {
  const [dealerships] = useState([
    {
      id: '1',
      name: 'McGee Toyota',
      address: '123 Main St, Claremont, CA',
      admin: 'John Manager',
      status: 'PENDING',
      createdAt: '2025-11-08',
    },
    {
      id: '2',
      name: 'Honda City',
      address: '456 Oak Ave, Pasadena, CA',
      admin: 'Sarah Admin',
      status: 'APPROVED',
      createdAt: '2025-11-05',
    },
    {
      id: '3',
      name: 'Lexus Premium',
      address: '789 Pine Rd, Upland, CA',
      admin: 'Mike Director',
      status: 'APPROVED',
      createdAt: '2025-11-01',
    },
  ])

  const [users] = useState([
    { id: '1', name: 'John Smith', email: 'john@example.com', role: 'DRIVER', status: 'ACTIVE' },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@dealership.com', role: 'SALESPERSON', status: 'ACTIVE' },
    { id: '3', name: 'Maria Garcia', email: 'maria@example.com', role: 'DRIVER', status: 'ACTIVE' },
    { id: '4', name: 'Mike Davis', email: 'mike@dealership.com', role: 'DEALERSHIP_ADMIN', status: 'ACTIVE' },
  ])

  const handleApproveDealership = (id: string) => {
    // In production, this would call an API
    console.log('Approving dealership:', id)
  }

  const handleRejectDealership = (id: string) => {
    // In production, this would call an API
    console.log('Rejecting dealership:', id)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-black">SwapRunn Admin</h1>
          <p className="text-sm text-gray-600">Platform management and oversight</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Dealerships</p>
                <p className="text-3xl font-bold">12</p>
              </div>
              <Building2 className="w-8 h-8 text-red-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Users</p>
                <p className="text-3xl font-bold">248</p>
              </div>
              <Users className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold">1,245</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Platform Revenue</p>
                <p className="text-3xl font-bold">$45.2K</p>
              </div>
              <div className="text-2xl">💰</div>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Card className="border border-gray-200">
          <Tabs defaultValue="dealerships" className="w-full">
            <TabsList className="w-full justify-start border-b border-gray-200 rounded-none bg-white p-0">
              <TabsTrigger value="dealerships" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                Dealerships
              </TabsTrigger>
              <TabsTrigger value="users" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                Users
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Dealerships Tab */}
            <TabsContent value="dealerships" className="p-6">
              <div className="space-y-4">
                {dealerships.map(dealership => (
                  <Card key={dealership.id} className="p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-bold text-lg">{dealership.name}</h3>
                          <Badge className={`badge-status ${
                            dealership.status === 'APPROVED' ? 'badge-completed' :
                            dealership.status === 'PENDING' ? 'badge-open' :
                            'badge-cancelled'
                          }`}>
                            {dealership.status}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">{dealership.address}</p>
                        <p className="text-sm text-gray-600">Admin: {dealership.admin}</p>
                        <p className="text-xs text-gray-500">Created: {dealership.createdAt}</p>
                      </div>
                      <div className="flex gap-2">
                        {dealership.status === 'PENDING' && (
                          <>
                            <Button
                              onClick={() => handleApproveDealership(dealership.id)}
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                            >
                              <CheckCircle className="w-4 h-4 mr-1" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleRejectDealership(dealership.id)}
                              size="sm"
                              variant="destructive"
                            >
                              <XCircle className="w-4 h-4 mr-1" />
                              Reject
                            </Button>
                          </>
                        )}
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Users Tab */}
            <TabsContent value="users" className="p-6">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-200">
                      <th className="text-left py-3 px-4 font-bold">Name</th>
                      <th className="text-left py-3 px-4 font-bold">Email</th>
                      <th className="text-left py-3 px-4 font-bold">Role</th>
                      <th className="text-left py-3 px-4 font-bold">Status</th>
                      <th className="text-left py-3 px-4 font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4 text-sm text-gray-600">{user.email}</td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{user.role}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Badge className="badge-status badge-completed">{user.status}</Badge>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Manage
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border border-gray-200">
                  <h4 className="font-bold mb-4">Platform Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Total Jobs Completed</span>
                      <span className="font-bold">1,245</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Job Value</span>
                      <span className="font-bold">$156.50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Commission</span>
                      <span className="font-bold">$45,200</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Avg Rating</span>
                      <span className="font-bold">4.7 ⭐</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border border-gray-200">
                  <h4 className="font-bold mb-4">User Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Drivers</span>
                      <span className="font-bold">156</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Salespeople</span>
                      <span className="font-bold">78</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Dealership Admins</span>
                      <span className="font-bold">12</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Platform Admins</span>
                      <span className="font-bold">2</span>
                    </div>
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}
