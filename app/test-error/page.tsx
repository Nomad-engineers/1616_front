'use client'

import React from 'react'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import ErrorBoundary from '@/components/ui/error-boundary'
import {
  AlertTriangle,
  Bug,
  Zap,
  Code,
  RefreshCw,
  Home
} from 'lucide-react'

// Компонент для вызова ошибки
function ErrorComponent({ shouldError }: { shouldError: boolean }) {
  React.useEffect(() => {
    if (shouldError) {
      throw new Error('Тестовая ошибка для демонстрации error boundary')
    }
  }, [shouldError])

  return (
    <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-green-800">
      ✅ Компонент работает без ошибок
    </div>
  )
}

// Компонент для асинхронной ошибки
function AsyncErrorComponent({ shouldError }: { shouldError: boolean }) {
  React.useEffect(() => {
    if (shouldError) {
      setTimeout(() => {
        throw new Error('Асинхронная ошибка для демонстрации')
      }, 1000)
    }
  }, [shouldError])

  return (
    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
      ⏳ Асинхронный компонент (ошибка через 1 секунду)
    </div>
  )
}

// Компонент для Promise rejection
function PromiseErrorComponent({ shouldError }: { shouldError: boolean }) {
  React.useEffect(() => {
    if (shouldError) {
      setTimeout(() => {
        Promise.reject(new Error('Promise rejection для демонстрации'))
      }, 1500)
    }
  }, [shouldError])

  return (
    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg text-purple-800">
      🔄 Promise компонент (rejection через 1.5 секунды)
    </div>
  )
}

export default function TestErrorPage() {
  const [syncError, setSyncError] = React.useState(false)
  const [asyncError, setAsyncError] = React.useState(false)
  const [promiseError, setPromiseError] = React.useState(false)
  const [currentTest, setCurrentTest] = React.useState<string | null>(null)

  const handleTest500 = () => {
    // Триггер 500 ошибки через серверный компонент
    setCurrentTest('500-error')
    setSyncError(false)
    setAsyncError(false)
    setPromiseError(false)
  }

  const handleResetAll = () => {
    setSyncError(false)
    setAsyncError(false)
    setPromiseError(false)
    setCurrentTest(null)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="relative">
              <Bug className="h-12 w-12 text-blue-600" />
              <AlertTriangle className="h-6 w-6 text-red-500 absolute -top-2 -right-2" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900 mb-2">
            Тестирование Error Pages
          </h1>
          <p className="text-slate-600">
            Демонстрация работы кастомных страниц ошибок и error boundaries
          </p>
        </div>

        {/* Информация */}
        <Card type="value" title="Test Information" className="bg-white/80 backdrop-blur-sm border-slate-200 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Доступные тесты:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <h3 className="font-medium text-slate-800 flex items-center gap-2">
                  <Code className="h-4 w-4 text-blue-500" />
                  Client-side ошибки:
                </h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• Синхронная ошибка в компоненте</li>
                  <li>• Асинхронная ошибка в useEffect</li>
                  <li>• Promise rejection</li>
                </ul>
              </div>
              <div className="space-y-3">
                <h3 className="font-medium text-slate-800 flex items-center gap-2">
                  <Zap className="h-4 w-4 text-yellow-500" />
                  Server-side ошибки:
                </h3>
                <ul className="text-sm text-slate-600 space-y-1">
                  <li>• 500 Internal Server Error</li>
                  <li>• Next.js Error Pages</li>
                  <li>• Error Boundary обработка</li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Панель управления */}
        <Card type="value" title="Test Information" className="bg-white/80 backdrop-blur-sm border-slate-200 mb-8">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Управление тестами:
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button
                onClick={() => setSyncError(!syncError)}
                variant={syncError ? "outline" : "primary"}
                disabled={syncError}
                className="w-full"
                size="md"
                text={syncError ? "⚠️ Ошибка активна" : "🔴 Синхронная ошибка"}
              />

              <Button
                onClick={() => setAsyncError(!asyncError)}
                variant={asyncError ? "outline" : "primary"}
                disabled={asyncError}
                className="w-full"
                size="md"
                text={asyncError ? "⚠️ Ошибка активна" : "⏱️ Асинхронная ошибка"}
              />

              <Button
                onClick={() => setPromiseError(!promiseError)}
                variant={promiseError ? "outline" : "primary"}
                disabled={promiseError}
                className="w-full"
                size="md"
                text={promiseError ? "⚠️ Ошибка активна" : "🔄 Promise rejection"}
              />

              <Button
                onClick={handleTest500}
                variant="outline"
                className="w-full"
                size="md"
                text="💥 500 Server Error"
              />

              <Button
                onClick={handleResetAll}
                variant="package"
                className="w-full"
                size="md"
                text="Сбросить все"
              />

              <Button
                onClick={() => window.location.href = '/'}
                variant="outline"
                className="w-full"
                size="md"
                text="На главную"
              />
            </div>
          </div>
        </Card>

        {/* Тестовая область */}
        {currentTest !== '500-error' && (
          <Card type="value" title="Test Area" className="bg-white/80 backdrop-blur-sm border-slate-200">
            <div className="p-6">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">
                Тестовая область:
              </h2>

              <ErrorBoundary>
                <div className="space-y-6">
                  {/* Синхронный компонент */}
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Синхронный компонент:</h3>
                    <ErrorComponent shouldError={syncError} />
                  </div>

                  {/* Асинхронный компонент */}
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Асинхронный компонент:</h3>
                    <AsyncErrorComponent shouldError={asyncError} />
                  </div>

                  {/* Promise компонент */}
                  <div>
                    <h3 className="font-medium text-slate-800 mb-2">Promise компонент:</h3>
                    <PromiseErrorComponent shouldError={promiseError} />
                  </div>
                </div>
              </ErrorBoundary>

              {!syncError && !asyncError && !promiseError && (
                <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg text-center">
                  <p className="text-gray-600">
                    ✅ Все компоненты работают нормально. Нажмите на кнопки выше чтобы вызвать ошибки.
                  </p>
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Инструкция */}
        <div className="mt-8 text-center text-sm text-slate-500">
          <p>
            Эта страница используется для тестирования error handling системы.
            Вы можете создавать различные типы ошибок и видеть как они обрабатываются.
          </p>
        </div>
      </div>

      {/* 500 ошибка */}
      {currentTest === '500-error' && (
        <ErrorBoundary>
          <ErrorComponent shouldError={true} />
        </ErrorBoundary>
      )}
    </div>
  )
}