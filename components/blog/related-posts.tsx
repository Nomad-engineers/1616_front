'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowRight, Filter } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface Post {
  id: string
  title: string
  slug: string
  excerpt?: string
  category: string
  cover?: {
    url: string
    alt: string
  }
  publishedAt: string
  readMin: number
  author?: {
    name: string
    avatar?: string
  }
}

interface RelatedPostsProps {
  posts: Post[]
  categories: string[]
  title?: string
  showLoadMore?: boolean
  className?: string
}

export function RelatedPosts({
  posts,
  categories,
  title = "Related Articles",
  showLoadMore = false,
  className
}: RelatedPostsProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [displayedPosts, setDisplayedPosts] = useState<number>(6)

  const filteredPosts = selectedCategory === 'all'
    ? posts
    : posts.filter(post => post.category === selectedCategory)

  const visiblePosts = filteredPosts.slice(0, displayedPosts)

  const loadMore = () => {
    setDisplayedPosts(prev => prev + 6)
  }

  const resetPosts = () => {
    setDisplayedPosts(6)
  }

  return (
    <div className={cn('max-w-6xl mx-auto mt-20', className)}>
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover more insights and stories from our blog
        </p>
      </div>

      {/* Category Filter */}
      <div className="mb-8">
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            variant={selectedCategory === 'all' ? 'primary' : 'outline'}
            size="sm"
            text="All Posts"
            onClick={() => {
              setSelectedCategory('all')
              resetPosts()
            }}
          />
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? 'primary' : 'outline'}
              size="sm"
              text={category}
              onClick={() => {
                setSelectedCategory(category)
                resetPosts()
              }}
            />
          ))}
        </div>
      </div>

      {/* Posts Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {visiblePosts.map((post, index) => (
          <PostCard key={post.id} post={post} index={index} />
        ))}
      </div>

      {/* No Posts State */}
      {filteredPosts.length === 0 && (
        <div className="text-center py-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
            <Filter className="h-8 w-8 text-gray-400" />
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No posts found</h3>
          <p className="text-gray-600 mb-6">
            Try selecting a different category or check back later for new content.
          </p>
          <Button
            variant="primary"
            size="md"
            text="Show All Posts"
            onClick={() => {
              setSelectedCategory('all')
              resetPosts()
            }}
          />
        </div>
      )}

      {/* Load More */}
      {showLoadMore && displayedPosts < filteredPosts.length && (
        <div className="text-center mt-12">
          <Button onClick={loadMore} variant="outline" size="lg" text="Load More Articles" className="gap-2">
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  )
}

function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <article
      className="group bg-white rounded-xl border border-gray-200 overflow-hidden hover:border-blue-300 hover:shadow-xl transition-all duration-300 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      {/* Cover Image */}
      {post.cover && (
        <div className="relative h-48 overflow-hidden">
          <Image
            src={post.cover.url}
            alt={post.cover.alt || post.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      )}

      {/* Content */}
      <div className="p-6">
        {/* Category */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-medium text-blue-600 uppercase tracking-wide">
            {post.category}
          </span>
          {post.author && (
            <div className="flex items-center gap-2">
              {post.author.avatar ? (
                <Image
                  src={post.author.avatar}
                  alt={post.author.name}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
              ) : (
                <div className="w-5 h-5 bg-gray-300 rounded-full" />
              )}
              <span className="text-xs text-gray-600 hidden sm:inline">{post.author.name}</span>
            </div>
          )}
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>

        {/* Excerpt */}
        {post.excerpt && (
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.excerpt}
          </p>
        )}

        {/* Metadata */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </time>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>{post.readMin} min</span>
            </div>
          </div>
        </div>

        {/* Read More Link */}
        <Link
          href={`/blog/${post.slug}`}
          className="inline-flex items-center gap-2 text-blue-600 font-medium mt-4 group-hover:gap-3 transition-all"
        >
          Read more
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  )
}

// Skeleton Loading Component
export function RelatedPostsSkeleton() {
  return (
    <div className="max-w-6xl mx-auto mt-20">
      <div className="text-center mb-12">
        <div className="h-10 bg-gray-200 rounded-lg w-64 mx-auto mb-4 animate-pulse" />
        <div className="h-6 bg-gray-200 rounded-lg w-96 mx-auto animate-pulse" />
      </div>

      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="h-48 bg-gray-200 animate-pulse" />
            <div className="p-6 space-y-4">
              <div className="h-4 bg-gray-200 rounded w-24 animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-full animate-pulse" />
              <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse" />
              <div className="flex justify-between">
                <div className="h-4 bg-gray-200 rounded w-20 animate-pulse" />
                <div className="h-4 bg-gray-200 rounded w-16 animate-pulse" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

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
    animation: fade-in-up 0.6s ease-out forwards;
    opacity: 0;
  }

  .line-clamp-2 {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }

  .line-clamp-3 {
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
`}</style>