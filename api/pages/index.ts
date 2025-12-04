import { cachedApiClient } from '@/lib/cached-api-client'
import type { PageData } from '@/types/api'

export interface GetPageParams extends Record<string, unknown> {
  slug?: string
}

export interface CreatePageData {
  title: string
  slug: string
  content?: any
  status?: 'published' | 'draft'
}

export interface UpdatePageData {
  title?: string
  content?: any
  status?: 'published' | 'draft'
}

export class PagesApi {
  private client = cachedApiClient

  async getAll(params?: GetPageParams) {
    return await this.client.get<PageData[]>('/api/pages', params)
  }

  async getBySlug(slug: string, useCache = true) {
    // Use the Next.js API route proxy to avoid CORS issues
    // Кэшируем на 5 минут для страниц
    return await this.client.get<PageData>(`/api/pages/slug/${slug}`, undefined, {
      enabled: useCache,
      ttl: 5 * 60 * 1000, // 5 минут
      key: `page:${slug}` // Кастомный ключ для кэша
    })
  }

  async getById(id: string) {
    return await this.client.get<PageData>(`/api/pages/${id}`)
  }

  async create(data: CreatePageData) {
    return await this.client.post<PageData>('/api/pages', data)
  }

  async update(id: string, data: UpdatePageData) {
    return await this.client.put<PageData>(`/api/pages/${id}`, data)
  }

  async delete(id: string) {
    return await this.client.delete(`/api/pages/${id}`)
  }
}

export const pagesApi = new PagesApi()