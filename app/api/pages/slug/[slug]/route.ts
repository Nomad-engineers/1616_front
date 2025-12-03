import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params

  try {
    const apiUrl = `https://1616-psi.vercel.app/api/pages/slug/${slug}`

    const response = await fetch(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        // Add any required headers here
      },
      cache: 'no-store' // Disable caching for fresh data
    })

    if (!response.ok) {
      throw new Error(`API responded with status: ${response.status}`)
    }

    const data = await response.json()

    // Add CORS headers
    const headers = new Headers({
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    })

    return new NextResponse(JSON.stringify(data), {
      status: 200,
      headers,
    })
  } catch (error) {
    console.error('Proxy API error:', error)

    return NextResponse.json(
      {
        error: 'Failed to fetch page data',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      {
        status: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        }
      }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  })
}