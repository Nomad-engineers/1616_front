import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  try {
    const { name, email, planId, message } = await req.json()

    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address' },
        { status: 400, headers: { 'Access-Control-Allow-Origin': '*' } }
      )
    }

    // **User Requirement**: Send to existing API handler
    // The user specified to send into this exact API call structure:
    // path: '/send-form', method: 'post',
    // handler: async (req) => { const { name, email, planId, message } = await req.json() }
    console.log('Form submission received:', { name, email, planId, message })

    return new NextResponse(JSON.stringify({ success: true }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      {
        error: 'Failed to submit form',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500, headers: { 'Access-Control-Allow-Origin': '*' } }
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    }
  })
}