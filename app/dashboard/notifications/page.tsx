/**
 * Notifications Page
 * Shows all notifications for the user
 * Includes job updates, messages, and system notifications
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Bell, Trash2, CheckCircle, AlertCircle, MessageSquare, Truck } from 'lucide-react'

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'JOB_ACCEPTED',
      title: 'Job Accepted',
      message: 'John Smith accepted your job for 2024 Toyota Camry',
      timestamp: '2 minutes ago',
      read: false,
      icon: 'check',
    },
    {
      id: '2',
      type: 'JOB_COMPLETED',
      title: 'Job Completed',
      message: 'Maria Garcia completed the delivery to Pasadena',
      timestamp: '1 hour ago',
      read: false,
      icon: 'truck',
    },
    {
      id: '3',
      type: 'NEW_MESSAGE',
      title: 'New Message',
      message: 'You have a new message from Sarah Johnson',
      timestamp: '3 hours ago',
      read: true,
      icon: 'message',
    },
    {
      id: '4',
      type: 'PAYMENT_PROCESSED',
      title: 'Payment Processed',
      message: 'Your payment of $150 has been processed',
      timestamp: '5 hours ago',
      read: true,
      icon: 'check',
    },
    {
      id: '5',
      type: 'JOB_AVAILABLE',
      title: 'New Job Available',
      message: 'A new job matching your criteria is available',
      timestamp: '1 day ago',
      read: true,
      icon: 'alert',
    },
    {
      id: '6',
      type: 'RATING_RECEIVED',
      title: 'New Rating',
      message: 'You received a 5-star rating from a customer',
      timestamp: '2 days ago',
      read: true,
      icon: 'check',
    },
  ])

  const handleMarkAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ))
  }

  const handleDelete = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id))
  }

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })))
  }

  const unreadCount = notifications.filter(n => !n.read).length

  const getIcon = (type: string) => {
    switch (type) {
      case 'check':
        return <CheckCircle className="w-5 h-5 text-green-600" />
      case 'truck':
        return <Truck className="w-5 h-5 text-blue-600" />
      case 'message':
        return <MessageSquare className="w-5 h-5 text-purple-600" />
      case 'alert':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />
      default:
        return <Bell className="w-5 h-5 text-gray-600" />
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-black">Notifications</h1>
            <p className="text-sm text-gray-600">
              {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount !== 1 ? 's' : ''}` : 'All caught up!'}
            </p>
          </div>
          {unreadCount > 0 && (
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              Mark all as read
            </Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {notifications.length === 0 ? (
          <Card className="p-12 border border-gray-200 text-center">
            <Bell className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">No notifications yet</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {notifications.map(notification => (
              <Card
                key={notification.id}
                className={`p-4 border border-gray-200 hover:shadow-md transition cursor-pointer ${
                  !notification.read ? 'bg-blue-50 border-blue-200' : ''
                }`}
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <div className="flex items-start gap-4">
                  {/* Icon */}
                  <div className="flex-shrink-0 mt-1">
                    {getIcon(notification.icon)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-black">{notification.title}</h3>
                      {!notification.read && (
                        <div className="w-2 h-2 bg-red-600 rounded-full" />
                      )}
                    </div>
                    <p className="text-gray-700 text-sm mb-2">{notification.message}</p>
                    <p className="text-xs text-gray-500">{notification.timestamp}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex-shrink-0 flex gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={e => {
                        e.stopPropagation()
                        handleDelete(notification.id)
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-gray-400 hover:text-red-600" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </main>
    </div>
  )
}
