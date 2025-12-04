// UI Components TypeScript Interfaces
// Based on the 16:16 Agency website design system

import { ReactNode } from 'react'

export interface Colors {
  primary: string
  secondary: string
  accent: string
  background: {
    light: string
    white: string
    gray: string
  }
  text: {
    dark: string
    gray: string
    muted: string
  }
}

export interface Typography {
  fonts: {
    primary: string
    serif: string
  }
  sizes: {
    hero: string
    section: string
    heading: string
    subheading: string
    body: string
    small: string
  }
}

export interface Button {
  variant: 'primary' | 'secondary' | 'cta' | 'submit' | 'package' | 'outline'
  size: 'sm' | 'md' | 'lg' | 'xl'
  text: string
  href?: string
  icon?: string
  iconPosition?: 'left' | 'right'
  onClick?: string
  type?: 'button' | 'submit' | 'reset'
}

export interface Badge {
  text: string
  color?: string
}

export interface CardStats {
  value: string
  label: string
}

export interface CardPrice {
  amount: string
  currency: string
  period: string
  originalPrice?: string
}

export interface FeatureItem {
  text: string
  included?: boolean
}

export interface CardImage {
  src?: string
  alt?: string
  placeholder?: string
}

export interface Card {
  type: 'service' | 'package' | 'case' | 'team' | 'blog' | 'value' | 'stat' | 'why' | 'about-stat'
  title: string
  subtitle?: string
  description?: string
  icon?: string
  image?: CardImage
  metadata?: string
  featured?: boolean
  badge?: Badge
  stats?: CardStats[]
  features?: (string | FeatureItem)[]
  price?: CardPrice
  button?: Button
  actions?: Button[]
}

export interface NavigationLink {
  text: string
  href: string
  active?: boolean
}

export interface Navigation {
  logo?: {
    src?: string
    alt?: string
    height?: string
  }
  links?: NavigationLink[]
  cta?: Button
  mobileMenu?: boolean
}

export interface Hero {
  tag?: string
  title: string
  description?: string
  cta?: Button
  stats?: CardStats[]
  background?: {
    color?: string
    gradient?: string
    image?: string
  }
}

export interface Section {
  id?: string
  tag?: string
  title?: string
  subtitle?: string
  background?: 'light' | 'white' | 'dark' | 'accent'
  layout?: 'grid' | 'list' | 'custom'
  columns?: number
  cards?: Card[]
}


export interface FooterColumn {
  title: string
  links: Array<{
    text: string
    href: string
  }>
}

export interface Footer {
  logo?: {
    src?: string
    alt?: string
  }
  description?: string
  columns?: FooterColumn[]
  bottom?: {
    copyright?: string
    info?: string
  }
}

// New component types from schema
export interface Package {
  name: string
  price: CardPrice
  target: string
  specialists: string
  features: string[]
  featured?: boolean
  button?: Button
}

export interface CaseStudy {
  tag: string
  title: string
  description: string
  stats: CardStats[]
}

export interface TeamMember {
  name: string
  role: string
  photo?: CardImage
  bio?: string
}

export interface BlogPost {
  title: string
  meta: {
    category: string
    readTime: string
  }
  excerpt: string
  image?: CardImage
  link: string
}

export interface ValueCard {
  label: string
  description: string
}

export interface AboutStat {
  number: string
  label: string
}

export interface ServiceItem {
  icon: string
  title: string
  description: string
}

export interface WhyUsItem {
  title: string
  description: string
}

export interface FormField {
  name: string
  type: 'text' | 'email' | 'select' | 'textarea' | 'tel'
  label: string
  placeholder?: string
  required?: boolean
  options?: Array<{
    value: string
    text: string
  }>
}

export interface Form {
  id?: string
  fields: FormField[]
  submit: Button
  onSubmit?: string
  successMessage?: string
}

export interface UIComponents {
  colors?: Colors
  typography?: Typography
  navigation?: Navigation
  hero?: Hero
  sections?: Section[]
  contactForm?: Form
  footer?: Footer
  packages?: Package[]
  caseStudies?: CaseStudy[]
  teamMembers?: TeamMember[]
  blogPosts?: BlogPost[]
  valueCards?: ValueCard[]
  aboutStats?: AboutStat[]
  services?: ServiceItem[]
  whyUsItems?: WhyUsItem[]
}

// Helper types for specific card types
export interface ServiceCard extends Card {
  type: 'service'
  icon: string
  title: string
  description: string
}

export interface PackageCard extends Card {
  type: 'package'
  name: string
  price: CardPrice
  description: string
  features: string[]
  button: Button
  featured?: boolean
}

export interface CaseCard extends Card {
  type: 'case'
  tag: string
  title: string
  description: string
  stats: CardStats[]
}

export interface TeamCard extends Card {
  type: 'team'
  name: string
  role: string
  bio?: string
  image?: CardImage
}

export interface BlogCard extends Card {
  type: 'blog'
  meta: string
  title: string
  excerpt: string
  link: string
  image?: CardImage
}

export interface WhyCard extends Card {
  type: 'why'
  title: string
  description: string
}

export interface ValueCard extends Card {
  type: 'value'
  category: string
  value: string
}

export interface StatCard extends Card {
  type: 'stat'
  value: string
  label: string
  color?: string
}

// React component props interfaces
export interface ButtonProps extends Omit<Button, 'onClick'> {
  onClick?: () => void
  className?: string
  children?: ReactNode
  disabled?: boolean
}

export interface CardProps extends Omit<Card, 'button' | 'actions'> {
  button?: ButtonProps
  actions?: ButtonProps[]
  className?: string
  children?: ReactNode
  slug?: string // For blog post slugs
}

export interface NavigationProps extends Navigation {
  className?: string
}

export interface HeroProps extends Hero {
  className?: string
}

export interface SectionProps extends Section {
  className?: string
  children?: ReactNode
}

export interface FormProps extends Omit<Form, 'onSubmit'> {
  className?: string
  onSubmit?: (data: Record<string, any>) => void
}

export interface FooterProps extends Footer {
  className?: string
}

export interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom'
  width?: number
  height?: number
  className?: string
  priority?: boolean
  alt?: string
}