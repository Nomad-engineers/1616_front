'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Share2,
  Calendar,
  Clock,
  User
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { extractTextFromLexical } from '@/types/api'
import { formatDate } from '@/lib/utils'

interface BlogPostClientProps {
  post: {
    id: string
    title: string
    content: any
    category: string
    readMin: number
    cover?: {
      url: string
      alt: string
    }
    createdAt: string
    updatedAt: string
    excerpt?: string
    author?: {
      name: string
      avatar?: string
      bio?: string
      role?: string
    }
    views?: number
    likes?: number
    comments?: number
  }
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const [showScrollTop, setShowScrollTop] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          url: window.location.href,
        })
      } catch (error) {
        // User cancelled sharing
      }
    } else {
      // Fallback: copy to clipboard
      await navigator.clipboard.writeText(window.location.href)
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <article className="min-h-screen bg-white">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Back Button */}
            <Link href="/#blog">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>
            </Link>

            {/* Center Content */}
            <div className="text-center flex-1 mx-8">
              <div className="text-sm font-medium text-gray-600 mb-1">
                {post.category}
              </div>
              <div className="text-lg font-semibold text-gray-900">
                {post.title}
              </div>
            </div>

            {/* Share Button */}
            <Button variant="ghost" size="sm" onClick={handleShare}>
              <Share2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Cover Image */}
      {post.cover?.url && (
        <div className="relative h-64 md:h-96 overflow-hidden">
          <Image
            src={post.cover.url}
            alt={post.cover.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />
        </div>
      )}

      {/* Article Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8 pb-8 border-b">
            {post.author && (
              <>
                <Avatar className="h-12 w-12">
                  <AvatarImage src={post.author.avatar} alt={post.author.name} />
                  <AvatarFallback>
                    {post.author.name.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="font-semibold text-gray-900">{post.author.name}</div>
                  {post.author.role && (
                    <div className="text-sm text-gray-600">{post.author.role}</div>
                  )}
                </div>
              </>
            )}

            <div className="flex items-center gap-4 text-sm text-gray-500 ml-auto">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.createdAt}>
                  {formatDate(post.createdAt)}
                </time>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readMin} min read</span>
              </div>
            </div>
          </div>

          {/* Article Body */}
          <div className="prose prose-lg max-w-none">
            {renderLexicalContent(post.content)}
          </div>
        </div>
      </main>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="sm"
          className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg"
        >
          <ArrowLeft className="h-4 w-4 rotate-90" />
        </Button>
      )}
    </article>
  )
}

function renderLexicalContent(content: any): React.ReactNode {
  if (!content) return null

  // Handle Lexical editor JSON format
  if (content.root && content.root.children) {
    return content.root.children.map((node: any, index: number) => {
      return renderLexicalNode(node, index)
    })
  }

  // Handle simple string content
  if (typeof content === 'string') {
    return <p>{content}</p>
  }

  return <pre>{JSON.stringify(content, null, 2)}</pre>
}

function renderLexicalNode(node: any, key: number): React.ReactNode {
  switch (node.type) {
    case 'paragraph':
      return (
        <p key={key} className="mb-6 text-gray-700 leading-relaxed">
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex)
          )}
        </p>
      )

    case 'heading':
      const Tag = `h${Math.min(node.tag || 1, 6)}` as keyof JSX.IntrinsicElements
      return (
        <Tag key={key} className="font-bold mb-6 mt-12 scroll-mt-24 text-gray-900" id={
          node.children?.map((child: any) => child.text).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        }>
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex)
          )}
        </Tag>
      )

    case 'text':
      if (node.format & 1) { // Bold
        return <strong key={key} className="font-semibold">{node.text}</strong>
      }
      if (node.format & 2) { // Italic
        return <em key={key} className="italic">{node.text}</em>
      }
      return node.text

    case 'list':
      const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
      return (
        <ListTag key={key} className="mb-6 pl-6 space-y-2">
          {node.children?.map((child: any, childIndex: number) => (
            <li key={childIndex} className="text-gray-700 leading-relaxed">
              {child.children?.map((grandChild: any, grandChildIndex: number) =>
                renderLexicalNode(grandChild, grandChildIndex)
              )}
            </li>
          ))}
        </ListTag>
      )

    case 'quote':
      return (
        <blockquote key={key} className="border-l-4 border-blue-500 pl-6 italic text-gray-600 mb-6">
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex)
          )}
        </blockquote>
      )

    default:
      return null
  }
}