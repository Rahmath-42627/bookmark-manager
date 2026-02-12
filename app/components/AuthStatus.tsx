'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import AuthButtons from './AuthButtons'
import BookmarkForm from './BookmarkForm'
import BookmarkList from './BookmarkList'

export default function AuthStatus() {
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [refresh, setRefresh] = useState(0)

  useEffect(() => {
    const init = async () => {
      const { data } = await supabase.auth.getUser()
      setUser(data.user)
      setLoading(false)
    }

    init()

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  if (loading) return <p>Loading...</p>
  if (!user) return <AuthButtons />

  return (
    <div className="space-y-6">
      <p className="text-green-600">
        Logged in as <b>{user.email}</b>
      </p>

<BookmarkForm onAdded={() => setRefresh((r) => r + 1)} />
<BookmarkList userId={user.id} refresh={refresh} />


      <button
        onClick={() => supabase.auth.signOut()}
        className="px-4 py-2 bg-red-500 text-white rounded"
      >
        Logout
      </button>
    </div>
  )
}
