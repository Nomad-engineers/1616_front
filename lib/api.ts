import { cmsApiClient } from './api-client'
import { BlogContent } from '@/types/api'

export interface BlogPost {
  id: string
  title: string
  content: any // Lexical content
  category: string
  readMin: number
  cover?: {
    url: string
    alt: string
  }
  createdAt: string
  updatedAt: string
  excerpt?: string
  slug: string
}

export async function getBlogPost(id: string): Promise<BlogPost> {
  try {
    // Fetch the home page to get blog data since direct blog endpoints don't exist
    const homePageResponse = await cmsApiClient.get<any>(`/api/pages/slug/home`)

    // Find the blog post in the insights section
    const insightsSection = homePageResponse.layout?.find((section: any) =>
      section.blockType === 'section' && section.slug === 'insights'
    )

    if (!insightsSection) {
      throw new Error('Insights section not found')
    }

    const blogPostData = insightsSection.elements?.find((element: any) =>
      element.blockType === 'blog-card' && element.blog?.id === id
    )

    if (!blogPostData?.blog) {
      throw new Error('Blog post not found')
    }

    const blogPost = blogPostData.blog

    // Transform the data to match our BlogPost interface
    return {
      id: blogPost.id,
      title: blogPost.title,
      content: blogPost.content,
      category: blogPost.category,
      readMin: blogPost.readMin,
      cover: blogPost.cover ? {
        url: `https://cms.1616.marketing${blogPost.cover.url}`,
        alt: blogPost.cover.alt || blogPost.title,
      } : undefined,
      createdAt: blogPost.createdAt,
      updatedAt: blogPost.updatedAt,
      slug: id, // Используем ID как slug
    }
  } catch (error) {
    console.error('Error fetching blog post:', error)
    throw new Error('Failed to fetch blog post')
  }
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  try {
    // Fetch the home page to get blog data since direct blog endpoints don't exist
    const homePageResponse = await cmsApiClient.get<any>(`/api/pages/slug/home`)

    // Find the blog posts in the insights section
    const insightsSection = homePageResponse.layout?.find((section: any) =>
      section.blockType === 'section' && section.slug === 'insights'
    )

    if (!insightsSection) {
      return []
    }

    const blogElements = insightsSection.elements?.filter((element: any) =>
      element.blockType === 'blog-card' && element.blog?._status === 'published'
    ) || []

    return blogElements.map((element: any) => {
      const blogPost = element.blog
      return {
        id: blogPost.id,
        title: blogPost.title,
        content: blogPost.content,
        category: blogPost.category,
        readMin: blogPost.readMin,
        cover: blogPost.cover ? {
          url: `https://cms.1616.marketing${blogPost.cover.url}`,
          alt: blogPost.cover.alt || blogPost.title,
        } : undefined,
        createdAt: blogPost.createdAt,
        updatedAt: blogPost.updatedAt,
        slug: blogPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      }
    })
  } catch (error) {
    console.error('Error fetching blog posts:', error)
    throw new Error('Failed to fetch blog posts')
  }
}

// Fallback function to generate a slug from blog post title
export function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '')
}