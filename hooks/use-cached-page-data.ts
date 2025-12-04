'use client'

import { useState, useEffect, useCallback, useRef } from 'react'
import { pagesApi } from '@/api/pages'
import { cachedApiClient } from '@/lib/cached-api-client'
import type { PageData } from '@/types/api'

interface UseCachedPageDataOptions {
  initialData?: PageData
  enabled?: boolean
  cacheTime?: number
  staleWhileRevalidate?: boolean
}

interface UseCachedPageDataResult {
  data: PageData | null
  loading: boolean
  error: string | null
  refetch: (forceRefresh?: boolean) => Promise<void>
  isFromCache: boolean
  isValidating: boolean
  cacheStatus: 'fresh' | 'stale' | 'empty'
}

export function useCachedPageData(
  slug: string = 'home',
  options: UseCachedPageDataOptions = {}
): UseCachedPageDataResult {
  const { initialData, enabled = true, staleWhileRevalidate = true } = options

  const [data, setData] = useState<PageData | null>(initialData || null)
  const [loading, setLoading] = useState(false)
  const [validating, setValidating] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [isFromCache, setIsFromCache] = useState(false)
  const [cacheStatus, setCacheStatus] = useState<'fresh' | 'stale' | 'empty'>('empty')

  // Ref для отслеживания, был ли уже выполнен первый запрос
  const hasInitialized = useRef(false)

  const checkCacheStatus = useCallback((slug: string): 'fresh' | 'stale' | 'empty' => {
    const hasCachedData = cachedApiClient.hasCachedData(`/api/pages/slug/${slug}`)
    return hasCachedData ? 'stale' : 'empty' // 'stale' значит "есть в кэше"
  }, [])

  const fetch = useCallback(
    async (pageSlug?: string, forceRefresh: boolean = false) => {
      if (!enabled) return

      const targetSlug = pageSlug || slug
      const cacheKey = `page:${targetSlug}`

      // Проверяем наличие данных в кэше
      const currentCacheStatus = checkCacheStatus(targetSlug)
      setCacheStatus(currentCacheStatus)

      // Если есть данные в кэше и не принудительное обновление
      if (currentCacheStatus !== 'empty' && !forceRefresh && staleWhileRevalidate) {
        try {
          // Сначала получаем данные из кэша напрямую
          const cachedResult = await pagesApi.getBySlug(targetSlug, true)
          setData(cachedResult)
          setIsFromCache(true)
          setValidating(true) // Начинаем фоновую валидацию
          console.log(`📦 Using cached data for ${targetSlug}`)

          // Фоновая валидация (stale-while-revalidate)
          setTimeout(async () => {
            try {
              const freshResult = await pagesApi.getBySlug(targetSlug, false) // Без кэша
              setData(freshResult)
              setIsFromCache(false)
              setCacheStatus('fresh')
              console.log(`✨ Fresh data loaded for ${targetSlug}`)
            } catch (validationError) {
              console.warn(`⚠️ Background validation failed for ${targetSlug}:`, validationError)
              // Оставляем кэшированные данные, если фоновая валидация не удалась
            } finally {
              setValidating(false)
            }
          }, 100) // Небольшая задержка, чтобы UI успел отрендериться

          return
        } catch (cacheError) {
          console.warn(`⚠️ Cache read failed for ${targetSlug}:`, cacheError)
          // Продолжаем с обычным запросом, если кэш не работает
        }
      }

      // Обычный запрос с кэшированием
      setLoading(true)
      setValidating(false)
      setError(null)

      try {
        const result = await pagesApi.getBySlug(targetSlug, !forceRefresh)
        setData(result)
        setIsFromCache(!forceRefresh && currentCacheStatus !== 'empty')
        setCacheStatus('fresh')

        if (forceRefresh) {
          console.log(`🔄 Force refreshed data for ${targetSlug}`)
        } else if (currentCacheStatus === 'empty') {
          console.log(`🌟 Fresh data loaded for ${targetSlug}`)
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch page data'
        setError(errorMessage)
        console.error('Failed to fetch page data:', err)

        // Если есть кэшированные данные и основной запрос не удался,
        // показываем кэшированные данные с пометкой об ошибке
        if (currentCacheStatus !== 'empty' && data) {
          console.log(`📋 Showing cached data despite error for ${targetSlug}`)
          setIsFromCache(true)
          setCacheStatus('stale')
        }
      } finally {
        setLoading(false)
        setValidating(false)
      }
    },
    [slug, enabled, staleWhileRevalidate, checkCacheStatus, data]
  )

  // Инициализация при монтировании
  useEffect(() => {
    if (enabled && !hasInitialized.current) {
      hasInitialized.current = true
      const initialCacheStatus = checkCacheStatus(slug)

      if (initialCacheStatus !== 'empty') {
        setCacheStatus('stale')
      }

      fetch(slug, false)
    }
  }, [enabled, slug, fetch, checkCacheStatus])

  const refetch = useCallback(
    async (forceRefresh: boolean = true) => {
      await fetch(slug, forceRefresh)
    },
    [fetch, slug]
  )

  // Очистка кэша для текущей страницы
  const clearPageCache = useCallback(() => {
    // Это можно добавить в API клиент при необходимости
    cachedApiClient.clearCache()
    setCacheStatus('empty')
  }, [])

  return {
    data,
    loading: loading && !isFromCache, // Показываем loading только если не из кэша
    error,
    refetch,
    isFromCache,
    isValidating: validating, // Фоновая валидация
    cacheStatus,
  }
}