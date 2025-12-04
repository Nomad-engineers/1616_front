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
    // Fetch the blog post from the CMS API by ID
    const response = await cmsApiClient.get<{ docs: BlogContent[] }>(`/api/blog-posts?where[id][equals]=${id}`)

    if (!response.docs || response.docs.length === 0) {
      throw new Error('Blog post not found')
    }

    const blogPost = response.docs[0]

    // Transform the data to match our BlogPost interface
    return {
      id: blogPost.id,
      title: blogPost.title,
      content: blogPost.content,
      category: blogPost.category,
      readMin: blogPost.readMin,
      cover: blogPost.cover ? {
        url: blogPost.cover.url,
        alt: blogPost.cover.alt,
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
    // Fetch all published blog posts
    const response = await cmsApiClient.get<{ docs: BlogContent[] }>(`/api/blog-posts?where[_status][equals]=published&sort=-createdAt`)

    if (!response.docs) {
      return []
    }

    return response.docs.map((blogPost) => ({
      id: blogPost.id,
      title: blogPost.title,
      content: blogPost.content,
      category: blogPost.category,
      readMin: blogPost.readMin,
      cover: blogPost.cover ? {
        url: blogPost.cover.url,
        alt: blogPost.cover.alt,
      } : undefined,
      createdAt: blogPost.createdAt,
      updatedAt: blogPost.updatedAt,
      slug: blogPost.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }))
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