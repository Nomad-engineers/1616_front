'use client'

import React from 'react'
import {
  Hero,
  Navigation,
  Section,
  Footer,
  Button,
  PackageCard,
  CaseStudyCard,
  TeamMemberCard,
  BlogPostCard,
  AboutStatCard,
  ServiceItemCard
} from '../index'
import { HeroProps, NavigationProps, SectionProps, FooterProps, Package, CaseStudy, TeamMember, BlogPost, AboutStat, ServiceItem } from '@/types/ui-components'

// Example Navigation Data
const navigationData: NavigationProps = {
  logo: {
    src: '/logo.svg',
    alt: '16:16 Agency',
    height: '40px'
  },
  links: [
    { text: 'Services', href: '#services', active: false },
    { text: 'About', href: '#about', active: true },
    { text: 'Case Studies', href: '#cases', active: false },
    { text: 'Team', href: '#team', active: false },
    { text: 'Blog', href: '#blog', active: false },
    { text: 'Contact', href: '#contact', active: false }
  ],
  cta: {
    variant: 'cta',
    size: 'md',
    text: 'Get Started',
    href: '#contact'
  }
}

// Example Hero Data
const heroData: HeroProps = {
  tag: 'Digital Marketing Agency',
  title: 'We Create <span class="text-yellow-500">Powerful</span> Digital Experiences',
  description: 'Full-service digital marketing agency helping brands grow through strategic, creative, and data-driven solutions.',
  cta: {
    variant: 'primary',
    size: 'lg',
    text: 'Start Your Project',
    href: '#contact'
  },
  stats: [
    { value: '500+', label: 'Projects Completed' },
    { value: '95%', label: 'Client Satisfaction' },
    { value: '50+', label: 'Team Members' }
  ]
}

// Example Package Data
const packageData: Package[] = [
  {
    name: 'Starter',
    price: { amount: '2,999', currency: '$', period: 'mo' },
    target: 'Perfect for small businesses',
    specialists: '2',
    features: [
      'Social Media Management',
      'Content Creation',
      'Monthly Reporting',
      'Email Support'
    ],
    button: {
      variant: 'package',
      size: 'md',
      text: 'Choose Starter'
    }
  },
  {
    name: 'Growth',
    price: { amount: '5,999', currency: '$', period: 'mo' },
    target: 'Ideal for growing companies',
    specialists: '4',
    features: [
      'Everything in Starter',
      'SEO Optimization',
      'PPC Campaigns',
      'Video Production',
      'Priority Support'
    ],
    featured: true,
    button: {
      variant: 'secondary',
      size: 'md',
      text: 'Choose Growth'
    }
  },
  {
    name: 'Enterprise',
    price: { amount: '9,999', currency: '$', period: 'mo' },
    target: 'For large organizations',
    specialists: '8',
    features: [
      'Everything in Growth',
      'Custom Strategy',
      'Multi-Language Campaigns',
      'Advanced Analytics',
      'Dedicated Team'
    ],
    button: {
      variant: 'package',
      size: 'md',
      text: 'Choose Enterprise'
    }
  }
]

// Example Case Study Data
const caseStudyData: CaseStudy[] = [
  {
    tag: 'E-commerce',
    title: 'TechStart Growth Campaign',
    description: 'How we helped a tech startup increase online sales by 300% in 6 months.',
    stats: [
      { value: '300%', label: 'Sales Increase' },
      { value: '2.5M', label: 'Reach' }
    ]
  }
]

// Example Service Data
const serviceData: ServiceItem[] = [
  {
    icon: '📈',
    title: 'Strategic Marketing',
    description: 'Data-driven marketing strategies tailored to your business goals and target audience.'
  },
  {
    icon: '🎬',
    title: 'Content Production',
    description: 'High-quality video, photo, and written content that tells your brand story.'
  },
  {
    icon: '👥',
    title: 'Influencer Marketing',
    description: 'Connect with your audience through authentic influencer partnerships.'
  }
]

// Example Footer Data
const footerData: FooterProps = {
  logo: {
    src: '/logo-white.svg',
    alt: '16:16 Agency'
  },
  description: 'Full-service digital marketing agency delivering exceptional results for brands worldwide.',
  columns: [
    {
      title: 'Services',
      links: [
        { text: 'Digital Marketing', href: '#services' },
        { text: 'Content Creation', href: '#services' },
        { text: 'Social Media', href: '#services' },
        { text: 'SEO & SEM', href: '#services' }
      ]
    },
    {
      title: 'Company',
      links: [
        { text: 'About Us', href: '#about' },
        { text: 'Case Studies', href: '#cases' },
        { text: 'Team', href: '#team' },
        { text: 'Blog', href: '#blog' }
      ]
    },
    {
      title: 'Contact',
      links: [
        { text: 'hello@1616.agency', href: 'mailto:hello@1616.agency' },
        { text: '+1 (555) 123-4567', href: 'tel:+15551234567' },
        { text: 'Get a Quote', href: '#contact' }
      ]
    }
  ],
  bottom: {
    copyright: '© 2024 16:16 Agency. All rights reserved.',
    info: 'Crafted with passion and precision'
  }
}

// Main Example Component
export function AgencyWebsiteExample() {
  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <Navigation {...navigationData} />

      {/* Hero Section */}
      <Hero {...heroData} />

      {/* Services Section */}
      <Section
        id="services"
        tag="Our Services"
        title="What We Do"
        subtitle="Comprehensive digital marketing solutions to help your brand grow"
        background="light"
        cards={serviceData.map(service => ({
          type: 'service' as const,
          title: service.title,
          description: service.description,
          icon: service.icon
        }))}
      />

      {/* Packages Section */}
      <Section
        id="packages"
        tag="Pricing Plans"
        title="Choose Your Package"
        subtitle="Flexible pricing options tailored to your needs"
        background="white"
        cards={packageData.map(pkg => ({
          type: 'package' as const,
          title: pkg.name,
          subtitle: pkg.target,
          description: `${pkg.specialists} specialists`,
          price: pkg.price,
          features: pkg.features,
          featured: pkg.featured,
          button: pkg.button
        }))}
      />

      {/* Case Studies Section */}
      <Section
        id="cases"
        tag="Success Stories"
        title="Recent Case Studies"
        subtitle="Real results for real clients"
        background="accent"
        cards={caseStudyData.map(caseStudy => ({
          type: 'case' as const,
          title: caseStudy.title,
          subtitle: caseStudy.tag,
          description: caseStudy.description,
          stats: caseStudy.stats
        }))}
      />

      {/* Footer */}
      <Footer {...footerData} />
    </div>
  )
}

// Individual component examples for testing
export function ButtonExamples() {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold mb-4">Button Variants</h2>

      <div className="flex gap-4 flex-wrap">
        <Button variant="primary" size="md" text="Primary Button" />
        <Button variant="secondary" size="md" text="Secondary Button" />
        <Button variant="cta" size="md" text="CTA Button" />
        <Button variant="submit" size="md" text="Submit Button" />
        <Button variant="package" size="md" text="Package Button" />
        <Button variant="outline" size="md" text="Outline Button" />
      </div>

      <div className="flex gap-4 flex-wrap">
        <Button variant="primary" size="sm" text="Small" />
        <Button variant="primary" size="md" text="Medium" />
        <Button variant="primary" size="lg" text="Large" />
        <Button variant="primary" size="xl" text="Extra Large" />
      </div>
    </div>
  )
}

export function CardExamples() {
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-4">Specialized Card Examples</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {packageData.map((pkg, index) => (
          <PackageCard key={index} data={pkg} />
        ))}
      </div>
    </div>
  )
}