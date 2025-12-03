'use client'

import { useState, useEffect, useCallback } from 'react'
import { pagesApi } from '@/api/pages'
import type { PageData } from '@/types/api'

interface UsePageDataOptions {
  initialData?: PageData
  enabled?: boolean
}

export function usePageData(slug: string = 'home', options: UsePageDataOptions = {}) {
  const { initialData, enabled = true } = options

  const [data, setData] = useState<PageData | null>(initialData || null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetch = useCallback(
    async (pageSlug?: string) => {
      if (!enabled) return

      setLoading(true)
      setError(null)

      try {
        const result = await pagesApi.getBySlug(pageSlug || slug)
        setData(result)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch page data')
        console.error('Failed to fetch page data:', err)
      } finally {
        setLoading(false)
      }
    },
    [slug, enabled]
  )

  useEffect(() => {
    if (enabled && !initialData) {
      fetch()
    }
  }, [enabled, initialData, fetch])

  const refetch = useCallback(() => {
    fetch()
  }, [fetch])

  return {
    data,
    loading,
    error,
    refetch,
  }
}