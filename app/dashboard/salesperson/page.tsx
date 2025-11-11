'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, StatCard, JobCard } from '@/components/Card';
import { motion } from 'motion/react';
import { Plus, TrendingUp, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalespersonDashboard() {
  const [jobs, setJobs] = useState([
    {
      id: 'JOB-001',
      vehicleType: '2024 Tesla Model 3',
      pickupLocation: 'Downtown Dealership',
      dropoffLocation: 'Customer Home - Westside',
      status: 'open' as const,
      payment: 150,
    },
    {
      id: 'JOB-002',
      vehicleType: '2023 BMW X5',
      pickupLocation: 'Service Center',
      dropoffLocation: 'Auction House',
      status: 'accepted' as const,
      payment: 200,
    },
    {
      id: 'JOB-003',
      vehicleType: '2024 Honda Civic',
      pickupLocation: 'Trade-in Lot',
      dropoffLocation: 'Dealership Main',
      status: 'in-progress' as const,
      payment: 120,
    },
  ]);

  const chartData = [
    { date: 'Mon', jobs: 4, earnings: 600 },
    { date: 'Tue', jobs: 6, earnings: 900 },
    { date: 'Wed', jobs: 5, earnings: 750 },
    { date: 'Thu', jobs: 8, earnings: 1200 },
    { date: 'Fri', jobs: 7, earnings: 1050 },
    { date: 'Sat', jobs: 3, earnings: 450 },
    { date: 'Sun', jobs: 2, earnings: 300 },
  ];

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-swaprunn-off-white">
        <div className="container-section py-12">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-12"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h1 className="mb-2">Salesperson Dashboard</h1>
                <p className="text-subtitle">Manage your vehicle deliveries and track driver performance</p>
              </div>
              <Link href="/dashboard/salesperson/create-job" className="btn-primary flex items-center justify-center gap-2 w-full md:w-auto">
                <Plus size={20} />
                Create New Job
              </Link>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          >
            <StatCard
              icon={<TrendingUp size={32} />}
              label="Total Jobs"
              value="47"
              change="↑ 12% this week"
              trend="up"
            />
            <StatCard
              icon={<Clock size={32} />}
              label="In Progress"
              value="3"
              change="Average 2.5 hrs"
              trend="neutral"
            />
            <StatCard
              icon={<CheckCircle size={32} />}
              label="Completed"
              value="44"
              change="98% on-time"
              trend="up"
            />
            <StatCard
              icon={<AlertCircle size={32} />}
              label="Avg Rating"
              value="4.8"
              change="From 156 reviews"
              trend="up"
            />
          </motion.div>

          {/* Charts Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12"
          >
            {/* Weekly Performance Chart */}
            <Card className="lg:col-span-2">
              <h3 className="font-poppins font-bold text-lg mb-6">Weekly Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={chartData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="date" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E5E5E5',
                      borderRadius: '8px',
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="earnings"
                    stroke="#E50914"
                    strokeWidth={3}
                    dot={{ fill: '#E50914', r: 5 }}
                    activeDot={{ r: 7 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card>

            {/* Quick Stats */}
            <Card>
              <h3 className="font-poppins font-bold text-lg mb-6">This Week</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Total Earnings</p>
                  <p className="text-3xl font-bold text-swaprunn-red">$5,250</p>
                </div>
                <div className="divider" />
                <div>
                  <p className="text-gray-600 text-sm mb-1">Jobs Completed</p>
                  <p className="text-3xl font-bold">35</p>
                </div>
                <div className="divider" />
                <div>
                  <p className="text-gray-600 text-sm mb-1">Avg Completion Time</p>
                  <p className="text-3xl font-bold">2h 15m</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Active Jobs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h2 className="font-poppins font-bold text-2xl">Active Jobs</h2>
              <p className="text-gray-600 text-sm mt-1">Manage and track your current deliveries</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {jobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <JobCard
                    {...job}
                    onClick={() => console.log('View job:', job.id)}
                  />
                </motion.div>
              ))}
            </div>

            {jobs.length === 0 && (
              <Card className="text-center py-12">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="font-poppins font-bold text-lg mb-2">No Active Jobs</h3>
                <p className="text-gray-600 mb-6">Create your first delivery to get started</p>
                <Link href="/dashboard/salesperson/create-job" className="btn-primary inline-flex items-center gap-2">
                  <Plus size={18} />
                  Create Job
                </Link>
              </Card>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
