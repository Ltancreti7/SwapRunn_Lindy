/**
 * Settings Page
 * User account settings, preferences, and security options
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Lock, Bell, Eye, EyeOff, Save } from 'lucide-react'

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [settings, setSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    jobAlerts: true,
    messageNotifications: true,
    paymentNotifications: true,
  })

  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const handleToggleSetting = (key: string) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const handleChangePassword = () => {
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert('Passwords do not match')
      return
    }
    // In production, this would call an API
    alert('Password changed successfully!')
    setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-black">Settings</h1>
          <p className="text-sm text-gray-600">Manage your account preferences and security</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Card className="border border-gray-200">
          <Tabs defaultValue="notifications" className="w-full">
            <TabsList className="w-full justify-start border-b border-gray-200 rounded-none bg-white p-0">
              <TabsTrigger value="notifications" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </TabsTrigger>
              <TabsTrigger value="security" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                <Lock className="w-4 h-4 mr-2" />
                Security
              </TabsTrigger>
              <TabsTrigger value="privacy" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                Privacy
              </TabsTrigger>
            </TabsList>

            {/* Notifications Tab */}
            <TabsContent value="notifications" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Notification Preferences</h3>
                  <div className="space-y-4">
                    {/* Email Notifications */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-bold">Email Notifications</p>
                        <p className="text-sm text-gray-600">Receive updates via email</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.emailNotifications}
                        onChange={() => handleToggleSetting('emailNotifications')}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>

                    {/* SMS Notifications */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-bold">SMS Notifications</p>
                        <p className="text-sm text-gray-600">Receive text message alerts</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.smsNotifications}
                        onChange={() => handleToggleSetting('smsNotifications')}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>

                    {/* Push Notifications */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-bold">Push Notifications</p>
                        <p className="text-sm text-gray-600">Receive browser notifications</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.pushNotifications}
                        onChange={() => handleToggleSetting('pushNotifications')}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>

                    {/* Job Alerts */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-bold">Job Alerts</p>
                        <p className="text-sm text-gray-600">Get notified about new jobs</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.jobAlerts}
                        onChange={() => handleToggleSetting('jobAlerts')}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>

                    {/* Message Notifications */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-bold">Message Notifications</p>
                        <p className="text-sm text-gray-600">Get notified about new messages</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.messageNotifications}
                        onChange={() => handleToggleSetting('messageNotifications')}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>

                    {/* Payment Notifications */}
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-bold">Payment Notifications</p>
                        <p className="text-sm text-gray-600">Get notified about payments</p>
                      </div>
                      <input
                        type="checkbox"
                        checked={settings.paymentNotifications}
                        onChange={() => handleToggleSetting('paymentNotifications')}
                        className="w-5 h-5 cursor-pointer"
                      />
                    </div>
                  </div>
                </div>

                <Button className="bg-red-600 hover:bg-red-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Preferences
                </Button>
              </div>
            </TabsContent>

            {/* Security Tab */}
            <TabsContent value="security" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Change Password</h3>
                  <div className="space-y-4 max-w-md">
                    {/* Current Password */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <input
                          type={showPassword ? 'text' : 'password'}
                          value={passwordForm.currentPassword}
                          onChange={e =>
                            setPasswordForm({
                              ...passwordForm,
                              currentPassword: e.target.value,
                            })
                          }
                          className="w-full px-3 py-2 border border-gray-300 rounded-md pr-10"
                        />
                        <button
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-2.5"
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4 text-gray-400" />
                          ) : (
                            <Eye className="w-4 h-4 text-gray-400" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* New Password */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        New Password
                      </label>
                      <Input
                        type="password"
                        value={passwordForm.newPassword}
                        onChange={e =>
                          setPasswordForm({
                            ...passwordForm,
                            newPassword: e.target.value,
                          })
                        }
                      />
                    </div>

                    {/* Confirm Password */}
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Confirm Password
                      </label>
                      <Input
                        type="password"
                        value={passwordForm.confirmPassword}
                        onChange={e =>
                          setPasswordForm({
                            ...passwordForm,
                            confirmPassword: e.target.value,
                          })
                        }
                      />
                    </div>

                    <Button
                      onClick={handleChangePassword}
                      className="w-full bg-red-600 hover:bg-red-700 text-white"
                    >
                      Update Password
                    </Button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold mb-4">Two-Factor Authentication</h3>
                  <p className="text-gray-600 mb-4">
                    Add an extra layer of security to your account
                  </p>
                  <Button variant="outline">Enable 2FA</Button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold mb-4">Active Sessions</h3>
                  <p className="text-gray-600 mb-4">
                    Manage your active login sessions
                  </p>
                  <Button variant="outline">View Sessions</Button>
                </div>
              </div>
            </TabsContent>

            {/* Privacy Tab */}
            <TabsContent value="privacy" className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold mb-4">Privacy Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-bold">Profile Visibility</p>
                        <p className="text-sm text-gray-600">Allow others to see your profile</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-bold">Show Rating</p>
                        <p className="text-sm text-gray-600">Display your rating publicly</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>

                    <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div>
                        <p className="font-bold">Data Collection</p>
                        <p className="text-sm text-gray-600">Allow us to collect usage data</p>
                      </div>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold mb-4">Data & Privacy</h3>
                  <div className="space-y-2">
                    <Button variant="outline" className="w-full justify-start">
                      Download My Data
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Privacy Policy
                    </Button>
                    <Button variant="outline" className="w-full justify-start">
                      Terms of Service
                    </Button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="text-lg font-bold mb-4 text-red-600">Danger Zone</h3>
                  <Button variant="destructive" className="w-full">
                    Delete Account
                  </Button>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}
