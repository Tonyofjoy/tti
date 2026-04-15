export type PricingLayer = 'structure' | 'component' | 'feature' | 'effort'

/** Component layer: reusable UI / module complexity (pricing rubric) */
export type ComponentTier = 'simple' | 'medium' | 'complex'

/** Feature layer: product capability depth (pricing rubric) */
export type FeatureTierLevel = 'basic' | 'medium' | 'advanced'

export type SalesTier = 'starter' | 'growth' | 'custom'

export type PricingCategory =
  | 'design'
  | 'development'
  | 'content'
  | 'optimization'
  | 'hosting'
  | 'effort'

export interface PricingItem {
  id: string
  name: string
  description: string
  unit: string
  unitPrice: number
  defaultQty: number
  maxQty?: number
  category: PricingCategory
  quoteType?: 'premium' | 'basic'
  layer: PricingLayer
  pointsPerUnit: number
  /** When layer is `component`: simple (e.g. text+image), medium (cards/grids), complex (interactive, motion) */
  componentTier?: ComponentTier
  /** When layer is `feature`: basic (forms, CMS), medium (filter/search/i18n), advanced (dashboards, payments) */
  featureTier?: FeatureTierLevel
  /** Effort items only: multiply non-effort subtotal when this line is enabled */
  globalMultiplier?: number
  /** When this item is enabled, these catalog ids are forced disabled */
  mutuallyExclusiveWith?: string[]
}

export interface BookingFormData {
  clientName: string
  projectName: string
  email: string
  phone: string
  company?: string

  projectDescription: string
  timeline: string
  budget: string

  selectedItems: {
    [itemId: string]: {
      quantity: number
      enabled: boolean
    }
  }

  additionalRequirements?: string
  preferredContactMethod: 'email' | 'phone' | 'both'

  submittedAt?: string
  status?: 'new' | 'reviewed' | 'quoted' | 'approved' | 'completed'
  totalEstimate?: number
  quoteType?: 'premium' | 'basic'
  /** Sales-facing scope tier; presets line items until Custom */
  salesTier?: SalesTier
}

export interface QuoteLineBreakdown {
  itemId: string
  name: string
  layer: PricingLayer
  quantity: number
  unitPrice: number
  lineSubtotal: number
  points: number
}

export interface EffortBreakdownRow {
  itemId: string
  name: string
  multiplier: number
}

export interface QuoteComputation {
  totalEstimate: number
  totalPoints: number
  baseSubtotal: number
  combinedMultiplier: number
  breakdown: QuoteLineBreakdown[]
  effortApplied: EffortBreakdownRow[]
}

export interface BookingSubmission extends BookingFormData {
  id: string
  submittedAt: string
  status: 'new' | 'reviewed' | 'quoted' | 'approved' | 'completed'
  totalEstimate: number
  quoteBreakdown?: QuoteLineBreakdown[]
  totalPoints?: number
  effortApplied?: EffortBreakdownRow[]
  combinedMultiplier?: number
}
