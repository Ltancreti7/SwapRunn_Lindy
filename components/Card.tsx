'use client';

import { ReactNode } from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface CardProps {
  children: ReactNode;
  className?: string;
  hover?: boolean;
  glass?: boolean;
  elevated?: boolean;
  onClick?: () => void;
}

export function Card({
  children,
  className,
  hover = false,
  glass = false,
  elevated = false,
  onClick,
}: CardProps) {
  const baseClass = glass ? 'card-glass' : elevated ? 'card-elevated' : 'card';
  const hoverClass = hover ? 'card-hover' : '';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      whileHover={hover ? { scale: 1.02 } : {}}
      className={cn(baseClass, hoverClass, className)}
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}

interface StatCardProps {
  icon: ReactNode;
  label: string;
  value: string | number;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  className?: string;
}

export function StatCard({
  icon,
  label,
  value,
  change,
  trend = 'neutral',
  className,
}: StatCardProps) {
  const trendColor = {
    up: 'text-green-600',
    down: 'text-red-600',
    neutral: 'text-gray-600',
  };

  return (
    <Card className={cn('flex items-start justify-between', className)}>
      <div>
        <p className="text-gray-600 text-sm font-medium mb-2">{label}</p>
        <p className="text-3xl font-bold text-swaprunn-black mb-2">{value}</p>
        {change && (
          <p className={cn('text-xs font-semibold', trendColor[trend])}>
            {trend === 'up' && '↑'} {trend === 'down' && '↓'} {change}
          </p>
        )}
      </div>
      <div className="text-swaprunn-red opacity-20">{icon}</div>
    </Card>
  );
}

interface JobCardProps {
  id: string;
  vehicleType: string;
  pickupLocation: string;
  dropoffLocation: string;
  status: 'open' | 'accepted' | 'in-progress' | 'completed';
  payment: number;
  onClick?: () => void;
}

export function JobCard({
  id,
  vehicleType,
  pickupLocation,
  dropoffLocation,
  status,
  payment,
  onClick,
}: JobCardProps) {
  const statusColors = {
    open: 'badge-primary',
    accepted: 'badge-warning',
    'in-progress': 'badge-info',
    completed: 'badge-success',
  };

  const statusLabels = {
    open: 'Open',
    accepted: 'Accepted',
    'in-progress': 'In Progress',
    completed: 'Completed',
  };

  return (
    <Card hover onClick={onClick} className="cursor-pointer">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="font-poppins font-bold text-lg">{vehicleType}</h3>
          <p className="text-gray-600 text-sm">Job ID: {id}</p>
        </div>
        <span className={cn('badge', statusColors[status])}>
          {statusLabels[status]}
        </span>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold">From:</span> {pickupLocation}
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-600">
          <span className="font-semibold">To:</span> {dropoffLocation}
        </div>
      </div>

      <div className="flex items-center justify-between pt-4 border-t border-gray-200">
        <span className="text-swaprunn-red font-bold text-lg">${payment}</span>
        <button className="btn-primary btn-sm">View Details →</button>
      </div>
    </Card>
  );
}

interface DriverCardProps {
  id: string;
  name: string;
  avatar: string;
  rating: number;
  jobsCompleted: number;
  location: string;
  serviceRadius: number;
  status: 'available' | 'busy' | 'offline';
  onClick?: () => void;
}

export function DriverCard({
  id,
  name,
  avatar,
  rating,
  jobsCompleted,
  location,
  serviceRadius,
  status,
  onClick,
}: DriverCardProps) {
  const statusColors = {
    available: 'bg-green-500',
    busy: 'bg-yellow-500',
    offline: 'bg-gray-400',
  };

  const statusLabels = {
    available: 'Available',
    busy: 'Busy',
    offline: 'Offline',
  };

  return (
    <Card hover onClick={onClick} className="cursor-pointer">
      <div className="flex items-start gap-4 mb-4">
        <div className="relative">
          <div className="w-16 h-16 bg-gradient-red rounded-full flex items-center justify-center text-white font-bold text-xl">
            {avatar}
          </div>
          <div className={cn('absolute bottom-0 right-0 w-4 h-4 rounded-full border-2 border-white', statusColors[status])} />
        </div>
        <div className="flex-1">
          <h3 className="font-poppins font-bold text-lg">{name}</h3>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-yellow-500">★</span>
            <span className="font-semibold">{rating}</span>
            <span className="text-gray-600 text-sm">({jobsCompleted} jobs)</span>
          </div>
          <p className="text-xs text-gray-600">{statusLabels[status]}</p>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p>📍 {location}</p>
        <p>🚗 {serviceRadius} mi radius</p>
      </div>

      <button className="w-full btn-primary btn-sm">View Profile →</button>
    </Card>
  );
}
