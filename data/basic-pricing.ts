import { PricingItem } from '@/types/booking'

export const basicPricingItems: PricingItem[] = [
  {
    id: 'basic-homepage',
    name: 'Home Page',
    description: 'Custom homepage design based on your requirements',
    unit: 'Per page',
    unitPrice: 300,
    defaultQty: 1,
    maxQty: 1,
    category: 'development',
    quoteType: 'basic'
  },
  {
    id: 'basic-subpage',
    name: 'Subpage',
    description: 'Additional pages (About, Contact, Services, etc.)',
    unit: 'Per page',
    unitPrice: 50,
    defaultQty: 3,
    maxQty: 10,
    category: 'development',
    quoteType: 'basic'
  },
  {
    id: 'basic-content-writing',
    name: 'Content Writing',
    description: 'Professional content writing for your pages',
    unit: 'Per project',
    unitPrice: 75,
    defaultQty: 3,
    maxQty: 10,
    category: 'content',
    quoteType: 'basic'
  },
  {
    id: 'basic-image-optimization',
    name: 'Image Optimization',
    description: 'Optimize images for web performance',
    unit: 'Per image',
    unitPrice: 1,
    defaultQty: 10,
    maxQty: 50,
    category: 'optimization',
    quoteType: 'basic'
  },
  {
    id: 'basic-responsive',
    name: 'Responsiveness',
    description: 'Mobile-friendly responsive design',
    unit: 'Per project',
    unitPrice: 200,
    defaultQty: 1,
    maxQty: 1,
    category: 'optimization',
    quoteType: 'basic'
  },
  {
    id: 'basic-speed-optimization',
    name: 'Speed Optimization',
    description: 'Website speed optimization for better performance',
    unit: 'Per project',
    unitPrice: 100,
    defaultQty: 1,
    maxQty: 1,
    category: 'optimization',
    quoteType: 'basic'
  },
  {
    id: 'basic-seo',
    name: 'Basic SEO Setup',
    description: 'Essential SEO optimization and meta tags',
    unit: 'Per project',
    unitPrice: 150,
    defaultQty: 1,
    maxQty: 1,
    category: 'optimization',
    quoteType: 'basic'
  },
  {
    id: 'basic-domain-hosting-setup',
    name: 'Domain & Hosting Setup',
    description: 'Complete domain registration and hosting configuration',
    unit: 'Per project',
    unitPrice: 100,
    defaultQty: 1,
    maxQty: 1,
    category: 'hosting',
    quoteType: 'basic'
  }
]

export const basicCategoryColors = {
  design: 'from-purple-400 to-purple-600',
  development: 'from-blue-400 to-blue-600',
  content: 'from-green-400 to-green-600',
  optimization: 'from-orange-400 to-orange-600',
  hosting: 'from-red-400 to-red-600'
}

export const basicCategoryIcons = {
  design: '🎨',
  development: '💻',
  content: '✍️',
  optimization: '⚡',
  hosting: '🌐'
}
