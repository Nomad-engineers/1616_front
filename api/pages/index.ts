import { ApiClient } from '@/lib/api-client'
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
  private client = new ApiClient()

  async getAll(params?: GetPageParams) {
    return await this.client.get<PageData[]>('/api/pages', params)
  }

  async getBySlug(slug: string) {
    // Use the Next.js API route proxy to avoid CORS issues
    return await this.client.get<PageData>(`/api/pages/slug/${slug}`)
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