// 16:16 Agency Design System Configuration
// Based on the reference HTML design

import { UIComponents, Colors, Typography } from '@/types/ui-components'

export const colors: Colors = {
  primary: '#1a1a2e',
  secondary: '#0066cc',
  accent: '#d4a853',
  background: {
    light: '#f8f9fc',
    white: '#ffffff',
    gray: '#f3f4f6'
  },
  text: {
    dark: '#1a1a2e',
    gray: '#6b7280',
    muted: 'rgba(107, 114, 128, 0.7)'
  }
}

export const typography: Typography = {
  fonts: {
    primary: "'DM Sans', sans-serif",
    serif: "'Playfair Display', serif"
  },
  sizes: {
    hero: 'clamp(3rem, 7vw, 5rem)',
    section: 'clamp(2rem, 4vw, 3rem)',
    heading: '1.8rem - 2.5rem',
    subheading: '1.1rem - 1.3rem',
    body: '0.9rem - 1rem',
    small: '0.7rem - 0.85rem'
  }
}

export const spacing = {
  xs: '0.5rem',
  sm: '1rem',
  md: '1.5rem',
  lg: '2rem',
  xl: '3rem',
  '2xl': '4rem',
  '3xl': '6rem'
}

export const borderRadius = {
  sm: '8px',
  md: '10px',
  lg: '12px',
  xl: '16px',
  full: '50%'
}

export const shadows = {
  sm: '0 2px 4px rgba(0, 0, 0, 0.05)',
  md: '0 4px 15px rgba(26, 26, 46, 0.2)',
  lg: '0 10px 40px rgba(0, 0, 0, 0.08)',
  xl: '0 15px 40px rgba(0, 0, 0, 0.1)',
  card: '0 10px 30px rgba(26, 26, 46, 0.2)'
}

export const transitions = {
  fast: '0.15s ease',
  normal: '0.3s ease',
  slow: '0.5s ease'
}

export const breakpoints = {
  sm: '600px',
  md: '900px',
  lg: '1200px',
  xl: '1400px'
}

export const gridConfigs = {
  services: {
    columns: { default: 1, sm: 2, md: 3, lg: 4 },
    gap: '1.5rem'
  },
  packages: {
    columns: { default: 1, md: 3, lg: 5 },
    gap: '1rem'
  },
  cases: {
    columns: { default: 1, lg: 3 },
    gap: '1.5rem'
  },
  team: {
    columns: { default: 1, sm: 2, lg: 4 },
    gap: '1.5rem'
  },
  blog: {
    columns: { default: 1, lg: 3 },
    gap: '2rem'
  },
  why: {
    columns: { default: 1, sm: 2, lg: 4 },
    gap: '1.5rem'
  }
}

// Component-specific configurations
export const buttonVariants = {
  primary: {
    background: colors.primary,
    color: 'white',
    border: 'none',
    hover: {
      transform: 'translateY(-2px)',
      boxShadow: shadows.md
    }
  },
  secondary: {
    background: colors.secondary,
    color: 'white',
    border: 'none'
  },
  outline: {
    background: 'transparent',
    color: colors.text.dark,
    border: `1px solid ${colors.text.gray}`
  },
  ghost: {
    background: 'transparent',
    color: colors.text.dark,
    border: 'none'
  }
}

export const cardVariants = {
  service: {
    background: colors.background.white,
    border: `1px solid ${colors.text.gray}`,
    borderRadius: borderRadius.xl,
    padding: '2rem',
    hover: {
      transform: 'translateY(-5px)',
      boxShadow: shadows.lg
    }
  },
  package: {
    background: colors.background.light,
    border: `1px solid ${colors.text.gray}`,
    borderRadius: borderRadius.xl,
    padding: '2rem 1.5rem',
    featured: {
      background: colors.primary,
      color: 'white',
      border: 'none'
    }
  },
  case: {
    background: 'rgba(255, 255, 255, 0.1)',
    borderRadius: borderRadius.xl,
    padding: '2rem'
  },
  team: {
    background: colors.background.white,
    border: `1px solid ${colors.text.gray}`,
    borderRadius: borderRadius.xl,
    overflow: 'hidden'
  },
  blog: {
    background: colors.background.light,
    borderRadius: borderRadius.xl,
    overflow: 'hidden'
  },
  why: {
    background: colors.background.white,
    border: `1px solid ${colors.text.gray}`,
    borderRadius: borderRadius.xl,
    padding: '2rem'
  }
}

// Navigation configuration
export const navConfig = {
  height: '80px',
  background: 'rgba(255, 255, 255, 0.95)',
  backdropFilter: 'blur(10px)',
  padding: { x: '3rem', y: '1rem' },
  borderBottom: `1px solid ${colors.text.gray}`
}

// Form configuration
export const formConfig = {
  field: {
    padding: '1rem',
    border: `1px solid ${colors.text.gray}`,
    borderRadius: borderRadius.md,
    background: colors.background.white,
    fontSize: '0.95rem',
    focus: {
      outline: 'none',
      borderColor: colors.primary,
      boxShadow: `0 0 0 3px rgba(26, 26, 46, 0.1)`
    }
  },
  label: {
    fontSize: '0.8rem',
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    color: colors.text.gray,
    marginBottom: '0.5rem'
  }
}

// Animation keyframes
export const animations = {
  fadeIn: {
    from: { opacity: 0 },
    to: { opacity: 1 }
  },
  slideUp: {
    from: { transform: 'translateY(20px)', opacity: 0 },
    to: { transform: 'translateY(0)', opacity: 1 }
  },
  slideInLeft: {
    from: { transform: 'translateX(-20px)', opacity: 0 },
    to: { transform: 'translateX(0)', opacity: 1 }
  },
  scaleIn: {
    from: { transform: 'scale(0.95)', opacity: 0 },
    to: { transform: 'scale(1)', opacity: 1 }
  }
}

// Utility functions
export const getResponsiveClasses = (config: { columns: Record<string, number>, gap: string }) => {
  const { columns, gap } = config
  return {
    display: 'grid',
    gap,
    gridTemplateColumns: `repeat(${columns.default}, 1fr)`,
    [`@media (min-width: ${breakpoints.sm})`]: {
      gridTemplateColumns: `repeat(${columns.sm || columns.default}, 1fr)`
    },
    [`@media (min-width: ${breakpoints.md})`]: {
      gridTemplateColumns: `repeat(${columns.md || columns.sm || columns.default}, 1fr)`
    },
    [`@media (min-width: ${breakpoints.lg})`]: {
      gridTemplateColumns: `repeat(${columns.lg || columns.md || columns.sm || columns.default}, 1fr)`
    }
  }
}

export const createButtonClasses = (variant: keyof typeof buttonVariants, size: string = 'md') => {
  const variantStyles = buttonVariants[variant]
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  }

  return `${variantStyles} ${sizes[size as keyof typeof sizes]} inline-flex items-center justify-center rounded-sm font-medium cursor-pointer transition-colors duration-200`
}

export const createCardClasses = (variant: keyof typeof cardVariants, featured?: boolean) => {
  const baseStyles = cardVariants[variant]

  if (featured && variant === 'package' && 'featured' in baseStyles) {
    const packageStyles = baseStyles as any
    return {
      ...baseStyles,
      ...packageStyles.featured
    }
  }

  return baseStyles
}

export default {
  colors,
  typography,
  spacing,
  borderRadius,
  shadows,
  transitions,
  breakpoints,
  gridConfigs,
  buttonVariants,
  cardVariants,
  navConfig,
  formConfig,
  animations,
  getResponsiveClasses,
  createButtonClasses,
  createCardClasses
}