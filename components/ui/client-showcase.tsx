'use client'

import React, { useState, useRef, useEffect } from 'react'
import { cn } from '@/lib/utils'
import { Building2, Star } from 'lucide-react'

interface Client {
  name: string
  logo?: string
  description?: string
  category?: string
}

interface ClientShowcaseProps {
  clients: Client[]
  title?: string
  subtitle?: string
  className?: string
}

export function ClientShowcase({
  clients,
  title = "Trusted by Industry Leaders",
  subtitle = "We've had the privilege of working with some of the world's most recognized brands",
  className
}: ClientShowcaseProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.unobserve(entry.target)
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  // Group clients by category for better organization
  const categorizedClients = clients.reduce((acc, client) => {
    const category = client.category || 'partners'
    if (!acc[category]) acc[category] = []
    acc[category].push(client)
    return acc
  }, {} as Record<string, Client[]>)

  return (
    <div
      ref={sectionRef}
      className={cn(
        'relative overflow-hidden',
        'before:absolute before:inset-0 before:bg-gradient-to-br before:from-blue-50/30 before:to-transparent before:pointer-events-none',
        className
      )}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold-100/20 rounded-full blur-3xl pointer-events-none" />
    </div>
  )
}

// Specific component for Fortune 500 showcase
export function Fortune500Showcase({ className }: { className?: string }) {
  const fortune500Clients = [
    { name: "Coca-Cola", category: "beverage" },
    { name: "Samsung", category: "technology" },
    { name: "Huawei", category: "technology" },
    { name: "P&G", category: "consumer" },
    { name: "Snickers", category: "food" },
  ]

  return (
    <ClientShowcase
      clients={fortune500Clients}
      title="Fortune 500 Partnership"
      subtitle="Strategic campaigns for the world's biggest brands across multiple industries"
      className={className}
    />
  )
}