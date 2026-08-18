'use client'

import { useEffect, useState } from 'react'
import { useLivePreview } from '@payloadcms/live-preview-react'

type Article = {
  id: string
  title?: string
  content?: unknown
}

// Receives live data pushed from the Payload admin via postMessage
export default function ArticlePreviewPage() {
  const serverURL = process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000'

  const { data, isLoading } = useLivePreview<Article>({
    serverURL,
    depth: 2,
    initialData: {} as Article,
  })

  if (isLoading) {
    return <p style={{ padding: '2rem', fontFamily: 'sans-serif' }}>Loading preview…</p>
  }

  return (
    <main style={{ maxWidth: '720px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <p style={{ fontSize: '0.75rem', color: '#888', marginBottom: '1rem' }}>
        LIVE PREVIEW — changes appear in real-time
      </p>
      <h1>{data?.title || '(no title)'}</h1>
    </main>
  )
}
