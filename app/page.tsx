import { AgencyLayout } from '@/components/common/AgencyLayout'
import { Hero, Section, Card, Navigation, Footer } from '@/components/ui'
import { NavigationProps, FooterProps } from '@/types/ui-components'
import uiConfig from '@/lib/ui-config.json'

export default function HomePage() {
  const navigation: NavigationProps = uiConfig.navigation as NavigationProps
  const footer: FooterProps = uiConfig.footer as FooterProps

  return (
    <AgencyLayout navigation={navigation} footer={footer}>
      {/* Hero Section */}
      <Hero {...uiConfig.hero as any} />

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

      {/* About Section Example */}
      <Section
        id="about"
        tag="About Us"
        title="Who We Are"
        subtitle="Industry leaders with proven track record"
        background="white"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h3 className="text-3xl font-serif font-medium mb-6">
              To inspire and guide to a new level
            </h3>
            <p className="text-gray-600 mb-4">
              16:16 is a full-cycle marketing agency founded by Forbes 30 Under 30 media producer
              with 13+ years of experience scaling brands across Kazakhstan, UAE, and MENA markets.
            </p>
            <p className="text-gray-600 mb-4">
              We specialize in growth marketing for fast-moving brands, government organizations,
              and Fortune 500 companies including Coca-Cola, Samsung, Huawei, P&G, and Snickers.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { value: '30', label: 'Forbes Under 30' },
              { value: '500', label: 'Fortune Clients' },
              { value: '15+', label: 'Team Specialists' },
              { value: 'UAE', label: 'Dubai Based' }
            ].map((stat, index) => (
              <Card
                key={index}
                type="stat"
                title={stat.value}
                subtitle={stat.label}
              />
            ))}
          </div>
        </div>
      </Section>

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
      <Section
        id="team"
        tag="Our Team"
        title="Meet the Experts"
        subtitle="The talented professionals behind our success"
        background="light"
        cards={uiConfig.sections.find(s => s.id === 'team')?.cards as any}
      />

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
