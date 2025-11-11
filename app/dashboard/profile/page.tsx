/**
 * User Profile Page
 * Allows users to view and edit their profile information
 * Role-specific profile fields
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card } from '@/components/ui/card'
import { User, Mail, Phone, MapPin, FileText, Star } from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    name: 'John Smith',
    email: 'john@example.com',
    phone: '(555) 123-4567',
    licenseNumber: 'DL123456',
    radiusMiles: '50',
    rating: '4.8',
    completedJobs: '45',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSave = () => {
    // In production, this would call an API to save the profile
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-black">My Profile</h1>
          <p className="text-sm text-gray-600">Manage your account information</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {/* Profile Card */}
          <Card className="p-6 border border-gray-200 md:col-span-1">
            <div className="text-center">
              <div className="w-24 h-24 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-3xl mx-auto mb-4">
                JS
              </div>
              <h2 className="text-xl font-bold mb-1">{formData.name}</h2>
              <p className="text-sm text-gray-600 mb-4">Driver</p>
              <div className="flex items-center justify-center gap-1 mb-4">
                <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                <span className="font-bold">{formData.rating}</span>
              </div>
              <div className="text-sm text-gray-600">
                <p><strong>{formData.completedJobs}</strong> jobs completed</p>
              </div>
            </div>
          </Card>

          {/* Profile Form */}
          <Card className="p-6 border border-gray-200 md:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Profile Information</h3>
              <Button
                onClick={() => setIsEditing(!isEditing)}
                variant={isEditing ? 'destructive' : 'outline'}
              >
                {isEditing ? 'Cancel' : 'Edit Profile'}
              </Button>
            </div>

            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <User className="w-4 h-4" />
                  Full Name
                </label>
                <Input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email
                </label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  Phone
                </label>
                <Input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* License Number */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <FileText className="w-4 h-4" />
                  License Number
                </label>
                <Input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Service Radius */}
              <div>
                <label className="block text-sm font-medium mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Service Radius (miles)
                </label>
                <Input
                  type="number"
                  name="radiusMiles"
                  value={formData.radiusMiles}
                  onChange={handleChange}
                  disabled={!isEditing}
                />
              </div>

              {/* Save Button */}
              {isEditing && (
                <Button
                  onClick={handleSave}
                  className="w-full bg-red-600 hover:bg-red-700 text-white mt-6"
                >
                  Save Changes
                </Button>
              )}
            </div>
          </Card>
        </div>

        {/* Additional Sections */}
        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Statistics */}
          <Card className="p-6 border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Statistics</h3>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total Earnings</span>
                <span className="font-bold">$2,250</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Completed Jobs</span>
                <span className="font-bold">{formData.completedJobs}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Acceptance Rate</span>
                <span className="font-bold">92%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">On-Time Rate</span>
                <span className="font-bold">95%</span>
              </div>
            </div>
          </Card>

          {/* Account Settings */}
          <Card className="p-6 border border-gray-200">
            <h3 className="text-lg font-bold mb-4">Account Settings</h3>
            <div className="space-y-3">
              <Button variant="outline" className="w-full justify-start">
                Change Password
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Notification Preferences
              </Button>
              <Button variant="outline" className="w-full justify-start">
                Payment Methods
              </Button>
              <Button variant="outline" className="w-full justify-start text-red-600">
                Logout
              </Button>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
