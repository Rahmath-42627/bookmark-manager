'use client'

import { useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { getBookmarkChannel } from '@/lib/bookmarkChannel'

export default function BookmarkForm({ onAdded }: { onAdded: () => void }) {
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
  const [loading, setLoading] = useState(false)

  const addBookmark = async () => {
    if (!title || !url) return alert('Fill all fields')

    setLoading(true)

    const {
      data: { user },
    } = await supabase.auth.getUser()

    if (!user) {
      alert('Not logged in')
      setLoading(false)
      return
    }

    const { error } = await supabase.from('bookmarks').insert({
      title,
      url,
      user_id: user.id,
    })

    setLoading(false)

   if (error) {
  alert(error.message)
} else {
  const channel = getBookmarkChannel()

  channel?.postMessage({
    type: 'ADD',
  })

  setTitle('')
  setUrl('')
  onAdded()
}

  }

  return (
    <div className="space-y-2">
      <input
        className="border p-2 w-full"
        placeholder="Bookmark title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        className="border p-2 w-full"
        placeholder="https://example.com"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />

      <button
        onClick={addBookmark}
        disabled={loading}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        {loading ? 'Adding...' : 'Add Bookmark'}
      </button>
    </div>
  )
}
