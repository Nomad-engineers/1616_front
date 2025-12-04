interface CacheEntry<T> {
  data: T
  timestamp: number
  ttl: number
}

export class ApiCache {
  private cache = new Map<string, CacheEntry<any>>()
  private static instance: ApiCache
  private storageKey = 'api-cache-v1'
  private pendingRequests = new Map<string, Promise<any>>()

  private constructor() {
    // Восстанавливаем кэш из localStorage при инициализации
    this.restoreFromStorage()
  }

  static getInstance(): ApiCache {
    if (!ApiCache.instance) {
      ApiCache.instance = new ApiCache()
    }
    return ApiCache.instance
  }

  private restoreFromStorage(): void {
    if (typeof window === 'undefined') return

    try {
      const stored = localStorage.getItem(this.storageKey)
      if (stored) {
        const parsed = JSON.parse(stored)
        const now = Date.now()

        // Восстанавливаем только не истекшие записи
        for (const [key, entry] of Object.entries(parsed)) {
          const cacheEntry = entry as CacheEntry<any>
          const age = now - cacheEntry.timestamp

          if (age <= cacheEntry.ttl) {
            this.cache.set(key, cacheEntry)
            console.log(`🔄 Restored cache entry for ${key}`)
          }
        }

        console.log(`📦 Restored ${this.cache.size} cache entries from localStorage`)
      }
    } catch (error) {
      console.warn('Failed to restore cache from localStorage:', error)
    }
  }

  private saveToStorage(): void {
    if (typeof window === 'undefined') return

    try {
      const serialized: Record<string, CacheEntry<any>> = {}
      for (const [key, entry] of this.cache.entries()) {
        serialized[key] = entry
      }
      localStorage.setItem(this.storageKey, JSON.stringify(serialized))
    } catch (error) {
      console.warn('Failed to save cache to localStorage:', error)
    }
  }

  set<T>(key: string, data: T, ttl: number = 5 * 60 * 1000): void {
    const entry: CacheEntry<T> = {
      data,
      timestamp: Date.now(),
      ttl
    }

    this.cache.set(key, entry)
    this.saveToStorage()

    console.log(`💾 Cached data for ${key} (TTL: ${ttl}ms)`)
  }

  get<T>(key: string): T | null {
    const entry = this.cache.get(key)

    if (!entry) {
      return null
    }

    const now = Date.now()
    const age = now - entry.timestamp

    if (age > entry.ttl) {
      this.cache.delete(key)
      this.saveToStorage() // Обновляем localStorage
      console.log(`⏰ Cache expired for ${key}`)
      return null
    }

    console.log(`📦 Cache hit for ${key}`)
    return entry.data as T
  }

  has(key: string): boolean {
    return this.get(key) !== null
  }

  clear(): void {
    this.cache.clear()
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey)
    }
    console.log('🧹 Cache cleared')
  }

  delete(key: string): void {
    this.cache.delete(key)
    this.saveToStorage()
  }

  clearExpired(): void {
    const now = Date.now()
    let clearedCount = 0

    for (const [key, entry] of this.cache.entries()) {
      const age = now - entry.timestamp
      if (age > entry.ttl) {
        this.cache.delete(key)
        clearedCount++
      }
    }

    if (clearedCount > 0) {
      this.saveToStorage()
      console.log(`🗑️ Cleared ${clearedCount} expired cache entries`)
    }
  }

  size(): number {
    return this.cache.size
  }

  getPendingRequests(): Map<string, Promise<any>> {
    return this.pendingRequests
  }

  setPendingRequest(key: string, promise: Promise<any>): void {
    this.pendingRequests.set(key, promise)
  }

  removePendingRequest(key: string): void {
    this.pendingRequests.delete(key)
  }

  // Получение статистики кэша
  getStats(): {
    size: number
    entries: Array<{ key: string; age: number; ttl: number; expired: boolean }>
  } {
    const now = Date.now()
    const entries = Array.from(this.cache.entries()).map(([key, entry]) => ({
      key,
      age: now - entry.timestamp,
      ttl: entry.ttl,
      expired: (now - entry.timestamp) > entry.ttl
    }))

    return {
      size: this.cache.size,
      entries
    }
  }

  // Принудительная очистка localStorage (для отладки)
  forceStorageClear(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.storageKey)
      console.log('🔥 Forced localStorage cache clear')
    }
  }
}

export const apiCache = ApiCache.getInstance()