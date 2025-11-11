'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Card } from '@/components/Card';
import { motion } from 'motion/react';
import { ArrowLeft, MapPin, DollarSign, Clock, FileText, ArrowRight } from 'lucide-react';

export default function CreateJobPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    vehicleType: '',
    vin: '',
    color: '',
    mileage: '',
    pickupLocation: '',
    dropoffLocation: '',
    pickupTime: '',
    estimatedDeliveryTime: '',
    payment: '',
    notes: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/jobs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to create job');

      const data = await response.json();
      router.push(`/dashboard/jobs/${data.id}`);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const steps = [
    { number: 1, title: 'Vehicle Details' },
    { number: 2, title: 'Pickup & Delivery' },
    { number: 3, title: 'Payment & Notes' },
  ];

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
            className="mb-12"
          >
            <h1 className="mb-2">Create New Job</h1>
            <p className="text-subtitle">Post a delivery job and find available drivers</p>
          </motion.div>

          {/* Progress Steps */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mb-12"
          >
            <div className="flex items-center justify-between">
              {steps.map((s, index) => (
                <div key={s.number} className="flex items-center flex-1">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
                      step >= s.number
                        ? 'bg-gradient-red text-white'
                        : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {s.number}
                  </div>
                  <div className="ml-4">
                    <p className="font-semibold text-sm">{s.title}</p>
                  </div>
                  {index < steps.length - 1 && (
                    <div
                      className={`flex-1 h-1 mx-4 rounded-full transition-all ${
                        step > s.number ? 'bg-gradient-red' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto"
          >
            <Card>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Step 1: Vehicle Details */}
                {step === 1 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="font-poppins font-bold text-lg">Vehicle Information</h3>

                    <div className="form-group">
                      <label htmlFor="vehicleType" className="block text-sm font-semibold mb-2">
                        Vehicle Type *
                      </label>
                      <input
                        id="vehicleType"
                        type="text"
                        name="vehicleType"
                        value={formData.vehicleType}
                        onChange={handleChange}
                        placeholder="e.g., 2024 Tesla Model 3"
                        className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                        required
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="form-group">
                        <label htmlFor="vin" className="block text-sm font-semibold mb-2">
                          VIN
                        </label>
                        <input
                          id="vin"
                          type="text"
                          name="vin"
                          value={formData.vin}
                          onChange={handleChange}
                          placeholder="Vehicle Identification Number"
                          className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                        />
                      </div>

                      <div className="form-group">
                        <label htmlFor="color" className="block text-sm font-semibold mb-2">
                          Color
                        </label>
                        <input
                          id="color"
                          type="text"
                          name="color"
                          value={formData.color}
                          onChange={handleChange}
                          placeholder="e.g., Pearl White"
                          className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="mileage" className="block text-sm font-semibold mb-2">
                        Mileage (miles)
                      </label>
                      <input
                        id="mileage"
                        type="number"
                        name="mileage"
                        value={formData.mileage}
                        onChange={handleChange}
                        placeholder="0"
                        className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 2: Pickup & Delivery */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="font-poppins font-bold text-lg">Pickup & Delivery</h3>

                    <div className="form-group">
                      <label htmlFor="pickupLocation" className="block text-sm font-semibold mb-2">
                        Pickup Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          id="pickupLocation"
                          type="text"
                          name="pickupLocation"
                          value={formData.pickupLocation}
                          onChange={handleChange}
                          placeholder="Full address"
                          className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="pickupTime" className="block text-sm font-semibold mb-2">
                        Pickup Time *
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          id="pickupTime"
                          type="datetime-local"
                          name="pickupTime"
                          value={formData.pickupTime}
                          onChange={handleChange}
                          className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="dropoffLocation" className="block text-sm font-semibold mb-2">
                        Delivery Location *
                      </label>
                      <div className="relative">
                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          id="dropoffLocation"
                          type="text"
                          name="dropoffLocation"
                          value={formData.dropoffLocation}
                          onChange={handleChange}
                          placeholder="Full address"
                          className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="estimatedDeliveryTime" className="block text-sm font-semibold mb-2">
                        Estimated Delivery Time
                      </label>
                      <div className="relative">
                        <Clock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          id="estimatedDeliveryTime"
                          type="datetime-local"
                          name="estimatedDeliveryTime"
                          value={formData.estimatedDeliveryTime}
                          onChange={handleChange}
                          className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Step 3: Payment & Notes */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4 }}
                    className="space-y-6"
                  >
                    <h3 className="font-poppins font-bold text-lg">Payment & Special Instructions</h3>

                    <div className="form-group">
                      <label htmlFor="payment" className="block text-sm font-semibold mb-2">
                        Payment Amount *
                      </label>
                      <div className="relative">
                        <DollarSign className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                          id="payment"
                          type="number"
                          name="payment"
                          value={formData.payment}
                          onChange={handleChange}
                          placeholder="0.00"
                          step="0.01"
                          className="pl-12 pr-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all"
                          required
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label htmlFor="notes" className="block text-sm font-semibold mb-2">
                        Special Instructions
                      </label>
                      <textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleChange}
                        placeholder="Any special instructions for the driver..."
                        rows={4}
                        className="px-4 py-3 w-full rounded-lg border border-gray-300 focus:outline-none focus:border-swaprunn-red focus:shadow-focus transition-all resize-none"
                      />
                    </div>

                    {/* Summary */}
                    <div className="bg-swaprunn-off-white p-6 rounded-lg border border-gray-200">
                      <h4 className="font-poppins font-bold mb-4">Job Summary</h4>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Vehicle:</span>
                          <span className="font-semibold">{formData.vehicleType || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">From:</span>
                          <span className="font-semibold">{formData.pickupLocation || 'Not specified'}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">To:</span>
                          <span className="font-semibold">{formData.dropoffLocation || 'Not specified'}</span>
                        </div>
                        <div className="h-px bg-gray-200 my-2" />
                        <div className="flex justify-between">
                          <span className="text-gray-600">Payment:</span>
                          <span className="font-bold text-swaprunn-red text-lg">
                            ${parseFloat(formData.payment || '0').toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}

                {/* Navigation Buttons */}
                <div className="flex gap-4 pt-6 border-t border-gray-200">
                  {step > 1 && (
                    <button
                      type="button"
                      onClick={() => setStep(step - 1)}
                      className="btn-secondary flex-1"
                    >
                      Previous
                    </button>
                  )}

                  {step < 3 ? (
                    <button
                      type="button"
                      onClick={() => setStep(step + 1)}
                      className="btn-primary flex-1 flex items-center justify-center gap-2"
                    >
                      Next <ArrowRight size={18} />
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isLoading}
                      className="btn-primary flex-1 flex items-center justify-center gap-2 disabled:opacity-50"
                    >
                      {isLoading ? (
                        <>
                          <div className="loading-spinner" />
                          Creating...
                        </>
                      ) : (
                        <>
                          Create Job <ArrowRight size={18} />
                        </>
                      )}
                    </button>
                  )}
                </div>
              </form>
            </Card>
          </motion.div>
        </div>
      </main>

      <Footer />
    </>
  );
}
