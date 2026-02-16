import { notFound } from 'next/navigation'
import { config, getPage, getPageTitle } from '@/lib/notion'
import { siteContent } from '@/lib/siteContent'
import NotionPageRenderer from '@/components/NotionPageRenderer'
import type { Metadata } from 'next'

// Use dynamic rendering to avoid SSR issues with react-notion-x
export const dynamic = 'force-dynamic'
export const revalidate = 3600

interface PageProps {
  params: Promise<{ pageId: string }>
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { pageId } = await params
  const cleaned = pageId.replace(/-/g, '')
  if (!/^[a-f0-9]{32}$/i.test(cleaned)) {
    return { title: 'Page Not Found' }
  }

  try {
    const recordMap = await getPage(pageId)
    const title = getPageTitle(recordMap)

    return {
      title,
      openGraph: {
        title: `${title} | ${config.name}`,
        siteName: config.name,
      },
    }
  } catch {
    return {
      title: 'Page Not Found',
    }
  }
}

// Only match valid Notion page IDs (32 hex chars, with or without dashes)
function isValidNotionId(id: string): boolean {
  const cleaned = id.replace(/-/g, '')
  return /^[a-f0-9]{32}$/i.test(cleaned)
}

export default async function NotionSubPage({ params }: PageProps) {
  const { pageId } = await params

  // Reject non-Notion IDs (e.g. favicon.ico, robots.txt)
  if (!isValidNotionId(pageId)) {
    notFound()
  }

  try {
    const recordMap = await getPage(pageId)
    const isHome = pageId === siteContent.homePageId ||
      pageId.replace(/-/g, '') === siteContent.homePageId.replace(/-/g, '')

    return (
      <NotionPageRenderer
        recordMap={recordMap}
        rootPageId={config.rootNotionPageId}
        isHomePage={isHome}
      />
    )
  } catch (error) {
    console.error('Failed to load Notion page:', error)
    notFound()
  }
}
