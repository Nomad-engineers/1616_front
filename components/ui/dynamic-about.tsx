'use client'

import React from 'react'

import { Section } from '@/components/ui'
import { AboutStatsGrid } from '@/components/ui/about-stat'
import { ValueCardsGrid } from '@/components/ui/value-cards'
import { extractTextFromLexical } from '@/types/api'
import type { AboutBlock } from '@/types/api'

interface DynamicAboutProps {
  aboutData: AboutBlock | null
  loading?: boolean
}

// Helper function to format text with styled spans
function formatTextWithSpans(text: string): React.ReactNode {
  // Define keywords to highlight with blue color
  const highlightKeywords = [
    'growth marketing',
    'Fortune 500 companies',
    'Fortune 500',
    'presidential campaigns',
    'Fortune 500 companies including',
  ]

  // Create a regex to match all keywords
  const regex = new RegExp(`(${highlightKeywords.join('|')})`, 'gi')

  // Split text and wrap matches in spans
  const parts = text.split(regex)

  return parts.map((part, index) => {
    // Check if this part matches any of our keywords (case insensitive)
    const isHighlighted = highlightKeywords.some(keyword =>
      part.toLowerCase() === keyword.toLowerCase()
    )

    if (isHighlighted) {
      return (
        <span key={index} className="font-semibold text-blue-600">
          {part}
        </span>
      )
    }

    return part
  })
}

// Helper function to format title with styled spans for multi-line effect
function formatTitleWithSpans(title: string): React.ReactNode {
  // Look for patterns that can be split across lines
  // For "To inspire and guide to a new level", we want "to a new level" on new line
  const lineBreakPatterns = [
    { separator: 'to a new level', after: true },
    { separator: 'across markets', after: true },
    { separator: 'and guide', after: true },
  ]

  let formattedTitle: React.ReactNode = title

  lineBreakPatterns.forEach(pattern => {
    if (title.includes(pattern.separator)) {
      const parts = title.split(pattern.separator)
      if (parts.length === 2) {
        formattedTitle = (
          <>
            {parts[0]}
            {pattern.after && (
              <>
                {pattern.separator}
                <span className="block text-blue-600">
                  {parts[1]}
                </span>
              </>
            )}
            {!pattern.after && (
              <>
                <span className="block text-blue-600">
                  {pattern.separator}
                </span>
                {parts[1]}
              </>
            )}
          </>
        )
      }
    }
  })

  return formattedTitle
}

export function DynamicAbout({ aboutData, loading }: DynamicAboutProps) {
  if (loading) {
    return (
      <div className='py-20'>
        <div className='max-w-7xl mx-auto text-center space-y-4'>
          <div className='w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto' />
          <p className='text-gray-600'>Loading about content...</p>
        </div>
      </div>
    )
  }

  if (!aboutData) {
    return null
  }

  const aboutContent = extractTextFromLexical(aboutData.content)

  // Split content into description and achievements
  const paragraphs = aboutContent.split('\n').filter(p => p.trim())
  const description = paragraphs[0] || ''

  // Transform about-cards to value cards
  const valueCards = aboutData['about-cards']?.map((card, index) => ({
    id: card.id,
    title: card.title,
    description: card.description,
    icon: index === 0 ? 'target' : index === 1 ? 'eye' : index === 2 ? 'heart' : 'globe'
  })) || []

  // Transform about-visual to stats
  const stats = aboutData['about-visual']?.map(visual => ({
    id: visual.id,
    value: visual.title,
    label: visual.description,
  })) || []

  return (
    <Section id="about" background="white">
      <div className="max-w-7xl mx-auto">
        {/* Header with credibility badges */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-full text-sm font-semibold mb-4 shadow-sm">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
            Forbes 30 Under 30 Founded Agency
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-gray-900 mb-4 leading-tight">
            {formatTitleWithSpans(aboutData.title)}
          </h2>

          <p className="text-lg text-gray-600 max-w-4xl mx-auto leading-relaxed">
            {description}
          </p>
        </div>

        {/* Two-column layout: Content + Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start mb-12">
          {/* Left column: Enhanced content */}
          
          <div className="space-y-6">
            {/* Key achievements with bullet points */}
            <div className="prose prose-lg prose-gray max-w-none">
              <p className="text-base text-gray-700 leading-relaxed">
                {formatTextWithSpans(paragraphs.slice(1).join(' '))}
              </p>

              <div className="grid gap-3 mt-4">
                  {[
                    {
                      icon: "🏆",
                      title: "Fortune 500 Partnerships",
                      description: "Strategic campaigns for Coca-Cola, Samsung, Huawei, P&G, and Snickers"
                    },
                    {
                      icon: "📈",
                      title: "Platform Scaling",
                      description: "Built platforms to 4-5M+ followers with sustainable growth"
                    },
                    {
                      icon: "🎯",
                      title: "Government Excellence",
                      description: "Managed presidential campaigns and national initiatives"
                    }
                  ].map((achievement, index) => (
                    <div key={index} className="flex gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-300">
                      <span className="text-xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                        <p className="text-gray-600 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>

              {/* Enhanced Value Cards */}
              {valueCards.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-4">Our Core Values</h3>
                  <ValueCardsGrid cards={valueCards} />
                </div>
              )}
            </div>
            
          </div>

          {/* Right column: Enhanced stats */}
          <div className="lg:sticky lg:top-6">
            <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-6 rounded-xl">
              <h3 className="text-xl font-serif font-bold text-gray-900 mb-6 text-center">
                Our Impact in Numbers
              </h3>
              <AboutStatsGrid
                stats={stats}
                className="gap-4"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}


              <div className="prose prose-lg prose-gray max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  We specialize in <span className="font-semibold text-blue-600">growth marketing</span> for fast-moving brands,
                  government organizations, and <span className="font-semibold text-blue-600">Fortune 500 companies</span> across multiple sectors.
                </p>
              </div>