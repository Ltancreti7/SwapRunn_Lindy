'use client';

import Link from 'next/link';
import { motion } from 'motion/react';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { HelpButton } from '@/components/HelpButton';
import { Card } from '@/components/Card';
import { ArrowRight, Zap, Users, TrendingUp, Shield, Clock, MapPin } from 'lucide-react';

export default function Home() {
  const features = [
    {
      icon: <Zap size={32} />,
      title: 'Lightning Fast',
      description: 'Real-time job matching and instant driver notifications',
    },
    {
      icon: <Users size={32} />,
      title: 'Verified Drivers',
      description: 'Rated and reviewed drivers with proven track records',
    },
    {
      icon: <TrendingUp size={32} />,
      title: 'Smart Analytics',
      description: 'Track performance, earnings, and delivery metrics',
    },
    {
      icon: <Shield size={32} />,
      title: 'Secure Platform',
      description: 'Enterprise-grade security for all transactions',
    },
    {
      icon: <Clock size={32} />,
      title: '24/7 Support',
      description: 'Round-the-clock customer support team',
    },
    {
      icon: <MapPin size={32} />,
      title: 'GPS Tracking',
      description: 'Real-time location tracking and route optimization',
    },
  ];

  const steps = [
    {
      number: '01',
      title: 'Create Request',
      description: 'Post your delivery or swap request with vehicle details',
    },
    {
      number: '02',
      title: 'Browse Drivers',
      description: 'View available drivers with ratings and specialties',
    },
    {
      number: '03',
      title: 'Assign & Track',
      description: 'Assign job and track driver in real-time with GPS',
    },
    {
      number: '04',
      title: 'Complete & Pay',
      description: 'Automatic payment processing and driver ratings',
    },
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Dealership Manager',
      quote: 'SwapRunn has cut our delivery times in half. The driver quality is exceptional.',
      avatar: 'SJ',
    },
    {
      name: 'Mike Chen',
      role: 'Professional Driver',
      quote: 'Easy to use, fair pay, and great support. Best platform I\'ve worked with.',
      avatar: 'MC',
    },
    {
      name: 'Lisa Rodriguez',
      role: 'Sales Manager',
      quote: 'The real-time tracking gives us peace of mind. Highly recommended!',
      avatar: 'LR',
    },
  ];

  return (
    <>
      <Navigation />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-swaprunn-off-white via-white to-swaprunn-off-white overflow-hidden">
          {/* Background Elements */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-20 right-10 w-72 h-72 bg-swaprunn-red/5 rounded-full blur-3xl" />
            <div className="absolute bottom-20 left-10 w-96 h-96 bg-swaprunn-red/5 rounded-full blur-3xl" />
          </div>

          <div className="container-section relative z-10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Left Content */}
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
              >
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="mb-6"
                >
                  <span className="badge badge-primary">🚀 Vehicle Logistics Reimagined</span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="text-gradient mb-6"
                >
                  From Dealership to Driveway — Faster, Smarter, SwapRunn.
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-subtitle mb-8"
                >
                  Connect with verified drivers, track deliveries in real-time, and streamline your vehicle logistics with the platform built for modern dealerships.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  className="flex flex-col sm:flex-row gap-4 mb-12"
                >
                  <Link href="/auth/signup" className="btn-primary flex items-center justify-center gap-2">
                    Get Started <ArrowRight size={18} />
                  </Link>
                  <Link href="/auth/dealership-register" className="btn-primary-outline flex items-center justify-center gap-2">
                    Register Dealership
                  </Link>
                </motion.div>

                {/* Trust Bar */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.6 }}
                  className="flex items-center gap-4 text-sm text-gray-600"
                >
                  <div className="flex -space-x-2">
                    {[...Array(3)].map((_, i) => (
                      <div
                        key={i}
                        className="w-8 h-8 rounded-full bg-gradient-red flex items-center justify-center text-white text-xs font-bold border-2 border-white"
                      >
                        {String.fromCharCode(65 + i)}
                      </div>
                    ))}
                  </div>
                  <span className="font-semibold">Trusted by 200+ Dealerships Nationwide</span>
                </motion.div>
              </motion.div>

              {/* Right: Hero Image/Illustration */}
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative h-96 lg:h-full"
              >
                <div className="absolute inset-0 bg-gradient-red rounded-3xl opacity-10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-6xl mb-4">🚗</div>
                    <p className="text-gray-600 font-semibold">Vehicle Logistics Platform</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-section bg-white">
          <div className="container-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="mb-4">Why Choose SwapRunn?</h2>
              <p className="text-subtitle max-w-2xl mx-auto">
                Everything you need to manage vehicle logistics efficiently and reliably.
              </p>
            </motion.div>

            <div className="grid-auto">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="text-center h-full">
                    <div className="text-swaprunn-red mb-4 flex justify-center">{feature.icon}</div>
                    <h3 className="font-poppins font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-section bg-swaprunn-off-white">
          <div className="container-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="mb-4">How It Works</h2>
              <p className="text-subtitle max-w-2xl mx-auto">
                Simple, streamlined process from job creation to completion.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {steps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <Card className="text-center">
                    <div className="text-5xl font-poppins font-bold text-swaprunn-red/20 mb-4">
                      {step.number}
                    </div>
                    <h3 className="font-poppins font-bold text-lg mb-2">{step.title}</h3>
                    <p className="text-gray-600 text-sm">{step.description}</p>
                  </Card>

                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gradient-red" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-section bg-white">
          <div className="container-section">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="mb-4">What Our Users Say</h2>
              <p className="text-subtitle max-w-2xl mx-auto">
                Join hundreds of dealerships and drivers already using SwapRunn.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full flex flex-col">
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 rounded-full bg-gradient-red flex items-center justify-center text-white font-bold">
                        {testimonial.avatar}
                      </div>
                      <div>
                        <p className="font-poppins font-bold">{testimonial.name}</p>
                        <p className="text-xs text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-600 italic flex-1">"{testimonial.quote}"</p>
                    <div className="flex gap-1 mt-4">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className="text-yellow-500">★</span>
                      ))}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-section bg-gradient-red text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl" />
          </div>

          <div className="container-section relative z-10 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-4 text-white">Ready to Transform Your Logistics?</h2>
              <p className="text-subtitle text-white/90 max-w-2xl mx-auto mb-8">
                Join SwapRunn today and experience the future of vehicle logistics.
              </p>
              <Link href="/auth/signup" className="btn-primary bg-white text-swaprunn-red hover:bg-gray-100 inline-flex items-center gap-2">
                Get Started Now <ArrowRight size={18} />
              </Link>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
      <HelpButton />
    </>
  );
}
