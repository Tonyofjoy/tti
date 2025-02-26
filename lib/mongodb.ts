import { MongoClient } from 'mongodb'

// Check for MONGODB_URI but don't throw an error that would break the app
const uri = process.env.MONGODB_URI

// Only proceed with MongoDB setup if URI is provided
if (!uri) {
  console.warn('MongoDB URI not found in environment variables. Database features will not be available.')
}

const options = {
  maxPoolSize: 10,
  minPoolSize: 1,
  retryWrites: true
}

let client: MongoClient
let clientPromise: Promise<MongoClient>

// Only setup MongoDB if we have a URI
if (uri) {
  if (process.env.NODE_ENV === 'development') {
    // In development mode, use a global variable so that the value
    // is preserved across module reloads caused by HMR (Hot Module Replacement).
    const globalWithMongo = global as typeof globalThis & {
      _mongoClientPromise?: Promise<MongoClient>
    }

    if (!globalWithMongo._mongoClientPromise) {
      client = new MongoClient(uri, options)
      globalWithMongo._mongoClientPromise = client.connect()
    }
    clientPromise = globalWithMongo._mongoClientPromise
  } else {
    // In production mode, it's best to not use a global variable.
    client = new MongoClient(uri, options)
    clientPromise = client.connect()
  }
} else {
  // Create a promise that rejects with a helpful error message
  clientPromise = Promise.reject(
    new Error('MongoDB URI is not configured. Please add MONGODB_URI to your environment variables.')
  )
}

export default clientPromise 