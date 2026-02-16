import { NotionAPI } from 'notion-client'
import { ExtendedRecordMap } from 'notion-types'
import { hiddenBlockIds } from '@/lib/languageConfig'

// Site configuration
export const config = {
  // Your root Notion page ID
  rootNotionPageId: process.env.NOTION_ROOT_PAGE_ID || '37d3f7b023c54cf597ca367f7145965f',

  // Basic site info
  name: '许嘉昭 Jiazhao Xu',
  domain: 'xujiazhao.com',
  author: 'Jiazhao Xu',
  description: '产品设计师 Product Designer — 融合AI与软硬件体验，打造智能且有温度的产品。',

  // Social links
  social: {
    email: 'hello@xujiazhao.com',
    linkedin: 'https://www.linkedin.com/in/xujiazhao/',
  },

  // Default page revalidation time in seconds (ISR)
  revalidateTime: 60 * 60, // 1 hour

  // Notion page ID for the root/home page
  rootNotionSpaceId: null as string | null,
}

// Create a Notion API client instance (unofficial API, used by react-notion-x)
const notion = new NotionAPI({
  authToken: process.env.NOTION_API_TOKEN || undefined,
})

/**
 * Normalize record map entries that have double 'value' nesting.
 * Newer notion-client versions return { value: { value: {...}, role: ... } }
 * but react-notion-x expects { value: { id, type, ... }, role: ... }
 */
function normalizeRecordMapSection(section: Record<string, any> | undefined) {
  if (!section) return
  for (const key of Object.keys(section)) {
    const entry = section[key] as any
    if (entry?.value?.value && typeof entry.value.value === 'object' && !entry.value.type) {
      const innerValue = entry.value.value
      const role = entry.value.role
      entry.value = innerValue
      if (role) entry.role = role
    }
  }
}

/**
 * Fetch a Notion page's record map by page ID
 */
export async function getPage(pageId: string): Promise<ExtendedRecordMap> {
  const recordMap = await notion.getPage(pageId)

  // Normalize all sections with potential double-value nesting
  normalizeRecordMapSection(recordMap?.block)
  normalizeRecordMapSection(recordMap?.collection)

  // Remove blocks that still have no id after normalization
  if (recordMap?.block) {
    for (const key of Object.keys(recordMap.block)) {
      if (!recordMap.block[key]?.value?.id) {
        delete recordMap.block[key]
      }
    }
  }

  return recordMap
}

/**
 * Strip intro / contact / footer blocks from the home page recordMap.
 * These blocks are rendered by custom React components instead.
 * Should be called server-side before passing to the client.
 */
export function stripHomeBlocks(recordMap: ExtendedRecordMap, rootPageId: string): ExtendedRecordMap {
  const hiddenSet = new Set(hiddenBlockIds)
  const newBlock = { ...recordMap.block }

  // Try both undashed and dashed forms of the root page ID
  const clean = rootPageId.replace(/-/g, '')
  const dashed = clean.length === 32
    ? `${clean.slice(0,8)}-${clean.slice(8,12)}-${clean.slice(12,16)}-${clean.slice(16,20)}-${clean.slice(20)}`
    : rootPageId

  for (const key of [rootPageId, dashed, clean]) {
    const entry = newBlock[key]
    if (entry?.value?.content) {
      newBlock[key] = {
        ...entry,
        value: {
          ...entry.value,
          content: (entry.value as any).content.filter(
            (id: string) => !hiddenSet.has(id)
          ),
        },
      } as any
      break
    }
  }

  return { ...recordMap, block: newBlock }
}

/**
 * Extract the page title from a record map
 */
export function getPageTitle(recordMap: ExtendedRecordMap): string {
  const blocks = Object.values(recordMap.block)
  const titleBlock = blocks.find(
    (block) => block.value?.type === 'page'
  )

  if (titleBlock?.value?.properties?.title) {
    return titleBlock.value.properties.title
      .map((chunk: any[]) => chunk[0])
      .join('')
  }

  return config.name
}

/**
 * Parse a Notion page ID or URL to extract the clean page ID
 */
export function parsePageId(idOrUrl: string): string {
  // Remove dashes and get last 32 chars (the actual ID)
  const id = idOrUrl.replace(/-/g, '')

  // If it's a full URL, extract the ID from the end
  if (id.includes('/')) {
    const parts = id.split('/')
    const lastPart = parts[parts.length - 1]
    // Extract 32-char hex ID from the end
    const match = lastPart.match(/([a-f0-9]{32})$/i)
    if (match) return match[1]
  }

  // If it already looks like a clean ID
  if (/^[a-f0-9]{32}$/i.test(id)) {
    return id
  }

  // Try to extract from any format
  const match = id.match(/([a-f0-9]{32})/i)
  return match ? match[1] : idOrUrl
}

/**
 * Get all sub-page IDs from a record map (for generating sitemap, etc.)
 */
export function getSubPageIds(recordMap: ExtendedRecordMap): string[] {
  const blockIds = Object.keys(recordMap.block)
  const subPages: string[] = []

  for (const blockId of blockIds) {
    const block = recordMap.block[blockId]?.value
    if (block?.type === 'page' && block.id !== config.rootNotionPageId) {
      subPages.push(block.id)
    }
  }

  return subPages
}
