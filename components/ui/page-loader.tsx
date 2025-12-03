'use client'

import { Loader2 } from 'lucide-react'

export function PageLoader() {
  return (
    <div className='flex items-center justify-center min-h-[400px]'>
      <div className='text-center space-y-4'>
        <Loader2 className='h-8 w-8 animate-spin mx-auto text-primary' />
        <p className='text-muted-foreground'>Loading...</p>
      </div>
    </div>
  )
}

export function InlineLoader() {
  return (
    <div className='flex items-center justify-center py-8'>
      <Loader2 className='h-6 w-6 animate-spin text-primary' />
    </div>
  )
}