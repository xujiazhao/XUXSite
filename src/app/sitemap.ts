import { config, getPage, getSubPageIds } from '@/lib/notion'
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = `https://${config.domain}`

  // Always include home page
  const routes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
  ]

  // Try to get sub-pages from the root page
  try {
    const recordMap = await getPage(config.rootNotionPageId)
    const subPageIds = getSubPageIds(recordMap)

    for (const pageId of subPageIds) {
      routes.push({
        url: `${baseUrl}/${pageId}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.8,
      })
    }
  } catch (error) {
    console.error('Error generating sitemap:', error)
  }

  return routes
}
