'use client'

import React, { useState } from 'react'
import { Share2, Facebook, Twitter, Linkedin, Link2, Check, MessageCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface SocialShareProps {
  url: string
  title: string
  excerpt?: string
  author?: string
  className?: string
  variant?: 'bar' | 'dropdown' | 'inline'
}

export function SocialShare({
  url,
  title,
  excerpt,
  author,
  className,
  variant = 'bar'
}: SocialShareProps) {
  const [copied, setCopied] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const encodedUrl = encodeURIComponent(url)
  const encodedTitle = encodeURIComponent(title)
  const encodedExcerpt = encodeURIComponent(excerpt || '')

  const shareLinks = [
    {
      name: 'Twitter',
      icon: <Twitter className="h-5 w-5" />,
      url: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}&via=${author || ''}`,
      color: 'bg-sky-500 hover:bg-sky-600',
      label: 'Share on Twitter'
    },
    {
      name: 'Facebook',
      icon: <Facebook className="h-5 w-5" />,
      url: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      color: 'bg-blue-600 hover:bg-blue-700',
      label: 'Share on Facebook'
    },
    {
      name: 'LinkedIn',
      icon: <Linkedin className="h-5 w-5" />,
      url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      color: 'bg-blue-700 hover:bg-blue-800',
      label: 'Share on LinkedIn'
    },
    {
      name: 'Email',
      icon: <Mail className="h-5 w-5" />,
      url: `mailto:?subject=${encodedTitle}&body=${encodedExcerpt}%0A%0A${encodedUrl}`,
      color: 'bg-gray-600 hover:bg-gray-700',
      label: 'Share via email'
    },
    {
      name: 'Copy Link',
      icon: copied ? <Check className="h-5 w-5" /> : <Link2 className="h-5 w-5" />,
      action: 'copy',
      color: copied ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-500 hover:bg-gray-600',
      label: copied ? 'Copied!' : 'Copy link'
    }
  ]

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(url)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy link:', err)
    }
  }

  const handleNativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: excerpt,
          url
        })
      } catch (err) {
        // User cancelled sharing
      }
    } else {
      setIsOpen(!isOpen)
    }
  }

  const handleShareClick = (link: typeof shareLinks[0]) => {
    if (link.action === 'copy') {
      handleCopy()
    } else {
      window.open(link.url, '_blank', 'noopener,noreferrer,width=600,height=400')
    }
  }

  if (variant === 'dropdown') {
    return (
      <div className={cn('relative', className)}>
        <Button
          variant="outline"
          onClick={handleNativeShare}
          className="gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>

        {isOpen && (
          <div className="absolute top-full mt-2 right-0 bg-white rounded-lg shadow-lg border border-gray-200 p-2 z-50 min-w-[200px]">
            {shareLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleShareClick(link)}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-colors text-left"
              >
                <div className={cn('p-2 rounded-lg text-white', link.color)}>
                  {link.icon}
                </div>
                <span className="text-sm font-medium text-gray-900">{link.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>
    )
  }

  if (variant === 'inline') {
    return (
      <div className={cn('flex items-center gap-4', className)}>
        <span className="text-sm font-medium text-gray-700">Share this article:</span>
        <div className="flex items-center gap-2">
          {shareLinks.slice(0, 4).map((link) => (
            <button
              key={link.name}
              onClick={() => handleShareClick(link)}
              className={cn(
                'p-2 rounded-lg text-white transition-all duration-200',
                'hover:scale-110 hover:shadow-lg',
                link.color
              )}
              aria-label={link.label}
            >
              {link.icon}
            </button>
          ))}
        </div>
      </div>
    )
  }

  // Bar variant (default)
  return (
    <div className={cn('bg-gray-50 rounded-xl p-6', className)}>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-100 rounded-lg">
            <Share2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Share this article</h3>
            <p className="text-sm text-gray-600">Help others discover this content</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {navigator.share && (
            <Button onClick={handleNativeShare} className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          )}
          {!navigator.share && (
            <>
              {shareLinks.slice(0, 3).map((link) => (
                <button
                  key={link.name}
                  onClick={() => handleShareClick(link)}
                  className={cn(
                    'p-3 rounded-lg text-white transition-all duration-200',
                    'hover:scale-105 hover:shadow-md',
                    link.color
                  )}
                  aria-label={link.label}
                >
                  {link.icon}
                </button>
              ))}
              <button
                onClick={() => handleShareClick(shareLinks[4])}
                className={cn(
                  'p-3 rounded-lg text-white transition-all duration-200',
                  'hover:scale-105 hover:shadow-md',
                  shareLinks[4].color
                )}
                aria-label={shareLinks[4].label}
              >
                {shareLinks[4].icon}
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

// Floating Share Button (for mobile)
export function FloatingShareButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-6 left-6 z-40 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-colors md:hidden"
      aria-label="Share article"
    >
      <Share2 className="h-6 w-6" />
    </button>
  )
}

// Share Statistics Component
export function ShareStats({ shares, likes, comments }: {
  shares?: number
  likes?: number
  comments?: number
}) {
  return (
    <div className="flex items-center gap-6 text-sm text-gray-600">
      {shares !== undefined && (
        <div className="flex items-center gap-2">
          <Share2 className="h-4 w-4" />
          <span>{shares.toLocaleString()} shares</span>
        </div>
      )}
      {likes !== undefined && (
        <div className="flex items-center gap-2">
          <span>❤️</span>
          <span>{likes.toLocaleString()} likes</span>
        </div>
      )}
      {comments !== undefined && (
        <div className="flex items-center gap-2">
          <MessageCircle className="h-4 w-4" />
          <span>{comments.toLocaleString()} comments</span>
        </div>
      )}
    </div>
  )
}