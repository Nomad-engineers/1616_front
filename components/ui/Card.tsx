'use client'

import React from 'react'
import Link from 'next/link'
import { Button } from './Button'
import { cn } from '@/lib/utils'
import type { CardProps } from '@/types/ui-components'
import {
  TrendingUp,
  Video,
  Users,
  Target,
  BarChart3,
  Sparkles,
  Building,
  Globe
} from 'lucide-react'

// Icon mapping for service cards
const getServiceIcon = (title: string) => {
  const iconMap: Record<string, React.ElementType> = {
    'Strategic Marketing': TrendingUp,
    'Content Production': Video,
    'Influencer Marketing': Users,
    'Performance Advertising': Target,
    'Market Research': BarChart3,
    'Brand Development': Sparkles,
    'Government Relations': Building,
    'Multi-Language Campaigns': Globe,
  }

  return iconMap[title] || Sparkles
}

export function Card({
  type,
  title,
  subtitle,
  description,
  icon,
  image,
  featured = false,
  badge,
  stats = [],
  features = [],
  price,
  button,
  actions = [],
  metadata,
  className,
  children,
  slug
}: CardProps) {
  // Base card classes
  const baseClasses = cn(
    'rounded-2xl border transition-all duration-300',
    {
      'bg-white border-gray-200 hover:border-gray-300 hover:shadow-lg':
        type === 'service' || type === 'why',
      'bg-gray-50 border-gray-200 hover:border-gray-300 hover:shadow-lg hover:-translate-y-1':
        type === 'team' || type === 'blog',
      'bg-gray-50 border-gray-200':
        type === 'package' && !featured,
      'bg-gray-900 text-white':
        type === 'package' && featured,
      'bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/15 hover:-translate-y-1':
        type === 'case',
      'bg-gray-50 border-gray-200 p-6':
        type === 'value' || type === 'about-stat',
      'p-0 overflow-hidden':
        type === 'team',
    },
    className
  )

  const content = (
    <>
  
      {/* Image */}
      {image && type === 'team' && (
        <div className="h-48 bg-gradient-to-br from-gray-light to-gray flex items-center justify-center text-5xl text-gray-text">
          {image.placeholder || '👤'}
        </div>
      )}

      {image && type === 'blog' && (
        <div className="h-48 bg-gradient-to-br from-blue-600 to-gray-900 flex items-center justify-center text-4xl text-white rounded-t-2xl">
          {image.placeholder || '📝'}
        </div>
      )}

      {/* Blog Icon */}
      {icon && type === 'blog' && (
        <div className="h-48 bg-gradient-to-br from-blue-600 to-gray-900 flex items-center justify-center text-4xl text-white rounded-t-2xl">
          {icon}
        </div>
      )}

      {/* Card Content */}
      <div className={cn(
        'p-6',
        type === 'team' || type === 'blog' ? 'p-6' : 'p-8',
        type === 'package' && !featured ? 'p-8' : 'p-8'
      )}>
      {/* Icon */}
      {type === 'service' && (
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white mb-6">
          {React.createElement(getServiceIcon(title), { className: "w-6 h-6" })}
        </div>
      )}
      
        {/* Badge */}
        {badge && (
          <div className="inline-block bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-3">
            {badge.text}
          </div>
        )}

        {/* Title */}
        <h3 className={cn(
          'font-semibold mb-2',
          {
            'text-lg': type === 'service' || type === 'why',
            'text-2xl font-serif': type === 'case' || type === 'package',
            'text-xl': type === 'team',
            'text-xl font-serif': type === 'blog',
            'text-sm uppercase tracking-wider text-blue-600': type === 'package',
            'text-3xl font-bold text-text-dark': type === 'about-stat',
          }
        )}>
          {title}
        </h3>

        {/* Metadata for blog cards */}
        {metadata && type === 'blog' && (
          <div className="text-xs text-gray-text mb-3">
            {metadata}
          </div>
        )}

        {/* Subtitle */}
        {subtitle && (
          <div className={cn(
            'mb-4',
            {
              'text-sm text-gray-text': type === 'package' && !featured,
              'text-sm text-white/80': type === 'package' && featured,
              'text-blue-600 text-sm font-medium mb-3': type === 'team',
              'text-lg text-gray-text font-medium': type === 'about-stat',
            }
          )}>
            {subtitle}
          </div>
        )}

        {/* Description */}
        {description && (
          <p className={cn(
            'mb-6',
            {
              'text-gray-text': (type === 'service' || type === 'why' || type === 'team' || type === 'blog' || (type === 'package' && !featured)),
              'text-white/70': type === 'case',
              'text-white/90': type === 'package' && featured,
            }
          )}>
            {description}
          </p>
        )}

        {/* Price */}
        {price && type === 'package' && (
          <div className="mb-4 pb-6 border-b border-gray">
            <div className={cn(
              'text-3xl font-serif font-semibold mb-1',
              featured ? 'text-white' : 'text-text-dark'
            )}>
              {price.amount} <span className="text-lg font-normal">{price.currency}/{price.period}</span>
            </div>
          </div>
        )}

        {/* Features */}
        {features.length > 0 && type === 'package' && (
          <ul className="space-y-2 mb-6">
            {features.map((feature, index) => (
              <li key={index} className={cn(
                'text-sm flex items-start gap-2',
                featured ? 'text-white/90' : 'text-gray-text'
              )}>
                <span className={cn(
                  'font-semibold',
                  featured ? 'text-yellow-500' : 'text-accent-blue'
                )}>
                  ✓
                </span>
                {typeof feature === 'string' ? feature : feature.text}
              </li>
            ))}
          </ul>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="flex gap-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-left">
                <div className={cn(
                  'text-xl font-semibold',
                  {
                    'text-text-dark': type === 'case' ? 'text-yellow-500' : 'text-text-dark',
                    'text-yellow-500': type === 'case',
                  }
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  'text-xs',
                  type === 'case' ? 'text-white/60' : 'text-gray-text'
                )}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Button */}
        {button && type === 'package' && (
          <Button
            {...button}
            variant={featured ? 'secondary' : 'primary'}
            className="w-full mt-6"
          />
        )}

        {/* Blog read more link */}
        {type === 'blog' && slug && (
          <div className="mt-4">
            <Link
              href={`/blog/${slug}`}
              className="text-accent-blue text-sm font-medium hover:text-accent-blue hover:underline"
            >
              Read More →
            </Link>
          </div>
        )}

        {/* Actions */}
        {actions.length > 0 && (
          <div className="mt-4 flex gap-2">
            {actions.map((action, index) => (
              <Button
                key={index}
                {...action}
                variant="outline"
                size="sm"
                onClick={action.onClick ? () => console.log(action.onClick) : undefined}
              />
            ))}
          </div>
        )}

        {/* Custom content */}
        {children}
      </div>
    </>
  )

  // Package cards with different styling
  if (type === 'package') {
    return (
      <div className={cn(
        baseClasses,
        featured && 'ring-2 ring-yellow-500 transform scale-105'
      )}>
        {content}
      </div>
    )
  }

  // Regular cards
  return (
    <div className={baseClasses}>
      {content}
    </div>
  )
}

export type { CardProps }