import { NextResponse } from 'next/server'

export async function GET() {
  // Имитация серверной ошибки
  throw new Error('Тестовая 500 ошибка для демонстрации')

  // Этот код не выполнится
  return NextResponse.json({ message: 'OK' })
}

export async function POST() {
  // Имитация внутренней ошибки сервера
  return new NextResponse(
    JSON.stringify({ error: 'Internal Server Error' }),
    {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    }
  )
}