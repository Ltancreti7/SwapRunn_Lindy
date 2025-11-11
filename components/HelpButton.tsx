'use client';

import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function HelpButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, this would send to support
      console.log('Support message:', message);
      setMessage('');
      // Show success toast
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-red rounded-full flex items-center justify-center text-white shadow-elevated hover:shadow-glow transition-shadow"
        aria-label="Help and support"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </motion.button>

      {/* Support Modal */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/20 z-30"
            />

            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="fixed bottom-24 right-6 z-40 w-96 bg-white rounded-2xl shadow-elevated overflow-hidden"
            >
              {/* Header */}
              <div className="bg-gradient-red p-6 text-white">
                <h3 className="font-poppins font-bold text-lg mb-1">Need Help?</h3>
                <p className="text-sm opacity-90">We're here to help. Send us a message!</p>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Quick Links */}
                <div className="space-y-2 mb-6">
                  <a
                    href="mailto:support@swaprunn.com"
                    className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-semibold text-swaprunn-black"
                  >
                    📧 Email: support@swaprunn.com
                  </a>
                  <a
                    href="tel:+15551234567"
                    className="block p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors text-sm font-semibold text-swaprunn-black"
                  >
                    📞 Call: (555) 123-4567
                  </a>
                </div>

                {/* Message Form */}
                <div className="space-y-3">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                    className="w-full p-3 rounded-lg border border-gray-300 text-sm resize-none focus:outline-none focus:border-swaprunn-red focus:shadow-focus"
                    rows={3}
                  />
                  <button
                    onClick={handleSend}
                    disabled={!message.trim()}
                    className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </div>

                {/* FAQ Links */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <p className="text-xs font-semibold text-gray-600 mb-3">Quick Links</p>
                  <div className="space-y-2">
                    <a href="#" className="text-xs text-swaprunn-red hover:underline block">
                      → How to create a job
                    </a>
                    <a href="#" className="text-xs text-swaprunn-red hover:underline block">
                      → How to accept jobs
                    </a>
                    <a href="#" className="text-xs text-swaprunn-red hover:underline block">
                      → Payment & Earnings
                    </a>
                    <a href="#" className="text-xs text-swaprunn-red hover:underline block">
                      → View all FAQs
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
