'use client'

import { useState } from 'react'
import {
  Clock,
  CheckCircle,
  ArrowRight,
  ChevronDown,
  ChevronUp,
  Lightbulb,
  Target,
  Zap
} from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'

interface ExecutiveSummaryProps {
  readTime: number;
  keyTakeaways: string[];
  mainPoints: Array<{
    icon?: string;
    title: string;
    description: string;
  }>;
  targetAudience: string[];
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
}

export function ExecutiveSummary({
  readTime,
  keyTakeaways,
  mainPoints,
  targetAudience,
  difficulty
}: ExecutiveSummaryProps) {
  const [isExpanded, setIsExpanded] = useState(false)

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

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'lightbulb':
        return <Lightbulb className="h-5 w-5 text-yellow-500" />
      case 'target':
        return <Target className="h-5 w-5 text-blue-500" />
      case 'zap':
        return <Zap className="h-5 w-5 text-purple-500" />
      default:
        return <CheckCircle className="h-5 w-5 text-green-500" />
    }
  }

  return (
    <section id="executive-summary" className="py-16 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <Clock className="h-5 w-5 text-blue-600" />
              <Badge variant="secondary" className="text-sm">
                {readTime} minute read
              </Badge>
              <Badge
                variant="outline"
                className={getDifficultyColor(difficulty)}
              >
                {difficulty}
              </Badge>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">
              In 60 Seconds
            </h2>
            <p className="text-xl text-muted-foreground">
              Here's everything you need to know about this article
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 text-center bg-white/80 backdrop-blur-sm">
              <div className="text-3xl font-bold text-blue-600 mb-2">
                {keyTakeaways.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Key Takeaways
              </div>
            </Card>
            <Card className="p-6 text-center bg-white/80 backdrop-blur-sm">
              <div className="text-3xl font-bold text-purple-600 mb-2">
                {mainPoints.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Main Points
              </div>
            </Card>
            <Card className="p-6 text-center bg-white/80 backdrop-blur-sm">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {readTime}m
              </div>
              <div className="text-sm text-muted-foreground">
                Reading Time
              </div>
            </Card>
          </div>

          {/* Key Takeaways */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-green-500" />
              Key Takeaways
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              {keyTakeaways.slice(0, isExpanded ? keyTakeaways.length : 4).map((takeaway, index) => (
                <Card key={index} className="p-4 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                      {index + 1}
                    </div>
                    <p className="text-sm text-gray-700">{takeaway}</p>
                  </div>
                </Card>
              ))}
            </div>

            {keyTakeaways.length > 4 && (
              <div className="text-center mt-6">
                <Button
                  variant="outline"
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="flex items-center gap-2"
                >
                  {isExpanded ? (
                    <>
                      <ChevronUp className="h-4 w-4" />
                      Show Less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-4 w-4" />
                      Show {keyTakeaways.length - 4} More
                    </>
                  )}
                </Button>
              </div>
            )}
          </div>

          {/* Main Points */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6">Main Points</h3>
            <div className="grid md:grid-cols-1 gap-4">
              {mainPoints.map((point, index) => (
                <Card key={index} className="p-6 bg-white/80 backdrop-blur-sm hover:bg-white/90 transition-colors">
                  <div className="flex items-start gap-4">
                    {point.icon && (
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0">
                        {getIcon(point.icon)}
                      </div>
                    )}
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">
                        {point.title}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {point.description}
                      </p>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Target Audience */}
          <div className="mb-12">
            <h3 className="text-xl font-semibold mb-6">Who This Is For</h3>
            <div className="flex flex-wrap gap-3">
              {targetAudience.map((audience, index) => (
                <Badge key={index} variant="outline" className="px-4 py-2 bg-white/80 backdrop-blur-sm">
                  {audience}
                </Badge>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center">
            <div className="inline-flex items-center gap-4 p-6 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg">
              <div className="text-left">
                <p className="font-semibold text-gray-900">Ready to dive deeper?</p>
                <p className="text-sm text-gray-600">Continue reading for detailed insights and strategies</p>
              </div>
              <Button size="lg" href="#main-content">
                Continue Reading
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}