import { NextResponse } from 'next/server'
import clientPromise from '@/lib/mongodb'
import { MongoClient, MongoServerError } from 'mongodb'

export async function POST(req: Request) {
  let client: MongoClient | null = null;
  
  try {
    const body = await req.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.subject || !body.message) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Get MongoDB client
    client = await clientPromise
    const db = client.db("tony_tech")
    
    // Prepare contact data
    const contactData = {
      ...body,
      createdAt: new Date(),
      status: 'new'
    }

    // Insert the document
    const result = await db.collection("contacts").insertOne(contactData)

    return NextResponse.json({ 
      success: true,
      message: "Contact form submitted successfully",
      id: result.insertedId 
    })

  } catch (error) {
    console.error('Error in contact API:', error)
    
    if (error instanceof MongoServerError) {
      return NextResponse.json(
        { error: 'Database connection failed. Please try again later.' },
        { status: 503 }
      )
    }
    
    return NextResponse.json(
      { error: 'An unexpected error occurred. Please try again later.' },
      { status: 500 }
    )
  }
} 