/**
 * Rate Driver Page
 * Allows users to rate drivers after job completion
 * Collects rating and optional feedback
 */

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Textarea } from '@/components/ui/textarea'
import { ArrowLeft, Star } from 'lucide-react'

export default function RateDriverPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmitRating = () => {
    if (rating === 0) {
      alert('Please select a rating')
      return
    }
    // In production, this would call an API
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Card className="p-8 border border-gray-200 text-center max-w-md">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Star className="w-8 h-8 text-green-600 fill-green-600" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your rating has been submitted successfully.</p>
          <Link href="/dashboard/salesperson">
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Back to Dashboard
            </Button>
          </Link>
        </Card>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center gap-4">
          <Link href="/dashboard/salesperson">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <h1 className="text-2xl font-bold text-black">Rate Driver</h1>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="p-8 border border-gray-200">
          {/* Driver Info */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-2xl mx-auto mb-4">
              JS
            </div>
            <h2 className="text-2xl font-bold mb-1">John Smith</h2>
            <p className="text-gray-600">Driver</p>
          </div>

          {/* Job Info */}
          <div className="bg-gray-50 rounded-lg p-4 mb-8">
            <p className="text-sm text-gray-600 mb-1">Job Details</p>
            <p className="font-bold">2024 Toyota Camry - Silver</p>
            <p className="text-sm text-gray-600">Pickup: 123 Main St, Claremont, CA</p>
            <p className="text-sm text-gray-600">Dropoff: 456 Oak Ave, Pasadena, CA</p>
          </div>

          {/* Rating Section */}
          <div className="mb-8">
            <label className="block text-lg font-bold mb-4">How would you rate this driver?</label>
            <div className="flex justify-center gap-4 mb-4">
              {[1, 2, 3, 4, 5].map(star => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-12 h-12 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400 fill-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-gray-600">
                {rating === 5 && 'Excellent!'}
                {rating === 4 && 'Very Good'}
                {rating === 3 && 'Good'}
                {rating === 2 && 'Fair'}
                {rating === 1 && 'Poor'}
              </p>
            )}
          </div>

          {/* Comment Section */}
          <div className="mb-8">
            <label className="block text-lg font-bold mb-2">Additional Comments (Optional)</label>
            <Textarea
              placeholder="Share your experience with this driver..."
              value={comment}
              onChange={e => setComment(e.target.value)}
              className="min-h-32"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleSubmitRating}
            className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold"
          >
            Submit Rating
          </Button>
        </Card>
      </main>
    </div>
  )
}
