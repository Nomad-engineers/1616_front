import { ApiClient } from '@/lib/api-client'

export interface ContactFormData {
  name: string
  email: string
  planId: string
  message: string
}

export interface ContactResponse {
  success: boolean
  message?: string
}

export class ContactApi {
  private client = new ApiClient({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || '',
  })

  async submit(data: ContactFormData): Promise<ContactResponse> {
    return await this.client.post<ContactResponse>('/send-form', data)
  }
}

export const contactApi = new ContactApi()