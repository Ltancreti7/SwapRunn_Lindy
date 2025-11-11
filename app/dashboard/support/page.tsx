/**
 * Support/Help Page
 * Provides FAQs, contact information, and support ticket submission
 */

'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HelpCircle, Mail, Phone, MessageSquare, ChevronDown } from 'lucide-react'

export default function SupportPage() {
  const [expandedFaq, setExpandedFaq] = useState<string | null>(null)
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: 'general',
    message: '',
  })

  const faqs = [
    {
      id: '1',
      question: 'How do I create a job?',
      answer: 'To create a job, navigate to your dashboard and click "Create Job". Fill in the vehicle information, pickup/dropoff locations, and payment amount. Once submitted, drivers will be able to see and accept your job.',
    },
    {
      id: '2',
      question: 'How are drivers verified?',
      answer: 'All drivers on SwapRunn are verified through our comprehensive screening process. We verify driver licenses, conduct background checks, and require proof of insurance. Only verified drivers can accept jobs.',
    },
    {
      id: '3',
      question: 'What payment methods are accepted?',
      answer: 'We accept all major credit cards, bank transfers, and digital wallets. Payments are processed securely through our payment gateway. Drivers receive payments directly to their bank accounts.',
    },
    {
      id: '4',
      question: 'How do I track a job in progress?',
      answer: 'You can track jobs in real-time from your dashboard. Once a driver accepts a job, you\'ll see their location and estimated arrival time. You can also communicate directly with the driver through our messaging system.',
    },
    {
      id: '5',
      question: 'What if there\'s an issue with a delivery?',
      answer: 'If there\'s an issue, contact our support team immediately. We have a dispute resolution process to ensure fair outcomes for both parties. Document any issues with photos or messages for our records.',
    },
    {
      id: '6',
      question: 'How do I cancel a job?',
      answer: 'You can cancel a job before a driver accepts it. Once accepted, cancellation requires driver approval. Cancellation fees may apply depending on the timing and circumstances.',
    },
  ]

  const handleSubmitTicket = () => {
    // In production, this would call an API
    console.log('Submitting support ticket:', ticketForm)
    alert('Support ticket submitted successfully!')
    setTicketForm({ subject: '', category: 'general', message: '' })
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-2xl font-bold text-black">Help & Support</h1>
          <p className="text-sm text-gray-600">Get answers and submit support requests</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Card className="p-6 border border-gray-200 text-center">
            <Mail className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Email Support</h3>
            <p className="text-sm text-gray-600 mb-4">support@swaprunn.com</p>
            <p className="text-xs text-gray-500">Response time: 24 hours</p>
          </Card>

          <Card className="p-6 border border-gray-200 text-center">
            <Phone className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Phone Support</h3>
            <p className="text-sm text-gray-600 mb-4">(555) 123-4567</p>
            <p className="text-xs text-gray-500">Mon-Fri: 9AM-6PM EST</p>
          </Card>

          <Card className="p-6 border border-gray-200 text-center">
            <MessageSquare className="w-8 h-8 text-red-600 mx-auto mb-3" />
            <h3 className="font-bold mb-2">Live Chat</h3>
            <p className="text-sm text-gray-600 mb-4">Available now</p>
            <Button className="w-full bg-red-600 hover:bg-red-700 text-white">
              Start Chat
            </Button>
          </Card>
        </div>

        {/* Tabs */}
        <Card className="border border-gray-200">
          <Tabs defaultValue="faq" className="w-full">
            <TabsList className="w-full justify-start border-b border-gray-200 rounded-none bg-white p-0">
              <TabsTrigger value="faq" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                <HelpCircle className="w-4 h-4 mr-2" />
                FAQs
              </TabsTrigger>
              <TabsTrigger value="ticket" className="rounded-none border-b-2 border-transparent data-[state=active]:border-red-600">
                <MessageSquare className="w-4 h-4 mr-2" />
                Submit Ticket
              </TabsTrigger>
            </TabsList>

            {/* FAQ Tab */}
            <TabsContent value="faq" className="p-6">
              <div className="space-y-3">
                {faqs.map(faq => (
                  <Card
                    key={faq.id}
                    className="border border-gray-200 overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedFaq(expandedFaq === faq.id ? null : faq.id)
                      }
                      className="w-full p-4 flex items-center justify-between hover:bg-gray-50 transition"
                    >
                      <h3 className="font-bold text-left">{faq.question}</h3>
                      <ChevronDown
                        className={`w-5 h-5 text-gray-400 transition ${
                          expandedFaq === faq.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedFaq === faq.id && (
                      <div className="px-4 pb-4 border-t border-gray-200 bg-gray-50">
                        <p className="text-gray-700">{faq.answer}</p>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Support Ticket Tab */}
            <TabsContent value="ticket" className="p-6">
              <div className="max-w-2xl">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Subject
                    </label>
                    <Input
                      type="text"
                      placeholder="Brief description of your issue"
                      value={ticketForm.subject}
                      onChange={e =>
                        setTicketForm({ ...ticketForm, subject: e.target.value })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Category
                    </label>
                    <select
                      value={ticketForm.category}
                      onChange={e =>
                        setTicketForm({ ...ticketForm, category: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    >
                      <option value="general">General Inquiry</option>
                      <option value="technical">Technical Issue</option>
                      <option value="payment">Payment Issue</option>
                      <option value="job">Job Related</option>
                      <option value="driver">Driver Related</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Message
                    </label>
                    <Textarea
                      placeholder="Please describe your issue in detail..."
                      value={ticketForm.message}
                      onChange={e =>
                        setTicketForm({ ...ticketForm, message: e.target.value })
                      }
                      className="min-h-32"
                    />
                  </div>

                  <Button
                    onClick={handleSubmitTicket}
                    className="w-full bg-red-600 hover:bg-red-700 text-white py-6 text-lg font-bold"
                  >
                    Submit Support Ticket
                  </Button>
                </div>

                <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <p className="text-sm text-blue-900">
                    <strong>Note:</strong> Our support team typically responds within 24 hours. For urgent issues, please call our phone support line.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </main>
    </div>
  )
}
