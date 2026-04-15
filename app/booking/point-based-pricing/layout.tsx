import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Point-based scope pricing',
  description:
    'Internal rubric: pages, components, features, effort modifiers, and revisions at $50 per scope point.',
}

export default function PointBasedPricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
