'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { Menu, X, ArrowLeft, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const isHomepage = pathname === '/';
  const isDashboard = pathname.startsWith('/dashboard');

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/auth/login', label: 'Login' },
    { href: '/auth/signup', label: 'Sign Up' },
  ];

  const dashboardLinks = [
    { href: '/dashboard/salesperson', label: 'Jobs' },
    { href: '/dashboard/find-drivers', label: 'Drivers' },
    { href: '/dashboard/messages', label: 'Messages' },
    { href: '/dashboard/profile', label: 'Profile' },
    { href: '/dashboard/earnings', label: 'Earnings' },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    router.push('/');
  };

  return (
    <>
      {/* Main Navbar */}
      <nav className="navbar">
        <div className="navbar-content">
          {/* Left: Back Button or Logo */}
          <div className="flex items-center gap-4">
            {!isHomepage && (
              <button
                onClick={() => router.back()}
                className="btn-ghost p-2 hover:bg-gray-100 rounded-lg"
                aria-label="Go back"
              >
                <ArrowLeft size={20} />
              </button>
            )}
            <Link href="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gradient-red rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SR</span>
              </div>
              <span className="font-poppins font-bold text-lg hidden sm:inline">SwapRunn</span>
            </Link>
          </div>

          {/* Center: Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {isDashboard ? (
              dashboardLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`nav-link ${pathname === link.href ? 'active' : ''}`}
                >
                  {link.label}
                </Link>
              ))
            ) : (
              navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="nav-link"
                >
                  {link.label}
                </Link>
              ))
            )}
          </div>

          {/* Right: Hamburger Menu */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden btn-ghost p-2"
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Sidebar */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/50 z-30 md:hidden"
            />

            {/* Sidebar */}
            <motion.div
              initial={{ x: -300 }}
              animate={{ x: 0 }}
              exit={{ x: -300 }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="sidebar open md:hidden"
            >
              <div className="p-6">
                {/* Close Button */}
                <button
                  onClick={() => setIsOpen(false)}
                  className="btn-ghost p-2 mb-6"
                >
                  <X size={24} />
                </button>

                {/* Navigation Links */}
                <div className="space-y-2">
                  {isDashboard ? (
                    dashboardLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                          pathname === link.href
                            ? 'bg-swaprunn-red text-white'
                            : 'text-swaprunn-black hover:bg-gray-100'
                        }`}
                      >
                        {link.label}
                      </Link>
                    ))
                  ) : (
                    navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className="block px-4 py-3 rounded-lg font-semibold text-swaprunn-black hover:bg-gray-100 transition-colors"
                      >
                        {link.label}
                      </Link>
                    ))
                  )}
                </div>

                {/* Logout Button */}
                {isDashboard && (
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="w-full mt-6 btn-primary flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
