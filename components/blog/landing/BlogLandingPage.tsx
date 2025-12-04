'use client'

import { useState, useEffect } from 'react'
import { BlogHero } from './BlogHero'
import { ExecutiveSummary } from './ExecutiveSummary'
import { InsightSection } from './InsightSection'
import { QuoteSection, QuoteCard } from './QuoteCard'
import { CTASection, MiniCTA, NewsletterCTA, ConsultationCTA } from './CTASection'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Separator } from '@/components/ui/Separator'

interface BlogLandingPageProps {
  post: {
    id: string;
    title: string;
    excerpt: string;
    content: any;
    category: string;
    readMin: number;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
    targetAudience: string[];
    cover?: {
      url: string;
      alt: string;
    };
    createdAt: string;
    updatedAt: string;
    author: {
      name: string;
      avatar: string;
      role: string;
      company?: string;
    };
    keyStats?: Array<{
      value: string;
      label: string;
      icon?: string;
    }>;
  };
  relatedContent?: {
    keyTakeaways: string[];
    mainPoints: Array<{
      icon?: string;
      title: string;
      description: string;
    }>;
    insights: Array<{
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
    }>;
    testimonials: Array<{
      quote: string;
      author: {
        name: string;
        role: string;
        company: string;
        avatar: string;
      };
      context?: string;
      metrics?: {
        type: 'growth' | 'roi' | 'time' | 'satisfaction';
        value: string;
        label: string;
      }[];
    }>;
  };
}

export function BlogLandingPage({ post, relatedContent }: BlogLandingPageProps) {
  const [readingProgress, setReadingProgress] = useState(0)
  const [activeSection, setActiveSection] = useState('hero')

  useEffect(() => {
    const handleScroll = () => {
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrolled = window.scrollY
      const progress = (scrolled / documentHeight) * 100
      setReadingProgress(Math.min(progress, 100))

      // Update active section
      const sections = ['hero', 'executive-summary', 'insights', 'testimonials', 'cta']
      const currentSection = sections.find(section => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (currentSection) {
        setActiveSection(currentSection)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Default content if not provided
  const defaultContent = {
    keyTakeaways: [
      "Understanding the fundamental principles of modern marketing strategies",
      "Implementing data-driven approaches for better ROI",
      "Leveraging AI and automation tools effectively",
      "Building sustainable customer acquisition channels",
      "Measuring and optimizing marketing performance"
    ],
    mainPoints: [
      {
        icon: 'lightbulb',
        title: "Strategic Foundation",
        description: "Learn how to build a solid marketing strategy that aligns with business objectives and market opportunities."
      },
      {
        icon: 'target',
        title: "Target Audience Analysis",
        description: "Discover proven methods for identifying, understanding, and reaching your ideal customers."
      },
      {
        icon: 'zap',
        title: "Implementation Framework",
        description: "Get step-by-step guidance on executing marketing campaigns that drive measurable results."
      }
    ],
    insights: [
      {
        number: 1,
        title: "Understanding Your Customer Journey",
        summary: "Map out every touchpoint to optimize conversion rates",
        benefits: [
          "Increased conversion rates by up to 300%",
          "Better customer retention and loyalty",
          "Improved customer lifetime value",
          "More efficient marketing spend"
        ],
        keyPoints: [
          {
            title: "Touchpoint Mapping",
            description: "Identify all customer interactions across different channels and stages of their journey."
          },
          {
            title: "Behavioral Analysis",
            description: "Use data analytics to understand how customers move through your funnel."
          },
          {
            title: "Optimization Strategies",
            description: "Implement proven tactics to improve conversion rates at each stage."
          }
        ],
        visualType: 'chart',
        caseStudy: {
          company: "TechCorp Inc.",
          result: "Increased conversion rate from 2.1% to 6.3% within 3 months",
          metric: "300% Increase"
        },
        cta: {
          text: "Download Journey Map Template",
          href: "#template",
          type: 'secondary'
        }
      },
      {
        number: 2,
        title: "Data-Driven Decision Making",
        summary: "Transform your marketing strategy with actionable insights",
        benefits: [
          "Eliminate guesswork in marketing decisions",
          "Allocate budget more effectively",
          "Predict campaign performance",
          "Identify new growth opportunities"
        ],
        keyPoints: [
          {
            title: "Key Performance Indicators",
            description: "Define and track the metrics that matter most for your business."
          },
          {
            title: "Analytics Implementation",
            description: "Set up comprehensive tracking to gather meaningful data."
          },
          {
            title: "A/B Testing Framework",
            description: "Continuously optimize campaigns through systematic testing."
          }
        ],
        visualType: 'image',
        reverse: true,
        caseStudy: {
          company: "E-commerce Plus",
          result: "Reduced CPA by 45% while maintaining ROAS above 5:1",
          metric: "45% Cost Reduction"
        },
        cta: {
          text: "Get Free Analytics Audit",
          href: "#audit",
          type: 'primary'
        }
      }
    ],
    testimonials: [
      {
        quote: "This comprehensive guide transformed our approach to digital marketing. We've seen a 200% increase in qualified leads in just 2 months.",
        author: {
          name: "Sarah Johnson",
          role: "Marketing Director",
          company: "Innovation Labs",
          avatar: "/avatars/sarah.jpg"
        },
        context: "B2B SaaS Company",
        metrics: [
          { type: 'growth', value: '200%', label: 'Lead Increase' },
          { type: 'roi', value: '4.2x', label: 'ROI' }
        ]
      },
      {
        quote: "Finally, a marketing resource that provides actionable strategies instead of just theory. The implementation checklist alone was worth thousands.",
        author: {
          name: "Michael Chen",
          role: "CEO",
          company: "StartupScale",
          avatar: "/avatars/michael.jpg"
        },
        context: "Early-Stage Startup",
        metrics: [
          { type: 'time', value: '50%', label: 'Time Saved' },
          { type: 'growth', value: '150%', label: 'Growth Rate' }
        ]
      },
      {
        quote: "The step-by-step framework helped our team align and execute campaigns more effectively. Best marketing investment we've made this year.",
        author: {
          name: "Emma Rodriguez",
          role: "Head of Growth",
          company: "RetailMax",
          avatar: "/avatars/emma.jpg"
        },
        context: "E-commerce Retail",
        metrics: [
          { type: 'roi', value: '5.8x', label: 'Return on Ad Spend' },
          { type: 'satisfaction', value: '95%', label: 'Team Satisfaction' }
        ]
      }
    ]
  }

  const content = { ...defaultContent, ...relatedContent }

  return (
    <article className="min-h-screen bg-background">
      {/* Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-border z-50">
        <div
          className="h-full bg-gradient-to-r from-blue-500 to-purple-600 transition-all duration-150"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Sticky Navigation */}
      <nav className="sticky top-1 z-40 bg-background/80 backdrop-blur-lg border-b rounded-b-2xl mx-4 md:mx-8 lg:mx-auto lg:max-w-7xl">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <span className="text-sm font-medium text-muted-foreground">
                {post.title}
              </span>
              <div className="hidden md:flex items-center gap-4 text-sm">
                {['executive-summary', 'insights', 'testimonials', 'cta'].map((section) => (
                  <button
                    key={section}
                    onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: 'smooth' })}
                    className={`capitalize transition-colors ${
                      activeSection === section ? 'text-blue-600 font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {section.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm">
                Share
              </Button>
              <Button variant="ghost" size="sm">
                Bookmark
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="hero">
        <BlogHero
          post={{
            title: post.title,
            excerpt: post.excerpt,
            category: post.category,
            cover: post.cover?.url,
            readTime: post.readMin,
            difficulty: post.difficulty,
            targetAudience: post.targetAudience.join(', '),
            keyStats: post.keyStats
          }}
          author={post.author}
        />
      </section>

      {/* Executive Summary */}
      <section id="executive-summary">
        <ExecutiveSummary
          readTime={post.readMin}
          keyTakeaways={content.keyTakeaways}
          mainPoints={content.mainPoints}
          targetAudience={post.targetAudience}
          difficulty={post.difficulty}
        />
      </section>

      {/* Main Content - Insight Sections */}
      <main id="insights">
        {content.insights.map((insight, index) => (
          <InsightSection
            key={index}
            {...insight}
          />
        ))}
      </main>

      {/* Testimonials Section */}
      <section id="testimonials">
        <QuoteSection
          title="Success Stories"
          subtitle="See how businesses like yours have transformed their marketing with these strategies"
          quotes={content.testimonials}
          background="gray"
        />
      </section>

      {/* Mini CTA Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <MiniCTA
              title="Ready to implement these strategies?"
              description="Get our free implementation checklist and start seeing results in 30 days."
              ctaText="Download Checklist"
              ctaHref="#checklist"
            />
          </div>
        </div>
      </section>

      {/* Main CTA Section */}
      <section id="cta">
        <ConsultationCTA />
      </section>

      {/* Additional Resources */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Additional Resources</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-3">Free Tools</h3>
                <p className="text-muted-foreground mb-4">
                  Access our collection of marketing calculators and templates.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Browse Tools
                </Button>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-3">Video Tutorials</h3>
                <p className="text-muted-foreground mb-4">
                  Watch step-by-step implementation guides and expert interviews.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  Watch Now
                </Button>
              </Card>
              <Card className="p-6 hover:shadow-lg transition-shadow">
                <h3 className="text-lg font-semibold mb-3">Case Studies</h3>
                <p className="text-muted-foreground mb-4">
                  Explore detailed examples from successful marketing campaigns.
                </p>
                <Button variant="outline" size="sm" className="w-full">
                  View Cases
                </Button>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <NewsletterCTA />
    </article>
  )
}