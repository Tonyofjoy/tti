import clientPromise from './mongodb'

export async function testConnection() {
  try {
    const client = await clientPromise
    await client.db("tony_tech").command({ ping: 1 })
    console.log("Successfully connected to MongoDB.")
    return true
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error)
    return false
  }
} 