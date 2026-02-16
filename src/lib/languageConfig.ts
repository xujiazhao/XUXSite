/**
 * Language-aware rendering configuration.
 *
 * Maps Notion collection view IDs to languages so the universal language toggle
 * can show the correct database view. Also lists block IDs that should be
 * stripped from Notion rendering (because they are now maintained in siteContent).
 */

// ── Blocks to strip from Notion rendering ───────────────────────────
// These are rendered by SiteIntro / SiteFooter instead.
// IDs are WITH dashes (as they appear in recordMap keys).

export const hiddenBlockIds: string[] = [
  // Title
  'dad5f0c2-4f6b-46a7-bceb-a2a60e4ca4ce',
  // Empty spacer
  '2f83f8e6-91e3-80e6-87b9-ef353cfcb688',
  // Chinese intro
  'cda0c655-a154-4f75-90b6-014bf2a9ff64',
  // English intro
  '2923f8e6-91e3-80a9-abb3-e4abcb8870d8',
  // Contact: email
  '2fa3f8e6-91e3-80d9-bf83-d45b3440b55a',
  // Contact: linkedin
  '2fa3f8e6-91e3-80be-a90a-ca21c585fdb5',
  // Contact: wechat
  '2fa3f8e6-91e3-8008-a8de-deee3523e124',
  // Spacer after contacts
  '2fa3f8e6-91e3-804c-93ad-f3298ef28f2f',
  // Spacer between DB1 and DB2
  '28f3f8e6-91e3-80a7-920f-fb064f33b34f',
  // Spacer between DB2 and DB3
  '28f3f8e6-91e3-80c9-a281-e291837bb720',
  // Spacer between DB3 and DB4
  'a2f8090d-46a2-4575-91e6-27443f8950ee',
  // Spacer before footer
  '0d76f53d-9133-4bfe-a47f-6d748af71cea',
  // Footer zh disclaimer
  'df218e9e-515c-4fdb-911f-fcf596b36a00',
  // Footer en disclaimer
  'b13b484d-590f-4fa3-af6f-9ce06925da48',
  // Footer zh copyright
  'a7e18d3f-621a-49ee-869e-f3dc6ccfadba',
  // Footer en copyright
  '9383ef67-7d57-437a-b5a5-3919a55f8741',
  // Empty spacer
  'd0815d30-9f7b-450f-a688-9a4d20eac764',
  // Version text
  '49b8f54d-0c10-40d5-abad-9981580f4dd0',
  // Trailing spacer
  'fe436395-2411-422d-8846-a265724d8bdb',
]

// ── Collection views that are bilingual ─────────────────────────────

export interface BilingualCollectionView {
  /** Block ID of the collection_view (WITH dashes) */
  blockId: string
  /** View ID to use when language is Chinese */
  zhViewId: string
  /** View ID to use when language is English */
  enViewId: string
}

export const bilingualCollections: BilingualCollectionView[] = [
  {
    // DB1 – 经历 Experience (table)
    blockId: '11e0fa88-7839-4b8e-b15f-0ffeef61ab1c',
    zhViewId: '582487d8-dd1d-46a5-975e-9bf3d9795216',
    enViewId: '2ba1d48c-f4f5-464d-af92-d209de1e5efd',
  },
  {
    // DB2 – 项目 Projects (gallery)
    blockId: '98b140ef-c055-4f32-8ccc-6237250a791d',
    zhViewId: '77085e8d-6d14-47e3-afef-5e1ca760195f',
    enViewId: '0f3fad95-a273-4c88-a0c2-42ff7ac6dd5d',
  },
  {
    // DB3 – 写作 Writing (list) — drop "全部 All" tab
    blockId: '37e2c53e-1215-443b-83cd-7a443a130d2a',
    zhViewId: 'a0d71429-753e-4198-b6fa-d40232ea07f5',
    enViewId: '346a920a-2d58-4b30-93a8-074873b3819a',
  },
]

// ── Collection block IDs in page order (used for section title CSS) ──

export const collectionBlockIds: string[] = [
  '11e0fa8878394b8eb15f0ffeef61ab1c',   // DB1
  '98b140efc0554f328ccc6237250a791d',    // DB2
  '37e2c53e1215443b83cd7a443a130d2a',    // DB3
  'e90164d45cb74a44b0277cc13155be57',    // DB4
]
