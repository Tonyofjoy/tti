import { testConnection } from '../lib/test-db-connection'

async function main() {
  try {
    const isConnected = await testConnection()
    if (isConnected) {
      console.log('✅ Database connection successful')
      process.exit(0)
    } else {
      console.error('❌ Database connection failed')
      process.exit(1)
    }
  } catch (error) {
    console.error('Error testing connection:', error)
    process.exit(1)
  }
}

main() 