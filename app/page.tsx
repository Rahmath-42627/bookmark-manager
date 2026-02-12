import AuthStatus from './components/AuthStatus'

export default function Home() {
  return (
    <main className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">
       Smart Bookmark App
      </h1>

      <AuthStatus />
    </main>
  )
}
