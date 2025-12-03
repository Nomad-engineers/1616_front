'use client'

import React, { useState } from 'react'
import './enhanced-pricing-animations.css'
import { CardProps } from '@/types/ui-components'
import { Button } from './Button'
import { cn } from '@/lib/utils'
import {
  Star,
  Check,
  Crown,
  Sparkles,
  TrendingUp
} from 'lucide-react'

interface EnhancedPricingCardProps extends CardProps {
  isPrimary?: boolean
  savings?: string
  bonus?: string[]
  reviews?: {
    rating: number
    count: number
  }
  badge?: {
    text: string
    variant: 'popular' | 'best-value' | 'limited-offer' | 'recommended'
  }
  highlightedFeatures?: number[]
}

export function EnhancedPricingCard({
  type,
  title,
  subtitle,
  description,
  price,
  features = [],
  button,
  featured = false,
  isPrimary = featured,
  savings,
  bonus,
  reviews,
  badge,
  highlightedFeatures = [],
  className,
  children
}: EnhancedPricingCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  // Corporate color palette based on your brand
  const cardClasses = cn(
    'relative rounded-xl border transition-all duration-300 overflow-hidden',
    {
      // Standard plan: clean white with subtle gray
      'bg-white border-gray-200 hover:border-[#0066cc]/30 hover:shadow-md hover:-translate-y-1':
        !isPrimary,

      // Primary plan: premium gradient with enhanced visual appeal
      'bg-gradient-to-br from-[#1a1a2e] via-[#2a2a3e] to-[#1a1a2e] text-white border-[#d4a853] shadow-2xl ring-2 ring-[#d4a853]/50 hover:shadow-[#d4a853]/20 hover:shadow-3xl hover:-translate-y-2 transform hover:scale-105':
        isPrimary,
    },
    className
  )

  const getBadgeClasses = (variant: string) => {
    switch (variant) {
      case 'popular':
        return 'bg-[#d4a853] text-[#1a1a2e]'
      case 'best-value':
        return 'bg-emerald-600 text-white'
      case 'limited-offer':
        return 'bg-purple-600 text-white'
      default:
        return 'bg-[#d4a853] text-[#1a1a2e]'
    }
  }

  return (
    <div className="enhanced-pricing-card-wrapper">
      <div
        className={cardClasses}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
      {/* Premium accent elements for primary plans */}
      {isPrimary && (
        <>
          {/* Animated top accent line */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#d4a853] via-[#f4e5c2] to-[#d4a853] animate-pulse" />

          {/* Corner decorations */}
          <div className="absolute top-2 right-2 w-8 h-8 border-t-2 border-r-2 border-[#d4a853]/50 rounded-tr-lg" />
          <div className="absolute top-2 left-2 w-8 h-8 border-t-2 border-l-2 border-[#d4a853]/50 rounded-tl-lg" />

          {/* Floating particles background effect */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 right-4 w-2 h-2 bg-[#d4a853] rounded-full animate-ping" />
            <div className="absolute bottom-8 left-6 w-1 h-1 bg-[#f4e5c2] rounded-full animate-ping animation-delay-1000" />
            <div className="absolute top-12 left-12 w-1.5 h-1.5 bg-[#d4a853] rounded-full animate-ping animation-delay-2000" />
          </div>
        </>
      )}

      <div className="p-8 package-card-content enhanced-pricing-card">
        {/* Header with enhanced badge */}
        <div className="flex justify-between items-start mb-6">
          {badge && (
            <div className={cn(
              "inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold shadow-lg",
              isPrimary
                ? "bg-gradient-to-r from-[#d4a853] to-[#f4e5c2] text-[#1a1a2e] ring-2 ring-[#d4a853]/30 animate-pulse"
                : getBadgeClasses(badge.variant)
            )}>
              <Crown className={cn("w-4 h-4", isPrimary && "animate-bounce")} />
              {badge.text}
              {isPrimary && (
                <Sparkles className="w-3 h-3 animate-pulse" />
              )}
            </div>
          )}
        </div>

        {/* Reviews - subtle and clean */}
        {reviews && (
          <div className="flex items-center gap-2 mb-6">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={cn(
                    "w-4 h-4",
                    i < Math.floor(reviews.rating)
                      ? (isPrimary ? "text-[#d4a853] fill-[#d4a853]" : "text-[#d4a853] fill-[#d4a853]")
                      : (isPrimary ? "text-white/30" : "text-gray-300")
                  )}
                />
              ))}
            </div>
            <span className={cn(
              "text-sm font-medium",
              isPrimary ? "text-white/90" : "text-gray-700"
            )}>
              {reviews.rating}
            </span>
            <span className={cn(
              "text-xs",
              isPrimary ? "text-white/60" : "text-gray-500"
            )}>
              ({reviews.count} reviews)
            </span>
          </div>
        )}

        {/* Savings indicator - subtle badge */}
        {savings && (
          <div className="inline-flex items-center gap-2 mb-4 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-lg text-sm font-semibold">
            <TrendingUp className="w-4 h-4" />
            Save {savings}
          </div>
        )}

        {/* Plan title */}
        <h3 className={cn(
          "font-semibold mb-2",
          isPrimary ? "text-2xl text-white" : "text-xl text-[#1a1a2e]"
        )}>
          {title}
        </h3>

        {/* Subtitle */}
        {subtitle && (
          <p className={cn(
            "text-sm mb-4",
            isPrimary ? "text-white/70" : "text-gray-600"
          )}>
            {subtitle}
          </p>
        )}

        {/* Description */}
        {description && (
          <p className={cn(
            "text-sm mb-6 leading-relaxed",
            isPrimary ? "text-white/60" : "text-gray-500"
          )}>
            {description}
          </p>
        )}

        {/* Enhanced price section */}
        {price && (
          <div className={cn(
            "mb-6 p-4 rounded-lg",
            isPrimary && "bg-gradient-to-r from-[#d4a853]/10 to-[#f4e5c2]/10 border border-[#d4a853]/30"
          )}>
            <div className="flex items-baseline gap-2">
              <span className={cn(
                "font-bold",
                isPrimary
                  ? "text-5xl text-transparent bg-clip-text bg-gradient-to-r from-[#f4e5c2] to-[#d4a853] drop-shadow-lg"
                  : "text-3xl text-[#1a1a2e]"
              )}>
                {price.amount}
              </span>
              <span className={cn(
                "text-sm font-medium",
                isPrimary ? "text-[#f4e5c2] font-semibold" : "text-gray-600"
              )}>
                {price.currency}/{price.period}
              </span>
            </div>

            {/* Enhanced original price */}
            {price.originalPrice && (
              <div className="flex items-center gap-2 mt-2">
                <span className={cn(
                  "text-sm line-through",
                  isPrimary ? "text-white/40" : "text-gray-400"
                )}>
                  {price.currency}{price.originalPrice}
                </span>
                <span className={cn(
                  "text-xs font-bold px-2 py-1 rounded-full",
                  isPrimary
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                    : "text-emerald-600 bg-emerald-50"
                )}>
                  {Math.round(((parseInt(price.originalPrice) - parseInt(price.amount)) / parseInt(price.originalPrice)) * 100)}% OFF
                </span>
              </div>
            )}
          </div>
        )}

        {/* Features list */}
        {features.length > 0 && (
          <div className="space-y-3 mb-6 flex-1 features-list">
            {features.map((feature, index) => (
              <div
                key={index}
                className={cn(
                  "feature-item",
                  highlightedFeatures.includes(index) && (
                    isPrimary
                      ? "bg-[#d4a853]/10 p-3 -mx-3 rounded-lg"
                      : "bg-[#d4a853]/10 p-3 -mx-3 rounded-lg"
                  )
                )}
              >
                {typeof feature === 'string' || feature.included !== false ? (
                  <div className={cn(
                    "w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5",
                    isPrimary
                      ? "bg-[#d4a853] text-[#1a1a2e]"
                      : "bg-[#0066cc] text-white"
                  )}>
                    <Check className="w-3 h-3" />
                  </div>
                ) : (
                  <div className="w-5 h-5 rounded-full bg-gray-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-gray-600 text-sm">×</span>
                  </div>
                )}

                <span className={cn(
                  "text-sm leading-relaxed feature-text",
                  isPrimary ? "text-white/90" : "text-gray-700",
                  highlightedFeatures.includes(index) && "font-semibold",
                  typeof feature !== 'string' && feature.included === false && "line-through opacity-60"
                )}>
                  {typeof feature === 'string' ? feature : feature.text}
                </span>

                {highlightedFeatures.includes(index) && (
                  <Sparkles className={cn(
                    "w-4 h-4 ml-auto flex-shrink-0",
                    isPrimary ? "text-[#d4a853]" : "text-[#d4a853]"
                  )} />
                )}
              </div>
            ))}
          </div>
        )}

        {/* Bonus section - subtle and elegant */}
        {bonus && bonus.length > 0 && (
          <div className="mb-6 p-4 rounded-lg bg-[#d4a853]/10 border border-[#d4a853]/20">
            <h4 className="text-sm font-semibold mb-2 text-[#1a1a2e]">Limited Time Bonus</h4>
            <ul className="space-y-1">
              {bonus.map((bonusItem, index) => (
                <li key={index} className="text-xs text-[#1a1a2e]/80 flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-[#d4a853] rounded-full" />
                  {bonusItem}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Enhanced CTA Button */}
        {button && (
          <div className="button-container">
            <Button
              {...button}
              className={cn(
                "w-full font-bold py-4 text-base transition-all duration-300 transform",
                isPrimary
                  ? "bg-gradient-to-r from-[#d4a853] via-[#f4e5c2] to-[#d4a853] hover:from-[#d4a853]/90 hover:via-[#f4e5c2]/90 hover:to-[#d4a853]/90 text-[#1a1a2e] shadow-lg hover:shadow-2xl hover:scale-105 ring-2 ring-[#d4a853]/50 hover:ring-[#d4a853]/70"
                  : "bg-[#0066cc] hover:bg-[#0066cc]/90 text-white hover:shadow-md"
              )}
            >
              <span className="flex items-center justify-center gap-2">
                {button.text}
                {isPrimary && (
                  <>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <TrendingUp className="w-4 h-4" />
                  </>
                )}
              </span>
            </Button>
          </div>
        )}

        {/* Custom content */}
        {children}
      </div>
    </div>
    </div>
  )
}