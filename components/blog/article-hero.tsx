'use client'

import React from 'react'
import Image from 'next/image'
import { Calendar, Clock, User, Edit3 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ArticleHeroProps {
  title: string
  category: string
  excerpt?: string
  coverImage?: {
    url: string
    alt: string
    caption?: string
  }
  author?: {
    name: string
    avatar?: string
    bio?: string
  }
  publishedAt: string
  updatedAt?: string
  readTime: number
  className?: string
}

export function ArticleHero({
  title,
  category,
  excerpt,
  coverImage,
  author,
  publishedAt,
  updatedAt,
  readTime,
  className
}: ArticleHeroProps) {
  const formattedDate = new Date(publishedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const updatedDate = updatedAt && new Date(updatedAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  const isUpdated = updatedAt && updatedAt !== publishedAt

  return (
    <div className={cn('relative', className)}>
      {/* Cover Image */}
      {coverImage && (
        <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={coverImage.url}
            alt={coverImage.alt || title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />

          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

          {/* Image Caption */}
          {coverImage.caption && (
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <p className="text-sm opacity-90 text-center">{coverImage.caption}</p>
            </div>
          )}
        </div>
      )}

      {/* Content */}
      <div className={cn(
        'container mx-auto px-4 py-12 md:py-16',
        coverImage ? 'relative -mt-32' : 'mt-0'
      )}>
        <div className="max-w-4xl mx-auto">
          {/* Category Badge */}
          <div className="inline-flex items-center gap-2 mb-6 animate-fade-in-up">
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
              {category}
            </span>
            {isUpdated && (
              <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full">
                <Edit3 className="inline h-3 w-3 mr-1" />
                Updated
              </span>
            )}
          </div>

          {/* Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight animate-fade-in-up animation-delay-200">
            {title}
          </h1>

          {/* Excerpt */}
          {excerpt && (
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-3xl animate-fade-in-up animation-delay-300">
              {excerpt}
            </p>
          )}

          {/* Metadata */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80 text-sm animate-fade-in-up animation-delay-400">
            {/* Author */}
            {author && (
              <div className="flex items-center gap-3">
                {author.avatar ? (
                  <Image
                    src={author.avatar}
                    alt={author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                ) : (
                  <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4" />
                  </div>
                )}
                <div>
                  <div className="font-medium text-white">{author.name}</div>
                  {author.bio && (
                    <div className="text-xs text-white/60 hidden md:block">{author.bio}</div>
                  )}
                </div>
              </div>
            )}

            <div className="flex items-center gap-4 md:gap-6">
              {/* Published Date */}
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={publishedAt}>{formattedDate}</time>
              </div>

              {/* Updated Date */}
              {isUpdated && (
                <div className="flex items-center gap-2 text-xs text-white/60">
                  <Edit3 className="h-3 w-3" />
                  <span>Updated {updatedDate}</span>
                </div>
              )}

              {/* Read Time */}
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Gradient Separator */}
      <div className="h-20 bg-gradient-to-b from-transparent to-gray-50" />

      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .animation-delay-300 {
          animation-delay: 0.3s;
          opacity: 0;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
          opacity: 0;
        }
      `}</style>
    </div>
  )
}