import { AgencyLayout } from '@/components/common/AgencyLayout'
import { Hero, Section, Card, Navigation, Footer } from '@/components/ui'
import { AboutStatsGrid } from '@/components/ui/about-stat'
import { ValueCardsGrid } from '@/components/ui/value-cards'
import { Fortune500Showcase } from '@/components/ui/client-showcase'
import { NavigationProps, FooterProps } from '@/types/ui-components'
import uiConfig from '@/lib/ui-config.json'

export default function HomePage() {
  const navigation: NavigationProps = uiConfig.navigation as NavigationProps
  const footer: FooterProps = uiConfig.footer as FooterProps

  return (
    <AgencyLayout navigation={navigation} footer={footer}>
      {/* Hero Section */}
      <Hero {...uiConfig.hero as any} />

      {/* Enhanced About Section */}
      <Section
        id="about"
        background="white"
      >
        <div className="max-w-7xl mx-auto">
          {/* Header with credibility badges */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600 rounded-full text-sm font-semibold mb-6 shadow-sm">
              <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
              Forbes 30 Under 30 Founded Agency
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-6 leading-tight">
              To inspire and guide
              <span className="block text-blue-600">to a new level</span>
            </h2>

            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              16:16 is a full-cycle marketing agency founded by a Forbes 30 Under 30 media producer
              with 13+ years of experience scaling iconic brands across Kazakhstan, UAE, and MENA markets.
            </p>
          </div>

          {/* Two-column layout: Content + Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start mb-20">
            {/* Left column: Enhanced content */}
            <div className="space-y-8">
              {/* Key achievements with bullet points */}
              <div className="prose prose-lg prose-gray max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">
                  We specialize in <span className="font-semibold text-blue-600">growth marketing</span> for fast-moving brands,
                  government organizations, and <span className="font-semibold text-blue-600">Fortune 500 companies</span> across multiple sectors.
                </p>

                <div className="grid gap-4 mt-6">
                  {[
                    {
                      icon: "🏆",
                      title: "Fortune 500 Partnerships",
                      description: "Strategic campaigns for Coca-Cola, Samsung, Huawei, P&G, and Snickers"
                    },
                    {
                      icon: "📈",
                      title: "Platform Scaling",
                      description: "Built platforms to 4-5M+ followers with sustainable growth"
                    },
                    {
                      icon: "🎯",
                      title: "Government Excellence",
                      description: "Managed presidential campaigns and national initiatives"
                    }
                  ].map((achievement, index) => (
                    <div key={index} className="flex gap-4 p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors duration-300">
                      <span className="text-2xl">{achievement.icon}</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">{achievement.title}</h4>
                        <p className="text-gray-600 text-sm">{achievement.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Value Cards */}
              <div className="mt-12">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-6">Our Core Values</h3>
                <ValueCardsGrid
                  cards={[
                    {
                      title: "Mission",
                      description: "To inspire and guide to a new level",
                      icon: "target"
                    },
                    {
                      title: "Vision",
                      description: "To become the #1 agency that delivers powerful, world-class communication",
                      icon: "eye"
                    },
                    {
                      title: "Purpose",
                      description: "Improve lives through creative, human-centered solutions",
                      icon: "heart"
                    },
                    {
                      title: "Markets",
                      description: "Russian, Arabic & English fluency with deep cultural understanding",
                      icon: "globe"
                    }
                  ]}
                />
              </div>
            </div>

            {/* Right column: Enhanced stats */}
            <div className="lg:sticky lg:top-8">
              <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 p-8 rounded-2xl">
                <h3 className="text-2xl font-serif font-bold text-gray-900 mb-8 text-center">
                  Our Impact in Numbers
                </h3>
                <AboutStatsGrid
                  stats={[
                    {
                      value: '30',
                      label: 'Forbes Under 30',
                    },
                    {
                      value: '500',
                      label: 'Fortune Clients',
                    },
                    {
                      value: '15+',
                      label: 'Team Specialists',
                    },
                    {
                      value: 'UAE',
                      label: 'Dubai Based',
                    }
                  ]}
                  className="gap-6"
                />
              </div>
            </div>
          </div>
          {/* TODO: after talking with client */}
          {/* Client Showcase Section */}
          {/* <div className="mt-20 pt-20 border-t border-gray-200">
            <Fortune500Showcase />
          </div> */}
        </div>
      </Section>

      {/* Services Section */}
      <Section
        id="services"
        tag="What We Do"
        title="Core Capabilities"
        subtitle="From strategy to execution—all in-house"
        background="light"
        cards={uiConfig.sections.find(s => s.id === 'services')?.cards as any}
      />

      {/* Packages Section */}
      <Section
        id="packages"
        tag="Investment"
        title="Service Packages"
        subtitle="Scalable packages for every business stage—from 10,000 to 150,000 AED"
        background="white"
        cards={uiConfig.sections.find(s => s.id === 'packages')?.cards as any}
      />

      {/* Custom Case Studies Section */}
      <Section
        id="cases"
        tag="Our Work"
        title="Proven Track Record"
        subtitle="Selected client success stories"
        background="accent"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-6">
          {[
            {
              badge: { text: 'Real Estate Tech' },
              title: 'PropertyPulse.AI',
              description: 'AI-powered property analysis platform for Dubai\'s competitive broker market with government data integration.',
              stats: [
                { value: '327', label: 'Active Users' },
                { value: '#1', label: 'Market Position' }
              ]
            },
            {
              badge: { text: 'Fortune 500' },
              title: 'Global Brand Campaigns',
              description: 'Large-scale campaigns for Coca-Cola, Samsung, Huawei, P&G, and Snickers across Kazakhstan and CIS markets.',
              stats: [
                { value: '5+', label: 'Major Brands' },
                { value: 'CIS', label: 'Market Reach' }
              ]
            },
            {
              badge: { text: 'Digital Growth' },
              title: 'Platform Scaling',
              description: 'Successfully built and scaled multiple digital platforms to millions of followers through strategic content.',
              stats: [
                { value: '4-5M+', label: 'Followers' },
                { value: 'Multi', label: 'Platforms' }
              ]
            }
          ].map((caseItem, index) => (
            <Card
              key={index}
              type="case"
              badge={caseItem.badge}
              title={caseItem.title}
              description={caseItem.description}
              stats={caseItem.stats}
            />
          ))}
        </div>
      </Section>

      {/* Why Us Section */}
      <Section
        id="why-us"
        tag="Why 16:16"
        title="What Sets Us Apart"
        subtitle="The key differentiators that make us the perfect choice"
        background="light"
        cards={uiConfig.sections.find(s => s.id === 'why-us')?.cards as any}
      />

      {/* Team Section */}
      {/* <Section
        id="team"
        tag="Our Team"
        title="Meet the Experts"
        subtitle="The talented professionals behind our success"
        background="light"
        cards={uiConfig.sections.find(s => s.id === 'team')?.cards as any}
      /> */}

      {/* Blog Section */}
      <Section
        id="blog"
        tag="Insights"
        title="Knowledge Hub"
        subtitle="Marketing insights and industry expertise"
        background="white"
        cards={uiConfig.sections.find(s => s.id === 'blog')?.cards as any}
      />

      {/* Contact Section */}
      <Section
        id="contact"
        background="white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h3 className="text-3xl font-serif font-medium mb-4">
              Let's Create Something Great
            </h3>
            <p className="text-gray-600 mb-8">
              Ready to transform your marketing and drive measurable growth? Our team can begin immediately upon contract signing.
            </p>

            <div className="space-y-4">
              {[
                { icon: '📍', title: 'Location', desc: 'Dubai, UAE' },
                { icon: '⏰', title: 'Response Time', desc: 'Within 24 hours' },
                { icon: '🚀', title: 'Onboarding', desc: '48-72 hours after signing' }
              ].map((item, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <strong className="block text-gray-900">{item.title}</strong>
                    <span className="text-gray-600">{item.desc}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-10 rounded-2xl">
            {/* Contact form would go here */}
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">Contact form component would be implemented here</p>
            </div>
          </div>
        </div>
      </Section>
    </AgencyLayout>
  )
}
