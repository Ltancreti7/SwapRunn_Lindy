'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Card';
import { motion } from 'motion/react';
import { Mail, Lock, User, Briefcase, Truck, Eye, EyeOff, ArrowRight, Check } from 'lucide-react';

export default function SignupPage() {
  const router = useRouter();
  const [role, setRole] = useState<'salesperson' | 'driver' | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    licenseNumber: '',
    serviceRadius: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: role,
          licenseNumber: role === 'driver' ? formData.licenseNumber : undefined,
          serviceRadius: role === 'driver' ? parseInt(formData.serviceRadius) : undefined,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Signup failed');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push(role === 'driver' ? '/dashboard/driver' : '/dashboard/salesperson');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-br from-swaprunn-off-white via-white to-swaprunn-off-white py-12">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-swaprunn-red/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-swaprunn-red/5 rounded-full blur-3xl" />
        </div>

        <div className="container-section relative z-10">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h1 className="mb-4">Join SwapRunn</h1>
            <p className="text-subtitle max-w-2xl mx-auto">
              Choose your role and get started with vehicle logistics today
            </p>
          </motion.div>

          {/* Role Selection */}
          {!role ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-2xl mx-auto mb-12"
            >
              {/* Salesperson Card */}
              <Card
                hover
                onClick={() => setRole('salesperson')}
                className="cursor-pointer text-center p-8"
              >
                <div className="text-5xl mb-4">👔</div>
                <h3 className="font-poppins font-bold text-xl mb-2">I'm a Salesperson</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Create delivery requests, manage drivers, and track vehicle logistics
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Post delivery jobs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Track drivers in real-time
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Rate and review drivers
                  </li>
                </ul>
                <button className="btn-primary w-full">Get Started →</button>
              </Card>

              {/* Driver Card */}
              <Card
                hover
                onClick={() => setRole('driver')}
                className="cursor-pointer text-center p-8"
              >
                <div className="text-5xl mb-4">🚗</div>
                <h3 className="font-poppins font-bold text-xl mb-2">I'm a Driver</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Browse jobs, earn money, and build your reputation
                </p>
                <ul className="text-left space-y-2 text-sm text-gray-600 mb-6">
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Browse available jobs
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Earn on your schedule
                  </li>
                  <li className="flex items-center gap-2">
                    <Check size={16} className="text-green-500" />
                    Build your rating
                  </li>
                </ul>
                <button className="btn-primary w-full">Get Started →</button>
              </Card>
            </motion.div>
          ) : (
            /* Signup Form */
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-md mx-auto"
            >
              <Card>
                {/* Back Button */}
                <button
                  onClick={() => setRole(null)}
                  className="btn-ghost mb-6 p-0"
                >
                  ← Back to role selection
                </button>

                <div className="mb-8">
                  <h3 className="font-poppins font-bold text-2xl mb-2">
                    {role === 'driver' ? 'Driver Signup' : 'Salesperson Signup'}
                  </h3>
                  <p className="text-gray-600 text-sm">Create your account to get started</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="form-group">
                    <label htmlFor="name" className="block text-sm font-semibold mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="form-group">
                    <label htmlFor="email" className="block text-sm font-semibold mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        id="email"
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Driver-specific Fields */}
                  {role === 'driver' && (
                    <>
                      <div className="form-group">
                        <label htmlFor="licenseNumber" className="block text-sm font-semibold mb-2">
                          License Number
                        </label>
                        <input
                          id="licenseNumber"
                          type="text"
                          name="licenseNumber"
                          value={formData.licenseNumber}
                          onChange={handleChange}
                          placeholder="DL123456"
                          className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="serviceRadius" className="block text-sm font-semibold mb-2">
                          Service Radius (miles)
                        </label>
                        <input
                          id="serviceRadius"
                          type="number"
                          name="serviceRadius"
                          value={formData.serviceRadius}
                          onChange={handleChange}
                          placeholder="50"
                          className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                          required
                        />
                      </div>
                    </>
                  )}

                  {/* Password Field */}
                  <div className="form-group">
                    <label htmlFor="password" className="block text-sm font-semibold mb-2">
                      Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        id="password"
                        type={showPassword ? 'text' : 'password'}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="pl-12 pr-12 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                      </button>
                    </div>
                  </div>

                  {/* Confirm Password Field */}
                  <div className="form-group">
                    <label htmlFor="confirmPassword" className="block text-sm font-semibold mb-2">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                      <input
                        id="confirmPassword"
                        type={showPassword ? 'text' : 'password'}
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        className="pl-12 pr-12 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                        required
                      />
                    </div>
                  </div>

                  {/* Error Message */}
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm"
                    >
                      {error}
                    </motion.div>
                  )}

                  {/* Terms */}
                  <label className="flex items-start gap-2 cursor-pointer">
                    <input type="checkbox" className="w-4 h-4 rounded border-gray-300 mt-1" required />
                    <span className="text-gray-600 text-sm">
                      I agree to the{' '}
                      <Link href="#" className="text-swaprunn-red hover:underline">
                        Terms of Service
                      </Link>{' '}
                      and{' '}
                      <Link href="#" className="text-swaprunn-red hover:underline">
                        Privacy Policy
                      </Link>
                    </span>
                  </label>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner" />
                        Creating account...
                      </>
                    ) : (
                      <>
                        Create Account <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                {/* Sign In Link */}
                <p className="text-center text-gray-600 text-sm mt-6">
                  Already have an account?{' '}
                  <Link href="/auth/login" className="text-swaprunn-red font-semibold hover:underline">
                    Sign in here
                  </Link>
                </p>
              </Card>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
