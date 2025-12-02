import Link from 'next/link'
import { Logo } from '@/components/ui/Logo'
import { cn } from '@/lib/utils'

interface LogoWithTextProps {
  showText?: boolean
  text?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
  variant?: 'horizontal' | 'vertical'
  href?: string
  className?: string
  textClassName?: string
}

export function LogoWithText({
  showText = true,
  text = 'Your Company',
  size = 'md',
  variant = 'horizontal',
  href = '/',
  className,
  textClassName
}: LogoWithTextProps) {
  const textSizes = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  }

  const spacing = {
    horizontal: {
      sm: 'ml-2',
      md: 'ml-3',
      lg: 'ml-4',
      xl: 'ml-4'
    },
    vertical: {
      sm: 'mt-1',
      md: 'mt-2',
      lg: 'mt-3',
      xl: 'mt-3'
    }
  }

  const content = (
    <div className={cn(
      'flex items-center',
      variant === 'vertical' ? 'flex-col' : 'flex-row',
      className
    )}>
      <Logo size={size} />
      {showText && (
        <span className={cn(
          'font-semibold text-foreground',
          textSizes[size],
          variant === 'horizontal' ? spacing.horizontal[size] : spacing.vertical[size],
          textClassName
        )}>
          {text}
        </span>
      )}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {content}
      </Link>
    )
  }

  return content
}

interface LogoButtonProps {
  onClick?: () => void
  size?: 'sm' | 'md' | 'lg'
  variant?: 'default' | 'ghost' | 'outline'
  className?: string
}

export function LogoButton({
  onClick,
  size = 'md',
  variant = 'ghost',
  className
}: LogoButtonProps) {
  const buttonStyles = {
    default: 'bg-transparent hover:bg-transparent p-0',
    ghost: 'bg-transparent hover:bg-transparent p-0',
    outline: 'border border-border bg-transparent hover:bg-transparent p-0'
  }

  return (
    <button
      onClick={onClick}
      className={cn(
        'rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
        buttonStyles[variant],
        className
      )}
    >
      <Logo size={size} />
    </button>
  )
}