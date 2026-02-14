import { config } from '@/lib/notion'
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${config.domain}/sitemap.xml`,
  }
}
