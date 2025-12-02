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
  layout = 'grid',
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
    const config = gridConfigs[cards[0]?.type as keyof typeof gridConfigs] || {
      columns: { default: 1, sm: 1, md: 2, lg: columns },
      gap: '1.5rem'
    }

    return {
      display: 'grid',
      gap: config.gap,
      gridTemplateColumns: `repeat(${config.columns.default}, 1fr)`,
      '@media (min-width: 640px)': {
        gridTemplateColumns: `repeat(${(config.columns as any).sm || config.columns.default}, 1fr)`
      },
      '@media (min-width: 768px)': {
        gridTemplateColumns: `repeat(${(config.columns as any).md || (config.columns as any).sm || config.columns.default}, 1fr)`
      },
      '@media (min-width: 1024px)': {
        gridTemplateColumns: `repeat(${config.columns.lg || (config.columns as any).md || (config.columns as any).sm || config.columns.default}, 1fr)`
      },
      '@media (min-width: 1280px)': {
        gridTemplateColumns: `repeat(${(config.columns as any).xl || config.columns.lg || (config.columns as any).md || (config.columns as any).sm || config.columns.default}, 1fr)`
      }
    }
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
              background === 'accent' ? 'text-white' : 'text-gray-900'
            )}>
              {title}
            </h2>
          )}

          {subtitle && (
            <p className={cn(
              'text-lg',
              background === 'accent' ? 'text-white/70' : 'text-gray-600'
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
        <div className="max-w-7xl mx-auto" style={getGridClasses()}>
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