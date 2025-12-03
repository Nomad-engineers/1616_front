'use client'

import React, { useState, useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'
import {
  TrendingUp,
  Users,
  Star,
  MapPin,
  Award,
  Target,
  Globe,
  Lightbulb
} from 'lucide-react'

interface AboutStatProps {
  value: string
  label: string
  index: number
  icon?: string
  className?: string
}

export function AboutStat({ value, label, index, icon, className }: AboutStatProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [countValue, setCountValue] = useState(0)
  const statRef = useRef<HTMLDivElement>(null)

  // Enhanced color schemes with gradients
  const colorSchemes = [
    {
      background: 'bg-gradient-to-br from-[#1a1a2e] to-[#2d2d4a]', // Dark gradient
      textColor: 'text-white',
      icon: 'award',
      hoverEffect: 'hover:shadow-xl hover:shadow-[#1a1a2e]/20',
    },
    {
      background: 'bg-gradient-to-br from-[#0066cc] to-[#0052a3]', // Blue gradient
      textColor: 'text-white',
      icon: 'users',
      hoverEffect: 'hover:shadow-xl hover:shadow-[#0066cc]/20',
    },
    {
      background: 'bg-gradient-to-br from-[#d4a853] to-[#c19640]', // Gold gradient
      textColor: 'text-[#1a1a2e]',
      icon: 'star',
      hoverEffect: 'hover:shadow-xl hover:shadow-[#d4a853]/20',
    },
    {
      background: 'bg-gradient-to-br from-[#f3f4f6] to-[#e5e7eb]', // Light gradient
      textColor: 'text-[#1a1a2e]',
      icon: 'mapPin',
      hoverEffect: 'hover:shadow-xl hover:shadow-gray-300/50',
    },
  ]

  const scheme = colorSchemes[index % colorSchemes.length]

  // Icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    award: <Award className="w-6 h-6" />,
    users: <Users className="w-6 h-6" />,
    star: <Star className="w-6 h-6" />,
    mapPin: <MapPin className="w-6 h-6" />,
    target: <Target className="w-6 h-6" />,
    globe: <Globe className="w-6 h-6" />,
    lightbulb: <Lightbulb className="w-6 h-6" />,
    trending: <TrendingUp className="w-6 h-6" />,
  }

  // Intersection Observer for scroll-triggered animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.2 }
    )

    if (statRef.current) {
      observer.observe(statRef.current)
    }

    return () => {
      if (statRef.current) {
        observer.unobserve(statRef.current)
      }
    }
  }, [])

  // Animated counter for numeric values
  useEffect(() => {
    if (!isVisible) return

    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const hasPlus = value.includes('+')
    const hasSuffix = value.replace(/[0-9+]/g, '')

    if (!isNaN(numericValue)) {
      let current = 0
      const increment = numericValue / 50 // 50 steps for animation
      const timer = setInterval(() => {
        current += increment
        if (current >= numericValue) {
          current = numericValue
          clearInterval(timer)
        }
        setCountValue(Math.floor(current))
      }, 30)

      return () => clearInterval(timer)
    }
  }, [isVisible, value])

  const getDisplayValue = () => {
    const numericValue = parseInt(value.replace(/[^0-9]/g, ''))
    const hasPlus = value.includes('+')
    const hasSuffix = value.replace(/[0-9+]/g, '')

    if (!isNaN(numericValue) && isVisible && countValue > 0) {
      return `${countValue}${hasPlus ? '+' : ''}${hasSuffix}`
    }
    return value
  }

  return (
    <div
      ref={statRef}
      className={cn(
        'group relative p-8 rounded-2xl text-center transition-all duration-500 transform',
        'hover:-translate-y-2 hover:scale-105',
        scheme.background,
        scheme.textColor,
        scheme.hoverEffect,
        'opacity-0 translate-y-8',
        isVisible && 'opacity-100 translate-y-0',
        className
      )}
      role="article"
      aria-label={`${label}: ${value}`}
    >
      {/* Decorative background pattern */}
      <div className="absolute inset-0 rounded-2xl opacity-5">
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent to-white/20 rounded-2xl" />
      </div>

      {/* Icon */}
      <div className="relative z-10 mb-4 flex justify-center opacity-80 group-hover:opacity-100 transition-opacity">
        {iconMap[scheme.icon] || iconMap[icon || 'star']}
      </div>

      {/* Animated value */}
      <div className="relative z-10 text-4xl md:text-5xl font-serif font-bold mb-2 tabular-nums">
        {getDisplayValue()}
      </div>

      {/* Label */}
      <div className="relative z-10 text-sm md:text-base font-medium opacity-90 mb-2">
        {label}
      </div>

      {/* Hover indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-white/30 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  )
}

interface AboutStatsGridProps {
  stats: Array<{
    value: string
    label: string
    icon?: string
  }>
  className?: string
}

export function AboutStatsGrid({ stats, className }: AboutStatsGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-2 gap-4',
      className
    )}>
      {stats.map((stat, index) => (
        <AboutStat
          key={index}
          value={stat.value}
          label={stat.label}
          index={index}
          icon={stat.icon}
        />
      ))}
    </div>
  )
}