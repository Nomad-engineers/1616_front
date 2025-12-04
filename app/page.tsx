'use client'

import { Suspense } from 'react'
import { AgencyLayout } from '@/components/common/AgencyLayout'
import { Section, Card } from '@/components/ui'
import { DynamicHero } from '@/components/ui/dynamic-hero'
import { DynamicAbout } from '@/components/ui/dynamic-about'
import { DynamicSection } from '@/components/ui/dynamic-section'
import { PageLoader } from '@/components/ui/page-loader'
import { useCachedPageData } from '@/hooks/use-cached-page-data'
import { DevCacheIndicator } from '@/components/ui/cache-indicator'
import { NavigationProps, FooterProps } from '@/types/ui-components'
import { ContactForm } from '@/components/ContactForm'
import uiConfig from '@/lib/ui-config.json'
import type { HeroBlock, AboutBlock, SectionBlock } from '@/types/api'

export default function HomePage() {
  const navigation: NavigationProps = uiConfig.navigation as NavigationProps
  const footer: FooterProps = uiConfig.footer as FooterProps

  const {
    data: pageData,
    loading,
    error,
    isFromCache,
    isValidating,
    refetch,
    cacheStatus
  } = useCachedPageData('home', {
    staleWhileRevalidate: true
  })

  // Extract blocks from API data
  const heroBlock = pageData?.layout?.find(block => block.blockType === 'hero') as HeroBlock | null
  const aboutBlock = pageData?.layout?.find(block => block.blockType === 'about') as AboutBlock | null
  const sectionBlocks = pageData?.layout?.filter(block => block.blockType === 'section') as SectionBlock[] || []

  // If there's an error, we could show a fallback or error state
  if (error) {
    console.error('Failed to load page data:', error)
  }

  return (
    <>
      <DevCacheIndicator
        isFromCache={isFromCache}
        isValidating={isValidating}
        cacheStatus={cacheStatus}
      />

      <AgencyLayout navigation={navigation} footer={footer}>
      {/* Hero Section */}
      <Suspense fallback={<PageLoader />}>
        <DynamicHero heroData={heroBlock} loading={loading} />
      </Suspense>

      {/* Enhanced About Section */}
      <Suspense fallback={<PageLoader />}>
        <DynamicAbout aboutData={aboutBlock} loading={loading} />
      </Suspense>

      {/* Dynamic Sections (Services, Packages, Cases, Why Us, Blog) */}
      {sectionBlocks.map((section, index) => (
        <Suspense key={section.id} fallback={<PageLoader />}>
          <DynamicSection sectionData={section} loading={loading} />
        </Suspense>
      ))}

      {/* Contact Section - Keep static for now */}
      <Section
        id="contact"
        background="white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-3xl font-serif font-medium mb-4">
              Let's Create Something Great
            </h3>
            <p className="text-gray-600 mb-8">
              Ready to transform your marketing and drive measurable growth? Our team can begin immediately upon contract signing.
            </p>

            <div className="space-y-4">
              {[
                { icon: '📍', title: 'Location', desc: 'Dubai, UAE' },
                { icon: '⏰', title: 'Response Time', desc: 'Within 24 hours' },
                { icon: '🚀', title: 'Onboarding', desc: '48-72 hours after signing' }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <strong className="block text-gray-900">{item.title}</strong>
                    <span className="text-gray-600">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-2xl">
            <ContactForm />
          </div>
        </div>
      </Section>
    </AgencyLayout>
    </>
  )
}
