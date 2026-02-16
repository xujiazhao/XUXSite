'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { ExtendedRecordMap } from 'notion-types'

import { useLanguage, Language } from './LanguageContext'
import { bilingualCollections, hiddenBlockIds, collectionBlockIds } from '@/lib/languageConfig'
import { siteContent } from '@/lib/siteContent'
import SiteIntro from './SiteIntro'
import LanguageToggle from './LanguageToggle'

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

/**
 * Clone the recordMap, switching bilingual collection views and
 * stripping blocks that are now rendered by custom components.
 */
function applyLanguageToRecordMap(
  recordMap: ExtendedRecordMap,
  lang: Language,
  rootPageId?: string
): ExtendedRecordMap {
  const newBlock = { ...recordMap.block }

  // Switch bilingual collection views
  for (const col of bilingualCollections) {
    const entry = newBlock[col.blockId]
    if (!entry?.value) continue

    const targetViewId = lang === 'zh' ? col.zhViewId : col.enViewId

    newBlock[col.blockId] = {
      ...entry,
      value: {
        ...entry.value,
        view_ids: [targetViewId],
      } as any,
    }
  }

  // Strip hidden blocks from the root page's content array
  const hiddenSet = new Set(hiddenBlockIds)
  if (rootPageId) {
    // Try both dashed and undashed keys
    const keys = [rootPageId]
    const dashed = rootPageId.replace(
      /^(.{8})(.{4})(.{4})(.{4})(.{12})$/,
      '$1-$2-$3-$4-$5'
    )
    if (dashed !== rootPageId) keys.push(dashed)

    for (const key of keys) {
      const rootEntry = newBlock[key]
      if (rootEntry?.value?.content) {
        newBlock[key] = {
          ...rootEntry,
          value: {
            ...rootEntry.value,
            content: rootEntry.value.content.filter(
              (id: string) => !hiddenSet.has(id)
            ),
          } as any,
        }
        break
      }
    }
  }

  // Translate DB1 table headers
  const experienceColId = '5e74cc9e-da89-4d7a-a798-ecfa03bf21d2'
  const newCollection = { ...(recordMap.collection || {}) } as any
  const colEntry = newCollection[experienceColId]
  if (colEntry?.value?.schema) {
    const newSchema = { ...colEntry.value.schema }
    for (const [key, translation] of Object.entries(siteContent.experienceTableHeaders)) {
      if (newSchema[key]) {
        newSchema[key] = { ...newSchema[key], name: (translation as any)[lang] }
      }
    }
    newCollection[experienceColId] = {
      ...colEntry,
      value: { ...colEntry.value, schema: newSchema },
    }
  }

  return { ...recordMap, block: newBlock, collection: newCollection }
}

interface NotionPageProps {
  recordMap: ExtendedRecordMap
  rootPageId?: string
  previewImagesEnabled?: boolean
  isHomePage?: boolean
}

export default function NotionPage({
  recordMap,
  rootPageId,
  previewImagesEnabled = false,
  isHomePage = false,
}: NotionPageProps) {
  const { language } = useLanguage()

  // Only apply homepage transformations (block stripping, view switching) on the homepage
  const localizedRecordMap = useMemo(
    () => isHomePage ? applyLanguageToRecordMap(recordMap, language, rootPageId) : recordMap,
    [recordMap, language, rootPageId, isHomePage]
  )

  if (!recordMap) {
    return null
  }

  return (
    <div
      data-lang={language}
      style={
        isHomePage
          ? (Object.fromEntries(
              collectionBlockIds.map((id: string, i: number) => [
                `--section-title-${i + 1}`,
                `"${siteContent.sectionTitles[i]?.[language] ?? ''}"`,
              ])
            ) as React.CSSProperties)
          : undefined
      }
    >
      {isHomePage && <LanguageToggle />}
      <NotionRenderer
        recordMap={localizedRecordMap}
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
        {...(isHomePage
          ? {
              pageTitle: <></>,
              pageHeader: <SiteIntro />,
              pageFooter: (
                <div className="page-footer-content">
                  <p>{siteContent.footer.disclaimer[language]}</p>
                  <p>© {new Date().getFullYear()} {siteContent.footer.copyright[language]}</p>
                  <p className="footer-version">{siteContent.footer.version}</p>
                </div>
              ),
            }
          : {})}
        mapPageUrl={(pageId) => `/${pageId}`}
        mapImageUrl={(url, block) => {
          if (!url) return ''
          if (url.startsWith('data:')) return url

          if (
            url.includes('secure.notion-static.com') ||
            url.includes('s3.us-west-2.amazonaws.com') ||
            url.includes('s3-us-west-2.amazonaws.com')
          ) {
            const encodedUrl = encodeURIComponent(url)
            return `https://www.notion.so/image/${encodedUrl}?table=block&id=${block.id}`
          }

          if (url.startsWith('/images')) {
            return `https://www.notion.so${url}`
          }

          if (url.startsWith('http')) return url

          return `https://www.notion.so/image/${encodeURIComponent(url)}?table=block&id=${block.id}`
        }}
      />
    </div>
  )
}
