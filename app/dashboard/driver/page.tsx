'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, StatCard, JobCard } from '@/components/Card';
import { motion } from 'motion/react';
import { MapPin, DollarSign, Clock, Star, AlertCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function DriverDashboard() {
  const [availableJobs, setAvailableJobs] = useState([
    {
      id: 'JOB-101',
      vehicleType: '2024 Tesla Model 3',
      pickupLocation: 'Downtown Dealership',
      dropoffLocation: 'Customer Home - Westside',
      status: 'open' as const,
      payment: 150,
    },
    {
      id: 'JOB-102',
      vehicleType: '2023 BMW X5',
      pickupLocation: 'Service Center',
      dropoffLocation: 'Auction House',
      status: 'open' as const,
      payment: 200,
    },
    {
      id: 'JOB-103',
      vehicleType: '2024 Honda Civic',
      pickupLocation: 'Trade-in Lot',
      dropoffLocation: 'Dealership Main',
      status: 'open' as const,
      payment: 120,
    },
  ]);

  const earningsData = [
    { week: 'Week 1', earnings: 1200, jobs: 8 },
    { week: 'Week 2', earnings: 1450, jobs: 10 },
    { week: 'Week 3', earnings: 1100, jobs: 7 },
    { week: 'Week 4', earnings: 1650, jobs: 11 },
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
            <div>
              <h1 className="mb-2">Driver Dashboard</h1>
              <p className="text-subtitle">Browse available jobs and manage your deliveries</p>
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
              icon={<DollarSign size={32} />}
              label="This Month"
              value="$5,400"
              change="↑ 18% vs last month"
              trend="up"
            />
            <StatCard
              icon={<Clock size={32} />}
              label="Jobs Completed"
              value="36"
              change="98% on-time"
              trend="up"
            />
            <StatCard
              icon={<Star size={32} />}
              label="Your Rating"
              value="4.9"
              change="From 156 reviews"
              trend="up"
            />
            <StatCard
              icon={<MapPin size={32} />}
              label="Available Jobs"
              value="12"
              change="In your area"
              trend="neutral"
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
            {/* Monthly Earnings Chart */}
            <Card className="lg:col-span-2">
              <h3 className="font-poppins font-bold text-lg mb-6">Monthly Earnings</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={earningsData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#E5E5E5" />
                  <XAxis dataKey="week" stroke="#666" />
                  <YAxis stroke="#666" />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: '#fff',
                      border: '1px solid #E5E5E5',
                      borderRadius: '8px',
                    }}
                  />
                  <Legend />
                  <Bar dataKey="earnings" fill="#E50914" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>

            {/* Quick Stats */}
            <Card>
              <h3 className="font-poppins font-bold text-lg mb-6">Performance</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Acceptance Rate</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-red w-[92%]" />
                    </div>
                    <span className="font-bold text-sm">92%</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">On-Time Rate</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 w-[98%]" />
                    </div>
                    <span className="font-bold text-sm">98%</span>
                  </div>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Completion Rate</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 w-[95%]" />
                    </div>
                    <span className="font-bold text-sm">95%</span>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Available Jobs Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="mb-6">
              <h2 className="font-poppins font-bold text-2xl">Available Jobs Near You</h2>
              <p className="text-gray-600 text-sm mt-1">Browse and accept delivery jobs in your area</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {availableJobs.map((job, index) => (
                <motion.div
                  key={job.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card hover className="cursor-pointer h-full flex flex-col">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="font-poppins font-bold text-lg">{job.vehicleType}</h3>
                        <p className="text-gray-600 text-sm">Job ID: {job.id}</p>
                      </div>
                      <span className="badge badge-primary">Available</span>
                    </div>

                    <div className="space-y-2 mb-4 flex-1">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-swaprunn-red" />
                        <span>{job.pickupLocation}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <MapPin size={16} className="text-swaprunn-red" />
                        <span>{job.dropoffLocation}</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                      <span className="text-swaprunn-red font-bold text-lg">${job.payment}</span>
                      <button className="btn-primary btn-sm">Accept Job →</button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {availableJobs.length === 0 && (
              <Card className="text-center py-12">
                <AlertCircle size={48} className="mx-auto text-gray-400 mb-4" />
                <h3 className="font-poppins font-bold text-lg mb-2">No Available Jobs</h3>
                <p className="text-gray-600">Check back soon for new delivery opportunities</p>
              </Card>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
