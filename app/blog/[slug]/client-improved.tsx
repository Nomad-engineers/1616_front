'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Heart,
  Bookmark,
  User,
  MessageCircle,
  Eye,
  ChevronUp,
  TrendingUp
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/Avatar'
import { Separator } from '@/components/ui/Separator'
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
  relatedPosts?: Array<{
    id: string
    title: string
    excerpt?: string
    cover?: {
      url: string
      alt: string
    }
    category: string
    readMin: number
    createdAt: string
  }>
}

export default function BlogPostClientImproved({ post, relatedPosts = [] }: BlogPostClientProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const excerpt = post.excerpt || extractTextFromLexical(post.content)?.substring(0, 160) + '...'

  // Reading progress
  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100
      setReadingProgress(Math.min(progress, 100))
      setShowScrollTop(scrolled > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

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
      // Toast notification would go here
    }
  }

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleLike = () => {
    setIsLiked(!isLiked)
    // API call to like/unlike would go here
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
    // API call to bookmark/unbookmark would go here
  }

  // Generate table of contents from headings
  const generateTableOfContents = () => {
    if (!post.content?.root?.children) return []

    const headings = []
    const traverse = (nodes: any[], level = 0) => {
      nodes.forEach((node) => {
        if (node.type === 'heading' && node.tag && node.tag <= 3) {
          const text = node.children?.map((child: any) => child.text || '').join('') || ''
          if (text) {
            headings.push({
              text,
              level: node.tag,
              id: text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
            })
          }
        }
        if (node.children) {
          traverse(node.children)
        }
      })
    }

    traverse(post.content.root.children)
    return headings
  }

  const tableOfContents = generateTableOfContents()

  return (
    <article className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Sticky Header */}
      <header className="sticky top-1 z-40 bg-background/80 backdrop-blur-lg border-b rounded-b-2xl mx-4 md:mx-8 lg:mx-auto lg:max-w-7xl">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/#blog">
              <Button variant="ghost" size="sm" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Back to Blog</span>
              </Button>
            </Link>

            <div className="flex items-center gap-2">
              <Button
                variant={isLiked ? "default" : "ghost"}
                size="sm"
                onClick={handleLike}
                className="gap-2"
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="hidden sm:inline">{post.likes || 0}</span>
              </Button>

              <Button
                variant={isBookmarked ? "default" : "ghost"}
                size="sm"
                onClick={handleBookmark}
                className="gap-2"
              >
                <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
              </Button>

              <Button variant="ghost" size="sm" onClick={handleShare}>
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 opacity-50" />

        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {/* Category */}
              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                  {post.category}
                </Badge>
                {post.updatedAt !== post.createdAt && (
                  <Badge variant="outline" className="text-xs">
                    Updated
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight text-balance">
                {post.title}
              </h1>

              {/* Metadata */}
              <div className="flex flex-wrap items-center gap-4 text-muted-foreground">
                {post.author && (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-foreground">{post.author.name}</div>
                      {post.author.role && (
                        <div className="text-sm">{post.author.role}</div>
                      )}
                    </div>
                  </div>
                )}

                <Separator orientation="vertical" className="h-8" />

                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <time dateTime={post.createdAt}>
                      {formatDate(post.createdAt, 'long')}
                    </time>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{post.readMin} min read</span>
                  </div>
                  {post.views && (
                    <div className="flex items-center gap-1">
                      <Eye className="h-4 w-4" />
                      <span>{post.views.toLocaleString()} views</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Engagement Stats */}
              <div className="flex items-center gap-6 text-sm text-muted-foreground">
                {post.likes && (
                  <div className="flex items-center gap-1">
                    <Heart className="h-4 w-4" />
                    <span>{post.likes} likes</span>
                  </div>
                )}
                {post.comments && (
                  <div className="flex items-center gap-1">
                    <MessageCircle className="h-4 w-4" />
                    <span>{post.comments} comments</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover?.url && (
        <section className="relative max-h-[600px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent z-10" />
          <Image
            src={post.cover.url}
            alt={post.cover.alt || post.title}
            width={1200}
            height={600}
            className="w-full object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />
        </section>
      )}

      {/* Main Content */}
      <section className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-[1fr_300px] gap-12">
          {/* Article Content */}
          <div ref={contentRef} className="max-w-4xl">
            <div className="prose prose-lg prose-headings:font-serif prose-p:text-muted-foreground prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-code:text-blue-600 prose-pre:bg-muted prose-blockquote:border-l-blue-500 prose-blockquote:text-muted-foreground max-w-none">
              {renderLexicalContent(post.content)}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {['Marketing', 'UAE', 'Business Growth', 'Strategy'].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-accent">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Table of Contents */}
            {tableOfContents.length > 0 && (
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4" />
                  Table of Contents
                </h3>
                <nav className="space-y-2">
                  {tableOfContents.map((heading) => (
                    <Link
                      key={heading.id}
                      href={`#${heading.id}`}
                      className={`block text-sm hover:text-foreground transition-colors ${
                        heading.level === 1 ? 'font-medium' :
                        heading.level === 2 ? 'pl-4' : 'pl-8'
                      }`}
                    >
                      {heading.text}
                    </Link>
                  ))}
                </nav>
              </Card>
            )}

            {/* Author Card */}
            {post.author && (
              <Card className="p-6">
                <div className="text-center space-y-4">
                  <Avatar className="h-20 w-20 mx-auto">
                    <AvatarImage src={post.author.avatar} alt={post.author.name} />
                    <AvatarFallback className="text-lg">
                      {post.author.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <h3 className="font-semibold">{post.author.name}</h3>
                    {post.author.role && (
                      <p className="text-sm text-muted-foreground">{post.author.role}</p>
                    )}
                  </div>
                  {post.author.bio && (
                    <p className="text-sm text-muted-foreground">{post.author.bio}</p>
                  )}
                  <Button variant="outline" size="sm" className="w-full">
                    Follow
                  </Button>
                </div>
              </Card>
            )}

            {/* Share Card */}
            <Card className="p-6">
              <h3 className="font-semibold mb-4">Share this article</h3>
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigator.clipboard.writeText(window.location.href)}
                >
                  Copy Link
                </Button>
              </div>
            </Card>
          </aside>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="bg-muted/30">
          <div className="container mx-auto px-4 py-16">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-2xl md:text-3xl font-bold mb-8">Related Articles</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedPosts.map((relatedPost) => (
                  <Card key={relatedPost.id} className="group hover:shadow-lg transition-shadow overflow-hidden">
                    <Link href={`/blog/${relatedPost.id}`}>
                      {relatedPost.cover?.url && (
                        <div className="aspect-[16/9] overflow-hidden">
                          <Image
                            src={relatedPost.cover.url}
                            alt={relatedPost.cover.alt || relatedPost.title}
                            width={400}
                            height={225}
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      )}
                      <div className="p-6">
                        <Badge variant="secondary" className="mb-3">
                          {relatedPost.category}
                        </Badge>
                        <h3 className="font-semibold mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.excerpt && (
                          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                            {relatedPost.excerpt}
                          </p>
                        )}
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <span>{formatDate(relatedPost.createdAt)}</span>
                          <span>•</span>
                          <span>{relatedPost.readMin} min read</span>
                        </div>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Newsletter CTA */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h2 className="text-3xl font-bold">Stay Updated</h2>
            <p className="text-lg opacity-90">
              Get the latest insights and trends in digital marketing delivered to your inbox.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 rounded-lg text-foreground"
              />
              <Button variant="secondary" className="px-8">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="sm"
          className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg"
        >
          <ChevronUp className="h-4 w-4" />
        </Button>
      )}

      {/* Footer */}
      <footer className="border-t bg-muted/30">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-semibold">Enjoyed this article?</h3>
            <p className="text-muted-foreground">
              Share it with your network and help spread the knowledge.
            </p>
            <div className="flex justify-center gap-4">
              <Button onClick={handleShare} size="lg">
                <Share2 className="h-4 w-4 mr-2" />
                Share Article
              </Button>
              <Link href="/#blog">
                <Button variant="outline" size="lg">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Read More Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </footer>
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
      const Tag = `h${Math.min(node.tag || 1, 6)}` as keyof JSX.IntrinsicElements
      return (
        <Tag key={key} className="font-bold mb-4 mt-6 scroll-mt-20" id={
          node.children?.map((child: any) => child.text).join('').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        }>
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
        <blockquote key={key} className="border-l-4 border-blue-500 pl-4 italic text-muted-foreground mb-4">
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex)
          )}
        </blockquote>
      )

    default:
      return null
  }
}