'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card, DriverCard } from '@/components/Card';
import { motion } from 'motion/react';
import { Search, MapPin, Star, Filter, ChevronDown } from 'lucide-react';

export default function FindDriversPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [ratingFilter, setRatingFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');

  const drivers = [
    {
      id: '1',
      name: 'John Smith',
      rating: 4.8,
      reviews: 45,
      status: 'available' as const,
      location: 'Claremont, CA',
      serviceRadius: 50,
      specialties: ['Sedan', 'SUV', 'Truck'],
      avatar: 'JS',
    },
    {
      id: '2',
      name: 'Maria Garcia',
      rating: 4.9,
      reviews: 62,
      status: 'available' as const,
      location: 'Pasadena, CA',
      serviceRadius: 75,
      specialties: ['Luxury', 'SUV', 'Sedan'],
      avatar: 'MG',
    },
    {
      id: '3',
      name: 'David Chen',
      rating: 4.6,
      reviews: 38,
      status: 'busy' as const,
      location: 'Upland, CA',
      serviceRadius: 40,
      specialties: ['Sedan', 'Compact'],
      avatar: 'DC',
    },
    {
      id: '4',
      name: 'Sarah Johnson',
      rating: 4.7,
      reviews: 51,
      status: 'available' as const,
      location: 'Ontario, CA',
      serviceRadius: 60,
      specialties: ['Truck', 'SUV', 'Van'],
      avatar: 'SJ',
    },
    {
      id: '5',
      name: 'Michael Brown',
      rating: 4.5,
      reviews: 29,
      status: 'available' as const,
      location: 'Rancho Cucamonga, CA',
      serviceRadius: 35,
      specialties: ['Sedan', 'Coupe'],
      avatar: 'MB',
    },
  ];

  const filteredDrivers = drivers.filter((driver) => {
    const matchesSearch =
      driver.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      driver.location.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesRating =
      ratingFilter === 'all' ||
      (ratingFilter === '4.5+' && driver.rating >= 4.5) ||
      (ratingFilter === '4.7+' && driver.rating >= 4.7) ||
      (ratingFilter === '4.9+' && driver.rating >= 4.9);

    const matchesStatus =
      statusFilter === 'all' ||
      (statusFilter === 'available' && driver.status === 'available') ||
      (statusFilter === 'busy' && driver.status === 'busy');

    return matchesSearch && matchesRating && matchesStatus;
  });

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
            <h1 className="mb-2">Find Drivers</h1>
            <p className="text-subtitle">Search and filter available drivers for your jobs</p>
          </motion.div>

          {/* Search & Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-12"
          >
            {/* Search Bar */}
            <Card className="md:col-span-2">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by name or location..."
                  className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                />
              </div>
            </Card>

            {/* Rating Filter */}
            <Card>
              <div className="relative">
                <Star className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={ratingFilter}
                  onChange={(e) => setRatingFilter(e.target.value)}
                  className="pl-12 pr-10 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red appearance-none bg-white cursor-pointer"
                >
                  <option value="all">All Ratings</option>
                  <option value="4.5+">4.5+ Stars</option>
                  <option value="4.7+">4.7+ Stars</option>
                  <option value="4.9+">4.9+ Stars</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </Card>

            {/* Status Filter */}
            <Card>
              <div className="relative">
                <Filter className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-12 pr-10 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red appearance-none bg-white cursor-pointer"
                >
                  <option value="all">All Status</option>
                  <option value="available">Available</option>
                  <option value="busy">Busy</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
              </div>
            </Card>
          </motion.div>

          {/* Results Count */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <p className="text-gray-600 text-sm">
              Showing <span className="font-bold">{filteredDrivers.length}</span> of{' '}
              <span className="font-bold">{drivers.length}</span> drivers
            </p>
          </motion.div>

          {/* Drivers Grid */}
          {filteredDrivers.length > 0 ? (
            <div className="space-y-4">
              {filteredDrivers.map((driver, index) => (
                <motion.div
                  key={driver.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Card hover className="cursor-pointer">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                      {/* Driver Info */}
                      <div className="flex items-start gap-4 flex-1">
                        <div className="w-16 h-16 rounded-full bg-gradient-red flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                          {driver.avatar}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <h3 className="font-poppins font-bold text-lg">{driver.name}</h3>
                            <span
                              className={`badge ${
                                driver.status === 'available' ? 'badge-success' : 'badge-warning'
                              }`}
                            >
                              {driver.status === 'available' ? 'Available' : 'Busy'}
                            </span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <div className="flex items-center gap-1">
                              <Star size={16} className="fill-yellow-500 text-yellow-500" />
                              <span className="font-semibold">{driver.rating}</span>
                              <span>({driver.reviews} jobs)</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin size={16} className="text-swaprunn-red" />
                              <span>{driver.location}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <span className="text-gray-400">•</span>
                              <span>{driver.serviceRadius} mi radius</span>
                            </div>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {driver.specialties.map((specialty) => (
                              <span key={specialty} className="badge badge-secondary text-xs">
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-3 md:flex-col lg:flex-row">
                        <Link
                          href={`/dashboard/drivers/${driver.id}`}
                          className="btn-secondary flex-1 md:flex-none text-center"
                        >
                          View Profile
                        </Link>
                        <button
                          disabled={driver.status !== 'available'}
                          className="btn-primary flex-1 md:flex-none disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          Assign Job
                        </button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          ) : (
            <Card className="text-center py-12">
              <div className="text-4xl mb-4">🔍</div>
              <h3 className="font-poppins font-bold text-lg mb-2">No Drivers Found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter criteria</p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setRatingFilter('all');
                  setStatusFilter('all');
                }}
                className="btn-primary"
              >
                Clear Filters
              </button>
            </Card>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
