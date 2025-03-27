import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Format currency with proper locale and symbol
export const formatCurrency = (amount: number, currency: string = 'INR') => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount)
}

// Format date to readable string
export const formatDate = (date: Date | string) => {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date))
}

// Calculate days remaining until date
export const getDaysRemaining = (date: Date | string) => {
  const now = new Date()
  const target = new Date(date)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

// Format frequency to readable string
export const formatFrequency = (frequency: string) => {
  const frequencies: Record<string, string> = {
    monthly: '/mo',
    yearly: '/yr',
    weekly: '/wk',
    daily: '/day'
  }
  return frequencies[frequency.toLowerCase()] || frequency
}

// Get status color class
export const getStatusColor = (status: string) => {
  const colors: Record<string, { bg: string; text: string }> = {
    active: { bg: 'bg-green-100', text: 'text-green-800' },
    cancelled: { bg: 'bg-gray-100', text: 'text-gray-800' },
    expired: { bg: 'bg-red-100', text: 'text-red-800' },
    pending: { bg: 'bg-yellow-100', text: 'text-yellow-800' }
  }
  return colors[status.toLowerCase()] || { bg: 'bg-gray-100', text: 'text-gray-800' }
}