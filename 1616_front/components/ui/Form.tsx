'use client'

import { useState } from 'react'
import { FormProps, FormField } from '@/types/ui-components'
import { Button } from './Button'
import { cn } from '@/lib/utils'

export function Form({ fields, submit, className, onSubmit }: FormProps) {
  const [formData, setFormData] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleInputChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      if (onSubmit) {
        await onSubmit(formData)
      }
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderField = (field: FormField) => {
    const baseInputClasses = cn(
      'w-full px-4 py-3 border border-gray-200 rounded-lg font-medium text-sm focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent transition-all duration-200',
      'bg-white placeholder-gray-400'
    )

    switch (field.type) {
      case 'select':
        return (
          <select
            id={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            className={baseInputClasses}
            required={field.required}
          >
            {field.options?.map((option, index) => (
              <option key={index} value={option} disabled={index === 0}>
                {option}
              </option>
            ))}
          </select>
        )

      case 'textarea':
        return (
          <textarea
            id={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={cn(baseInputClasses, 'min-h-[120px] resize-vertical')}
            required={field.required}
          />
        )

      case 'email':
        return (
          <input
            type="email"
            id={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClasses}
            required={field.required}
          />
        )

      default:
        return (
          <input
            type={field.type}
            id={field.name}
            value={formData[field.name] || ''}
            onChange={(e) => handleInputChange(field.name, e.target.value)}
            placeholder={field.placeholder}
            className={baseInputClasses}
            required={field.required}
          />
        )
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn('space-y-6', className)}
    >
      {fields.map((field) => (
        <div key={field.name} className="form-group">
          <label
            htmlFor={field.name}
            className="block text-xs font-medium uppercase tracking-wider text-gray-600 mb-2"
          >
            {field.label}
            {field.required && <span className="text-red-500 ml-1">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}

      <Button
        variant={submit.variant}
        size={submit.size}
        text={isSubmitting ? 'Submitting...' : submit.text}
        disabled={isSubmitting}
        className="w-full"
      />
    </form>
  )
}