'use client'

import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { ArrowLeft, Share2, MoreVertical, Bookmark, Heart } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface ArticleHeaderProps {
  title: string
  category: string
  onShare: () => void
  readingProgress?: number
  className?: string
}

export function ArticleHeader({
  title,
  category,
  onShare,
  readingProgress = 0,
  className
}: ArticleHeaderProps) {
  const [isSticky, setIsSticky] = useState(false)
  const [showTitle, setShowTitle] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [likeCount, setLikeCount] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      const shouldBeSticky = scrollY > 100
      const shouldShowTitle = scrollY > 300

      setIsSticky(shouldBeSticky)
      setShowTitle(shouldShowTitle)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // TODO: Implement bookmark functionality
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    // TODO: Implement like functionality
  }

  return (
    <>
      {/* Progress Indicator */}
      <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Header */}
      <header
        className={cn(
          'sticky top-1 z-40 transition-all duration-300',
          isSticky
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm'
            : 'bg-transparent',
          className
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Back Button */}
            <Link href="/#blog">
              <Button
                variant="outline"
                size="sm"
                text="Back"
                className={cn(
                  'gap-2 transition-all duration-200',
                  isSticky ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-gray-200'
                )}
              >
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>

            {/* Center Content - Category & Title (shown on scroll) */}
            <div className="flex-1 mx-4 text-center">
              {showTitle && (
                <div className="animate-fade-in">
                  <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
                    {category}
                  </span>
                  <h2 className="text-sm font-semibold text-gray-900 truncate max-w-md mx-auto">
                    {title}
                  </h2>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              {/* Like Button */}
              <Button
                variant="outline"
                size="sm"
                text=""
                onClick={handleLike}
                className={cn(
                  'gap-1 transition-all duration-200',
                  isSticky ? 'text-gray-900 hover:text-red-500' : 'text-white hover:text-red-400'
                )}
              >
                <Heart
                  className={cn(
                    'h-4 w-4 transition-colors',
                    isLiked && 'fill-current text-red-500'
                  )}
                />
                <span className="hidden sm:inline text-xs">{likeCount}</span>
              </Button>

              {/* Bookmark Button */}
              <Button
                variant="outline"
                size="sm"
                text=""
                onClick={handleBookmark}
                className={cn(
                  'transition-all duration-200',
                  isSticky ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-400'
                )}
              >
                <Bookmark
                  className={cn(
                    'h-4 w-4 transition-colors',
                    isBookmarked && 'fill-current text-blue-600'
                  )}
                />
              </Button>

              {/* Share Button */}
              <Button
                variant="outline"
                size="sm"
                text=""
                onClick={onShare}
                className={cn(
                  'transition-all duration-200',
                  isSticky ? 'text-gray-900 hover:text-blue-600' : 'text-white hover:text-blue-400'
                )}
              >
                <Share2 className="h-4 w-4" />
              </Button>

              {/* More Options (Mobile) */}
              <div className="sm:hidden">
                <Button
                  variant="outline"
                  size="sm"
                  text=""
                  className={cn(
                    'transition-all duration-200',
                    isSticky ? 'text-gray-900' : 'text-white'
                  )}
                >
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </header>

      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }
      `}</style>
    </>
  )
}