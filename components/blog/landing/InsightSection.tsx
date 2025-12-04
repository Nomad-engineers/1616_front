'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Lightbulb,
  TrendingUp,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  PlayCircle,
  Download
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

interface InsightSectionProps {
  number: number;
  title: string;
  summary: string;
  benefits: string[];
  keyPoints: Array<{
    title: string;
    description: string;
    icon?: string;
  }>;
  visualType: 'image' | 'chart' | 'icon' | 'video' | 'download';
  visualSrc?: string;
  caseStudy?: {
    company: string;
    result: string;
    metric: string;
  };
  cta?: {
    text: string;
    href: string;
    type: 'primary' | 'secondary';
  };
  reverse?: boolean;
}

export function InsightSection({
  number,
  title,
  summary,
  benefits,
  keyPoints,
  visualType,
  visualSrc,
  caseStudy,
  cta,
  reverse = false
}: InsightSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const getIcon = (type: string) => {
    switch (type) {
      case 'lightbulb':
        return <Lightbulb className="h-6 w-6 text-yellow-500" />
      case 'trending':
        return <TrendingUp className="h-6 w-6 text-green-500" />
      case 'target':
        return <Target className="h-6 w-6 text-blue-500" />
      case 'zap':
        return <Zap className="h-6 w-6 text-purple-500" />
      default:
        return <CheckCircle className="h-6 w-6 text-blue-500" />
    }
  }

  const renderVisual = () => {
    switch (visualType) {
      case 'image':
        return visualSrc ? (
          <div className="relative rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={visualSrc}
              alt={title}
              width={500}
              height={400}
              className="w-full h-full object-cover"
            />
          </div>
        ) : (
          <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
            <Lightbulb className="h-16 w-16 text-blue-500" />
          </div>
        )

      case 'chart':
        return (
          <div className="bg-white p-6 rounded-2xl shadow-lg">
            <div className="h-64 flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg">
              <div className="text-center">
                <TrendingUp className="h-12 w-12 text-blue-500 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive Chart</p>
                <p className="text-xs text-muted-foreground mt-1">Data visualization</p>
              </div>
            </div>
          </div>
        )

      case 'video':
        return (
          <div className="relative rounded-2xl overflow-hidden shadow-lg group cursor-pointer">
            <div className="w-full h-64 bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
              <PlayCircle className="h-16 w-16 text-white relative z-10 group-hover:scale-110 transition-transform" />
              <div className="absolute bottom-4 left-4 text-white text-sm">
                Video Tutorial
              </div>
            </div>
          </div>
        )

      case 'download':
        return (
          <div className="bg-white p-6 rounded-2xl shadow-lg border-2 border-dashed border-gray-300">
            <div className="text-center">
              <Download className="h-12 w-12 text-blue-500 mx-auto mb-3" />
              <h4 className="font-semibold mb-1">Downloadable Resource</h4>
              <p className="text-sm text-muted-foreground mb-3">Get the complete guide</p>
              <Button variant="outline" size="sm">
                Download PDF
              </Button>
            </div>
          </div>
        )

      case 'icon':
      default:
        return (
          <div className="w-full h-64 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center">
            <div className="text-center">
              <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center shadow-lg mb-4 mx-auto">
                {getIcon('lightbulb')}
              </div>
              <p className="text-sm text-muted-foreground">Key Insight</p>
            </div>
          </div>
        )
    }
  }

  return (
    <section className={cn(
      "py-16 md:py-24",
      reverse ? "bg-gray-50" : "bg-white"
    )}>
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                {number}
              </div>
              <Badge variant="secondary" className="text-sm">
                Key Insight
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              {title}
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {summary}
            </p>
          </div>

          {/* Main Content */}
          <div className={cn(
            "grid lg:grid-cols-2 gap-12 items-center",
            reverse && "lg:grid-cols-2"
          )}>
            {/* Visual Element */}
            <div className={cn(
              "order-2",
              reverse && "lg:order-1"
            )}>
              {renderVisual()}
            </div>

            {/* Text Content */}
            <div className={cn(
              "order-1 space-y-6",
              reverse && "lg:order-2"
            )}>
              {/* Benefits */}
              <div>
                <h3 className="text-lg font-semibold mb-3">Key Benefits:</h3>
                <div className="space-y-2">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-muted-foreground">{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Points */}
              <div className="space-y-4">
                {keyPoints.map((point, index) => (
                  <Card key={index} className="p-4 border-l-4 border-l-blue-500">
                    <div className="flex items-start gap-3">
                      {point.icon && (
                        <span className="text-2xl">{point.icon}</span>
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold mb-1">{point.title}</h4>
                        <p className="text-sm text-muted-foreground">
                          {point.description}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              {/* Case Study */}
              {caseStudy && (
                <Card className="p-6 bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="bg-green-100 text-green-800">
                      Success Story
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-1">{caseStudy.company}</h4>
                  <p className="text-sm text-muted-foreground mb-2">{caseStudy.result}</p>
                  <div className="text-2xl font-bold text-green-600">
                    {caseStudy.metric}
                  </div>
                </Card>
              )}

              {/* CTA */}
              {cta && (
                <div className="pt-4">
                  <Button
                    variant={cta.type === 'primary' ? 'default' : 'outline'}
                    size="lg"
                    className="w-full sm:w-auto"
                    href={cta.href}
                  >
                    {cta.text}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>

          {/* Expandable Details */}
          <div className="mt-12 text-center">
            <Button
              variant="ghost"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-blue-600 hover:text-blue-700"
            >
              {isExpanded ? 'Show Less' : 'Learn More'}
              <ArrowRight className={cn(
                "ml-2 h-4 w-4 transition-transform",
                isExpanded && "rotate-90"
              )} />
            </Button>

            {isExpanded && (
              <div className="mt-8 p-6 bg-gray-50 rounded-2xl text-left max-w-4xl mx-auto">
                <h3 className="text-lg font-semibold mb-3">Deep Dive</h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground">
                    This section contains additional details, implementation steps,
                    and expert insights that help you apply these concepts in practice.
                    Consider this your comprehensive guide to mastering this particular
                    aspect of the topic.
                  </p>
                  <ul className="mt-4 space-y-2">
                    <li>Step-by-step implementation guide</li>
                    <li>Common pitfalls and how to avoid them</li>
                    <li>Advanced techniques and optimizations</li>
                    <li>Tools and resources recommendations</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}