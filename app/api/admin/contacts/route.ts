import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

export async function GET(req: Request) {
  try {
    // Verify admin token
    const token = cookies().get('admin_token')
    if (!token) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    try {
      verify(token.value, JWT_SECRET)
    } catch (error) {
      return NextResponse.json(
        { error: 'Invalid token' },
        { status: 401 }
      )
    }

    // Fix MongoDB connection string
    const client = await clientPromise
    const db = client.db("tony_tech")
    
    try {
      const contacts = await db.collection("contacts")
        .find({})
        .sort({ createdAt: -1 })
        .toArray()

      return NextResponse.json(contacts)
    } catch (dbError) {
      console.error('Database error:', dbError)
      return NextResponse.json(
        { error: 'Database error' },
        { status: 500 }
      )
    }

  } catch (error) {
    console.error('Error in contacts API:', error)
    return NextResponse.json(
      { error: 'Failed to fetch contacts' },
      { status: 500 }
    )
  }
} 