// Mock data for blog posts

export interface MockBlogPost {
  id: string
  title: string
  category: string
  readMin: number
  content: {
    root: {
      children: Array<{
        children?: Array<{
          text: string
        }>
      }>
    }
  }
  cover?: {
    url: string
    alt: string
  }
}

export const mockBlogPosts: MockBlogPost[] = [
  {
    id: 'post-1',
    title: 'Getting Started with Next.js 15',
    category: 'Technology',
    readMin: 5,
    content: {
      root: {
        children: [
          {
            children: [
              {
                text: 'Learn about the latest features in Next.js 15 and how to build modern web applications with React 19.'
              }
            ]
          }
        ]
      }
    },
    cover: {
      url: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop',
      alt: 'Next.js logo and code'
    }
  },
  {
    id: 'post-2',
    title: 'The Power of TypeScript in 2025',
    category: 'Programming',
    readMin: 8,
    content: {
      root: {
        children: [
          {
            children: [
              {
                text: 'Discover why TypeScript continues to be the preferred choice for large-scale JavaScript applications.'
              }
            ]
          }
        ]
      }
    },
    cover: {
      url: 'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop',
      alt: 'TypeScript code on screen'
    }
  },
  {
    id: 'post-3',
    title: 'Building Scalable APIs with Node.js',
    category: 'Backend',
    readMin: 10,
    content: {
      root: {
        children: [
          {
            children: [
              {
                text: 'Best practices for designing and implementing RESTful APIs that can handle millions of requests.'
              }
            ]
          }
        ]
      }
    },
    cover: {
      url: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=400&fit=crop',
      alt: 'Node.js logo'
    }
  },
  {
    id: 'post-4',
    title: 'Modern CSS Techniques for Responsive Design',
    category: 'Design',
    readMin: 6,
    content: {
      root: {
        children: [
          {
            children: [
              {
                text: 'Explore the latest CSS features and techniques for creating beautiful, responsive web layouts.'
              }
            ]
          }
        ]
      }
    },
    cover: {
      url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=400&fit=crop',
      alt: 'CSS grid layout'
    }
  },
  {
    id: 'post-5',
    title: 'Introduction to Machine Learning',
    category: 'AI/ML',
    readMin: 12,
    content: {
      root: {
        children: [
          {
            children: [
              {
                text: 'A beginner-friendly guide to understanding the fundamentals of machine learning and AI.'
              }
            ]
          }
        ]
      }
    },
    cover: {
      url: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=800&h=400&fit=crop',
      alt: 'Machine learning visualization'
    }
  },
  {
    id: 'post-6',
    title: 'DevOps Best Practices for 2025',
    category: 'DevOps',
    readMin: 7,
    content: {
      root: {
        children: [
          {
            children: [
              {
                text: 'Learn about the latest DevOps trends and how to implement continuous integration and deployment pipelines.'
              }
            ]
          }
        ]
      }
    },
    cover: {
      url: 'https://images.unsplash.com/photo-1551434678-e076c223a692?w=800&h=400&fit=crop',
      alt: 'DevOps pipeline diagram'
    }
  }
]