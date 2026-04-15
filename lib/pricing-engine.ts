import type {
  BookingFormData,
  PricingItem,
  QuoteComputation,
  QuoteLineBreakdown,
  EffortBreakdownRow,
} from '@/types/booking'
import { pricingItems } from '@/data/pricing'
import { basicPricingItems } from '@/data/basic-pricing'

export const WEBSITE_PACKAGE_ID = 'website-package'
export const PAGE_LINE_IDS = ['homepage', 'subpage'] as const

export function getCatalog(quoteType?: 'premium' | 'basic'): PricingItem[] {
  return quoteType === 'basic' ? basicPricingItems : pricingItems
}

export function applyItemToggle(
  selectedItems: BookingFormData['selectedItems'],
  itemId: string,
  catalog: PricingItem[]
): BookingFormData['selectedItems'] {
  const item = catalog.find((i) => i.id === itemId)
  if (!item) return selectedItems

  const current = selectedItems[itemId] ?? {
    quantity: item.defaultQty,
    enabled: false,
  }
  const nextEnabled = !current.enabled

  const next: BookingFormData['selectedItems'] = {
    ...selectedItems,
    [itemId]: { ...current, enabled: nextEnabled },
  }

  if (nextEnabled && item.mutuallyExclusiveWith?.length) {
    for (const exId of item.mutuallyExclusiveWith) {
      const ex = next[exId]
      if (ex) {
        next[exId] = { ...ex, enabled: false }
      }
    }
  }

  return next
}

/**
 * Computes dollar total (unit prices × qty × effort multipliers) and parallel points.
 */
export function computeQuote(
  selectedItems: BookingFormData['selectedItems'],
  quoteType?: 'premium' | 'basic'
): QuoteComputation {
  const catalog = getCatalog(quoteType)
  let baseSubtotal = 0
  let basePoints = 0
  const breakdown: QuoteLineBreakdown[] = []
  const effortApplied: EffortBreakdownRow[] = []
  let combinedMultiplier = 1

  for (const row of catalog) {
    const sel = selectedItems[row.id]
    if (!sel?.enabled) continue

    if (row.layer === 'effort' && row.globalMultiplier && row.globalMultiplier > 0) {
      combinedMultiplier *= row.globalMultiplier
      effortApplied.push({
        itemId: row.id,
        name: row.name,
        multiplier: row.globalMultiplier,
      })
      continue
    }

    const lineSubtotal = row.unitPrice * sel.quantity
    const points = row.pointsPerUnit * sel.quantity
    baseSubtotal += lineSubtotal
    basePoints += points
    breakdown.push({
      itemId: row.id,
      name: row.name,
      layer: row.layer,
      quantity: sel.quantity,
      unitPrice: row.unitPrice,
      lineSubtotal,
      points,
    })
  }

  const totalEstimate = Math.round(baseSubtotal * combinedMultiplier)
  const totalPoints = Math.round(basePoints * combinedMultiplier * 100) / 100

  return {
    totalEstimate,
    totalPoints,
    baseSubtotal,
    combinedMultiplier,
    breakdown,
    effortApplied,
  }
}

/** Estimate extra scope as points + dollars using same engine as live quotes */
export function estimateChangeRequest(
  baseSelection: BookingFormData['selectedItems'],
  additions: { itemId: string; quantity: number }[],
  quoteType?: 'premium' | 'basic'
): QuoteComputation {
  const catalog = getCatalog(quoteType)
  const merged: BookingFormData['selectedItems'] = JSON.parse(JSON.stringify(baseSelection))

  for (const { itemId, quantity } of additions) {
    const item = catalog.find((i) => i.id === itemId)
    if (!item) continue
    const prev = merged[itemId] ?? { quantity: item.defaultQty, enabled: false }
    const addQty = Math.max(1, quantity)
    merged[itemId] = {
      enabled: true,
      quantity: prev.enabled ? prev.quantity + addQty : addQty,
    }
  }

  return computeQuote(merged, quoteType)
}
