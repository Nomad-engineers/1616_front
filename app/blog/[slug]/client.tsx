'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Calendar, Clock, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/Button'
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
  }
}

export default function BlogPostClient({ post }: BlogPostClientProps) {
  const excerpt = post.excerpt || extractTextFromLexical(post.content)?.substring(0, 160) + '...'

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: post.title,
          text: excerpt,
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

  return (
    <article className="min-h-screen">
      {/* Header */}
      <div className="bg-gradient-to-b from-background to-background/95 border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link href="/#blog">
              <Button variant="outline" size="sm" text="Back to Blog" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <Button variant="outline" size="sm" text="Share" onClick={handleShare}>
              <Share2 className="h-4 w-4 mr-2" />
            </Button>
          </div>

          <div className="max-w-4xl mx-auto">
            {/* Category */}
            <div className="inline-block px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium mb-4">
              {post.category}
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6 leading-tight">
              {post.title}
            </h1>

            {/* Metadata */}
            <div className="flex flex-wrap items-center gap-4 text-muted-foreground mb-8">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <time dateTime={post.createdAt}>
                  {formatDate(post.createdAt, 'long')}
                </time>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <span>{post.readMin} min read</span>
              </div>
              {post.updatedAt !== post.createdAt && (
                <div className="text-sm">
                  Updated {formatDate(post.updatedAt, 'long')}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      {post.cover?.url && (
        <div className="relative h-64 md:h-96 lg:h-[500px] overflow-hidden">
          <Image
            src={post.cover.url}
            alt={post.cover.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent" />
        </div>
      )}

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg prose-headings:font-serif prose-p:text-muted-foreground prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-accent-blue hover:prose-a:text-accent-blue/80 prose-code:text-accent-blue prose-pre:bg-muted prose-blockquote:border-l-accent-blue prose-blockquote:text-muted-foreground max-w-none">
            {renderLexicalContent(post.content)}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl font-bold mb-4">Enjoyed this article?</h2>
            <p className="text-muted-foreground mb-8">
              Share it with your network and help spread the knowledge.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleShare} variant="primary" size="md" text="Share Article">
                <Share2 className="h-4 w-4 mr-2" />
              </Button>
              <Link href="/#blog">
                <Button variant="outline" size="md" text="Read More Articles">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
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
        <p key={key} className="mb-4">
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex)
          )}
        </p>
      )

    case 'heading':
      const Tag = `h${Math.min(node.tag || 1, 6)}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return (
        <Tag key={key} className="font-bold mb-4 mt-6">
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex)
          )}
        </Tag>
      )

    case 'text':
      if (node.format & 1) { // Bold
        return <strong key={key}>{node.text}</strong>
      }
      if (node.format & 2) { // Italic
        return <em key={key}>{node.text}</em>
      }
      return node.text

    case 'list':
      const ListTag = node.listType === 'bullet' ? 'ul' : 'ol'
      return (
        <ListTag key={key} className="mb-4 pl-6">
          {node.children?.map((child: any, childIndex: number) => (
            <li key={childIndex} className="mb-2">
              {child.children?.map((grandChild: any, grandChildIndex: number) =>
                renderLexicalNode(grandChild, grandChildIndex)
              )}
            </li>
          ))}
        </ListTag>
      )

    case 'quote':
      return (
        <blockquote key={key} className="border-l-4 border-accent-blue pl-4 italic text-muted-foreground mb-4">
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex)
          )}
        </blockquote>
      )

    default:
      return null
  }
}