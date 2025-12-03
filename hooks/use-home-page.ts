import { useState, useEffect } from 'react'
import { cmsApiClient } from '@/lib/api-client'

export interface HomePageData {
  // Define the structure based on your CMS response
  [key: string]: unknown
}

export function useHomePage() {
  const [data, setData] = useState<HomePageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHomePage() {
      setLoading(true)
      setError(null)

      try {
        const result = await cmsApiClient.get<HomePageData>('/api/pages/slug/home')
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch home page data')
      } finally {
        setLoading(false)
      }
    }

    fetchHomePage()
  }, [])

  return { data, loading, error }
}