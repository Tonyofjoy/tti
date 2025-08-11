import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import clientPromise from '@/lib/mongodb'
import { BookingFormData, BookingSubmission } from '@/types/booking'
import { pricingItems } from '@/data/pricing'
import { basicPricingItems } from '@/data/basic-pricing'

// Calculate total estimate based on selected items
function calculateTotal(selectedItems: BookingFormData['selectedItems'], quoteType?: 'premium' | 'basic'): number {
  let total = 0
  
  // Determine which pricing items to use based on quote type
  const allPricingItems = quoteType === 'basic' ? basicPricingItems : pricingItems
  
  for (const [itemId, selection] of Object.entries(selectedItems)) {
    if (selection.enabled) {
      const pricingItem = allPricingItems.find(item => item.id === itemId)
      if (pricingItem) {
        total += pricingItem.unitPrice * selection.quantity
      }
    }
  }
  
  return total
}

// POST - Create a new booking submission
export async function POST(request: NextRequest) {
  try {
    const body: BookingFormData = await request.json()
    
    // Validate required fields
    if (!body.clientName || !body.email || !body.phone) {
      return NextResponse.json(
        { error: 'Missing required fields: clientName, email, phone' },
        { status: 400 }
      )
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      )
    }
    
    // Calculate total estimate
    const totalEstimate = calculateTotal(body.selectedItems, body.quoteType)
    
    // Create booking submission object
    const bookingSubmission: BookingSubmission = {
      id: uuidv4(),
      ...body,
      submittedAt: new Date().toISOString(),
      status: 'new',
      totalEstimate
    }
    
    try {
      // Save to MongoDB
      const client = await clientPromise
      const db = client.db("tony_tech")
      
      const result = await db.collection("bookings").insertOne(bookingSubmission)
      
      return NextResponse.json({
        success: true,
        message: "Booking submitted successfully",
        bookingId: bookingSubmission.id,
        totalEstimate,
        id: result.insertedId
      })
      
    } catch (dbError) {
      console.error('Database error:', dbError)
      
      // Even if DB fails, return success to not block the user
      // This will be handled by monitoring
      return NextResponse.json({
        success: true,
        message: "Booking submitted",
        bookingId: bookingSubmission.id,
        totalEstimate,
        warning: "Database connection issue, but booking data was received"
      })
    }
    
  } catch (error) {
    console.error('Error in booking API:', error)
    return NextResponse.json(
      { error: 'Failed to submit booking. Please try again later.' },
      { status: 500 }
    )
  }
}

// GET - Retrieve all bookings (for admin use)
export async function GET(request: NextRequest) {
  try {
    const client = await clientPromise
    const db = client.db("tony_tech")
    
    const bookings = await db.collection("bookings")
      .find({})
      .sort({ submittedAt: -1 })
      .toArray()
    
    return NextResponse.json(bookings)
    
  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
} 