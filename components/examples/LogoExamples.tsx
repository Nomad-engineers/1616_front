'use client'

import { Logo } from '@/components/ui/Logo'
import { LogoWithText, LogoButton } from '@/components/common'
import { Card } from '@/components/ui/Card'

export function LogoExamples() {
  return (
    <div className="space-y-8 p-8">
      <h2 className="text-2xl font-bold mb-6">Logo Usage Examples</h2>

      {/* Basic Logo Examples */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Basic Logo Sizes</h3>
        <div className="flex flex-wrap items-center gap-8">
          <div className="text-center">
            <Logo size="sm" />
            <p className="text-sm text-gray-600 mt-2">Small (32px)</p>
          </div>
          <div className="text-center">
            <Logo size="md" />
            <p className="text-sm text-gray-600 mt-2">Medium (48px)</p>
          </div>
          <div className="text-center">
            <Logo size="lg" />
            <p className="text-sm text-gray-600 mt-2">Large (64px)</p>
          </div>
          <div className="text-center">
            <Logo size="xl" />
            <p className="text-sm text-gray-600 mt-2">Extra Large (96px)</p>
          </div>
        </div>
      </Card>

      {/* Logo with Text Examples */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Logo with Text</h3>
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <LogoWithText size="sm" text="Your Company" variant="horizontal" />
            <span className="text-sm text-gray-600">Small horizontal</span>
          </div>
          <div className="flex items-center gap-4">
            <LogoWithText size="md" text="Your Company" variant="horizontal" />
            <span className="text-sm text-gray-600">Medium horizontal</span>
          </div>
          <div className="flex items-center gap-4">
            <LogoWithText size="lg" text="Your Company" variant="horizontal" />
            <span className="text-sm text-gray-600">Large horizontal</span>
          </div>
          <div className="flex items-center gap-4">
            <LogoWithText size="sm" text="Your Company" variant="vertical" />
            <span className="text-sm text-gray-600">Small vertical</span>
          </div>
        </div>
      </Card>

      {/* Logo Button Examples */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Logo Buttons</h3>
        <div className="flex items-center gap-4">
          <LogoButton size="sm" variant="ghost" />
          <span className="text-sm text-gray-600">Ghost variant</span>
          <LogoButton size="md" variant="outline" />
          <span className="text-sm text-gray-600">Outline variant</span>
          <LogoButton size="lg" variant="default" />
          <span className="text-sm text-gray-600">Default variant</span>
        </div>
      </Card>

      {/* Custom Size Examples */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Custom Sizes</h3>
        <div className="flex items-center gap-8">
          <Logo size="custom" width={120} height={120} />
          <span className="text-sm text-gray-600">120x120px</span>
          <Logo size="custom" width={24} height={24} />
          <span className="text-sm text-gray-600">24x24px</span>
          <Logo size="custom" width={60} height={30} />
          <span className="text-sm text-gray-600">60x30px (stretched)</span>
        </div>
      </Card>

      {/* Navigation and Footer Usage */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">In Context Examples</h3>
        <div className="space-y-4">
          <div className="p-4 border rounded">
            <h4 className="text-sm font-medium mb-2">Navigation Style</h4>
            <Logo size="custom" height={40} className="object-contain" />
          </div>
          <div className="p-4 border rounded bg-gray-900">
            <h4 className="text-sm font-medium mb-2 text-white">Footer Style</h4>
            <Logo
              size="custom"
              height={40}
              className="object-contain filter brightness-0 invert"
            />
          </div>
        </div>
      </Card>
    </div>
  )
}