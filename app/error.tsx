'use client'

import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import {
  Settings,
  Activity,
  RefreshCw,
  Mail,
  Clock,
  Zap,
  Shield,
  ChevronRight
} from 'lucide-react'

// English text content
const texts = {
  title: "Technical Maintenance",
  subtitle: "Site temporarily unavailable",
  description: "We are currently improving the system to provide you with better service. This work will take a short time.",
  working: "In Progress",
  progress: "Improvements in progress",
  estimatedTime: "Estimated time: {minutes} minutes",
  retryButton: "Try Again Later",
  contactButton: "Contact Support",
  autoRefresh: "Page will automatically refresh in: {seconds}",
  thankYou: "Thank you for your patience!",
  improvements: [
    "Increasing system speed",
    "Improving security",
    "Adding new features",
    "Enhancing stability"
  ]
}

interface ErrorPageProps {
  error?: Error
  reset?: () => void
  estimatedMinutes?: number
  supportEmail?: string
  autoRefreshInterval?: number
}

export default function ErrorPage({
  error,
  reset,
  estimatedMinutes = 30,
  supportEmail = "support@1616.agency",
  autoRefreshInterval = 30
}: ErrorPageProps) {
  const [timeLeft, setTimeLeft] = useState(autoRefreshInterval)
  const [progress, setProgress] = useState(0)
  const [lastRetry, setLastRetry] = useState<number | null>(null)

  // Автоматическое обновление
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Автоматическое обновление страницы
          window.location.reload()
          return autoRefreshInterval
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [autoRefreshInterval])

  // Progress animation
  useEffect(() => {
    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) return 0
        return prev + 2
      })
    }, 600)

    return () => clearInterval(progressTimer)
  }, [])

  const handleRetry = () => {
    const now = Date.now()
    // Prevent too frequent clicks (minimum 5 seconds)
    if (lastRetry && now - lastRetry < 5000) {
      return
    }

    setLastRetry(now)
    if (reset) {
      reset()
    } else {
      window.location.reload()
    }
  }

  const handleContact = () => {
    window.location.href = `mailto:${supportEmail}?subject=${encodeURIComponent(texts.title)}&body=${encodeURIComponent(texts.description)}`
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex items-center justify-center p-4">
      {/* Фоновые элементы */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-slate-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Main content */}
      <div className="relative w-full max-w-2xl">

        {/* Главная карточка */}
        <Card type="value" title="Error" className="bg-white/90 backdrop-blur-sm border-slate-200 shadow-2xl">
          <div className="p-8 lg:p-12">
            {/* Анимированная иконка */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <Settings
                  className="h-16 w-16 text-blue-600 animate-spin"
                  style={{ animationDuration: '8s' }}
                />
                <Activity
                  className="h-8 w-8 text-green-500 absolute -top-2 -right-2 animate-pulse"
                />
                {/* Пульсирующие точки */}
                <div className="absolute -bottom-1 -right-1 flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <div
                      key={i}
                      className="h-2 w-2 bg-blue-500 rounded-full animate-pulse"
                      style={{ animationDelay: `${i * 0.3}s` }}
                    />
                  ))}
                </div>
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <h1 className="text-4xl lg:text-6xl font-bold text-slate-900 mb-4">
                {texts.title}
              </h1>
              <p className="text-xl lg:text-2xl text-slate-600 mb-4">
                {texts.subtitle}
              </p>
              <p className="text-base text-slate-500 max-w-md mx-auto leading-relaxed">
                {texts.description}
              </p>
            </div>

            {/* Progress indicator */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-medium text-slate-700">{texts.progress}</span>
                <span className="text-sm text-slate-500">{progress}%</span>
              </div>
              <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-500 ease-out"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Improvements */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {texts.improvements.map((improvement, index) => (
                <div key={index} className="flex items-center gap-3 p-3 bg-slate-50 rounded-lg">
                  <div className="flex-shrink-0">
                    {index === 0 && <Zap className="h-5 w-5 text-yellow-500" />}
                    {index === 1 && <Shield className="h-5 w-5 text-green-500" />}
                    {index === 2 && <Settings className="h-5 w-5 text-blue-500" />}
                    {index === 3 && <Activity className="h-5 w-5 text-purple-500" />}
                  </div>
                  <span className="text-sm text-slate-700">{improvement}</span>
                </div>
              ))}
            </div>

            {/* Refresh time */}
            <div className="flex items-center justify-center gap-2 mb-8 text-sm text-slate-500">
              <Clock className="h-4 w-4" />
              <span>
                {texts.autoRefresh.replace('{seconds}', formatTime(timeLeft))}
              </span>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleRetry}
                variant="primary"
                size="lg"
                className="w-full sm:w-auto min-w-[160px]"
                text={texts.retryButton}
              />

              <Button
                onClick={handleContact}
                variant="outline"
                size="lg"
                className="w-full sm:w-auto min-w-[160px]"
                text={texts.contactButton}
              />
            </div>

            {/* Thank you message */}
            <div className="text-center mt-8">
              <p className="text-sm text-slate-500 italic">
                {texts.thankYou}
              </p>
            </div>
          </div>
        </Card>

        {/* Additional information */}
        <div className="text-center mt-8">
          <div className="inline-flex items-center gap-2 text-sm text-slate-500">
            <span>{texts.estimatedTime.replace('{minutes}', estimatedMinutes.toString())}</span>
            <ChevronRight className="h-4 w-4" />
            <a
              href="mailto:support@1616.agency"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              support@1616.agency
            </a>
          </div>
        </div>

        {/* Development error details */}
        {process.env.NODE_ENV === 'development' && error && (
          <div className="mt-8 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h3 className="text-sm font-medium text-red-800 mb-2">Development Error Details:</h3>
            <pre className="text-xs text-red-700 overflow-auto max-h-32">
              {error.message}
              {error.stack && `\n\n${error.stack}`}
            </pre>
          </div>
        )}
      </div>
    </div>
  )
}