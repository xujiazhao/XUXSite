'use client'

import dynamic from 'next/dynamic'
import { ExtendedRecordMap } from 'notion-types'

// Dynamically import NotionPage with SSR disabled to prevent hydration issues
const NotionPage = dynamic(
  () => import('@/components/NotionPage'),
  {
    ssr: false,
    loading: () => (
      <div className="loading-container">
        <div className="loading-spinner" />
      </div>
    ),
  }
)

interface NotionPageRendererProps {
  recordMap: ExtendedRecordMap
  rootPageId?: string
  isHomePage?: boolean
}

export default function NotionPageRenderer({
  recordMap,
  rootPageId,
  isHomePage,
}: NotionPageRendererProps) {
  return <NotionPage recordMap={recordMap} rootPageId={rootPageId} isHomePage={isHomePage} />
}
