'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Card';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Clock, DollarSign, User, Phone, Mail, CheckCircle, AlertCircle, Navigation as NavigationIcon } from 'lucide-react';

export default function JobDetailsPage({ params }: { params: { id: string } }) {
  const [job] = useState({
    id: params.id,
    vehicleType: '2024 Tesla Model 3',
    vin: '5YJ3E1EA5LF123456',
    color: 'Pearl White Multi-Coat',
    mileage: 45,
    pickupLocation: 'Downtown Dealership, 123 Main St, Los Angeles, CA 90001',
    dropoffLocation: 'Customer Home, 456 Oak Ave, Westside, CA 90210',
    pickupTime: '2025-11-10 2:00 PM',
    estimatedDeliveryTime: '2025-11-10 3:30 PM',
    status: 'in-progress' as const,
    payment: 150,
    driver: {
      id: '1',
      name: 'John Smith',
      rating: 4.8,
      phone: '(555) 123-4567',
      email: 'john@example.com',
      avatar: 'JS',
    },
    notes: 'Customer prefers afternoon delivery. Please call 15 minutes before arrival.',
    createdAt: '2025-11-10 1:00 PM',
    timeline: [
      { status: 'created', time: '1:00 PM', description: 'Job created' },
      { status: 'accepted', time: '1:05 PM', description: 'Driver accepted job' },
      { status: 'in-progress', time: '1:45 PM', description: 'Driver picked up vehicle' },
      { status: 'pending', time: '-', description: 'Delivery in progress' },
    ],
  });

  const statusColors = {
    open: 'badge-secondary',
    accepted: 'badge-info',
    'in-progress': 'badge-warning',
    completed: 'badge-success',
  };

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-swaprunn-off-white">
        <div className="container-section py-12">
          {/* Back Button */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <Link href="/dashboard/salesperson" className="btn-ghost inline-flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Dashboard
            </Link>
          </motion.div>

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-12"
          >
            <div>
              <h1 className="mb-2">Job Details</h1>
              <p className="text-subtitle">Job ID: {job.id}</p>
            </div>
            <span className={`badge ${statusColors[job.status]}`}>
              {job.status.charAt(0).toUpperCase() + job.status.slice(1)}
            </span>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Left Column - Vehicle & Location Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-2 space-y-6"
            >
              {/* Vehicle Information */}
              <Card>
                <h3 className="font-poppins font-bold text-lg mb-6">Vehicle Information</h3>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Vehicle Type</p>
                    <p className="font-semibold text-lg">{job.vehicleType}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Color</p>
                    <p className="font-semibold">{job.color}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">VIN</p>
                    <p className="font-mono text-sm">{job.vin}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 text-sm mb-1">Mileage</p>
                    <p className="font-semibold">{job.mileage} miles</p>
                  </div>
                </div>
              </Card>

              {/* Pickup & Delivery */}
              <Card>
                <h3 className="font-poppins font-bold text-lg mb-6">Pickup & Delivery</h3>
                <div className="space-y-6">
                  {/* Pickup */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={20} className="text-swaprunn-red" />
                      <p className="font-poppins font-bold">Pickup Location</p>
                    </div>
                    <p className="text-gray-700 ml-8 mb-2">{job.pickupLocation}</p>
                    <div className="flex items-center gap-2 ml-8 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>{job.pickupTime}</span>
                    </div>
                  </div>

                  <div className="h-px bg-gray-200" />

                  {/* Delivery */}
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <MapPin size={20} className="text-swaprunn-red" />
                      <p className="font-poppins font-bold">Delivery Location</p>
                    </div>
                    <p className="text-gray-700 ml-8 mb-2">{job.dropoffLocation}</p>
                    <div className="flex items-center gap-2 ml-8 text-sm text-gray-600">
                      <Clock size={16} />
                      <span>Est. {job.estimatedDeliveryTime}</span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Special Notes */}
              <Card>
                <h3 className="font-poppins font-bold text-lg mb-4">Special Notes</h3>
                <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
                  {job.notes}
                </p>
              </Card>

              {/* Timeline */}
              <Card>
                <h3 className="font-poppins font-bold text-lg mb-6">Job Timeline</h3>
                <div className="space-y-4">
                  {job.timeline.map((event, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            event.status === 'pending'
                              ? 'bg-gray-200'
                              : 'bg-gradient-red text-white'
                          }`}
                        >
                          {event.status === 'pending' ? (
                            <div className="w-2 h-2 bg-gray-400 rounded-full" />
                          ) : (
                            <CheckCircle size={20} />
                          )}
                        </div>
                        {index < job.timeline.length - 1 && (
                          <div className="w-0.5 h-12 bg-gray-200 my-2" />
                        )}
                      </div>
                      <div className="pt-2">
                        <p className="font-semibold">{event.description}</p>
                        <p className="text-gray-600 text-sm">{event.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Right Column - Driver & Payment */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-6"
            >
              {/* Driver Information */}
              <Card>
                <h3 className="font-poppins font-bold text-lg mb-6">Assigned Driver</h3>
                <div className="text-center mb-6">
                  <div className="w-20 h-20 rounded-full bg-gradient-red flex items-center justify-center text-white text-2xl font-bold mx-auto mb-4">
                    {job.driver.avatar}
                  </div>
                  <h4 className="font-poppins font-bold text-lg">{job.driver.name}</h4>
                  <p className="text-swaprunn-red font-semibold">⭐ {job.driver.rating}</p>
                </div>

                <div className="space-y-3 mb-6">
                  <div className="flex items-center gap-3">
                    <Phone size={18} className="text-gray-400" />
                    <a href={`tel:${job.driver.phone}`} className="text-swaprunn-red hover:underline">
                      {job.driver.phone}
                    </a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail size={18} className="text-gray-400" />
                    <a href={`mailto:${job.driver.email}`} className="text-swaprunn-red hover:underline">
                      {job.driver.email}
                    </a>
                  </div>
                </div>

                <Link href={`/dashboard/drivers/${job.driver.id}`} className="btn-secondary w-full text-center">
                  View Profile
                </Link>
              </Card>

              {/* Payment Information */}
              <Card>
                <h3 className="font-poppins font-bold text-lg mb-6">Payment</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600">Job Payment</span>
                    <span className="font-bold text-lg">${job.payment}</span>
                  </div>
                  <div className="h-px bg-gray-200" />
                  <div className="flex items-center justify-between">
                    <span className="font-semibold">Total</span>
                    <span className="text-2xl font-bold text-swaprunn-red">${job.payment}</span>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-center gap-2 text-green-700">
                    <CheckCircle size={18} />
                    <span className="text-sm font-semibold">Payment will be processed upon completion</span>
                  </div>
                </div>
              </Card>

              {/* Actions */}
              <Card>
                <h3 className="font-poppins font-bold text-lg mb-4">Actions</h3>
                <div className="space-y-3">
                  <button className="w-full btn-primary flex items-center justify-center gap-2">
                    <NavigationIcon size={18} />
                    Track Driver
                  </button>
                  <button className="w-full btn-secondary">Contact Driver</button>
                  {job.status === 'in-progress' && (
                    <button className="w-full btn-ghost text-red-600 hover:bg-red-50">
                      Cancel Job
                    </button>
                  )}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
