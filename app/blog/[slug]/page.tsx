import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostClient from './client'
import { getMockBlogPost } from '@/lib/api-mock'

interface BlogPostPageProps {
  params: {
    slug: string // Этот параметр теперь содержит ID поста
  }
}

export async function generateMetadata(
  { params }: BlogPostPageProps
): Promise<Metadata> {
  try {
    const resolvedParams = await params
    const post = await getMockBlogPost(resolvedParams.slug)

    return {
      title: post.title,
      description: post.excerpt,
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        images: post.coverImage ? [post.coverImage] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [post.coverImage] : [],
      },
    }
  } catch (error) {
    return {
      title: 'Blog Post Not Found',
    }
  }
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const resolvedParams = await params
  console.log('BlogPostPage resolved params:', resolvedParams)

  if (!resolvedParams.slug) {
    console.error('No slug provided in params')
    notFound()
  }

  let post

  try {
    console.log('Attempting to get post with slug:', resolvedParams.slug)
    post = await getMockBlogPost(resolvedParams.slug)
  } catch (error) {
    console.error('Error getting blog post:', error)
    notFound()
  }

  return <BlogPostClient post={post} />
}