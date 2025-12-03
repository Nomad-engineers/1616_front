'use client'

import React from 'react'
import { Button, Card } from '@/components/ui'
import { AlertTriangle, RefreshCw } from 'lucide-react'

interface Props {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error: Error; reset: () => void }>
  showErrorDetails?: boolean
}

interface State {
  hasError: boolean
  error: Error | null
}

export default function ErrorBoundary({
  children,
  fallback: Fallback,
  showErrorDetails = process.env.NODE_ENV === 'development',
}: Props) {
  const [state, setState] = React.useState<State>({
    hasError: false,
    error: null,
  })

  React.useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      setState({
        hasError: true,
        error: event.error,
      })
    }

    const handleUnhandledRejection = (event: PromiseRejectionEvent) => {
      setState({
        hasError: true,
        error: new Error(event.reason),
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
    })
  }

  if (state.hasError && state.error) {
    if (Fallback) {
      return <Fallback error={state.error} reset={reset} />
    }

    return (
      <div className='min-h-screen flex items-center justify-center p-4'>
        <Card
          type="service"
          title="Something went wrong"
          description=""
          className="w-full max-w-md"
        >
          <div className='space-y-4'>
            <div className='flex items-center gap-2 text-red-600'>
              <AlertTriangle className='h-5 w-5' />
              <span className='font-semibold'>Something went wrong</span>
            </div>

            <p className='text-sm text-gray-600'>
              An unexpected error occurred while loading the page. Please try again.
            </p>

            {showErrorDetails && (
              <div className='bg-gray-100 p-3 rounded text-xs'>
                <strong>Error details:</strong>
                <pre className='mt-1 whitespace-pre-wrap'>{state.error.message}</pre>
              </div>
            )}

            <Button
              onClick={reset}
              variant='outline'
              size='md'
              text="Try Again"
              className='w-full'
            />
          </div>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}