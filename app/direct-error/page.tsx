// Эта страница вызовет ошибку на сервере
// Делаем страницу динамической чтобы она не блокировала сборку
export const dynamic = 'force-dynamic'

export default function DirectErrorPage() {
  // Вызов ошибки
  throw new Error('Это тестовая серверная ошибка для демонстрации Next.js error page')

  // Этот код никогда не выполнится
  return (
    <div>
      <h1>Эта страница никогда не отобразится</h1>
    </div>
  )
}