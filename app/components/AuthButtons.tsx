'use client'

import { supabase } from '@/lib/supabaseClient'

export default function AuthButtons() {
  const login = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
    })
  }

  const logout = async () => {
    await supabase.auth.signOut()
  }

  return (
    <div className="flex gap-4">
      <button
        onClick={login}
        className="px-4 py-2 bg-black text-white rounded"
      >
        Login with Google
      </button>

      <button
        onClick={logout}
        className="px-4 py-2 bg-gray-300 rounded"
      >
        Logout
      </button>
    </div>
  )
}
