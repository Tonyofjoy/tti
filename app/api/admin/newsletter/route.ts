import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { verify } from 'jsonwebtoken'
import { MongoClient, ObjectId } from 'mongodb'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key'

// MongoDB connection
const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017'
const client = new MongoClient(uri)
const dbName = 'tti'
const collectionName = 'newsletter_subscribers'

// GET handler to fetch all newsletter subscribers
export async function GET(request: Request) {
  try {
    // Get and verify token
    const cookieStore = await cookies()
    const token = cookieStore.get('admin_token')

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

    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    
    // Get all subscribers, sorted by most recent first
    const subscribers = await collection.find({}).sort({ createdAt: -1 }).toArray()
    
    return NextResponse.json(subscribers)
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error)
    return NextResponse.json({ error: 'Failed to fetch subscribers' }, { status: 500 })
  } finally {
    await client.close()
  }
}

// POST handler to add a new newsletter subscriber
export async function POST(request: Request) {
  try {
    const { email } = await request.json()
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }
    
    await client.connect()
    const db = client.db(dbName)
    const collection = db.collection(collectionName)
    
    // Check if email already exists
    const existingSubscriber = await collection.findOne({ email })
    if (existingSubscriber) {
      return NextResponse.json({ error: 'Email already subscribed' }, { status: 409 })
    }
    
    // Add new subscriber
    const result = await collection.insertOne({
      email,
      createdAt: new Date(),
    })
    
    return NextResponse.json({ 
      success: true, 
      message: 'Successfully subscribed to newsletter',
      id: result.insertedId
    }, { status: 201 })
  } catch (error) {
    console.error('Error adding newsletter subscriber:', error)
    return NextResponse.json({ error: 'Failed to subscribe' }, { status: 500 })
  } finally {
    await client.close()
  }
} 