'use client'

import { CardProps } from '@/types/ui-components'
import { Button } from './Button'
import { cn } from '@/lib/utils'

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
  children
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
        type === 'value',
      'p-0 overflow-hidden':
        type === 'team',
    },
    className
  )

  const content = (
    <>
      {/* Badge */}
      {badge && (
        <div className="inline-block bg-yellow-500 text-gray-900 px-3 py-1 rounded-full text-xs font-medium uppercase tracking-wider mb-3">
          {badge.text}
        </div>
      )}

      {/* Icon */}
      {icon && type === 'service' && (
        <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-2xl mb-6">
          {icon}
        </div>
      )}

      {/* Image */}
      {image && type === 'team' && (
        <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-5xl text-gray-400">
          {image.placeholder || '👤'}
        </div>
      )}

      {image && type === 'blog' && (
        <div className="h-48 bg-gradient-to-br from-blue-600 to-gray-900 flex items-center justify-center text-4xl text-white">
          {image.placeholder || '📝'}
        </div>
      )}

      {/* Blog Icon */}
      {icon && type === 'blog' && (
        <div className="h-48 bg-gradient-to-br from-blue-600 to-gray-900 flex items-center justify-center text-4xl text-white">
          {icon}
        </div>
      )}

      {/* Card Content */}
      <div className={cn(
        'p-6',
        type === 'team' || type === 'blog' ? 'p-6' : 'p-8',
        type === 'package' && !featured ? 'p-8' : 'p-8'
      )}>
        {/* Title */}
        <h3 className={cn(
          'font-semibold mb-2',
          {
            'text-lg': type === 'service' || type === 'why',
            'text-2xl font-serif': type === 'case' || type === 'package',
            'text-xl': type === 'team',
            'text-xl font-serif': type === 'blog',
            'text-sm uppercase tracking-wider text-blue-600': type === 'package',
          }
        )}>
          {title}
        </h3>

        {/* Metadata for blog cards */}
        {metadata && type === 'blog' && (
          <div className="text-xs text-gray-500 mb-3">
            {metadata}
          </div>
        )}

        {/* Subtitle */}
        {subtitle && (
          <div className={cn(
            'mb-4',
            {
              'text-sm text-gray-600': type === 'package' && !featured,
              'text-sm text-white/80': type === 'package' && featured,
              'text-blue-600 text-sm font-medium mb-3': type === 'team',
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
              'text-gray-600': (type === 'service' || type === 'why' || type === 'team' || type === 'blog' || (type === 'package' && !featured)),
              'text-white/70': type === 'case',
              'text-white/90': type === 'package' && featured,
            }
          )}>
            {description}
          </p>
        )}

        {/* Price */}
        {price && type === 'package' && (
          <div className="mb-4 pb-6 border-b border-gray-200">
            <div className={cn(
              'text-3xl font-serif font-semibold mb-1',
              featured ? 'text-white' : 'text-gray-900'
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
                featured ? 'text-white/90' : 'text-gray-600'
              )}>
                <span className={cn(
                  'font-semibold',
                  featured ? 'text-yellow-500' : 'text-blue-600'
                )}>
                  ✓
                </span>
                {feature}
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
                    'text-gray-900': type === 'case' ? 'text-yellow-500' : 'text-gray-900',
                    'text-yellow-500': type === 'case',
                  }
                )}>
                  {stat.value}
                </div>
                <div className={cn(
                  'text-xs',
                  type === 'case' ? 'text-white/60' : 'text-gray-600'
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
        {type === 'blog' && (
          <div className="mt-4">
            <a href="#" className="text-blue-600 text-sm font-medium hover:text-blue-700 hover:underline">
              Read More →
            </a>
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