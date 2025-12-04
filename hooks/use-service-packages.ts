'use client'

import { useState, useEffect } from 'react'
import { getServicePackages, ServicePackage } from '@/lib/service-packages'

export function useServicePackages() {
  const [packages, setPackages] = useState<ServicePackage[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        setLoading(true)
        const data = await getServicePackages()
        setPackages(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch packages')
      } finally {
        setLoading(false)
      }
    }

    fetchPackages()
  }, [])

  // Transform packages for form select options
  const packageOptions = packages.map(pkg => ({
    value: pkg.id.toString(), // Send numeric ID as string
    text: `${pkg.title} - ${pkg.price}`
  }))

  return {
    packages,
    packageOptions,
    loading,
    error
  }
}