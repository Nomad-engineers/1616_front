'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NavigationProps } from '@/types/ui-components'
import { Button } from './Button'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'

export function Navigation({ logo, links = [], cta, mobileMenu = true, className }: NavigationProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <nav
      className={cn(
        'fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md z-50 px-12 py-4 border-b border-gray-200',
        className
      )}
    >
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="logo">
          {logo?.src ? (
            <Logo
              size="custom"
              width={undefined}
              height={parseInt(logo.height || '40')}
              alt={logo.alt || '16:16'}
              className="object-contain"
            />
          ) : (
            <div className="text-xl font-bold">16:16</div>
          )}
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center gap-8 list-none">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                href={link.href}
                className={cn(
                  'text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-300',
                  link.active && 'text-blue-600'
                )}
              >
                {link.text}
              </Link>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        {cta && (
          <div className="hidden md:block">
            <Button
              variant={cta.variant}
              size={cta.size}
              text={cta.text}
              href={cta.href}
              icon={cta.icon}
              iconPosition={cta.iconPosition}
              onClick={cta.onClick ? () => console.log(cta.onClick) : undefined}
            />
          </div>
        )}

        {/* Mobile Menu Button */}
        {mobileMenu && (
          <button
            className="md:hidden flex flex-col gap-1 cursor-pointer"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            <span className={cn(
              'w-6 h-0.5 bg-gray-900 transition-all duration-300',
              isMobileMenuOpen && 'rotate-45 translate-y-1.5'
            )} />
            <span className={cn(
              'w-6 h-0.5 bg-gray-900 transition-all duration-300',
              isMobileMenuOpen && 'opacity-0'
            )} />
            <span className={cn(
              'w-6 h-0.5 bg-gray-900 transition-all duration-300',
              isMobileMenuOpen && '-rotate-45 -translate-y-1.5'
            )} />
          </button>
        )}
      </div>

      {/* Mobile Menu */}
      {mobileMenu && (
        <div className={cn(
          'md:hidden absolute top-full left-0 right-0 bg-white border-b border-gray-200 transition-all duration-300',
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        )}>
          <div className="px-6 py-4">
            <ul className="space-y-4">
              {links.map((link, index) => (
                <li key={index}>
                  <Link
                    href={link.href}
                    className={cn(
                      'block text-sm font-medium text-gray-900 hover:text-blue-600 transition-colors duration-300',
                      link.active && 'text-blue-600'
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.text}
                  </Link>
                </li>
              ))}
            </ul>

            {cta && (
              <div className="mt-6">
                <Button {...cta} onClick={() => setIsMobileMenuOpen(false)} />
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  )
}