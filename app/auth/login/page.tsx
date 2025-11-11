'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Card';
import { motion } from 'motion/react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Login failed');
        return;
      }

      localStorage.setItem('token', data.token);
      router.push('/dashboard/salesperson');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Navigation />

      <main className="min-h-screen bg-gradient-to-br from-swaprunn-off-white via-white to-swaprunn-off-white flex items-center justify-center py-12">
        {/* Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 right-10 w-72 h-72 bg-swaprunn-red/5 rounded-full blur-3xl" />
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-swaprunn-red/5 rounded-full blur-3xl" />
        </div>

        <div className="container-section relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left: Info */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="hidden lg:block"
            >
              <div className="mb-8">
                <h2 className="mb-4">Welcome Back</h2>
                <p className="text-subtitle">
                  Sign in to your SwapRunn account to manage your deliveries and track your earnings.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: '⚡', title: 'Quick Access', desc: 'View all your jobs instantly' },
                  { icon: '💰', title: 'Track Earnings', desc: 'Monitor your income in real-time' },
                  { icon: '📍', title: 'Real-time Tracking', desc: 'GPS tracking for all deliveries' },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                    className="flex gap-4"
                  >
                    <span className="text-3xl">{item.icon}</span>
                    <div>
                      <p className="font-poppins font-bold">{item.title}</p>
                      <p className="text-gray-600 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right: Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="max-w-md mx-auto">
                <div className="mb-8">
                  <h3 className="font-poppins font-bold text-2xl mb-2">Sign In</h3>
                  <p className="text-gray-600 text-sm">Enter your credentials to continue</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
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
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="you@example.com"
                        className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                        required
                      />
                    </div>
                  </div>

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
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
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

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between text-sm">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300" />
                      <span className="text-gray-600">Remember me</span>
                    </label>
                    <Link href="#" className="text-swaprunn-red hover:underline font-semibold">
                      Forgot password?
                    </Link>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner" />
                        Signing in...
                      </>
                    ) : (
                      <>
                        Sign In <ArrowRight size={18} />
                      </>
                    )}
                  </button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-200" />
                  <span className="text-gray-500 text-sm">or</span>
                  <div className="flex-1 h-px bg-gray-200" />
                </div>

                {/* Sign Up Link */}
                <p className="text-center text-gray-600 text-sm">
                  Don't have an account?{' '}
                  <Link href="/auth/signup" className="text-swaprunn-red font-semibold hover:underline">
                    Sign up here
                  </Link>
                </p>

                {/* Dealership Registration */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-center text-gray-600 text-sm mb-3">
                    Are you a dealership?
                  </p>
                  <Link
                    href="/auth/dealership-register"
                    className="w-full btn-secondary flex items-center justify-center gap-2"
                  >
                    Register Dealership
                  </Link>
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
