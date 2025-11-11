/**
 * Earnings/Payments Page
 * Shows driver earnings, payment history, and withdrawal options
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { DollarSign, TrendingUp, Calendar, Download } from 'lucide-react'

export default function EarningsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState('month')

  // Mock data - in production, this would come from the API
  const earnings = {
    totalEarnings: 6750,
    thisMonth: 1250,
    thisWeek: 450,
    pending: 300,
    withdrawn: 6450,
  }

  const payments = [
    {
      id: '1',
      jobId: 'JOB-001',
      vehicle: '2024 Toyota Camry',
      amount: 150,
      status: 'COMPLETED',
      date: '2025-11-08',
      type: 'JOB_COMPLETION',
    },
    {
      id: '2',
      jobId: 'JOB-002',
      vehicle: '2023 Honda Accord',
      amount: 175,
      status: 'COMPLETED',
      date: '2025-11-07',
      type: 'JOB_COMPLETION',
    },
    {
      id: '3',
      jobId: 'JOB-003',
      vehicle: '2024 Lexus RX',
      amount: 200,
      status: 'PENDING',
      date: '2025-11-06',
      type: 'JOB_COMPLETION',
    },
    {
      id: '4',
      jobId: 'JOB-004',
      vehicle: '2023 BMW X5',
      amount: 225,
      status: 'COMPLETED',
      date: '2025-11-05',
      type: 'JOB_COMPLETION',
    },
    {
      id: '5',
      jobId: 'JOB-005',
      vehicle: '2024 Mercedes C-Class',
      amount: 180,
      status: 'COMPLETED',
      date: '2025-11-04',
      type: 'JOB_COMPLETION',
    },
  ]

  const getStatusBadge = (status: string) => {
    if (status === 'COMPLETED') {
      return <Badge className="bg-green-100 text-green-800">Completed</Badge>
    }
    if (status === 'PENDING') {
      return <Badge className="bg-yellow-100 text-yellow-800">Pending</Badge>
    }
    return <Badge>{status}</Badge>
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-black">Earnings</h1>
          <p className="text-sm text-gray-600">Track your payments and earnings</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold">${earnings.totalEarnings}</p>
              </div>
              <DollarSign className="w-8 h-8 text-red-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Month</p>
                <p className="text-3xl font-bold">${earnings.thisMonth}</p>
              </div>
              <Calendar className="w-8 h-8 text-blue-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">This Week</p>
                <p className="text-3xl font-bold">${earnings.thisWeek}</p>
              </div>
              <TrendingUp className="w-8 h-8 text-green-600 opacity-20" />
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Pending</p>
              <p className="text-3xl font-bold text-yellow-600">${earnings.pending}</p>
            </div>
          </Card>

          <Card className="p-6 border border-gray-200">
            <div>
              <p className="text-sm text-gray-600">Withdrawn</p>
              <p className="text-3xl font-bold text-green-600">${earnings.withdrawn}</p>
            </div>
          </Card>
        </div>

        {/* Tabs */}
        <Card className="border border-gray-200">
          <Tabs defaultValue="history" className="w-full">
            <TabsList className="w-full justify-start border-b border-gray-200 rounded-none bg-white p-0">
              <TabsTrigger value="history" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                Payment History
              </TabsTrigger>
              <TabsTrigger value="withdraw" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                Withdraw Funds
              </TabsTrigger>
            </TabsList>

            {/* Payment History Tab */}
            <TabsContent value="history" className="p-6">
              <div className="space-y-4">
                {payments.map(payment => (
                  <Card key={payment.id} className="p-4 border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-red-600" />
                          </div>
                          <div>
                            <p className="font-bold">{payment.vehicle}</p>
                            <p className="text-sm text-gray-600">Job ID: {payment.jobId}</p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-2xl font-bold text-green-600">${payment.amount}</p>
                        <div className="flex items-center gap-2 justify-end mt-1">
                          {getStatusBadge(payment.status)}
                          <span className="text-sm text-gray-600">{payment.date}</span>
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Withdraw Funds Tab */}
            <TabsContent value="withdraw" className="p-6">
              <div className="max-w-md">
                <Card className="p-6 border border-gray-200 mb-6">
                  <h3 className="font-bold mb-4">Available Balance</h3>
                  <p className="text-4xl font-bold text-green-600 mb-6">${earnings.pending}</p>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm font-medium mb-2">Withdrawal Amount</label>
                      <div className="flex gap-2">
                        <input
                          type="number"
                          placeholder="Enter amount"
                          className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
                        />
                        <Button className="bg-red-600 hover:bg-red-700 text-white">
                          Withdraw
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-6 border border-gray-200">
                  <h3 className="font-bold mb-4">Bank Account</h3>
                  <div className="space-y-3 text-sm">
                    <div>
                      <p className="text-gray-600">Account Holder</p>
                      <p className="font-bold">John Smith</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Bank</p>
                      <p className="font-bold">Chase Bank</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Account (Last 4)</p>
                      <p className="font-bold">****1234</p>
                    </div>
                    <Button variant="outline" className="w-full mt-4">
                      Update Bank Account
                    </Button>
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
