'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, DriverCard } from '@/components/Card';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, Phone, Mail, MapPinIcon, Star, CheckCircle, Clock, TrendingUp } from 'lucide-react';

export default function DriverProfilePage({ params }: { params: { id: string } }) {
  const [driver] = useState({
    id: params.id,
    name: 'John Smith',
    rating: 4.8,
    reviews: 156,
    status: 'active',
    jobsCompleted: 45,
    memberSince: '6/14/2024',
    licenseNumber: 'DL123456',
    licenseExpiry: '12/30/2026',
    serviceRadius: 50,
    specialties: ['Sedan', 'SUV', 'Truck', 'Luxury'],
    phone: '(555) 123-4567',
    email: 'john@example.com',
    location: 'Claremont, CA',
    totalEarnings: 6750,
    avgJobValue: 150,
    onTimeRate: 95,
    acceptanceRate: 92,
    reviews_list: [
      {
        id: 1,
        author: 'Sarah Johnson',
        date: '11/7/2025',
        rating: 5,
        text: 'Excellent driver, very professional and on time!',
      },
      {
        id: 2,
        author: 'Mike Davis',
        date: '11/4/2025',
        rating: 5,
        text: 'Great communication and handled the vehicle with care.',
      },
      {
        id: 3,
        author: 'Lisa Chen',
        date: '10/31/2025',
        rating: 4,
        text: 'Good driver, arrived a bit late but communicated well.',
      },
    ],
  });

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
            <Link href="/dashboard/find-drivers" className="btn-ghost inline-flex items-center gap-2">
              <ArrowLeft size={18} />
              Back to Drivers
            </Link>
          </motion.div>

          {/* Header Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          >
            {/* Driver Info Card */}
            <Card className="lg:col-span-1">
              <div className="text-center mb-6">
                <div className="w-24 h-24 rounded-full bg-gradient-red flex items-center justify-center text-white text-4xl font-bold mx-auto mb-4">
                  {driver.name.split(' ').map(n => n[0]).join('')}
                </div>
                <h1 className="font-poppins font-bold text-2xl mb-2">{driver.name}</h1>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={18}
                        className={i < Math.floor(driver.rating) ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
                      />
                    ))}
                  </div>
                  <span className="font-bold">{driver.rating}</span>
                  <span className="text-gray-600 text-sm">({driver.reviews} reviews)</span>
                </div>
                <span className="badge badge-success">Active</span>
              </div>

              <div className="divider" />

              <div className="space-y-4 mb-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">Jobs Completed</p>
                  <p className="text-2xl font-bold">{driver.jobsCompleted}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Member Since</p>
                  <p className="font-semibold">{driver.memberSince}</p>
                </div>
              </div>

              <button className="w-full btn-primary">Contact Driver</button>
            </Card>

            {/* Driver Information */}
            <Card className="lg:col-span-2">
              <h3 className="font-poppins font-bold text-lg mb-6">Driver Information</h3>

              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-gray-600 text-sm mb-1">License Number</p>
                  <p className="font-semibold">{driver.licenseNumber}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">License Expiry</p>
                  <p className="font-semibold">{driver.licenseExpiry}</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Service Radius</p>
                  <p className="font-semibold">{driver.serviceRadius} miles</p>
                </div>
                <div>
                  <p className="text-gray-600 text-sm mb-1">Location</p>
                  <p className="font-semibold">{driver.location}</p>
                </div>
              </div>

              <div>
                <p className="text-gray-600 text-sm mb-3">Specialties</p>
                <div className="flex flex-wrap gap-2">
                  {driver.specialties.map((specialty) => (
                    <span key={specialty} className="badge badge-secondary">
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Contact & Performance */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12"
          >
            {/* Contact Information */}
            <Card>
              <h3 className="font-poppins font-bold text-lg mb-6">Contact Information</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Phone size={20} className="text-swaprunn-red" />
                  <div>
                    <p className="text-gray-600 text-sm">Phone</p>
                    <p className="font-semibold">{driver.phone}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={20} className="text-swaprunn-red" />
                  <div>
                    <p className="text-gray-600 text-sm">Email</p>
                    <p className="font-semibold text-sm">{driver.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <MapPinIcon size={20} className="text-swaprunn-red" />
                  <div>
                    <p className="text-gray-600 text-sm">Location</p>
                    <p className="font-semibold">{driver.location}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Performance Metrics */}
            <Card className="lg:col-span-2">
              <h3 className="font-poppins font-bold text-lg mb-6">Performance Metrics</h3>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp size={18} className="text-swaprunn-red" />
                    <p className="text-gray-600 text-sm">Total Earnings</p>
                  </div>
                  <p className="text-3xl font-bold">${driver.totalEarnings}</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Clock size={18} className="text-swaprunn-red" />
                    <p className="text-gray-600 text-sm">On-Time Rate</p>
                  </div>
                  <p className="text-3xl font-bold">{driver.onTimeRate}%</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle size={18} className="text-swaprunn-red" />
                    <p className="text-gray-600 text-sm">Acceptance Rate</p>
                  </div>
                  <p className="text-3xl font-bold">{driver.acceptanceRate}%</p>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <Star size={18} className="text-swaprunn-red" />
                    <p className="text-gray-600 text-sm">Avg Job Value</p>
                  </div>
                  <p className="text-3xl font-bold">${driver.avgJobValue}</p>
                </div>
              </div>
            </Card>
          </motion.div>

          {/* Reviews Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 className="font-poppins font-bold text-2xl mb-6">Reviews ({driver.reviews_list.length})</h2>

            <div className="space-y-4">
              {driver.reviews_list.map((review, index) => (
                <motion.div
                  key={review.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card>
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <p className="font-poppins font-bold">{review.author}</p>
                        <p className="text-gray-600 text-sm">{review.date}</p>
                      </div>
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    <p className="text-gray-700">{review.text}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
