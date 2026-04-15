/** Core unit: adjust here to rescale all displayed prices. */
export const POINT_USD = 50 as const

export type PageTierId = 'homepage' | 'subpage'

export interface PageTierRow {
  id: PageTierId
  type: string
  description: string
  points: number
}

/** Homepage vs inner pages — points align with premium catalog (`data/pricing.ts`). */
export const pageTiers: PageTierRow[] = [
  {
    id: 'homepage',
    type: 'Homepage',
    description: 'Primary landing: custom hero, key sections, conversion focus',
    points: 20,
  },
  {
    id: 'subpage',
    type: 'Subpage',
    description: 'Inner pages (About, Services, Contact, etc.) — layout reuse where it fits',
    points: 4,
  },
]

export type ComponentTierId = 'simple' | 'advanced'

export interface ComponentTierRow {
  id: ComponentTierId
  type: string
  examples: string
  points: number
}

export const componentTiers: ComponentTierRow[] = [
  { id: 'simple', type: 'Simple', examples: 'Text + image, CTA', points: 1 },
  {
    id: 'advanced',
    type: 'Advanced',
    examples: 'Cards, grids, testimonials, sliders, tabs, maps',
    points: 2,
  },
]

export type FeatureId =
  | 'contact-form'
  | 'blog-cms'
  | 'search-filter'
  | 'multi-language'
  | 'auth'
  | 'payment'
  | 'custom-dashboard'

export interface FeatureRow {
  id: FeatureId
  feature: string
  points: number
}

export const featureRows: FeatureRow[] = [
  { id: 'contact-form', feature: 'Contact form', points: 3 },
  { id: 'blog-cms', feature: 'Blog / CMS', points: 4 },
  { id: 'search-filter', feature: 'Search / Filter', points: 4 },
  { id: 'multi-language', feature: 'Multi-language', points: 5 },
  { id: 'auth', feature: 'Authentication (login)', points: 2 },
  { id: 'payment', feature: 'Payment integration', points: 5 },
  { id: 'custom-dashboard', feature: 'Custom dashboard', points: 5 },
]

export type ModifierId = 'rush' | 'heavy-animation' | 'unclear-requirements' | 'risky-api'

export interface ModifierRow {
  id: ModifierId
  condition: string
  /** Compound multiplier, e.g. 1.3 for +30% */
  multiplier: number
  label: string
}

export const modifiers: ModifierRow[] = [
  { id: 'rush', condition: 'Rush (<1 weeks)', multiplier: 1.3, label: '+30%' },
  { id: 'heavy-animation', condition: 'Heavy animation', multiplier: 1.2, label: '+20%' },
  { id: 'unclear-requirements', condition: 'Unclear requirements', multiplier: 1.15, label: '+15%' },
  { id: 'risky-api', condition: '3rd-party risky API', multiplier: 1.2, label: '+20%' },
]

export const revisionPolicy = {
  includedRevisionRounds: 2,
  extraRevisionPoints: 5,
  extraRevisionUsd: 5 * POINT_USD,
  contentUploadLimit: 20,
  /** Each batch over the included cap — priced at one point ($50) per batch. */
  extraContentItemsPerBatch: 10,
  extraContentPointsPerBatch: 1,
  extraContentUsdPerBatch: POINT_USD,
} as const

export function usdFromPoints(points: number): number {
  return points * POINT_USD
}
