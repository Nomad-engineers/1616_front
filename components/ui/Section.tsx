'use client'

import { SectionProps } from '@/types/ui-components'
import { Card } from './Card'
import { cn } from '@/lib/utils'
import { gridConfigs } from '@/lib/design-system'

export function Section({
  id,
  tag,
  title,
  subtitle,
  background = 'light',
  columns = 3,
  cards = [],
  className,
  children
}: SectionProps) {
  // Background classes
  const backgroundClasses = {
    light: 'bg-gray-50',
    white: 'bg-white',
    dark: 'bg-gray-900',
    accent: 'bg-gray-900'
  }

  // Get grid configuration based on section type
  const getGridClasses = () => {
    const cardType = cards[0]?.type as keyof typeof gridConfigs
    const config = gridConfigs[cardType] || {
      columns: { default: 1, sm: 2, md: 2, lg: 4 },
      gap: 'gap-6'
    }

    // Special case for services type - force 4 columns on sm and md
    if (cardType === 'service') {
      return 'grid gap-6 grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-4'
    }

    // Convert gap to Tailwind class
    const gapClass = config.gap === '1.5rem' ? 'gap-6' :
                    config.gap === '1rem' ? 'gap-4' :
                    config.gap === '2rem' ? 'gap-8' : 'gap-6'

    // Build responsive grid classes with type-safe property access
    const defaultCols = config.columns.default || 1
    const smCols = 'sm' in config.columns ? config.columns.sm : defaultCols
    const mdCols = 'md' in config.columns ? config.columns.md : smCols
    const lgCols = 'lg' in config.columns ? config.columns.lg : mdCols

    return `grid ${gapClass} grid-cols-${defaultCols} sm:grid-cols-${smCols} md:grid-cols-${mdCols} lg:grid-cols-${lgCols}`
  }

  return (
    <section
      id={id}
      className={cn(
        'py-24 px-6 md:px-12',
        backgroundClasses[background],
        className
      )}
    >
      {/* Section Header */}
      {(tag || title || subtitle) && (
        <div className="text-center max-w-3xl mx-auto mb-16">
          {tag && (
            <p className={cn(
              'text-sm font-medium uppercase tracking-wider mb-4',
              background === 'accent' ? 'text-yellow-500' : 'text-blue-600'
            )}>
              {tag}
            </p>
          )}

          {title && (
            <h2 className={cn(
              'text-3xl md:text-4xl lg:text-5xl font-serif font-medium mb-4',
              background === 'accent' ? 'text-white' : 'text-text-dark'
            )}>
              {title}
            </h2>
          )}

          {subtitle && (
            <p className={cn(
              'text-lg',
              background === 'accent' ? 'text-white/70' : 'text-gray-text'
            )}>
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Custom Content */}
      {children}

      {/* Cards Grid */}
      {cards.length > 0 && (
        <div className={`max-w-7xl mx-auto ${getGridClasses()}`}>
          {cards.map((card, index) => (
            <Card
              key={`${card.type}-${index}`}
              {...card}
              button={card.button ? {
                ...card.button,
                onClick: card.button.onClick ? () => console.log(card.button!.onClick) : undefined
              } : undefined}
              actions={card.actions?.map(action => ({
                ...action,
                onClick: action.onClick ? () => console.log(action.onClick) : undefined
              }))}
            />
          ))}
        </div>
      )}
    </section>
  )
}