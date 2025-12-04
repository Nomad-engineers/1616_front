import { ApiClient } from '@/lib/api-client'

export interface ContactFormData {
  name: string
  email: string
  planId: number | string // Accept both to allow migration to numeric IDs
  message: string
}

export interface ContactResponse {
  success: boolean
  message?: string
}

export class ContactApi {
  private client = new ApiClient({
    baseUrl: process.env.NEXT_PUBLIC_CMS_API_URL || '',
  })

  async submit(data: ContactFormData): Promise<ContactResponse> {
    return await this.client.post<ContactResponse>('/api/send-form', data)
  }
}

export const contactApi = new ContactApi()