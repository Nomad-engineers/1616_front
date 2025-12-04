'use client'

import { Section, Card } from '@/components/ui'
import type { SectionBlock, ServiceCard, PackageCard, CaseCard, BlogCard } from '@/types/api'
import { extractTextFromLexical } from '@/types/api'

interface DynamicSectionProps {
  sectionData: SectionBlock | null
  loading?: boolean
}

function isServiceCard(card: any): card is ServiceCard {
  return card?.blockType === 'service-card'
}

function isPackageCard(card: any): card is PackageCard {
  return card?.blockType === 'package-card'
}

function isCaseCard(card: any): card is CaseCard {
  return card?.blockType === 'case-card'
}

function isBlogCard(card: any): card is BlogCard {
  return card?.blockType === 'blog-card'
}

export function DynamicSection({ sectionData, loading }: DynamicSectionProps) {
  if (loading) {
    return (
      <div className='py-20'>
        <div className='max-w-7xl mx-auto text-center space-y-4'>
          <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto' />
          <p className='text-gray-600'>Loading section content...</p>
        </div>
      </div>
    )
  }

  if (!sectionData) {
    return null
  }

  // Determine background based on section type or position
  const getBackground = () => {
    if (sectionData.tag === 'Why 16:16' || sectionData.tag === 'What We Do') {
      return 'light'
    }
    if (sectionData.tag === 'Our Work') {
      return 'accent'
    }
    return 'white'
  }

  // Transform section elements to cards
  const cards = sectionData.elements?.map((element, index) => {
    if (isServiceCard(element)) {
      return {
        id: element.id,
        type: 'service' as const,
        title: element.title,
        subtitle: element.description,
        icon: null,
      }
    }

    if (isPackageCard(element)) {
      return {
        id: element.id,
        type: 'package' as const,
        title: element.plan.title,
        subtitle: element.plan.description,
        price: {
          amount: element.plan.price.replace(/[^\d,]/g, ''),
          currency: 'AED',
          period: 'mo'
        },
        features: element.plan.features?.map(feature => feature.feature) || [],
        button: {
          variant: element.isPrimary ? 'primary' as const : 'outline' as const,
          size: 'md' as const,
          text: 'Get Started'
        },
        isPrimary: element.isPrimary || false
      }
    }

    if (isCaseCard(element)) {
      return {
        id: element.id,
        type: 'case' as const,
        badge: { text: element.tag },
        title: element.title,
        description: element.description,
        stats: element.stats?.map(stat => ({
          value: stat.title,
          label: stat.subtitle
        })) || []
      }
    }

    if (isBlogCard(element)) {
      return {
        id: element.id,
        type: 'blog' as const,
        title: element.blog.title,
        subtitle: extractTextFromLexical(element.blog.content).substring(0, 150) + '...',
        metadata: `${element.blog.category} • ${element.blog.readMin} min read`,
        image: element.blog.cover?.url,
        slug: element.blog.id // Используем ID поста вместо slug
      }
    }

    return null
  }).filter(Boolean) || []

  return (
    <Section
      id={sectionData.tag?.toLowerCase().replace(/\s+/g, '-')}
      tag={sectionData.tag}
      title={sectionData.title}
      subtitle={sectionData.subtitle}
      background={getBackground() as any}
      cards={cards as any}
    />
  )
}