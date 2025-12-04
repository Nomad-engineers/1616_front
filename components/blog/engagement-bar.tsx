'use client'

import React, { useState, useEffect } from 'react'
import { Heart, Bookmark, MessageCircle, Share2, Eye, Clock } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface EngagementBarProps {
  articleId: string
  initialStats?: {
    views: number
    likes: number
    comments: number
    shares: number
  }
  readTime?: number
  onComment?: () => void
  className?: string
}

export function EngagementBar({
  articleId,
  initialStats = { views: 0, likes: 0, comments: 0, shares: 0 },
  readTime,
  onComment,
  className
}: EngagementBarProps) {
  const [stats, setStats] = useState(initialStats)
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [isSticky, setIsSticky] = useState(false)
  const [showReadingTime, setShowReadingTime] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      const shouldBeSticky = scrollTop > 200
      setIsSticky(shouldBeSticky)

      // Hide reading time after scrolling past hero
      setShowReadingTime(scrollTop < 500)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleLike = async () => {
    if (!isLiked) {
      setStats(prev => ({ ...prev, likes: prev.likes + 1 }))
      setIsLiked(true)
      // TODO: API call to like article
      try {
        // await likeArticle(articleId)
      } catch (error) {
        // Revert on error
        setStats(prev => ({ ...prev, likes: prev.likes - 1 }))
        setIsLiked(false)
      }
    } else {
      setStats(prev => ({ ...prev, likes: prev.likes - 1 }))
      setIsLiked(false)
      // TODO: API call to unlike article
    }
  }

  const handleBookmark = async () => {
    setIsBookmarked(!isBookmarked)
    // TODO: API call to bookmark/unbookmark article
    try {
      // await toggleBookmark(articleId)
    } catch (error) {
      setIsBookmarked(isBookmarked) // Revert on error
    }
  }

  const handleShare = () => {
    // TODO: Implement share functionality
    setStats(prev => ({ ...prev, shares: prev.shares + 1 }))
  }

  return (
    <>
      {/* Desktop Engagement Bar */}
      <div
        className={cn(
          'hidden md:block',
          'sticky top-20 z-30',
          'transition-all duration-300',
          isSticky
            ? 'bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm py-4'
            : 'py-6',
          className
        )}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between max-w-4xl mx-auto">
            {/* Left side - Reading Time Reminder */}
            {showReadingTime && readTime && (
              <div className="flex items-center gap-2 text-sm text-gray-600 animate-fade-in">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
            )}

            {/* Center - Engagement Stats */}
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4" />
                <span>{stats.views.toLocaleString()} views</span>
              </div>
              {stats.comments > 0 && (
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  <span>{stats.comments} comments</span>
                </div>
              )}
            </div>

            {/* Right side - Action Buttons */}
            <div className="flex items-center gap-2">
              <ActionButton
                icon={<Heart className={cn('h-5 w-5', isLiked && 'fill-current text-red-500')} />}
                count={stats.likes}
                onClick={handleLike}
                active={isLiked}
                variant="like"
              />
              <ActionButton
                icon={<Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current text-blue-600')} />}
                onClick={handleBookmark}
                active={isBookmarked}
                variant="bookmark"
              />
              <ActionButton
                icon={<Share2 className="h-5 w-5" />}
                count={stats.shares}
                onClick={handleShare}
                variant="share"
              />
              {onComment && (
                <ActionButton
                  icon={<MessageCircle className="h-5 w-5" />}
                  onClick={onComment}
                  variant="comment"
                />
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Engagement Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
        <div className="flex items-center justify-around py-2">
          <MobileActionButton
            icon={<Heart className={cn('h-5 w-5', isLiked && 'fill-current text-red-500')} />}
            count={stats.likes}
            onClick={handleLike}
            active={isLiked}
            label="Like"
          />
          <MobileActionButton
            icon={<Bookmark className={cn('h-5 w-5', isBookmarked && 'fill-current text-blue-600')} />}
            onClick={handleBookmark}
            active={isBookmarked}
            label="Bookmark"
          />
          <MobileActionButton
            icon={<Share2 className="h-5 w-5" />}
            onClick={handleShare}
            label="Share"
          />
          {onComment && (
            <MobileActionButton
              icon={<MessageCircle className="h-5 w-5" />}
              onClick={onComment}
              count={stats.comments}
              label="Comment"
            />
          )}
        </div>
      </div>

      {/* Add bottom padding for mobile to avoid content being hidden behind the bar */}
      <div className="md:hidden h-16" />
    </>
  )
}

function ActionButton({
  icon,
  count,
  onClick,
  active,
  variant
}: {
  icon: React.ReactNode
  count?: number
  onClick: () => void
  active?: boolean
  variant: 'like' | 'bookmark' | 'share' | 'comment'
}) {
  const variantStyles = {
    like: active ? 'text-red-500 hover:text-red-600' : 'text-gray-600 hover:text-red-500',
    bookmark: active ? 'text-blue-600 hover:text-blue-700' : 'text-gray-600 hover:text-blue-600',
    share: 'text-gray-600 hover:text-gray-900',
    comment: 'text-gray-600 hover:text-gray-900'
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2 rounded-lg',
        'transition-all duration-200',
        'hover:bg-gray-100',
        variantStyles[variant]
      )}
    >
      {icon}
      {count !== undefined && (
        <span className="text-sm font-medium">{count}</span>
      )}
    </button>
  )
}

function MobileActionButton({
  icon,
  count,
  onClick,
  active,
  label
}: {
  icon: React.ReactNode
  count?: number
  onClick: () => void
  active?: boolean
  label: string
}) {
  return (
    <button
      onClick={onClick}
      className="flex flex-col items-center gap-1 py-2 px-3 min-w-[60px]"
    >
      <div className={cn(
        'p-2 rounded-full transition-colors',
        active ? 'bg-blue-100 text-blue-600' : 'text-gray-600'
      )}>
        {icon}
      </div>
      {count !== undefined && (
        <span className="text-xs font-medium text-gray-900">{count}</span>
      )}
      <span className="text-xs text-gray-600">{label}</span>
    </button>
  )
}

// Reading Progress Indicator
export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const scrollPercent = (scrollTop / docHeight) * 100
      setProgress(Math.min(100, Math.max(0, scrollPercent)))
    }

    window.addEventListener('scroll', updateProgress, { passive: true })
    updateProgress() // Initial call

    return () => window.removeEventListener('scroll', updateProgress)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-1 bg-gray-200">
      <div
        className="h-full bg-gradient-to-r from-blue-600 to-blue-700 transition-all duration-300 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  )
}

// Engagement Analytics Component
export function EngagementAnalytics({ stats }: { stats: any }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 bg-gray-50 rounded-xl">
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
          <Eye className="h-5 w-5 text-gray-600" />
          {stats.views?.toLocaleString() || 0}
        </div>
        <div className="text-sm text-gray-600 mt-1">Views</div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
          <Heart className="h-5 w-5 text-red-500" />
          {stats.likes?.toLocaleString() || 0}
        </div>
        <div className="text-sm text-gray-600 mt-1">Likes</div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
          <MessageCircle className="h-5 w-5 text-blue-600" />
          {stats.comments?.toLocaleString() || 0}
        </div>
        <div className="text-sm text-gray-600 mt-1">Comments</div>
      </div>
      <div className="text-center">
        <div className="flex items-center justify-center gap-2 text-2xl font-bold text-gray-900">
          <Share2 className="h-5 w-5 text-green-600" />
          {stats.shares?.toLocaleString() || 0}
        </div>
        <div className="text-sm text-gray-600 mt-1">Shares</div>
      </div>
    </div>
  )
}