import { PricingItem } from '@/types/booking'

export const pricingItems: PricingItem[] = [
  {
    id: 'brand-guideline',
    name: 'Brand guideline',
    description: 'Visual identity: logo, color palette, typography, usage',
    unit: 'Per brand',
    unitPrice: 2500,
    defaultQty: 1,
    maxQty: 1,
    category: 'design'
  },
  {
    id: 'homepage',
    name: 'Homepage',
    description: 'Custom high-impact landing page',
    unit: 'Per page',
    unitPrice: 1000,
    defaultQty: 1,
    maxQty: 1,
    category: 'development'
  },
  {
    id: 'subpage',
    name: 'Subpage',
    description: 'Inner pages (e.g., About, Contact, etc)',
    unit: 'Per page',
    unitPrice: 250,
    defaultQty: 4,
    maxQty: 20,
    category: 'development'
  },
  {
    id: 'popup',
    name: 'Popup',
    description: 'Conversion-driven popup',
    unit: 'Per popup',
    unitPrice: 150,
    defaultQty: 2,
    maxQty: 10,
    category: 'development'
  },
  {
    id: 'animation-medium',
    name: 'Animation - Medium',
    description: 'Basic scroll/fade transitions',
    unit: 'Per page',
    unitPrice: 300,
    defaultQty: 3,
    maxQty: 15,
    category: 'development'
  },
  {
    id: 'animation-advance',
    name: 'Animation - Advance',
    description: 'Parallax or immersive effects',
    unit: 'Per page',
    unitPrice: 600,
    defaultQty: 2,
    maxQty: 10,
    category: 'development'
  },
  {
    id: 'content-writing',
    name: 'Content writing',
    description: 'SEO-optimized, brand-aligned content',
    unit: 'Per page',
    unitPrice: 150,
    defaultQty: 5,
    maxQty: 20,
    category: 'content'
  },
  {
    id: 'image-optimization',
    name: 'Image optimization',
    description: 'Crop, resize, convert for web (webp/avif)',
    unit: 'Per image',
    unitPrice: 10,
    defaultQty: 20,
    maxQty: 100,
    category: 'optimization'
  },
  {
    id: '3d-element-non-interactive',
    name: '3D element - Non interactive',
    description: 'Add 3D model to page (e.g., property render)',
    unit: 'Per component',
    unitPrice: 500,
    defaultQty: 1,
    maxQty: 5,
    category: 'development'
  },
  {
    id: '3d-element-interactive',
    name: '3D element - Interactive',
    description: 'Interactive 3D model (zoom, rotate)',
    unit: 'Per component',
    unitPrice: 1200,
    defaultQty: 1,
    maxQty: 3,
    category: 'development'
  },
  {
    id: 'virtual-tour',
    name: 'Virtual Tour',
    description: 'Interactive 3D tour (up to 10 screens, 50 dots)',
    unit: 'Per tour',
    unitPrice: 2500,
    defaultQty: 1,
    maxQty: 1,
    category: 'development'
  },
  {
    id: 'multilingual-support',
    name: 'Multilingual Support',
    description: 'Language toggle + localization of UI and content',
    unit: 'Per language',
    unitPrice: 300,
    defaultQty: 2,
    maxQty: 10,
    category: 'development'
  },
  {
    id: 'website-package',
    name: 'Website full package',
    description: 'Full custom website (5-10 pages, responsive, UI/UX)',
    unit: 'Per project',
    unitPrice: 8000,
    defaultQty: 1,
    maxQty: 1,
    category: 'development'
  },
  {
    id: 'mobile-optimization',
    name: 'Responsiveness',
    description: 'Responsive for all screen sizes',
    unit: 'Per project',
    unitPrice: 200,
    defaultQty: 1,
    maxQty: 1,
    category: 'optimization'
  },
  {
    id: 'speed-optimization',
    name: 'Speed Optimization',
    description: 'PageSpeed (GTMetrix / Google) tuning',
    unit: 'Per project',
    unitPrice: 100,
    defaultQty: 1,
    maxQty: 1,
    category: 'optimization'
  },
  {
    id: 'basic-seo-setup',
    name: 'Basic SEO setup',
    description: 'Meta tags, schema, sitemap, robots.txt',
    unit: 'Per project',
    unitPrice: 100,
    defaultQty: 1,
    maxQty: 1,
    category: 'optimization'
  },
  {
    id: 'domain-hosting-setup',
    name: 'Domain & Hosting Setup',
    description: 'Domain DNS + hosting configuration',
    unit: 'Per project',
    unitPrice: 150,
    defaultQty: 1,
    maxQty: 1,
    category: 'hosting'
  }
]

export const categoryColors = {
  design: 'from-purple-500 to-purple-700',
  development: 'from-blue-500 to-blue-700',
  content: 'from-green-500 to-green-700',
  optimization: 'from-orange-500 to-orange-700',
  hosting: 'from-red-500 to-red-700'
}

export const categoryIcons = {
  design: '🎨',
  development: '💻',
  content: '✍️',
  optimization: '⚡',
  hosting: '🌐'
} 