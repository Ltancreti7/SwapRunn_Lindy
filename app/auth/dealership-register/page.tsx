/**
 * Dealership Registration Page
 * Multi-step form for registering a new dealership
 * Creates dealership record and auto-creates admin user
 */

'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { Building2, ChevronRight, ChevronLeft } from 'lucide-react'

export default function DealershipRegisterPage() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const [formData, setFormData] = useState({
    dealershipName: '',
    address: '',
    contactEmail: '',
    phone: '',
    contactPersonName: '',
    contactPersonTitle: '',
    adminPassword: '',
  })

  // Handle form input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // Handle next step
  const handleNext = () => {
    setError('')
    
    // Validate current step
    if (step === 1) {
      if (!formData.dealershipName || !formData.address || !formData.contactEmail) {
        setError('Please fill in all dealership information')
        return
      }
    } else if (step === 2) {
      if (!formData.contactPersonName || !formData.contactPersonTitle) {
        setError('Please fill in contact person information')
        return
      }
    }

    setStep(step + 1)
  }

  // Handle previous step
  const handlePrev = () => {
    setStep(step - 1)
    setError('')
  }

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      // Validate final step
      if (!formData.adminPassword) {
        setError('Please enter a password')
        setLoading(false)
        return
      }

      // Call dealership registration API
      const response = await fetch('/api/auth/dealership-register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          dealershipName: formData.dealershipName,
          address: formData.address,
          contactEmail: formData.contactEmail,
          phone: formData.phone,
          contactPersonName: formData.contactPersonName,
          contactPersonTitle: formData.contactPersonTitle,
          adminPassword: formData.adminPassword,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.error || 'Registration failed')
        setLoading(false)
        return
      }

      // Redirect to dealership dashboard
      router.push('/dashboard/dealership')
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-white flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/">
            <h1 className="text-3xl font-bold text-red-600 mb-2">SwapRunn</h1>
          </Link>
          <p className="text-gray-600">Register your dealership</p>
        </div>

        {/* Progress Indicator */}
        <div className="flex justify-between mb-8">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`flex-1 h-2 mx-1 rounded-full ${
                s <= step ? 'bg-red-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        <Card className="p-8 border-2 border-gray-200">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Dealership Info */}
            {step === 1 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-6">Dealership Information</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">Dealership Name</label>
                  <Input
                    type="text"
                    name="dealershipName"
                    value={formData.dealershipName}
                    onChange={handleChange}
                    placeholder="McGee Toyota of Claremont"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Address</label>
                  <Input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main St, Claremont, CA 91711"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Contact Email</label>
                  <Input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    placeholder="contact@dealership.com"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Phone (Optional)</label>
                  <Input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Person */}
            {step === 2 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-6">Contact Person</h2>

                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    type="text"
                    name="contactPersonName"
                    value={formData.contactPersonName}
                    onChange={handleChange}
                    placeholder="John Smith"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Title</label>
                  <Input
                    type="text"
                    name="contactPersonTitle"
                    value={formData.contactPersonTitle}
                    onChange={handleChange}
                    placeholder="General Manager"
                    required
                  />
                </div>
              </div>
            )}

            {/* Step 3: Admin Account */}
            {step === 3 && (
              <div className="space-y-4">
                <h2 className="text-xl font-bold mb-6">Create Admin Account</h2>

                <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg mb-4">
                  <p className="text-sm text-blue-800">
                    <strong>Email:</strong> {formData.contactEmail}
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Admin Password</label>
                  <Input
                    type="password"
                    name="adminPassword"
                    value={formData.adminPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Use a strong password with at least 8 characters
                  </p>
                </div>

                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-sm mb-2">Review Information:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li><strong>Dealership:</strong> {formData.dealershipName}</li>
                    <li><strong>Address:</strong> {formData.address}</li>
                    <li><strong>Contact:</strong> {formData.contactPersonName}</li>
                    <li><strong>Title:</strong> {formData.contactPersonTitle}</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex gap-4 mt-8">
              {step > 1 && (
                <Button
                  type="button"
                  onClick={handlePrev}
                  variant="outline"
                  className="flex-1"
                >
                  <ChevronLeft className="w-4 h-4 mr-2" />
                  Back
                </Button>
              )}

              {step < 3 ? (
                <Button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={loading}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                >
                  {loading ? 'Registering...' : 'Complete Registration'}
                </Button>
              )}
            </div>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center text-sm text-gray-600">
            Already registered?{' '}
            <Link href="/auth/login" className="text-red-600 hover:underline">
              Sign in
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
