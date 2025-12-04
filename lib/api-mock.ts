// Mock API for testing blog functionality
import { BlogPost } from './api'

export const mockBlogPosts: BlogPost[] = [
  {
    id: '9bcdbcf7-f3d5-4f54-84e3-5b0ab97da5a9',
    title: 'Scaling Your Brand in the UAE Market: A Complete Guide',
    slug: '9bcdbcf7-f3d5-4f54-84e3-5b0ab97da5a9',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'The UAE market presents incredible opportunities for brands looking to scale. With its strategic location, diverse population, and business-friendly environment, it\'s no wonder that companies worldwide are setting their sights on this dynamic region.' }
            ]
          },
          {
            type: 'heading',
            tag: 2,
            children: [
              { type: 'text', text: 'Understanding the UAE Market Landscape' }
            ]
          },
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Before diving into expansion strategies, it\'s crucial to understand the unique characteristics of the UAE market. The region combines traditional values with modern aspirations, creating a distinctive consumer behavior pattern that brands must navigate carefully.' }
            ]
          }
        ]
      }
    },
    category: 'Marketing Strategy',
    readMin: 10,
    cover: {
      url: 'https://via.placeholder.com/1200x600/4F46E5/FFFFFF?text=UAE+Market+Scaling',
      alt: 'UAE market scaling strategies'
    },
    createdAt: '2024-12-01T10:00:00Z',
    updatedAt: '2024-12-01T10:00:00Z'
  },
  {
    id: '9185cbe2-bb49-4ba1-8538-7976fb66cf7e',
    title: 'Why Video Content is King in 2025 and Beyond',
    slug: '9185cbe2-bb49-4ba1-8538-7976fb66cf7e',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'Video content continues to dominate digital marketing strategies, and its importance is only growing in 2025. With attention spans getting shorter and competition getting fiercer, brands need to understand why video is non-negotiable in today\'s marketing landscape.' }
            ]
          }
        ]
      }
    },
    category: 'Content Production',
    readMin: 30,
    cover: {
      url: 'https://via.placeholder.com/1200x600/10B981/FFFFFF?text=Video+Content+Strategy',
      alt: 'Video content marketing strategy'
    },
    createdAt: '2024-11-15T14:30:00Z',
    updatedAt: '2024-11-15T14:30:00Z'
  },
  {
    id: 'fc17b562-f209-468a-a693-08072cda2a1c',
    title: 'Micro vs Macro Influencers: What Works in MENA',
    slug: 'fc17b562-f209-468a-a693-08072cda2a1c',
    content: {
      root: {
        children: [
          {
            type: 'paragraph',
            children: [
              { type: 'text', text: 'The Middle East and North Africa region presents unique challenges and opportunities for influencer marketing. Understanding the dynamics between micro and macro influencers in this culturally diverse market is crucial for campaign success.' }
            ]
          }
        ]
      }
    },
    category: 'Influencer Marketing',
    readMin: 45,
    cover: {
      url: 'https://via.placeholder.com/1200x600/F59E0B/FFFFFF?text=Influencer+Marketing+MENA',
      alt: 'Influencer marketing in MENA region'
    },
    createdAt: '2024-11-01T09:15:00Z',
    updatedAt: '2024-11-01T09:15:00Z'
  }
]

export async function getMockBlogPost(id: string): Promise<BlogPost> {
  console.log('Looking for post with ID:', id)
  console.log('Available posts:', mockBlogPosts.map(p => ({ id: p.id, title: p.title })))

  const post = mockBlogPosts.find(p => p.id === id)
  if (!post) {
    console.error('Post not found for ID:', id)
    throw new Error(`Blog post not found: ${id}`)
  }
  console.log('Found post:', post.title)
  return post
}

export async function getMockBlogPosts(): Promise<BlogPost[]> {
  return mockBlogPosts
}