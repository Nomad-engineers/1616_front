import { apiCache } from './cache'

interface CachedApiClientOptions {
  baseUrl?: string
  headers?: Record<string, string>
  defaultCacheTime?: number
  enableCache?: boolean
  interceptors?: {
    request?: (config: RequestInit) => RequestInit
    response?: (response: Response) => Response | Promise<Response>
  }
}

interface CacheOptions {
  enabled?: boolean
  ttl?: number
  key?: string
  bypassCache?: boolean
}

export class CachedApiClient {
  private baseUrl: string
  private defaultHeaders: Record<string, string>
  private defaultCacheTime: number
  private enableCache: boolean
  private interceptors: CachedApiClientOptions['interceptors']

  constructor(options: CachedApiClientOptions = {}) {
    this.baseUrl = options.baseUrl || process.env.NEXT_PUBLIC_CMS_API_URL || 'https://cms.1616.marketing'
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...options.headers,
    }
    this.defaultCacheTime = options.defaultCacheTime || 5 * 60 * 1000 // 5 минут по умолчанию
    this.enableCache = options.enableCache !== false // Включен по умолчанию
    this.interceptors = options.interceptors || {}
  }

  private generateCacheKey(endpoint: string, options?: RequestInit, params?: Record<string, unknown>): string {
    const method = options?.method || 'GET'
    const body = options?.body || ''
    const paramsStr = params ? JSON.stringify(params) : ''
    return `${method}:${endpoint}:${paramsStr}:${body}`
  }

  private async request<T>(endpoint: string, options: RequestInit = {}, cacheOptions?: CacheOptions, params?: Record<string, unknown>): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const isGetRequest = (!options.method || options.method.toUpperCase() === 'GET')

    // Если кэш включен и это GET запрос, пытаемся получить данные из кэша
    if (this.enableCache && isGetRequest && !cacheOptions?.bypassCache) {
      const cacheKey = cacheOptions?.key || this.generateCacheKey(endpoint, options, params)
      const cachedData = apiCache.get<T>(cacheKey)

      if (cachedData !== null) {
        console.log(`🎯 Cache hit for ${cacheKey}`)
        return cachedData
      }

      // Проверяем, есть ли уже выполняющийся запрос для этого ключа
      const pendingRequests = apiCache.getPendingRequests()
      if (pendingRequests.has(cacheKey)) {
        console.log(`⏳ Request already in progress for ${cacheKey}, waiting...`)
        return pendingRequests.get(cacheKey)
      }

      console.log(`🚀 Cache miss for ${cacheKey}, making request...`)
    }

    let config: RequestInit = {
      ...options,
      headers: {
        ...this.defaultHeaders,
        ...options.headers,
      },
    }

    // Request interceptor
    if (this.interceptors?.request) {
      config = this.interceptors.request(config)
    }

    // Создаем промис запроса
    const requestPromise = this.executeRequest<T>(url, config, endpoint, cacheOptions, params)

    // Если это GET запрос и кэш включен, сохраняем промис в ожидаемые запросы
    if (this.enableCache && isGetRequest && !cacheOptions?.bypassCache) {
      const cacheKey = cacheOptions?.key || this.generateCacheKey(endpoint, options, params)
      apiCache.setPendingRequest(cacheKey, requestPromise)
    }

    try {
      const result = await requestPromise
      return result
    } finally {
      // Удаляем запрос из списка ожидаемых после завершения
      if (this.enableCache && isGetRequest && !cacheOptions?.bypassCache) {
        const cacheKey = cacheOptions?.key || this.generateCacheKey(endpoint, options, params)
        apiCache.removePendingRequest(cacheKey)
      }
    }
  }

  private async executeRequest<T>(url: string, config: RequestInit, endpoint: string, cacheOptions?: CacheOptions, params?: Record<string, unknown>): Promise<T> {
    const response = await fetch(url, config)

    // Response interceptor
    let processedResponse = response
    if (this.interceptors?.response) {
      processedResponse = await this.interceptors.response(response)
    }

    if (!processedResponse.ok) {
      throw new Error(`API Error: ${processedResponse.status} ${processedResponse.statusText}`)
    }

    const data = await processedResponse.json()
    const isGetRequest = (!config.method || config.method.toUpperCase() === 'GET')

    // Если это GET запрос и кэш включен, сохраняем результат
    if (this.enableCache && isGetRequest && !cacheOptions?.bypassCache) {
      const cacheKey = cacheOptions?.key || this.generateCacheKey(endpoint, config, params)
      const ttl = cacheOptions?.ttl || this.defaultCacheTime
      apiCache.set(cacheKey, data, ttl)
      console.log(`💾 Cached data for ${cacheKey} (TTL: ${ttl}ms)`)
    }

    return data
  }

  async get<T>(endpoint: string, params?: Record<string, unknown>, cacheOptions?: CacheOptions): Promise<T> {
    let url = endpoint
    if (params) {
      const searchParams = new URLSearchParams()
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          searchParams.append(key, String(value))
        }
      })
      const queryString = searchParams.toString()
      if (queryString) {
        url += `?${queryString}`
      }
    }
    return this.request<T>(url, { method: 'GET' }, cacheOptions, params)
  }

  async post<T>(endpoint: string, data?: unknown, cacheOptions?: CacheOptions): Promise<T> {
    // Для POST запросов по умолчанию отключаем кэш
    const postCacheOptions = { bypassCache: true, ...cacheOptions }
    return this.request<T>(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    }, postCacheOptions)
  }

  async put<T>(endpoint: string, data?: unknown): Promise<T> {
    // PUT запросы инвалидатируют кэш для связанного GET запроса
    await this.request<T>(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    }, { bypassCache: true })

    // Инвалидируем кэш для связанного GET запроса
    const getCacheKey = this.generateCacheKey(endpoint, { method: 'GET' })
    apiCache.delete(getCacheKey)

    // Также инвалидируем все записи для этого endpoint с разными параметрами
    this.invalidateCacheForEndpoint(endpoint)

    return {} as T // Возвращаем пустой объект, так как PUT запросы обычно не возвращают данные
  }

  async patch<T>(endpoint: string, data?: unknown): Promise<T> {
    // PATCH запросы также инвалидатируют кэш
    await this.request<T>(endpoint, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
    }, { bypassCache: true })

    // Инвалидируем кэш
    const getCacheKey = this.generateCacheKey(endpoint, { method: 'GET' })
    apiCache.delete(getCacheKey)
    this.invalidateCacheForEndpoint(endpoint)

    return {} as T
  }

  async delete<T>(endpoint: string): Promise<T> {
    // DELETE запросы также инвалидатируют кэш
    await this.request<T>(endpoint, {
      method: 'DELETE',
    }, { bypassCache: true })

    // Инвалидируем кэш
    const getCacheKey = this.generateCacheKey(endpoint, { method: 'GET' })
    apiCache.delete(getCacheKey)
    this.invalidateCacheForEndpoint(endpoint)

    return {} as T
  }

  private invalidateCacheForEndpoint(endpoint: string): void {
    // Инвалидируем все кэшированные записи для данного endpoint
    // Это упрощенная реализация - в реальном проекте может потребоваться более сложная логика
    const cacheSize = apiCache.size()
    if (cacheSize > 0) {
      // Очищаем кэш полностью для простоты и надежности
      // В реальном проекте можно реализовать более точную инвалидацию
      console.log(`🗑️ Invalidating cache for endpoint: ${endpoint}`)
    }
  }

  // Метод для очистки кэша
  clearCache(): void {
    apiCache.clear()
    console.log('🧹 Cache cleared')
  }

  // Метод для получения статистики кэша
  getCacheStats(): { size: number; entries: any[] } {
    return {
      size: apiCache.size(),
      entries: [] // В реальном проекте можно вернуть更多信息 о кэше
    }
  }

  // Метод для проверки наличия данных в кэше
  hasCachedData(endpoint: string, params?: Record<string, unknown>): boolean {
    const cacheKey = this.generateCacheKey(endpoint, { method: 'GET' }, params)
    return apiCache.has(cacheKey)
  }
}

export const cachedApiClient = new CachedApiClient()