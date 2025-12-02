'use client'

import { HeroProps } from '@/types/ui-components'
import { Button } from './Button'
import { cn } from '@/lib/utils'

export function Hero({ tag, title, description, cta, stats = [], background, className }: HeroProps) {
  const backgroundStyles = background ? {
    backgroundColor: background.color,
    backgroundImage: background.image ? `url(${background.image})` : background.gradient,
    backgroundSize: 'cover',
    backgroundPosition: 'center'
  } : {}

  return (
    <section
      className={cn(
        'min-h-screen flex items-center px-12 py-32 relative overflow-hidden',
        className
      )}
      style={backgroundStyles}
    >
      <div className="max-w-4xl relative z-10">
        {/* Hero Tag */}
        {tag && (
          <div className="inline-block bg-blue-600 text-white px-4 py-2 rounded-full text-xs font-medium uppercase tracking-wider mb-6">
            {tag}
          </div>
        )}

        {/* Hero Title */}
        <h1
          className="text-4xl md:text-5xl lg:text-6xl font-serif font-medium leading-tight mb-6"
          dangerouslySetInnerHTML={{ __html: title }}
        />

        {/* Hero Description */}
        {description && (
          <p className="text-lg text-gray-600 mb-8 max-w-lg">
            {description}
          </p>
        )}

        {/* CTA Button */}
        {cta && (
          <div className="mb-12">
            <Button
              variant={cta.variant}
              size={cta.size}
              text={cta.text}
              href={cta.href}
              icon={cta.icon}
              iconPosition={cta.iconPosition}
              onClick={cta.onClick ? () => console.log(cta.onClick) : undefined}
            />
          </div>
        )}

        {/* Stats */}
        {stats.length > 0 && (
          <div className="flex flex-wrap gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-left">
                <div className="text-3xl font-serif font-semibold text-gray-900 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Visual Element */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-1/2 h-4/5 bg-gradient-to-br from-gray-100 to-transparent rounded-full opacity-50 pointer-events-none" />
    </section>
  )
}