'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ExtendedRecordMap } from 'notion-types'

// Core notion renderer
import { NotionRenderer } from 'react-notion-x'

// Dynamically import heavy components for better performance
const Code = dynamic(
  () => import('react-notion-x/build/third-party/code').then((m) => m.Code),
  { ssr: false }
)

const Collection = dynamic(
  () => import('react-notion-x/build/third-party/collection').then((m) => m.Collection),
  { ssr: false }
)

const Equation = dynamic(
  () => import('react-notion-x/build/third-party/equation').then((m) => m.Equation),
  { ssr: false }
)

const Modal = dynamic(
  () => import('react-notion-x/build/third-party/modal').then((m) => m.Modal),
  { ssr: false }
)

interface NotionPageProps {
  recordMap: ExtendedRecordMap
  rootPageId?: string
  previewImagesEnabled?: boolean
}

export default function NotionPage({
  recordMap,
  rootPageId,
  previewImagesEnabled = false,
}: NotionPageProps) {
  if (!recordMap) {
    return null
  }

  return (
    <NotionRenderer
      recordMap={recordMap}
      fullPage={true}
      darkMode={false}
      rootPageId={rootPageId}
      previewImages={previewImagesEnabled}
      components={{
        Code,
        Collection,
        Equation,
        Modal,
        nextImage: Image,
        nextLink: Link,
      }}
      // Map Notion page links to our internal routes
      mapPageUrl={(pageId) => `/${pageId}`}
      // Prevent 'replace' error on undefined image URLs
      mapImageUrl={(url, block) => {
        if (!url) return ''
        // If it's already an absolute URL, use it directly
        if (url.startsWith('http')) return url
        // Notion S3 image proxy
        return `https://www.notion.so/image/${encodeURIComponent(url)}?table=block&id=${block.id}`
      }}
    />
  )
}
