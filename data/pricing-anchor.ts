import type { BookingFormData, PricingItem, SalesTier } from '@/types/booking'

/** Base scope anchor copy (aligned with modular pricing) */
export const BASE_SCOPE_ANCHOR = {
  headline: 'Base website anchor',
  bullets: [
    'Typical starter anchor: 1 homepage + 4 inner pages, responsive layout, standard form + analytics-ready setup.',
    'Anything beyond your selected tier counts as additional structure, components, or features—priced consistently.',
  ],
} as const

export const OUT_OF_SCOPE_RULES = {
  headline: 'Included scope & limits',
  bullets: [
    '2 revision rounds included per deliverable; further changes quoted as change requests.',
    'Content entry: up to 20 CMS items in starter-style builds unless otherwise specified.',
    'Browser support: last 2 versions of Chrome, Firefox, Safari, Edge; device testing on common breakpoints.',
    'Performance: standard optimization included; deep performance audits are a separate line item.',
  ],
} as const

export const CHANGE_REQUEST_COPY =
  'Change requests map to structure, components, features, and effort multipliers—same formula as your original quote.'

type SelectionCfg = { enabled: boolean; quantity: number }

/** Premium presets (item ids must match data/pricing.ts) */
const PREMIUM_STARTER: Record<string, SelectionCfg> = {
  homepage: { enabled: true, quantity: 1 },
  subpage: { enabled: true, quantity: 4 },
  'mobile-optimization': { enabled: true, quantity: 1 },
  'basic-seo-setup': { enabled: true, quantity: 1 },
}

const PREMIUM_GROWTH: Record<string, SelectionCfg> = {
  homepage: { enabled: true, quantity: 1 },
  subpage: { enabled: true, quantity: 6 },
  popup: { enabled: true, quantity: 1 },
  'content-writing': { enabled: true, quantity: 1 },
  'image-optimization': { enabled: true, quantity: 2 },
  'mobile-optimization': { enabled: true, quantity: 1 },
  'speed-optimization': { enabled: true, quantity: 1 },
  'basic-seo-setup': { enabled: true, quantity: 1 },
}

const BASIC_STARTER: Record<string, SelectionCfg> = {
  'basic-homepage': { enabled: true, quantity: 1 },
  'basic-subpage': { enabled: true, quantity: 3 },
  'basic-responsive': { enabled: true, quantity: 1 },
  'basic-seo': { enabled: true, quantity: 1 },
}

const BASIC_GROWTH: Record<string, SelectionCfg> = {
  'basic-homepage': { enabled: true, quantity: 1 },
  'basic-subpage': { enabled: true, quantity: 6 },
  'basic-content-writing': { enabled: true, quantity: 5 },
  'basic-image-optimization': { enabled: true, quantity: 2 },
  'basic-responsive': { enabled: true, quantity: 1 },
  'basic-speed-optimization': { enabled: true, quantity: 1 },
  'basic-seo': { enabled: true, quantity: 1 },
}

export function emptySelectionsFromCatalog(catalog: PricingItem[]): BookingFormData['selectedItems'] {
  const selectedItems: BookingFormData['selectedItems'] = {}
  for (const row of catalog) {
    selectedItems[row.id] = { quantity: row.defaultQty, enabled: false }
  }
  return selectedItems
}

/** Merge tier preset into catalog defaults (all disabled) until preset toggles */
export function applyTierPreset(
  tier: SalesTier,
  catalog: PricingItem[],
  quoteType: 'premium' | 'basic'
): BookingFormData['selectedItems'] {
  const selectedItems = emptySelectionsFromCatalog(catalog)

  if (tier === 'custom') {
    return selectedItems
  }

  const preset =
    quoteType === 'premium'
      ? tier === 'starter'
        ? PREMIUM_STARTER
        : PREMIUM_GROWTH
      : tier === 'starter'
        ? BASIC_STARTER
        : BASIC_GROWTH

  for (const [id, cfg] of Object.entries(preset)) {
    if (selectedItems[id]) {
      selectedItems[id] = { enabled: cfg.enabled, quantity: cfg.quantity }
    }
  }

  return selectedItems
}
