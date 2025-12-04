'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardProps } from '@/components/ui/Card'
import { mockBlogPosts } from '@/lib/api-mock'

export default function BlogTestPage() {
  const [posts] = useState(mockBlogPosts)

  const blogCards: CardProps[] = posts.map(post => ({
    id: post.id,
    type: 'blog',
    title: post.title,
    subtitle: `${post.category} • ${post.readMin} min read`,
    description: post.content.root.children[0]?.children?.[0]?.text || '',
    metadata: `${post.category} • ${post.readMin} min read`,
    image: post.cover ? {
      url: post.cover.url,
      alt: post.cover.alt
    } : undefined,
    slug: post.id, // Используем ID как slug
  }))

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Blog Posts</h1>
          <p className="text-xl text-gray-600">Test page for blog functionality</p>
          <Link
            href="/"
            className="inline-block mt-4 text-blue-600 hover:text-blue-800 underline"
          >
            ← Back to Home
          </Link>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogCards.map((card) => (
            <Card key={card.id} {...card} />
          ))}
        </div>

        <div className="mt-12 p-6 bg-white rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-4">Test Links</h2>
          <div className="space-y-2">
            {posts.map((post) => (
              <div key={post.id} className="flex items-center gap-4">
                <Link
                  href={`/blog/${post.id}`}
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  /blog/{post.id}
                </Link>
                <span className="text-gray-600">→</span>
                <span className="text-sm text-gray-500">{post.title}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}