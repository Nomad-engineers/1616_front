// API Response Types for 1616 Agency

export interface HeroStats {
  id: string
  title: string
  description: string
}

export interface HeroBlock {
  id: string
  badge: string
  title: string
  content: string
  buttonText?: string
  buttonUrl?: string
  blockName?: string
  'hero-stats'?: HeroStats[]
  blockType: 'hero'
}

export interface AboutCard {
  id: string
  title: string
  description: string
}

export interface AboutVisual {
  id: string
  title: string
  description: string
}

export interface LexicalContent {
  type: string
  format: string
  indent: number
  version: number
  children: Array<{
    type: string
    format?: string
    indent: number
    version: number
    children: Array<{
      mode: string
      text: string
      type: string
      style: string
      detail: number
      format: number
      version: number
    }>
    direction?: string | null
    textStyle?: string
    textFormat?: number
  }>
  direction?: string | null
  textFormat?: number
}

export interface AboutBlock {
  id: string
  title: string
  content: LexicalContent
  blockName?: string
  'about-cards'?: AboutCard[]
  'about-visual'?: AboutVisual[]
  blockType: 'about'
}

export interface ServiceCard {
  id: string
  icon?: null
  title: string
  description: string
  blockName?: string
  blockType: 'service-card'
}

export interface PackageFeature {
  id: string
  feature: string
}

export interface PackageCard {
  id: string
  title: string
  price: string
  description: string
  blockName?: string
  features?: PackageFeature[]
  blockType: 'package-card'
}

export interface CaseStat {
  id: string
  title: string
  subtitle: string
}

export interface CaseCard {
  id: string
  tag: string
  title: string
  description: string
  blockName?: string
  stats?: CaseStat[]
  blockType: 'case-card'
}

export interface BlogContent {
  id: string
  cover: {
    id: number
    alt: string
    updatedAt: string
    createdAt: string
    url: string
    thumbnailURL?: string | null
    filename: string
    mimeType: string
    filesize: number
    width: number
    height: number
    focalX: number
    focalY: number
  }
  title: string
  category: string
  readMin: number
  content: LexicalContent
  updatedAt: string
  createdAt: string
  _status: string
}

export interface BlogCard {
  id: string
  blog: BlogContent
  blockName?: string
  blockType: 'blog-card'
}

export interface SectionBlock {
  id: string
  tag?: string
  title: string
  subtitle?: string
  blockName?: string
  blockType: 'section'
  elements?: (ServiceCard | PackageCard | CaseCard | BlogCard)[]
}

export type LayoutBlock = HeroBlock | AboutBlock | SectionBlock

export interface PageData {
  id: string
  slug: string
  layout: LayoutBlock[]
  updatedAt: string
  createdAt: string
  _status: string
}

export interface ApiResponse<T = any> {
  success: boolean
  data?: T
  error?: {
    message: string
    code?: string
  }
}

// Helper function to extract text from Lexical content
export function extractTextFromLexical(content: LexicalContent): string {
  if (!content) return ''

  // Handle children structure
  const children = content.children

  if (!children || !Array.isArray(children)) return ''

  return children
    .map(paragraph =>
      paragraph.children
        ?.map(textNode => textNode.text)
        .join('') || ''
    )
    .join('\n')
}

