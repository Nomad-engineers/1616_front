'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  ArrowRight,
  CheckCircle,
  Clock,
  Shield,
  Zap,
  Users,
  Star,
  ChevronDown,
  Calendar
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface CTASectionProps {
  title: string;
  description: string;
  primaryCTA: {
    text: string;
    href: string;
    variant: 'primary' | 'secondary';
  };
  secondaryCTA?: {
    text: string;
    href: string;
  };
  socialProof?: string;
  urgency?: {
    text: string;
    deadline?: string;
  };
  guarantees?: string[];
  stats?: Array<{
    value: string;
    label: string;
    icon?: React.ReactNode;
  }>;
  variant?: 'standard' | 'ebook' | 'webinar' | 'consultation' | 'demo';
}

export function CTASection({
  title,
  description,
  primaryCTA,
  secondaryCTA,
  socialProof,
  urgency,
  guarantees = [],
  stats,
  variant = 'standard'
}: CTASectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getVariantStyles = () => {
    switch (variant) {
      case 'ebook':
        return 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
      case 'webinar':
        return 'bg-gradient-to-br from-green-600 to-blue-600 text-white'
      case 'consultation':
        return 'bg-gradient-to-br from-purple-600 to-pink-600 text-white'
      case 'demo':
        return 'bg-gradient-to-br from-orange-600 to-red-600 text-white'
      default:
        return 'bg-gradient-to-br from-blue-600 to-purple-600 text-white'
    }
  }

  const getVariantIcon = () => {
    switch (variant) {
      case 'ebook':
        return <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">📚</div>
      case 'webinar':
        return <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">🎥</div>
      case 'consultation':
        return <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">💼</div>
      case 'demo':
        return <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">🚀</div>
      default:
        return <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">✨</div>
    }
  }

  const getUrgencyBadge = () => {
    if (!urgency) return null

    return (
      <Badge className="bg-yellow-400 text-yellow-900 hover:bg-yellow-300 animate-pulse">
        <Clock className="h-3 w-3 mr-1" />
        {urgency.text}
        {urgency.deadline && ` • ${urgency.deadline}`}
      </Badge>
    )
  }

  return (
    <section className={cn("relative overflow-hidden", getVariantStyles())}>
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[url('/patterns/grid.svg')] bg-white/20" />
      </div>

      {/* Floating Elements */}
      <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full animate-blob" />
      <div className="absolute bottom-10 right-10 w-32 h-32 bg-white/10 rounded-full animate-blob animation-delay-2000" />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center space-y-8">
            {/* Icon */}
            <div className="flex justify-center">
              {getVariantIcon()}
            </div>

            {/* Content */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight">
                {title}
              </h2>
              <p className="text-xl opacity-90 max-w-2xl mx-auto">
                {description}
              </p>
            </div>

            {/* Urgency Badge */}
            {urgency && (
              <div className="flex justify-center">
                {getUrgencyBadge()}
              </div>
            )}

            {/* Stats */}
            {stats && stats.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-2xl mx-auto">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-3xl font-bold mb-1">
                      {stat.value}
                    </div>
                    <div className="text-sm opacity-80">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Button
                variant="secondary"
                size="lg"
                text={primaryCTA.text}
                className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-medium shadow-lg"
                href={primaryCTA.href}
              >
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>

              {secondaryCTA && (
                <Button
                  variant="outline"
                  size="lg"
                  text={secondaryCTA.text}
                  className="border-2 border-white/50 text-white hover:bg-white/10 px-8 py-4 text-lg font-medium"
                  href={secondaryCTA.href}
                />
              )}
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm opacity-90">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4" />
                <span>30-Day Guarantee</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full" />
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4" />
                <span>Instant Access</span>
              </div>
              <div className="hidden sm:block w-1 h-1 bg-white/50 rounded-full" />
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>10,000+ Users</span>
              </div>
            </div>

            {/* Guarantees */}
            {guarantees.length > 0 && (
              <div className="pt-8">
                <Button
                  variant="outline"
                  size="md"
                  text=""
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white/80 hover:text-white flex items-center gap-2"
                >
                  <CheckCircle className="h-4 w-4" />
                  What's included?
                  <ChevronDown className={cn(
                    "h-4 w-4 transition-transform",
                    isExpanded && "rotate-180"
                  )} />
                </Button>

                {isExpanded && (
                  <div className="mt-6 grid sm:grid-cols-2 gap-4 max-w-2xl mx-auto">
                    {guarantees.map((guarantee, index) => (
                      <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 text-white p-4 rounded-lg">
                        <div className="flex items-start gap-3">
                          <CheckCircle className="h-5 w-5 text-green-300 mt-0.5 flex-shrink-0" />
                          <span className="text-sm">{guarantee}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Social Proof */}
            {socialProof && (
              <div className="pt-8 border-t border-white/20">
                <div className="flex items-center justify-center gap-2 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>
                <p className="text-sm opacity-90 italic">
                  "{socialProof}"
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

// Specialized CTA Variants

export function NewsletterCTA() {
  return (
    <CTASection
      title="Stay Ahead of the Curve"
      description="Join 50,000+ marketers getting weekly insights on digital trends, strategies, and tactics that drive results."
      primaryCTA={{
        text: "Subscribe Free",
        href: "#newsletter",
        variant: 'primary'
      }}
      socialProof="The best marketing newsletter I've ever subscribed to. Actionable insights every week."
      guarantees={[
        "No spam, ever",
        "Unsubscribe anytime",
        "Exclusive content",
        "Free resources"
      ]}
      stats={[
        { value: "50K+", label: "Subscribers" },
        { value: "95%", label: "Open Rate" },
        { value: "4.8/5", label: "Rating" }
      ]}
      variant="ebook"
    />
  )
}

export function ConsultationCTA() {
  return (
    <CTASection
      title="Ready to Transform Your Marketing?"
      description="Book a free 30-minute consultation and get actionable insights tailored to your business needs."
      primaryCTA={{
        text: "Book Free Consultation",
        href: "#consultation",
        variant: 'primary'
      }}
      secondaryCTA={{
        text: "View Case Studies",
        href: "#case-studies"
      }}
      urgency={{
        text: "Limited slots available",
        deadline: "This week only"
      }}
      guarantees={[
        "No obligation",
        "Customized strategy",
        "Immediate value",
        "Follow-up support"
      ]}
      stats={[
        { value: "200+", label: "Businesses Helped" },
        { value: "3.5x", label: "Average ROI" },
        { value: "30", label: "Minute Session" }
      ]}
      variant="consultation"
    />
  )
}

export function WebinarCTA() {
  return (
    <CTASection
      title="Free Masterclass: The Future of Digital Marketing"
      description="Learn proven strategies that top agencies use to generate 7-figure results for their clients."
      primaryCTA={{
        text: "Save My Spot",
        href: "#webinar",
        variant: 'primary'
      }}
      secondaryCTA={{
        text: "View Recording",
        href: "#recording"
      }}
      urgency={{
        text: "Next session in 3 days",
        deadline: "Limited to 100 participants"
      }}
      guarantees={[
        "Live Q&A session",
        "Downloadable resources",
        "Certificate of completion",
        "Recording access"
      ]}
      stats={[
        { value: "1000+", label: "Attendees" },
        { value: "4.9/5", label: "Satisfaction" },
        { value: "2 hours", label: "Duration" }
      ]}
      variant="webinar"
    />
  )
}

// Mini CTA Component for inline use
export function MiniCTA({
  title,
  description,
  ctaText,
  ctaHref,
  compact = false
}: {
  title: string;
  description: string;
  ctaText: string;
  ctaHref: string;
  compact?: boolean;
}) {
  return (
    <div className={cn(
      "bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-lg",
      compact ? "p-6" : "p-8"
    )}>
      <div className={cn(
        "flex items-center justify-between",
        compact ? "gap-4" : "gap-8"
      )}>
        <div className={cn(compact ? "flex-1" : "flex-1 max-w-2xl")}>
          <h3 className={cn(
            "font-bold text-gray-900",
            compact ? "text-lg" : "text-xl"
          )}>
            {title}
          </h3>
          <p className={cn(
            "text-gray-600 mt-1",
            compact ? "text-sm" : "text-base"
          )}>
            {description}
          </p>
        </div>
        <Button
          variant="primary"
          size={compact ? "sm" : "md"}
          text={ctaText}
          href={ctaHref}
          className={cn(
            "shrink-0",
            compact ? "px-4 py-2 text-sm" : "px-6 py-3"
          )}
        >
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}