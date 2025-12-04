import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import BlogPostClient from './client-simplified'
import { getBlogPost } from '@/lib/api'

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
    const post = await getBlogPost(resolvedParams.slug)

    return {
      title: post.title,
      description: `${post.title} - ${post.category} blog post`,
      openGraph: {
        title: post.title,
        description: `${post.title} - ${post.category} blog post`,
        type: 'article',
        publishedTime: post.createdAt,
        modifiedTime: post.updatedAt,
        images: post.cover ? [post.cover.url] : [],
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: `${post.title} - ${post.category} blog post`,
        images: post.cover ? [post.cover.url] : [],
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
    post = await getBlogPost(resolvedParams.slug)
  } catch (error) {
    console.error('Error getting blog post:', error)
    notFound()
  }

  return <BlogPostClient post={post} />
}