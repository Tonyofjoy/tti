import { MongoClient } from 'mongodb'
import * as dotenv from 'dotenv'
import * as path from 'path'

// Load environment variables from .env.local
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

export async function testConnection(): Promise<boolean> {
  let client: MongoClient | null = null;
  
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is not defined in .env.local')
    }

    const uri = process.env.MONGODB_URI
    client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 10000
    })
    
    await client.connect()
    const db = client.db("tony_tech")
    await db.command({ ping: 1 })
    
    return true
  } catch (error) {
    console.error('Database connection error:', error instanceof Error ? error.message : error)
    return false
  } finally {
    if (client) {
      await client.close()
    }
  }
} 