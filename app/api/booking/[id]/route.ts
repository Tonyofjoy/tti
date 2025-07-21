import { NextRequest, NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { BookingSubmission } from '@/types/booking'

// GET - Retrieve a specific booking
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const client = await clientPromise
    const db = client.db("tony_tech")
    
    const booking = await db.collection("bookings").findOne({ id })
    
    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(booking)
  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    )
  }
}

// PATCH - Update booking status or other fields
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // Validate status if provided
    if (body.status && !['new', 'reviewed', 'quoted', 'approved', 'completed'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }
    
    const client = await clientPromise
    const db = client.db("tony_tech")
    
    const result = await db.collection("bookings").findOneAndUpdate(
      { id },
      { $set: { ...body, updatedAt: new Date().toISOString() } },
      { returnDocument: 'after' }
    )
    
    if (!result) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(result)
  } catch (error) {
    console.error('Error updating booking:', error)
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    )
  }
}

// DELETE - Delete a booking (if needed)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const client = await clientPromise
    const db = client.db("tony_tech")
    
    const result = await db.collection("bookings").deleteOne({ id })
    
    if (result.deletedCount === 0) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true, message: 'Booking deleted successfully' })
  } catch (error) {
    console.error('Error deleting booking:', error)
    return NextResponse.json(
      { error: 'Failed to delete booking' },
      { status: 500 }
    )
  }
} 