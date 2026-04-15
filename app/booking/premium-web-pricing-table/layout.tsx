import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Premium Web Development Pricing',
  description:
    'Line-item pricing for premium web development: pages, components, features, and effort multipliers.',
}

export default function PremiumWebPricingLayout({ children }: { children: React.ReactNode }) {
  return children
}
