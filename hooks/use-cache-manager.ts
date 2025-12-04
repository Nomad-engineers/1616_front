'use client'

import { useCallback } from 'react'
import { apiCache } from '@/lib/cache'
import { cachedApiClient } from '@/lib/cached-api-client'

interface CacheManagerReturn {
  // Управление кэшем
  clearCache: () => void
  clearExpiredCache: () => void
  getCacheSize: () => number

  // Инвалидация для конкретных эндпоинтов
  invalidatePage: (slug: string) => void
  invalidateEndpoint: (endpoint: string) => void

  // Проверка состояния
  hasCachedData: (endpoint: string, params?: Record<string, unknown>) => boolean

  // Статистика
  getCacheStats: () => { size: number; entries: any[] }
}

export function useCacheManager(): CacheManagerReturn {
  const clearCache = useCallback(() => {
    apiCache.clear()
    cachedApiClient.clearCache()
    console.log('🧹 All cache cleared')
  }, [])

  const clearExpiredCache = useCallback(() => {
    apiCache.clearExpired()
    console.log('🗑️ Expired cache entries cleared')
  }, [])

  const getCacheSize = useCallback(() => {
    return apiCache.size()
  }, [])

  const invalidatePage = useCallback((slug: string) => {
    const pageKey = `page:${slug}`
    apiCache.delete(pageKey)

    // Также инвалидируем все записи для этого эндпоинта
    const endpointKey = `/api/pages/slug/${slug}`
    apiCache.delete(endpointKey)

    console.log(`🔄 Cache invalidated for page: ${slug}`)
  }, [])

  const invalidateEndpoint = useCallback((endpoint: string) => {
    // Это упрощенная реализация - инвалидируем весь кэш
    // В реальном проекте можно реализовать более точную инвалидацию
    clearCache()
    console.log(`🔄 Cache invalidated for endpoint: ${endpoint}`)
  }, [clearCache])

  const hasCachedData = useCallback((endpoint: string, params?: Record<string, unknown>) => {
    return cachedApiClient.hasCachedData(endpoint, params)
  }, [])

  const getCacheStats = useCallback(() => {
    return cachedApiClient.getCacheStats()
  }, [])

  return {
    clearCache,
    clearExpiredCache,
    getCacheSize,
    invalidatePage,
    invalidateEndpoint,
    hasCachedData,
    getCacheStats,
  }
}

// Глобальные функции для управления кэшем (можно использовать вне React)
export const cacheManager = {
  clearCache: () => {
    apiCache.clear()
    cachedApiClient.clearCache()
  },

  clearExpiredCache: () => {
    apiCache.clearExpired()
  },

  getCacheSize: () => apiCache.size(),

  invalidatePage: (slug: string) => {
    const pageKey = `page:${slug}`
    apiCache.delete(pageKey)
    const endpointKey = `/api/pages/slug/${slug}`
    apiCache.delete(endpointKey)
  },

  hasCachedData: (endpoint: string, params?: Record<string, unknown>) => {
    return cachedApiClient.hasCachedData(endpoint, params)
  },

  getCacheStats: () => cachedApiClient.getCacheStats(),
}