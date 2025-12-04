'use client'

import { useState, useEffect } from 'react'
import { Wifi, WifiOff, RefreshCw, CheckCircle } from 'lucide-react'

interface CacheIndicatorProps {
  isFromCache: boolean
  isValidating: boolean
  cacheStatus: 'fresh' | 'stale' | 'empty'
  className?: string
}

export function CacheIndicator({
  isFromCache,
  isValidating,
  cacheStatus,
  className = ''
}: CacheIndicatorProps) {
  const [visible, setVisible] = useState(false)

  // Показываем индикатор на несколько секунд при изменении состояния
  useEffect(() => {
    if (isFromCache || isValidating) {
      setVisible(true)
      const timer = setTimeout(() => {
        if (!isValidating) {
          setVisible(false)
        }
      }, 3000)

      return () => clearTimeout(timer)
    }
  }, [isFromCache, isValidating])

  // Если ничего не происходит и нет кэша, не показываем индикатор
  if (!visible && cacheStatus === 'empty') {
    return null
  }

  if (!visible && !isValidating) {
    return null
  }

  return (
    <div
      className={`
        fixed top-4 right-4 z-50 flex items-center gap-2 px-3 py-2 rounded-lg
        bg-white border shadow-md text-sm transition-all duration-300
        ${className}
        ${isFromCache && !isValidating ? 'border-blue-200 bg-blue-50' : ''}
        ${isValidating ? 'border-orange-200 bg-orange-50' : ''}
        ${cacheStatus === 'fresh' ? 'border-green-200 bg-green-50' : ''}
      `}
    >
      {isValidating ? (
        <>
          <RefreshCw className="w-4 h-4 text-orange-600 animate-spin" />
          <span className="text-orange-700">Обновляем данные...</span>
        </>
      ) : isFromCache ? (
        <>
          <Wifi className="w-4 h-4 text-blue-600" />
          <span className="text-blue-700">Данные из кэша</span>
        </>
      ) : cacheStatus === 'fresh' ? (
        <>
          <CheckCircle className="w-4 h-4 text-green-600" />
          <span className="text-green-700">Актуальные данные</span>
        </>
      ) : (
        <>
          <WifiOff className="w-4 h-4 text-gray-600" />
          <span className="text-gray-700">Нет кэша</span>
        </>
      )}
    </div>
  )
}

// Более компактная версия для dev режима
export function DevCacheIndicator({
  isFromCache,
  isValidating,
  cacheStatus
}: {
  isFromCache: boolean
  isValidating: boolean
  cacheStatus: 'fresh' | 'stale' | 'empty'
}) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Показываем только в development режиме
  if (!mounted || process.env.NODE_ENV === 'production') {
    return null
  }

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <CacheIndicator
        isFromCache={isFromCache}
        isValidating={isValidating}
        cacheStatus={cacheStatus}
        className="text-xs opacity-75"
      />
    </div>
  )
}