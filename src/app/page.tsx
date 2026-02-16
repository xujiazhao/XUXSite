import { config, getPage } from '@/lib/notion'
import NotionPageRenderer from '@/components/NotionPageRenderer'

// Use dynamic rendering (not static) to avoid SSR issues with react-notion-x
export const dynamic = 'force-dynamic'
export const revalidate = 3600

export default async function HomePage() {
  const recordMap = await getPage(config.rootNotionPageId)

  return (
    <NotionPageRenderer
      recordMap={recordMap}
      rootPageId={config.rootNotionPageId}
      isHomePage={true}
    />
  )
}
