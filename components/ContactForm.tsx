'use client'

import { useState } from 'react'
import { Form } from '@/components/ui/Form'
import { contactApi } from '@/api/contact'
import uiConfig from '@/lib/ui-config.json'
import type { UIComponents } from '@/types/ui-components'
import { useServicePackages } from '@/hooks/use-service-packages'

export function ContactForm() {
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const { packageOptions, loading } = useServicePackages()

  const handleSubmit = async (formData: Record<string, string>) => {
    try {
      // Convert planId to number for the API (sending real plan ID, not string)
      const apiData = {
        name: formData.name,
        email: formData.email,
        planId: parseInt(formData.planId, 10), // Convert to numeric ID
        message: formData.message
      }

      await contactApi.submit(apiData)
      setSubmitStatus('success')
      setShowSuccessModal(true)
    } catch (error) {
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Submission failed')
    }
  }

  const handleReset = () => {
    setSubmitStatus('idle')
    setErrorMessage('')
    setShowSuccessModal(false)
  }

  const handleSendAnother = () => {
    setShowSuccessModal(false)
    setSubmitStatus('idle')
  }

  return (
    <div>
      {submitStatus === 'error' && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-600">{errorMessage}</p>
        </div>
      )}

      <Form
        fields={(uiConfig as UIComponents).contactForm?.fields?.map(field =>
          field.name === 'planId'
            ? {
                ...field,
                options: [
                  { value: '', text: 'Select a package' },
                  ...packageOptions
                ],
                disabled: loading
              }
            : field
        ) || []}
        submit={(uiConfig as UIComponents).contactForm?.submit || { variant: 'primary' as const, size: 'md' as const, text: 'Submit' }}
        onSubmit={handleSubmit}
      />

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg max-w-md mx-4">
            <h3 className="text-xl font-semibold mb-4">Message Sent Successfully!</h3>
            <p className="text-gray-600 mb-6">
              Thank you for contacting us. We'll get back to you within 24 hours.
            </p>
            <div className="flex gap-4">
              <button
                onClick={handleReset}
                className="flex-1 bg-gray-200 text-gray-800 py-2 px-4 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Close
              </button>
              <button
                onClick={handleSendAnother}
                className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors"
              >
                Send Another Message
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}