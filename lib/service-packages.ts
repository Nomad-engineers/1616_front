import { cmsApiClient } from './api-client'

export interface ServicePackage {
  id: number
  title: string
  price: string
  description: string
  features: string[]
}

export async function getServicePackages(): Promise<ServicePackage[]> {
  try {
    const homePageResponse = await cmsApiClient.get<any>(`/api/pages/slug/home`)

    // Find the Service Packages section
    const packagesSection = homePageResponse.layout?.find((section: any) =>
      section.blockType === 'section' &&
      section.slug === 'investment' &&
      section.title === 'Service Packages'
    )

    if (!packagesSection) {
      throw new Error('Service Packages section not found')
    }

    // Extract and transform package data
    const packageElements = packagesSection.elements?.filter((element: any) =>
      element.blockType === 'package-card' && element.plan
    ) || []

    return packageElements.map((element: any) => {
      const plan = element.plan
      return {
        id: plan.id,
        title: plan.title,
        price: plan.price,
        description: plan.description,
        features: plan.features?.map((feature: any) => feature.feature) || []
      }
    })
  } catch (error) {
    console.error('Error fetching service packages:', error)
    // Return fallback packages if API fails
    return [
      { id: 1, title: 'Starter', price: '10,000 AED/mo', description: 'Startups & SMEs • 2-3 specialists', features: [] },
      { id: 2, title: 'Growth', price: '20,000 AED/mo', description: 'Growing brands • 4-5 specialists', features: [] },
      { id: 3, title: 'Scale', price: '40,000 AED/mo', description: 'Established companies • 6-8 specialists', features: [] },
      { id: 4, title: 'Enterprise', price: '80,000 AED/mo', description: 'Large organizations • 10-12 specialists', features: [] },
      { id: 5, title: 'Presidential', price: '150,000 AED/mo', description: 'Market leaders • 15+ full team', features: [] }
    ]
  }
}