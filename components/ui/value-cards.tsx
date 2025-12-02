'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import {
  Target,
  Eye,
  Heart,
  Globe,
  Sparkles,
  ArrowRight
} from 'lucide-react'

interface ValueCardProps {
  title: string
  description: string
  icon: string
  index: number
  className?: string
}

export function ValueCard({ title, description, icon, index, className }: ValueCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  // Icon mapping
  const iconMap: Record<string, React.ReactNode> = {
    target: <Target className="w-6 h-6" />,
    eye: <Eye className="w-6 h-6" />,
    heart: <Heart className="w-6 h-6" />,
    globe: <Globe className="w-6 h-6" />,
    sparkles: <Sparkles className="w-6 h-6" />,
  }

  // Intersection Observer for scroll animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true)
          }, index * 100) // Staggered animation
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (cardRef.current) {
      observer.observe(cardRef.current)
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current)
      }
    }
  }, [index])

  return (
    <div
      ref={cardRef}
      className={cn(
        'group relative p-6 bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl',
        'transition-all duration-500 transform',
        'hover:shadow-lg hover:shadow-gray-200/50 hover:-translate-y-1',
        'hover:border-blue-200 hover:bg-white',
        'opacity-0 translate-y-8',
        isVisible && 'opacity-100 translate-y-0',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role="article"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Icon container */}
      <div className="relative z-10 w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300">
        {iconMap[icon] || iconMap.target}
      </div>

      {/* Title */}
      <h4 className="relative z-10 text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3">
        {title}
      </h4>

      {/* Description */}
      <p className="relative z-10 text-gray-700 leading-relaxed text-sm font-medium">
        {description}
      </p>

      {/* Hover indicator */}
      <div className={cn(
        'absolute bottom-4 right-4 w-8 h-8 bg-blue-50 rounded-full flex items-center justify-center text-blue-600 transition-all duration-300',
        'opacity-0 translate-x-2',
        isHovered && 'opacity-100 translate-x-0'
      )}>
        <ArrowRight className="w-4 h-4" />
      </div>
    </div>
  )
}

interface ValueCardsGridProps {
  cards: Array<{
    title: string
    description: string
    icon: string
  }>
  className?: string
}

export function ValueCardsGrid({ cards, className }: ValueCardsGridProps) {
  return (
    <div className={cn(
      'grid grid-cols-1 md:grid-cols-2 gap-6',
      className
    )}>
      {cards.map((card, index) => (
        <ValueCard
          key={card.title}
          title={card.title}
          description={card.description}
          icon={card.icon}
          index={index}
        />
      ))}
    </div>
  )
}