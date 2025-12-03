import Image from 'next/image'
import { cn } from '@/lib/utils'

interface LogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'custom'
  width?: number
  height?: number
  className?: string
  priority?: boolean
  alt?: string
}

const sizeVariants = {
  sm: { width: 32, height: 32 },
  md: { width: 48, height: 48 },
  lg: { width: 64, height: 64 },
  xl: { width: 96, height: 96 },
  custom: { width: 0, height: 0 }
}

export function Logo({
  size = 'md',
  width,
  height,
  className,
  priority = false,
  alt = 'Company Logo'
}: LogoProps) {
  const finalSize = size === 'custom'
    ? { width: width || 48, height: height || 48 }
    : sizeVariants[size]

  return (
    <div className={cn('flex items-center justify-center', className)}>
      <Image
        src="/logo_rm_bg.png"
        alt={alt}
        width={finalSize.width}
        height={finalSize.height}
        priority={priority}
        className="object-contain"
        style={{ width: 'auto', height: 'auto' }}
      />
    </div>
  )
}