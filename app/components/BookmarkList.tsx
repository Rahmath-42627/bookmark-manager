'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'
import { getBookmarkChannel } from '@/lib/bookmarkChannel'

type Bookmark = {
  id: string
  title: string
  url: string
}

export default function BookmarkList({
  userId,
  refresh,
}: {
  userId: string
  refresh: number
}) {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const [loading, setLoading] = useState(true)

  const fetchBookmarks = async () => {
    if (!userId) return

    const { data, error } = await supabase
      .from('bookmarks')
      .select('id, title, url')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (!error) {
      setBookmarks(data ?? [])
    }

    setLoading(false)
  }


  useEffect(() => {
    fetchBookmarks()
  }, [userId, refresh])

  // Listen to other tabs (ADD / DELETE)
  useEffect(() => {
    const channel = getBookmarkChannel()
    if (!channel) return

    const handler = (event: MessageEvent) => {
      const data = event.data

      if (data?.type === 'ADD' || data?.type === 'DELETE') {
        fetchBookmarks()
      }
    }

    channel.addEventListener('message', handler)

    return () => {
      channel.removeEventListener('message', handler)
    }
  }, [userId])

  const deleteBookmark = async (id: string) => {
    const { error } = await supabase
      .from('bookmarks')
      .delete()
      .eq('id', id)
      .eq('user_id', userId)

    if (error) {
      alert(error.message)
      return
    }

 
    setBookmarks((prev) => prev.filter((b) => b.id !== id))


    const channel = getBookmarkChannel()
    channel?.postMessage({ type: 'DELETE' })
  }

  if (loading) return <p>Loading bookmarks...</p>
  if (bookmarks.length === 0) return <p>No bookmarks yet</p>

  return (
    <ul className="space-y-2">
      {bookmarks.map((b) => (
        <li
          key={b.id}
          className="border p-3 rounded flex justify-between items-center"
        >
          <a
            href={b.url}
            target="_blank"
            rel="noreferrer"
            className="text-blue-600 underline"
          >
            {b.title}
          </a>

          <button
            onClick={() => deleteBookmark(b.id)}
            className="text-red-600 text-sm"
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  )
}
