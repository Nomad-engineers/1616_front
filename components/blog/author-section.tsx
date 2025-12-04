'use client'

import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Twitter, Linkedin, Github, Mail, User, Calendar, FileText } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/utils'

interface AuthorSectionProps {
  author: {
    id: string
    name: string
    avatar?: string
    bio?: string
    email?: string
    social?: {
      twitter?: string
      linkedin?: string
      github?: string
      website?: string
    }
    stats?: {
      postsCount: number
      followers?: number
    }
  }
  relatedPosts?: Array<{
    id: string
    title: string
    slug: string
    publishedAt: string
    readTime: number
  }>
  className?: string
}

export function AuthorSection({ author, relatedPosts = [], className }: AuthorSectionProps) {
  return (
    <div className={cn('max-w-4xl mx-auto mt-16', className)}>
      <div className="bg-white rounded-2xl border border-gray-200 p-8 md:p-12 shadow-lg">
        {/* Author Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
          {/* Avatar */}
          <div className="relative">
            {author.avatar ? (
              <Image
                src={author.avatar}
                alt={author.name}
                width={96}
                height={96}
                className="rounded-full object-cover ring-4 ring-gray-100"
              />
            ) : (
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <div className="absolute bottom-0 right-0 w-6 h-6 bg-green-500 rounded-full border-4 border-white" />
          </div>

          {/* Author Info */}
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">About {author.name}</h2>
            {author.bio && (
              <p className="text-gray-600 leading-relaxed mb-4">{author.bio}</p>
            )}

            {/* Stats */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <FileText className="h-4 w-4" />
                <span>{author.stats?.postsCount || 0} articles</span>
              </div>
              {author.stats?.followers && (
                <div className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>{author.stats.followers.toLocaleString()} followers</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Button variant="primary" className="gap-2">
              <User className="h-4 w-4" />
              Follow
            </Button>
            {author.email && (
              <Button variant="outline" className="gap-2">
                <Mail className="h-4 w-4" />
                Contact
              </Button>
            )}
          </div>
        </div>

        {/* Social Links */}
        {author.social && Object.keys(author.social).length > 0 && (
          <div className="border-t border-gray-200 pt-6 mb-8">
            <h3 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Connect</h3>
            <div className="flex flex-wrap gap-3">
              {author.social.twitter && (
                <SocialLink
                  href={`https://twitter.com/${author.social.twitter}`}
                  icon={<Twitter className="h-5 w-5" />}
                  label="Twitter"
                  platform="twitter"
                />
              )}
              {author.social.linkedin && (
                <SocialLink
                  href={author.social.linkedin}
                  icon={<Linkedin className="h-5 w-5" />}
                  label="LinkedIn"
                  platform="linkedin"
                />
              )}
              {author.social.github && (
                <SocialLink
                  href={author.social.github}
                  icon={<Github className="h-5 w-5" />}
                  label="GitHub"
                  platform="github"
                />
              )}
              {author.social.website && (
                <SocialLink
                  href={author.social.website}
                  icon={<Mail className="h-5 w-5" />}
                  label="Website"
                  platform="website"
                />
              )}
            </div>
          </div>
        )}

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <div className="border-t border-gray-200 pt-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">
              More articles by {author.name}
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {relatedPosts.slice(0, 4).map((post) => (
                <RelatedPostCard key={post.id} post={post} />
              ))}
            </div>
            {relatedPosts.length > 4 && (
              <div className="mt-6 text-center">
                <Link href={`/authors/${author.id}`}>
                  <Button variant="outline">
                    View all articles ({relatedPosts.length})
                  </Button>
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

function SocialLink({
  href,
  icon,
  label,
  platform
}: {
  href: string
  icon: React.ReactNode
  label: string
  platform: string
}) {
  const platformStyles = {
    twitter: 'bg-blue-500 hover:bg-blue-600 text-white',
    linkedin: 'bg-blue-700 hover:bg-blue-800 text-white',
    github: 'bg-gray-900 hover:bg-gray-800 text-white',
    website: 'bg-gray-600 hover:bg-gray-700 text-white'
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-lg transition-colors',
        platformStyles[platform as keyof typeof platformStyles]
      )}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </a>
  )
}

function RelatedPostCard({ post }: { post: any }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group block p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:shadow-md transition-all duration-200"
    >
      <div className="space-y-2">
        <h4 className="font-medium text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
          {post.title}
        </h4>
        <div className="flex items-center gap-3 text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <time dateTime={post.publishedAt}>
              {new Date(post.publishedAt).toLocaleDateString()}
            </time>
          </div>
          <span>•</span>
          <span>{post.readTime} min read</span>
        </div>
      </div>
    </Link>
  )
}