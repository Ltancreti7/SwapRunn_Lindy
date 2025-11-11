'use client';

import Link from 'next/link';
import { Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    { label: 'About', href: '#' },
    { label: 'Contact', href: '#' },
    { label: 'Terms', href: '#' },
    { label: 'Privacy', href: '#' },
    { label: 'Careers', href: '#' },
  ];

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold">SR</span>
              </div>
              <span className="font-poppins font-bold text-lg">SwapRunn</span>
            </div>
            <p className="text-gray-600 text-sm">
              Built for Dealerships. Powered by Drivers.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="font-poppins font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {footerLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-gray-600 hover:text-swaprunn-red transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* For Dealerships */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="font-poppins font-bold mb-4">For Dealerships</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/auth/dealership-register" className="text-gray-600 hover:text-swaprunn-red transition-colors text-sm">
                  Register Dealership
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-swaprunn-red transition-colors text-sm">
                  Pricing
                </Link>
              </li>
              <li>
                <Link href="#" className="text-gray-600 hover:text-swaprunn-red transition-colors text-sm">
                  Features
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="font-poppins font-bold mb-4">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Mail size={16} className="text-swaprunn-red" />
                <a href="mailto:support@swaprunn.com" className="hover:text-swaprunn-red transition-colors">
                  support@swaprunn.com
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-600 text-sm">
                <Phone size={16} className="text-swaprunn-red" />
                <a href="tel:+15551234567" className="hover:text-swaprunn-red transition-colors">
                  (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-2 text-gray-600 text-sm">
                <MapPin size={16} className="text-swaprunn-red mt-0.5 flex-shrink-0" />
                <span>San Francisco, CA</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="divider my-8" />

        {/* Bottom */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-between"
        >
          <p className="text-gray-600 text-sm">
            © SwapRunn {currentYear} | Built for Dealerships. Powered by Drivers.
          </p>
          <div className="flex items-center gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-600 hover:text-swaprunn-red transition-colors">
              <span className="sr-only">Twitter</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8.29 20c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-7.655 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-swaprunn-red transition-colors">
              <span className="sr-only">LinkedIn</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a href="#" className="text-gray-600 hover:text-swaprunn-red transition-colors">
              <span className="sr-only">Facebook</span>
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
