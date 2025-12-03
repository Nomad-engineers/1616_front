'use client'

import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
        <Card className='w-full max-w-md'>
          <CardHeader>
            <CardTitle className='flex items-center gap-2 text-destructive'>
              <AlertTriangle className='h-5 w-5' />
              Something went wrong
            </CardTitle>
          </CardHeader>
          <CardContent className='space-y-4'>
            <p className='text-sm text-muted-foreground'>
              An unexpected error occurred while loading the page. Please try again.
            </p>

            {showErrorDetails && (
              <div className='bg-muted p-3 rounded text-xs'>
                <strong>Error details:</strong>
                <pre className='mt-1 whitespace-pre-wrap'>{state.error.message}</pre>
              </div>
            )}

            <Button onClick={reset} variant='outline' className='w-full'>
              <RefreshCw className='h-4 w-4 mr-2' />
              Try Again
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return <>{children}</>
}