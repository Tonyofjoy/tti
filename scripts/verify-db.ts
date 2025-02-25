import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

async function verify() {
  let client: MongoClient | null = null;
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local')
    }

    console.log('MongoDB URI format check...')
    const uri = process.env.MONGODB_URI
    if (!uri.includes('mongodb+srv://')) {
      throw new Error('Invalid MongoDB URI format')
    }

    console.log('Initializing MongoDB client...')
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    })
    
    console.log('Attempting to connect...')
    await client.connect()
    
    console.log('Connected! Getting database reference...')
    const db = client.db("tony_tech")
    
    console.log('Testing database connection...')
    await db.command({ ping: 1 })
    console.log("✅ MongoDB connection successful!")
    
    console.log('Testing contacts collection...')
    const count = await db.collection("contacts").countDocuments()
    console.log(`✅ Found ${count} documents in contacts collection`)

  } catch (error) {
    console.error("\n❌ MongoDB connection failed!")
    if (error instanceof Error) {
      console.error('Error details:', error.message)
      if ('code' in error) {
        console.error('Error code:', (error as any).code)
      }
    }
    process.exit(1)
  } finally {
    if (client) {
      console.log('\nClosing connection...')
      await client.close()
      console.log('Connection closed')
    }
  }
}

verify() 