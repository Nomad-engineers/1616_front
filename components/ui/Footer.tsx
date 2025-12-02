'use client'

import Link from 'next/link'
import { FooterProps } from '@/types/ui-components'
import { Logo } from './Logo'
import { cn } from '@/lib/utils'

export function Footer({ logo, description, columns = [], bottom, className }: FooterProps) {
  return (
    <footer className="bg-gray-900 text-white py-16 px-6 md:px-12">
      <div className="max-w-7xl mx-auto">
        {/* Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Column */}
          <div className="lg:col-span-1">
            {logo?.src ? (
              <Logo
                size="custom"
                width={undefined}
                height={40}
                alt={logo.alt || '16:16'}
                className="mb-4 filter brightness-0 invert"
              />
            ) : (
              <div className="text-xl font-bold mb-4">16:16</div>
            )}

            {description && (
              <p className="text-white/70 text-sm leading-relaxed max-w-xs">
                {description}
              </p>
            )}
          </div>

          {/* Footer Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h4 className="text-xs font-medium uppercase tracking-wider text-yellow-500 mb-6">
                {column.title}
              </h4>

              <ul className="space-y-3">
                {column.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-white/70 hover:text-white text-sm transition-colors duration-200"
                    >
                      {link.text}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Footer Bottom */}
        {bottom && (
          <div className="border-t border-white/10 pt-8 mt-12">
            <div className="flex flex-col md:flex-row justify-between items-center text-xs text-white/60">
              <span>{bottom.copyright}</span>
              <span className="mt-2 md:mt-0">{bottom.info}</span>
            </div>
          </div>
        )}
      </div>
    </footer>
  )
}