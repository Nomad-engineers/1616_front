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
  ChevronRight,
  ArrowRight,
  TrendingUp,
  Zap,
  Target,
  Award,
  CheckCircle,
  ArrowUpRight,
  BarChart3,
  Lightbulb,
  Star,
  Users,
  Globe,
  ArrowDown,
  ArrowUp
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

export default function BlogPostLanding({ post, relatedPosts = [] }: BlogPostClientProps) {
  const [isLiked, setIsLiked] = useState(false)
  const [isBookmarked, setIsBookmarked] = useState(false)
  const [readingProgress, setReadingProgress] = useState(0)
  const [showScrollTop, setShowScrollTop] = useState(false)
  const [executiveSummary, setExecutiveSummary] = useState('')
  const contentRef = useRef<HTMLDivElement>(null)
  const excerpt = post.excerpt || extractTextFromLexical(post.content)?.substring(0, 160) + '...'

  // Extract executive summary
  useEffect(() => {
    const text = extractTextFromLexical(post.content) || ''
    // Create a compelling executive summary (first 3-4 key sentences)
    const sentences = text.split('. ').filter(s => s.trim().length > 20)
    if (sentences.length >= 3) {
      setExecutiveSummary(sentences.slice(0, 3).join('. ') + '.')
    } else {
      setExecutiveSummary(excerpt)
    }
  }, [post.content, excerpt])

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
          text: executiveSummary,
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

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked)
  }

  const scrollToContent = () => {
    document.getElementById('executive-summary')?.scrollIntoView({ behavior: 'smooth' })
  }

  // Extract key insights (mock data for now)
  const keyInsights = [
    {
      title: "Market Opportunity",
      description: "UAE's digital marketing sector is growing at 27% annually",
      icon: <TrendingUp className="h-5 w-5" />,
      stat: "27%"
    },
    {
      title: "Competitive Edge",
      description: "Brands that adapt locally see 3x higher engagement",
      icon: <Zap className="h-5 w-5" />,
      stat: "3x"
    },
    {
      title: "ROI Impact",
      description: "Strategic partnerships increase market share by 40%",
      icon: <Target className="h-5 w-5" />,
      stat: "40%"
    }
  ]

  // Extract quotes from content
  const quotes = [
    {
      text: "Understanding local culture isn't just about translation – it's about creating genuine connections with your audience.",
      author: "Industry Expert",
      role: "Marketing Director",
      company: "Leading Agency"
    },
    {
      text: "The UAE market rewards authenticity. Brands that stay true to their values while adapting to local preferences win.",
      author: "Business Leader",
      role: "CEO",
      company: "Success Story"
    }
  ]

  return (
    <article className="min-h-screen bg-white">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-100 z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute top-40 right-20 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
          <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl"></div>
        </div>

        <div className="relative container mx-auto px-4 pt-20 pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Navigation */}
            <div className="flex items-center justify-between mb-12">
              <Link href="/#blog">
                <Button variant="outline" size="sm" className="gap-2" text="Back to Blog">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Blog
                </Button>
              </Link>

              <div className="flex items-center gap-3">
                <Button
                  variant={isLiked ? "primary" : "outline"}
                  size="sm"
                  onClick={handleLike}
                  className="gap-2"
                  text=""
                >
                  <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                  <span className="hidden sm:inline">{post.likes || 0}</span>
                </Button>

                <Button
                  variant={isBookmarked ? "primary" : "outline"}
                  size="sm"
                  onClick={handleBookmark}
                  text=""
                >
                  <Bookmark className={`h-4 w-4 ${isBookmarked ? 'fill-current' : ''}`} />
                </Button>

                <Button variant="outline" size="sm" onClick={handleShare} text="">
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Main Hero Content */}
            <div className="text-center mb-16">
              {/* Category Badge */}
              <div className="inline-flex items-center gap-2 mb-6">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                  {post.category}
                </Badge>
                {post.updatedAt !== post.createdAt && (
                  <Badge variant="outline" className="text-xs">
                    Updated
                  </Badge>
                )}
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Subtitle */}
              <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl mx-auto">
                {executiveSummary}
              </p>

              {/* Author and Metadata */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-10">
                {post.author && (
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={post.author.avatar} alt={post.author.name} />
                      <AvatarFallback>
                        {post.author.name.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="text-left">
                      <div className="font-semibold text-gray-900">{post.author.name}</div>
                      {post.author.role && (
                        <div className="text-sm text-gray-600">{post.author.role}</div>
                      )}
                    </div>
                  </div>
                )}

                <Separator orientation="vertical" className="h-12 hidden sm:block" />

                <div className="flex items-center gap-6 text-sm text-gray-600">
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

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button
                  variant="primary"
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 text-lg"
                  onClick={scrollToContent}
                  text="Read the Full Analysis"
                >
                  Read the Full Analysis
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>

                <Button
                  variant="outline"
                  size="lg"
                  className="border-gray-300 hover:border-gray-400 px-8 py-4 text-lg"
                  text="Download Summary"
                >
                  Download Summary
                  <Award className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Scroll Indicator */}
            <div className="flex justify-center">
              <Button
                variant="outline"
                size="sm"
                onClick={scrollToContent}
                className="animate-bounce"
                text=""
              >
                <ArrowDown className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Cover Image */}
      {post.cover?.url && (
        <section className="relative h-96 md:h-[600px] overflow-hidden">
          <Image
            src={post.cover.url}
            alt={post.cover.alt || post.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 80vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        </section>
      )}

      {/* Executive Summary Section */}
      <section id="executive-summary" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 mb-4">
                <Lightbulb className="h-6 w-6 text-yellow-500" />
                <h2 className="text-2xl font-bold text-gray-900">Executive Summary</h2>
              </div>
              <p className="text-lg text-gray-600">Get the key insights in 60 seconds</p>
            </div>

            <div className="p-8 bg-gradient-to-br from-blue-50 to-purple-50 border-0 shadow-lg rounded-2xl">
              <div>
                <div className="space-y-6">
                  <p className="text-lg text-gray-800 leading-relaxed">
                    {executiveSummary}
                  </p>

                  <div className="grid md:grid-cols-3 gap-6 pt-6 border-t">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">5 min</div>
                      <div className="text-sm text-gray-600">Quick read</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">3 key</div>
                      <div className="text-sm text-gray-600">Takeaways</div>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-pink-600 mb-2">Actionable</div>
                      <div className="text-sm text-gray-600">Insights</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Insights Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Key Insights & Data
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Evidence-backed findings that drive strategic decisions
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {keyInsights.map((insight, index) => (
                <div key={index} className="p-6 hover:shadow-xl transition-shadow border-0 bg-white rounded-2xl shadow-md">
                  <div>
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg">
                        {insight.icon}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900 mb-2">{insight.title}</h3>
                        <p className="text-gray-600 mb-3">{insight.description}</p>
                        <div className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                          {insight.stat}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
              Deep Dive Analysis
            </h2>

            <div className="prose prose-lg prose-headings:font-serif prose-p:text-gray-600 prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:text-blue-600 hover:prose-a:text-blue-700 prose-code:text-blue-600 prose-pre:bg-gray-50 prose-blockquote:border-l-blue-500 prose-blockquote:text-gray-600 max-w-none">
              {renderLexicalContent(post.content)}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-8 border-t">
              <div className="flex flex-wrap gap-2">
                {['Marketing', 'UAE', 'Business Growth', 'Strategy', 'Digital Transformation'].map((tag) => (
                  <Badge key={tag} variant="outline" className="cursor-pointer hover:bg-gray-50">
                    #{tag}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quote/Testimonial Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Expert Perspectives
              </h2>
              <p className="text-xl text-gray-600">
                What industry leaders are saying
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {quotes.map((quote, index) => (
                <div key={index} className="p-8 border-0 shadow-lg bg-white/80 backdrop-blur rounded-2xl">
                  <div>
                    <div className="space-y-4">
                      <div className="text-2xl text-gray-400">"</div>
                      <p className="text-lg text-gray-800 italic leading-relaxed">
                        {quote.text}
                      </p>
                      <div className="flex items-center gap-4 pt-4 border-t">
                        <Avatar className="h-12 w-12">
                          <AvatarFallback>
                            {quote.author.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-semibold text-gray-900">{quote.author}</div>
                          <div className="text-sm text-gray-600">{quote.role}</div>
                          <div className="text-xs text-blue-600 font-medium">{quote.company}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Implement These Strategies?
            </h2>
            <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
              Get personalized guidance for your brand's expansion in the UAE market
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                variant="secondary"
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                text="Get Free Consultation"
              >
                Get Free Consultation
                <ArrowUpRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
                text="Download Full Report"
              >
                Download Full Report
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  Continue Learning
                </h2>
                <p className="text-xl text-gray-600">
                  Explore more insights on digital marketing
                </p>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost) => (
                  <div key={relatedPost.id} className="group hover:shadow-xl transition-shadow overflow-hidden border-0 bg-white rounded-2xl shadow-md">
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
                        <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 transition-colors">
                          {relatedPost.title}
                        </h3>
                        {relatedPost.excerpt && (
                          <p className="text-sm text-gray-600 line-clamp-2 mb-4">
                            {relatedPost.excerpt}
                          </p>
                        )}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4 text-xs text-gray-500">
                            <span>{formatDate(relatedPost.createdAt)}</span>
                            <span>•</span>
                            <span>{relatedPost.readMin} min</span>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600 transition-colors" />
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>

              <div className="text-center mt-12">
                <Link href="/#blog">
                  <Button variant="outline" size="lg" className="px-8 py-4" text="View All Articles">
                    View All Articles
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Share This Insight
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Help others discover these strategies for market success
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button variant="primary" size="lg" onClick={handleShare} text="Share Article">
                <Share2 className="mr-2 h-5 w-5" />
                Share Article
              </Button>
              <Link href="/#blog">
                <Button variant="outline" size="lg" text="Read More Articles">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Read More Articles
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          variant="primary"
          size="sm"
          className="fixed bottom-8 right-8 z-50 rounded-full shadow-lg bg-gray-900 hover:bg-gray-800 text-white"
          text=""
        >
          <ArrowUp className="h-4 w-4" />
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
        <p key={key} className="mb-6">
          {node.children?.map((child: any, childIndex: number) =>
            renderLexicalNode(child, childIndex)
          )}
        </p>
      )

    case 'heading':
      const Tag = `h${Math.min(node.tag || 1, 6)}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
      return (
        <Tag key={key} className="font-bold mb-6 mt-8 scroll-mt-20" id={
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
        <ListTag key={key} className="mb-6 pl-6 space-y-2">
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