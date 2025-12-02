'use client'

import { forwardRef } from 'react'
import { ButtonProps } from '@/types/ui-components'
import { createButtonClasses } from '@/lib/design-system'
import { cn } from '@/lib/utils'

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', text, href, icon, iconPosition = 'left', className, children, onClick, type = 'button', ...props }, ref) => {
    const buttonClasses = cn(
      createButtonClasses(variant, size),
      className
    )

    const content = (
      <>
        {icon && iconPosition === 'left' && <span className="mr-2">{icon}</span>}
        {children || text}
        {icon && iconPosition === 'right' && <span className="ml-2">{icon}</span>}
      </>
    )

    if (href) {
      return (
        <a
          href={href}
          className={buttonClasses}
          {...props}
        >
          {content}
        </a>
      )
    }

    return (
      <button
        ref={ref}
        type={type}
        className={buttonClasses}
        onClick={onClick}
        {...props}
      >
        {content}
      </button>
    )
  }
)

Button.displayName = 'Button'