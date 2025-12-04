'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import {
  Clock,
  User,
  TrendingUp,
  Award,
  ChevronRight,
  ArrowDown,
  Play
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { cn } from '@/lib/utils'

interface BlogHeroProps {
  post: {
    title: string;
    excerpt: string;
    category: string;
    cover?: string;
    readTime: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    targetAudience: string;
    keyStats?: Array<{
      value: string;
      label: string;
      icon?: string;
    }>;
  };
  author: {
    name: string;
    avatar: string;
    role: string;
    company?: string;
  };
}

export function BlogHero({ post, author }: BlogHeroProps) {
  const [scrolled, setScrolled] = useState(false)
  const [activeStatIndex, setActiveStatIndex] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!post.keyStats?.length) return

    const interval = setInterval(() => {
      setActiveStatIndex((prev) => (prev + 1) % post.keyStats!.length)
    }, 3000)

    return () => clearInterval(interval)
  }, [post.keyStats])

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'Intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'Advanced':
        return 'bg-red-100 text-red-800 border-red-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const scrollToContent = () => {
    const element = document.getElementById('executive-summary')
    element?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
      <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] opacity-5" />

      {/* Animated Background Shapes */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000" />
      <div className="absolute bottom-20 left-1/2 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Category and Meta Info */}
          <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
            <Badge variant="secondary" className="px-4 py-2 text-sm font-medium">
              {post.category}
            </Badge>
            <Badge
              variant="outline"
              className={cn("px-4 py-2 text-sm font-medium", getDifficultyColor(post.difficulty))}
            >
              {post.difficulty}
            </Badge>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock className="h-4 w-4" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Hero Title */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold font-serif leading-tight mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            {post.title}
          </h1>

          {/* Supporting Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            {post.excerpt}
          </p>

          {/* Target Audience */}
          <div className="mb-8">
            <p className="text-sm text-muted-foreground mb-2">Perfect for:</p>
            <p className="font-medium text-foreground">{post.targetAudience}</p>
          </div>

          {/* Key Stats - Animated Carousel */}
          {post.keyStats && post.keyStats.length > 0 && (
            <div className="mb-12">
              <div className="inline-flex items-center gap-2 px-6 py-3 bg-white/80 backdrop-blur-sm rounded-full border border-gray-200 shadow-lg">
                {post.keyStats.map((stat, index) => (
                  <div
                    key={index}
                    className={cn(
                      "flex items-center gap-3 transition-all duration-500",
                      index === activeStatIndex ? "opacity-100" : "opacity-40"
                    )}
                  >
                    {stat.icon && (
                      <span className="text-2xl">{stat.icon}</span>
                    )}
                    <div className="text-left">
                      <div className="text-2xl font-bold text-primary">
                        {stat.value}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {stat.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Author Preview */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <div className="flex items-center gap-3">
              <div className="relative">
                <Image
                  src={author.avatar}
                  alt={author.name}
                  width={48}
                  height={48}
                  className="rounded-full border-2 border-white shadow-md"
                />
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
              </div>
              <div className="text-left">
                <div className="font-medium text-foreground">{author.name}</div>
                <div className="text-sm text-muted-foreground">
                  {author.role}
                  {author.company && ` at ${author.company}`}
                </div>
              </div>
            </div>
            <div className="text-sm text-muted-foreground">
              Published on {new Date().toLocaleDateString()}
            </div>
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Button
              size="lg"
              className="px-8 py-4 text-lg font-medium bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              onClick={scrollToContent}
            >
              Start Reading
              <ChevronRight className="ml-2 h-5 w-5" />
            </Button>

            <Button
              variant="outline"
              size="lg"
              className="px-8 py-4 text-lg font-medium border-2"
            >
              <Play className="mr-2 h-5 w-5" />
              Watch Summary
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-600" />
              <span>Expert Verified</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="h-4 w-4 text-blue-600" />
              <span>Industry Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-purple-600" />
              <span>50,000+ Readers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
        <span className="text-sm text-muted-foreground">Scroll to explore</span>
      </div>

      {/* Cover Image Overlay */}
      {post.cover && (
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <Image
            src={post.cover}
            alt=""
            fill
            className="object-cover"
            priority
          />
        </div>
      )}
    </section>
  )
}

// Add custom animation styles
const style = `
  @keyframes blob {
    0% {
      transform: translate(0px, 0px) scale(1);
    }
    33% {
      transform: translate(30px, -50px) scale(1.1);
    }
    66% {
      transform: translate(-20px, 20px) scale(0.9);
    }
    100% {
      transform: translate(0px, 0px) scale(1);
    }
  }
  .animate-blob {
    animation: blob 7s infinite;
  }
  .animation-delay-2000 {
    animation-delay: 2s;
  }
  .animation-delay-4000 {
    animation-delay: 4s;
  }
`

if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style')
  styleElement.textContent = style
  document.head.appendChild(styleElement)
}