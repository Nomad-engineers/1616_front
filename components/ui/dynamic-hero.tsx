'use client'

import { Hero } from '@/components/ui'
import type { HeroBlock } from '@/types/api'

interface DynamicHeroProps {
  heroData: HeroBlock | null
  loading?: boolean
}

export function DynamicHero({ heroData, loading }: DynamicHeroProps) {
  if (loading) {
    return (
      <div className='min-h-[80vh] flex items-center justify-center'>
        <div className='text-center space-y-4'>
          <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto' />
          <p className='text-gray-600'>Loading hero content...</p>
        </div>
      </div>
    )
  }

  if (!heroData) {
    return null
  }

  // Transform API data to match Hero component props
  const heroProps = {
    tag: heroData.badge,
    title: heroData.title,
    description: heroData.content,
    cta: heroData.buttonText ? {
      text: heroData.buttonText,
      href: heroData.buttonUrl || '#contact',
      variant: 'primary' as const,
      size: 'md' as const,
    } : undefined,
    stats: heroData['hero-stats']?.map(stat => ({
      value: stat.title,
      label: stat.description,
    })) || [],
  }

  return <Hero {...heroProps} />
}