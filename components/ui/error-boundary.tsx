'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'
import {
  AlertTriangle,
  RefreshCw,
  Home,
  Mail,
  Copy
} from 'lucide-react'

// English text content
const texts = {
  title: "An Error Occurred",
  subtitle: "An error occurred while loading the page",
  description: "An unexpected error occurred. Try reloading the page or contact support.",
  tryAgainButton: "Try Again",
  homeButton: "Go Home",
  contactButton: "Contact Support",
  copiedText: "Copied!",
  errorId: "Error ID:"
}

interface Props {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
  showErrorDetails?: boolean
  supportEmail?: string
}

interface State {
  hasError: boolean
  error: Error | null
  errorId: string
}

export default function ErrorBoundary({
  children,
  fallback: Fallback,
  showErrorDetails = process.env.NODE_ENV === 'development',
  supportEmail = "support@1616.agency"
}: Props) {
  const [state, setState] = React.useState<State>({
    hasError: false,
    error: null,
    errorId: '',
  })
  const [copied, setCopied] = React.useState(false)

  // Генерация ID ошибки
  const generateErrorId = () => {
    return `ERR-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
  }

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setState({
        hasError: true,
        error: event.error,
        errorId: generateErrorId(),
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setState({
        hasError: true,
        error: new Error(event.reason),
        errorId: generateErrorId(),
      })
    }

    window.addEventListener('error', handleError)
    window.addEventListener('unhandledrejection', handleUnhandledRejection)

    return () => {
      window.removeEventListener('error', handleError)
      window.removeEventListener('unhandledrejection', handleUnhandledRejection)
    }
  }, [])

  const reset = () => {
    setState({
      hasError: false,
      error: null,
      errorId: '',
    })
  }

  const handleCopyErrorId = () => {
    navigator.clipboard.writeText(state.errorId)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleContact = () => {
    const subject = encodeURIComponent(`${texts.title} - ${state.errorId}`)
    const body = encodeURIComponent(
      `${texts.description}\n\n${texts.errorId}: ${state.errorId}\n\n${showErrorDetails ? `${state.error?.name}: ${state.error?.message}\n\n${state.error?.stack || ''}` : ''}`
    )
    window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`
  }

  if (state.hasError && state.error) {
    if (Fallback) {
      return <Fallback error={state.error} reset={reset} />
    }

    return (
      <div className='min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4'>
        {/* Фоновые элементы */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-red-200 rounded-full opacity-20 animate-pulse" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-200 rounded-full opacity-20 animate-pulse" style={{ animationDelay: '2s' }} />
        </div>

        <div className="relative w-full max-w-lg">
          <Card type="value" title="Error" className="bg-white/90 backdrop-blur-sm border-red-200 shadow-2xl">
            <div className="p-8">
              {/* Иконка ошибки */}
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <AlertTriangle className="h-16 w-16 text-red-500" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-ping" />
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full" />
                </div>
              </div>

              {/* Заголовок */}
              <div className="text-center mb-6">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">
                  {texts.title}
                </h1>
                <p className="text-lg text-slate-600">
                  {texts.subtitle}
                </p>
              </div>

              {/* ID ошибки */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-6">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-red-800">
                    {texts.errorId} <code className="bg-red-100 px-2 py-1 rounded text-xs font-mono">{state.errorId}</code>
                  </span>
                  <button
                    onClick={handleCopyErrorId}
                    className="flex items-center gap-1 text-red-600 hover:text-red-700 transition-colors"
                  >
                    <Copy className="h-4 w-4" />
                    <span className="text-xs">{copied ? texts.copiedText : 'Copy'}</span>
                  </button>
                </div>
              </div>

              {/* Описание */}
              <p className="text-sm text-slate-600 mb-8 text-center leading-relaxed">
                {texts.description}
              </p>

              {/* Детали ошибки в development */}
              {showErrorDetails && (
                <div className="bg-slate-100 border border-slate-200 rounded-lg p-4 mb-8">
                  <h3 className="text-sm font-medium text-slate-800 mb-2">Error Details:</h3>
                  <pre className="text-xs text-slate-700 overflow-auto max-h-32 whitespace-pre-wrap">
                    {state.error.name}: {state.error.message}
                    {state.error.stack && `\n\n${state.error.stack}`}
                  </pre>
                </div>
              )}

              {/* Кнопки действий */}
              <div className="space-y-3">
                <Button
                  onClick={reset}
                  variant="primary"
                  size="lg"
                  className="w-full"
                  text={texts.tryAgainButton}
                />

                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                    size="md"
                    className="w-full"
                    text={texts.homeButton}
                  />

                  <Button
                    onClick={handleContact}
                    variant="outline"
                    size="md"
                    className="w-full"
                    text={texts.contactButton}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    )
  }

  return <>{children}</>
}