/**
 * Messages Page
 * Real-time messaging between salespeople and drivers
 * Shows conversation list and active chat
 */

'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Send, Search, Phone, MoreVertical } from 'lucide-react'

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState('1')
  const [messageText, setMessageText] = useState('')

  // Mock data - in production, this would come from the API
  const conversations = [
    {
      id: '1',
      name: 'John Smith',
      role: 'Driver',
      lastMessage: 'I\'ll be there in 10 minutes',
      timestamp: '2 min ago',
      unread: 2,
      avatar: 'JS',
      status: 'online',
    },
    {
      id: '2',
      name: 'Maria Garcia',
      role: 'Driver',
      lastMessage: 'Job completed successfully',
      timestamp: '1 hour ago',
      unread: 0,
      avatar: 'MG',
      status: 'offline',
    },
    {
      id: '3',
      name: 'Sarah Johnson',
      role: 'Salesperson',
      lastMessage: 'Can you create a new job for tomorrow?',
      timestamp: '3 hours ago',
      unread: 0,
      avatar: 'SJ',
      status: 'online',
    },
  ]

  const messages = [
    {
      id: '1',
      sender: 'John Smith',
      text: 'Hi, I accepted the job for the Toyota Camry',
      timestamp: '10:30 AM',
      isOwn: false,
    },
    {
      id: '2',
      sender: 'You',
      text: 'Great! Please pick it up from the main dealership',
      timestamp: '10:32 AM',
      isOwn: true,
    },
    {
      id: '3',
      sender: 'John Smith',
      text: 'On my way now',
      timestamp: '10:45 AM',
      isOwn: false,
    },
    {
      id: '4',
      sender: 'John Smith',
      text: 'I\'ll be there in 10 minutes',
      timestamp: '10:50 AM',
      isOwn: false,
    },
  ]

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In production, this would call an API to save the message
      setMessageText('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-black">Messages</h1>
          <p className="text-sm text-gray-600">Chat with drivers and team members</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid md:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <Card className="border border-gray-200 flex flex-col">
            <div className="p-4 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search conversations..."
                  className="pl-10"
                />
              </div>
            </div>

            <div className="flex-1 overflow-y-auto">
              {conversations.map(conv => (
                <button
                  key={conv.id}
                  onClick={() => setSelectedConversation(conv.id)}
                  className={`w-full p-4 border-b border-gray-100 text-left hover:bg-gray-50 transition ${
                    selectedConversation === conv.id ? 'bg-red-50 border-l-4 border-l-red-600' : ''
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold text-sm">
                        {conv.avatar}
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${
                          conv.status === 'online' ? 'bg-green-500' : 'bg-gray-400'
                        }`}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="font-medium text-sm">{conv.name}</p>
                        {conv.unread > 0 && (
                          <span className="bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                            {conv.unread}
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-gray-500">{conv.role}</p>
                      <p className="text-sm text-gray-600 truncate">{conv.lastMessage}</p>
                      <p className="text-xs text-gray-400">{conv.timestamp}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          {/* Chat Area */}
          <Card className="md:col-span-2 border border-gray-200 flex flex-col">
            {/* Chat Header */}
            <div className="p-4 border-b border-gray-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center text-white font-bold">
                  JS
                </div>
                <div>
                  <p className="font-bold">John Smith</p>
                  <p className="text-xs text-gray-500">Driver • Online</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Phone className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map(msg => (
                <div
                  key={msg.id}
                  className={`flex ${msg.isOwn ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      msg.isOwn
                        ? 'bg-red-600 text-white rounded-br-none'
                        : 'bg-gray-200 text-black rounded-bl-none'
                    }`}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={`text-xs mt-1 ${msg.isOwn ? 'text-red-100' : 'text-gray-500'}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Message Input */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Type a message..."
                  value={messageText}
                  onChange={e => setMessageText(e.target.value)}
                  onKeyPress={e => e.key === 'Enter' && handleSendMessage()}
                />
                <Button
                  onClick={handleSendMessage}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  )
}
