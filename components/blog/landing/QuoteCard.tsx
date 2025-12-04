'use client'

import Image from 'next/image'
import { useState } from 'react'
import {
  FormatQuote,
  Star,
  Linkedin,
  Twitter,
  CheckCircle,
  TrendingUp,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface QuoteCardProps {
  quote: string;
  author: {
    name: string;
    role: string;
    company: string;
    avatar: string;
    linkedin?: string;
    twitter?: string;
  };
  context?: string;
  featured?: boolean;
  metrics?: {
    type: 'growth' | 'roi' | 'time' | 'satisfaction';
    value: string;
    label: string;
  }[];
  variant?: 'default' | 'featured' | 'minimal';
}

export function QuoteCard({
  quote,
  author,
  context,
  featured = false,
  metrics,
  variant = 'default'
}: QuoteCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case 'featured':
        return 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200 shadow-xl'
      case 'minimal':
        return 'bg-white border-gray-200 shadow-sm'
      default:
        return 'bg-white border-gray-200 shadow-lg'
    }
  }

  const getMetricIcon = (type: string) => {
    switch (type) {
      case 'growth':
        return <TrendingUp className="h-4 w-4 text-green-500" />
      case 'roi':
        return <Award className="h-4 w-4 text-yellow-500" />
      case 'time':
        return <Star className="h-4 w-4 text-blue-500" />
      case 'satisfaction':
        return <CheckCircle className="h-4 w-4 text-purple-500" />
      default:
        return <Star className="h-4 w-4 text-gray-500" />
    }
  }

  const truncateQuote = (text: string, maxLength: number = 150) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + '...'
  }

  const displayQuote = isExpanded || variant === 'featured' ? quote : truncateQuote(quote)

  return (
    <Card className={cn(
      "relative overflow-hidden transition-all duration-300 hover:shadow-2xl",
      getVariantStyles(),
      featured && "scale-105"
    )}>
      {/* Featured Badge */}
      {featured && (
        <div className="absolute top-4 right-4">
          <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
            Featured
          </Badge>
        </div>
      )}

      <div className="p-8">
        {/* Quote Icon */}
        <div className="mb-6">
          <FormatQuote className={cn(
            "h-8 w-8",
            variant === 'featured' ? 'text-blue-500' : 'text-gray-400'
          )} />
        </div>

        {/* Quote Text */}
        <blockquote className="mb-6">
          <p className={cn(
            "text-lg leading-relaxed",
            variant === 'featured' ? 'text-gray-900 font-medium' : 'text-gray-700'
          )}>
            "{displayQuote}"
          </p>

          {quote.length > 150 && variant !== 'featured' && (
            <Button
              variant="link"
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-0 h-auto text-blue-600 hover:text-blue-700 mt-2"
            >
              {isExpanded ? 'Show less' : 'Read more'}
            </Button>
          )}
        </blockquote>

        {/* Context */}
        {context && (
          <div className="mb-6">
            <Badge variant="outline" className="text-xs">
              {context}
            </Badge>
          </div>
        )}

        {/* Metrics */}
        {metrics && metrics.length > 0 && (
          <div className="mb-6">
            <div className="flex flex-wrap gap-3">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 px-3 py-2 bg-gray-50 rounded-lg"
                >
                  {getMetricIcon(metric.type)}
                  <div>
                    <div className="text-sm font-semibold">{metric.value}</div>
                    <div className="text-xs text-muted-foreground">{metric.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Author Information */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="relative">
              <Image
                src={author.avatar}
                alt={author.name}
                width={56}
                height={56}
                className="rounded-full border-2 border-white shadow-md"
              />
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full" />
            </div>
            <div>
              <div className="font-semibold text-gray-900">
                {author.name}
              </div>
              <div className="text-sm text-gray-600">
                {author.role}
                {author.company && (
                  <span className="text-gray-400"> at {author.company}</span>
                )}
              </div>
            </div>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-2">
            {author.linkedin && (
              <Button
                variant="ghost"
                size="sm"
                href={author.linkedin}
                className="p-2 h-auto"
              >
                <Linkedin className="h-4 w-4 text-blue-600" />
              </Button>
            )}
            {author.twitter && (
              <Button
                variant="ghost"
                size="sm"
                href={author.twitter}
                className="p-2 h-auto"
              >
                <Twitter className="h-4 w-4 text-blue-400" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Gradient Overlay for Featured */}
      {featured && (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5 pointer-events-none" />
      )}
    </Card>
  )
}

// Quote Section Container Component
interface QuoteSectionProps {
  title: string;
  subtitle?: string;
  quotes: QuoteCardProps[];
  background?: 'white' | 'gray' | 'gradient';
}

export function QuoteSection({ title, subtitle, quotes, background = 'gray' }: QuoteSectionProps) {
  const getBackgroundStyles = () => {
    switch (background) {
      case 'white':
        return 'bg-white'
      case 'gradient':
        return 'bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50'
      default:
        return 'bg-gray-50'
    }
  }

  return (
    <section className={cn("py-16 md:py-24", getBackgroundStyles())}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              {title}
            </h2>
            {subtitle && (
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                {subtitle}
              </p>
            )}
          </div>

          {/* Quotes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {quotes.map((quote, index) => (
              <div
                key={index}
                className={cn(
                  "transform transition-all duration-300 hover:scale-105",
                  index === 0 && "lg:col-span-2 lg:row-span-1"
                )}
              >
                <QuoteCard
                  {...quote}
                  featured={index === 0}
                  variant={index === 0 ? 'featured' : 'default'}
                />
              </div>
            ))}
          </div>

          {/* Additional CTA */}
          <div className="mt-16 text-center">
            <Button variant="outline" size="lg" href="/case-studies">
              View More Success Stories
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}