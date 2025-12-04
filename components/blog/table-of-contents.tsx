'use client'

import React, { useState, useEffect, useRef } from 'react'
import { List, X, ChevronUp } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface TOCItem {
  id: string
  title: string
  level: number
}

interface TableOfContentsProps {
  headings: TOCItem[]
  activeId?: string
  className?: string
}

export function TableOfContents({ headings, activeId, className }: TableOfContentsProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      const offset = 80 // Header offset
      const elementPosition = element.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
    setIsOpen(false)
  }

  if (headings.length === 0) return null

  return (
    <>
      {/* Mobile TOC Button */}
      <div className="fixed bottom-6 right-6 z-40 md:hidden">
        <Button
          onClick={() => setIsOpen(true)}
          className="h-14 w-14 rounded-full shadow-lg bg-blue-600 hover:bg-blue-700 text-white"
          size="sm"
        >
          <List className="h-6 w-6" />
        </Button>
      </div>

      {/* Mobile TOC Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-black/50" onClick={() => setIsOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl shadow-xl max-h-[70vh] overflow-hidden animate-slide-up">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="font-semibold text-lg">Table of Contents</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsOpen(false)}
                className="p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto max-h-[calc(70vh-80px)]">
              <TOCList
                headings={headings}
                activeId={activeId}
                onSectionClick={scrollToSection}
              />
            </div>

            {/* Progress */}
            <div className="p-4 border-t bg-gray-50">
              <div className="text-sm text-gray-600 mb-2">Reading Progress</div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${scrollProgress}%` }}
                />
              </div>
              <div className="text-xs text-gray-500 mt-1">
                {Math.round(scrollProgress)}% complete
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Desktop TOC Sidebar */}
      <div
        ref={containerRef}
        className={cn(
          'hidden md:block',
          'fixed left-4 top-1/2 -translate-y-1/2',
          'z-30 transition-all duration-300',
          isCollapsed ? 'translate-x-[-200px]' : 'translate-x-0',
          className
        )}
      >
        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-64">
          {/* Collapse Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="absolute -right-10 top-4 bg-white shadow-md border border-gray-200 rounded-lg p-2"
          >
            <ChevronUp
              className={cn(
                'h-4 w-4 transition-transform',
                isCollapsed ? 'rotate-90' : '-rotate-90'
              )}
            />
          </Button>

          {/* Title */}
          <div className="flex items-center gap-2 mb-4">
            <List className="h-4 w-4 text-gray-600" />
            <h3 className="font-semibold text-sm">Contents</h3>
          </div>

          {/* TOC List */}
          <TOCList
            headings={headings}
            activeId={activeId}
            onSectionClick={scrollToSection}
            compact
          />

          {/* Progress */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="text-xs text-gray-600 mb-2">Progress</div>
            <div className="w-full bg-gray-200 rounded-full h-1">
              <div
                className="bg-blue-600 h-1 rounded-full transition-all duration-300"
                style={{ width: `${scrollProgress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

function TOCList({
  headings,
  activeId,
  onSectionClick,
  compact = false
}: {
  headings: TOCItem[]
  activeId?: string
  onSectionClick: (id: string) => void
  compact?: boolean
}) {
  return (
    <nav>
      <ul className="space-y-1">
        {headings.map((heading) => {
          const isActive = activeId === heading.id
          const paddingLeft = (heading.level - 1) * 16

          return (
            <li key={heading.id}>
              <button
                onClick={() => onSectionClick(heading.id)}
                className={cn(
                  'w-full text-left px-3 py-2 rounded-lg transition-all duration-200',
                  'hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-1',
                  isActive
                    ? 'bg-blue-50 text-blue-700 font-medium border-l-4 border-blue-600'
                    : 'text-gray-700 hover:text-gray-900',
                  compact ? 'text-sm' : 'text-base'
                )}
                style={{ paddingLeft: `${paddingLeft + 12}px` }}
              >
                <span className="line-clamp-2">{heading.title}</span>
              </button>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

// Helper function to extract headings from content
export function extractHeadings(content: any): TOCItem[] {
  const headings: TOCItem[] = []

  function traverse(node: any, depth = 0) {
    if (!node) return

    if (node.type === 'heading' && node.tag && node.tag >= 2 && node.tag <= 4) {
      const text = node.children
        ?.map((child: any) => {
          if (child.type === 'text') return child.text
          return ''
        })
        .join('') || ''

      if (text.trim()) {
        headings.push({
          id: `heading-${headings.length + 1}`,
          title: text.trim(),
          level: node.tag
        })
      }
    }

    if (node.children) {
      node.children.forEach((child: any) => traverse(child, depth + 1))
    }
  }

  if (content.root) {
    traverse(content.root)
  }

  return headings
}

// Hook to detect active heading
export function useActiveHeading(headings: TOCItem[]) {
  const [activeId, setActiveId] = useState<string>('')

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id)
          }
        })
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: 0
      }
    )

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id)
        if (element) {
          observer.unobserve(element)
        }
      })
    }
  }, [headings])

  return activeId
}

<style jsx>{`
  @keyframes slide-up {
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  }

  .animate-slide-up {
    animation: slide-up 0.3s ease-out;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`}</style>