'use client'

import { ReactNode } from 'react'
import { Navigation } from '@/components/ui'
import { Footer } from '@/components/ui/Footer'
import { NavigationProps, FooterProps } from '@/types/ui-components'

interface AgencyLayoutProps {
  children: ReactNode
  navigation?: NavigationProps
  footer?: FooterProps
  className?: string
}

export function AgencyLayout({
  children,
  navigation,
  footer,
  className
}: AgencyLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      {navigation && <Navigation {...navigation} />}

      {/* Main Content */}
      <main className={className}>
        {children}
      </main>

      {/* Footer */}
      {footer && <Footer {...footer} />}
    </div>
  )
}