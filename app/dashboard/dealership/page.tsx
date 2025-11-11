/**
 * Dealership Admin Dashboard
 * Main dashboard for dealership admins to manage salespeople, jobs, and drivers
 * Shows overview, team management, and job analytics
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Users, Truck, TrendingUp, DollarSign, Plus, Settings } from 'lucide-react'

export default function DealershipDashboard() {
  // Mock data - in production, this would come from the API
  const [salespeople] = useState([
    { id: '1', name: 'John Smith', email: 'john@dealership.com', jobsCreated: 12, rating: 4.8 },
    { id: '2', name: 'Sarah Johnson', email: 'sarah@dealership.com', jobsCreated: 8, rating: 4.9 },
    { id: '3', name: 'Mike Davis', email: 'mike@dealership.com', jobsCreated: 15, rating: 4.7 },
  ])

  const [jobs] = useState([
    { id: '1', vehicle: '2024 Toyota Camry', status: 'COMPLETED', driver: 'John Driver', amount: 150 },
    { id: '2', vehicle: '2023 Honda Civic', status: 'IN_PROGRESS', driver: 'Maria Garcia', amount: 120 },
    { id: '3', vehicle: '2022 Lexus RX', status: 'OPEN', driver: null, amount: 200 },
  ])

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-black">SwapRunn</h1>
            <p className="text-sm text-gray-600">McGee Toyota - Admin Dashboard</p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
              MC
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Jobs</p>
                <p className="text-3xl font-bold">35</p>
              </div>
              <Truck className="w-8 h-8 text-red-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-3xl font-bold">28</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Revenue</p>
                <p className="text-3xl font-bold">$4,250</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Team Members</p>
                <p className="text-3xl font-bold">3</p>
              </div>
              <Users className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Card className="border border-gray-200">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="w-full justify-start border-b border-gray-200 rounded-none bg-white p-0">
              <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                Overview
              </TabsTrigger>
              <TabsTrigger value="salespeople" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                Salespeople
              </TabsTrigger>
              <TabsTrigger value="jobs" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                Jobs
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                Analytics
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="p-6 space-y-6">
              <div>
                <h3 className="text-lg font-bold mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {[
                    { action: 'Job Completed', detail: '2024 Toyota Camry delivered', time: '2 hours ago' },
                    { action: 'Job Accepted', detail: '2023 Honda Civic - Maria Garcia', time: '4 hours ago' },
                    { action: 'New Job Created', detail: '2022 Lexus RX - John Smith', time: '6 hours ago' },
                  ].map((activity, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium">{activity.action}</p>
                        <p className="text-sm text-gray-600">{activity.detail}</p>
                      </div>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* Salespeople Tab */}
            <TabsContent value="salespeople" className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-bold">Team Members</h3>
                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Salesperson
                </Button>
              </div>

              <div className="space-y-3">
                {salespeople.map(person => (
                  <Card key={person.id} className="p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center text-red-600 font-bold">
                          {person.name.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold">{person.name}</p>
                          <p className="text-sm text-gray-600">{person.email}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Jobs Created</p>
                        <p className="font-bold">{person.jobsCreated}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">Rating</p>
                        <p className="font-bold">⭐ {person.rating}</p>
                      </div>
                      <Button variant="outline" size="sm">
                        Manage
                      </Button>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Jobs Tab */}
            <TabsContent value="jobs" className="p-6">
              <div className="space-y-3">
                {jobs.map(job => (
                  <Card key={job.id} className="p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-bold">{job.vehicle}</p>
                        <p className="text-sm text-gray-600">{job.driver || 'Unassigned'}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <Badge className={`badge-status ${
                          job.status === 'COMPLETED' ? 'badge-completed' :
                          job.status === 'IN_PROGRESS' ? 'badge-in-progress' :
                          'badge-open'
                        }`}>
                          {job.status}
                        </Badge>
                        <p className="font-bold text-red-600">${job.amount}</p>
                        <Button variant="outline" size="sm">
                          View
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Analytics Tab */}
            <TabsContent value="analytics" className="p-6">
              <div className="grid md:grid-cols-2 gap-6">
                <Card className="p-6 border border-gray-200">
                  <h4 className="font-bold mb-4">Performance Metrics</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Completion Rate</span>
                      <span className="font-bold">80%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-red-600 h-2 rounded-full" style={{ width: '80%' }}></div>
                    </div>
                    <div className="flex justify-between mt-4">
                      <span className="text-gray-600">Avg Rating</span>
                      <span className="font-bold">4.8 ⭐</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">On-Time Delivery</span>
                      <span className="font-bold">92%</span>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border border-gray-200">
                  <h4 className="font-bold mb-4">Revenue Breakdown</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">This Month</span>
                      <span className="font-bold">$4,250</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Last Month</span>
                      <span className="font-bold">$3,800</span>
                    </div>
                    <div className="flex justify-between text-green-600">
                      <span>Growth</span>
                      <span className="font-bold">+11.8%</span>
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
