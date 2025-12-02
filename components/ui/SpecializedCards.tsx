'use client'

import React from 'react'
import { Card } from './Card'
import { Package, CaseStudy, TeamMember, BlogPost, ValueCard, AboutStat, ServiceItem, WhyUsItem, Button, ButtonProps } from '@/types/ui-components'

// Helper to convert Button to ButtonProps
const convertButtonToProps = (button?: Button): ButtonProps | undefined => {
  if (!button) return undefined

  return {
    ...button,
    onClick: button.onClick ? () => console.log(button.onClick) : undefined
  }
}

// Package Card Component
export function PackageCard({ data }: { data: Package }) {
  return (
    <Card
      type="package"
      title={data.name}
      description={data.target}
      price={data.price}
      features={data.features}
      featured={data.featured}
      button={convertButtonToProps(data.button)}
    />
  )
}

// Case Study Card Component
export function CaseStudyCard({ data }: { data: CaseStudy }) {
  return (
    <Card
      type="case"
      title={data.title}
      subtitle={data.tag}
      description={data.description}
      stats={data.stats}
    />
  )
}

// Team Member Card Component
export function TeamMemberCard({ data }: { data: TeamMember }) {
  return (
    <Card
      type="team"
      title={data.name}
      subtitle={data.role}
      description={data.bio}
      image={data.photo}
    />
  )
}

// Blog Post Card Component
export function BlogPostCard({ data }: { data: BlogPost }) {
  return (
    <Card
      type="blog"
      title={data.title}
      metadata={`${data.meta.category} • ${data.meta.readTime}`}
      description={data.excerpt}
      image={data.image}
    />
  )
}

// Value Card Component
export function ValueCardComponent({ data }: { data: ValueCard }) {
  return (
    <Card
      type="value"
      title={data.label}
      description={data.description}
    />
  )
}

// About Stat Card Component
export function AboutStatCard({ data }: { data: AboutStat }) {
  return (
    <Card
      type="about-stat"
      title={data.number}
      subtitle={data.label}
    />
  )
}

// Service Item Card Component
export function ServiceItemCard({ data }: { data: ServiceItem }) {
  return (
    <Card
      type="service"
      icon={data.icon}
      title={data.title}
      description={data.description}
    />
  )
}

// Why Us Item Card Component
export function WhyUsItemCard({ data }: { data: WhyUsItem }) {
  return (
    <Card
      type="why"
      title={data.title}
      description={data.description}
    />
  )
}

// Helper function to render the right card type based on data
export function renderCard(type: string, data: any) {
  switch (type) {
    case 'package':
      return <PackageCard data={data as Package} />
    case 'case':
      return <CaseStudyCard data={data as CaseStudy} />
    case 'team':
      return <TeamMemberCard data={data as TeamMember} />
    case 'blog':
      return <BlogPostCard data={data as BlogPost} />
    case 'value':
      return <ValueCardComponent data={data as ValueCard} />
    case 'about-stat':
      return <AboutStatCard data={data as AboutStat} />
    case 'service':
      return <ServiceItemCard data={data as ServiceItem} />
    case 'why':
      return <WhyUsItemCard data={data as WhyUsItem} />
    default:
      return <Card type="service" title={data.title} description={data.description} />
  }
}