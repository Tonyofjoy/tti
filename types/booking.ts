export interface PricingItem {
  id: string
  name: string
  description: string
  unit: string
  unitPrice: number
  defaultQty: number
  maxQty?: number
  category: 'design' | 'development' | 'content' | 'optimization' | 'hosting'
}

export interface BookingFormData {
  // Client Information
  clientName: string
  projectName: string
  email: string
  phone: string
  company?: string
  
  // Project Details
  projectDescription: string
  timeline: string
  budget: string
  
  // Selected Services
  selectedItems: {
    [itemId: string]: {
      quantity: number
      enabled: boolean
    }
  }
  
  // Additional Information
  additionalRequirements?: string
  preferredContactMethod: 'email' | 'phone' | 'both'
  
  // Metadata
  submittedAt?: string
  status?: 'new' | 'reviewed' | 'quoted' | 'approved' | 'completed'
  totalEstimate?: number
}

export interface BookingSubmission extends BookingFormData {
  id: string
  submittedAt: string
  status: 'new' | 'reviewed' | 'quoted' | 'approved' | 'completed'
  totalEstimate: number
} 