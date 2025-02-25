import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST() {
  // Await the cookies() call and then delete the cookie
  const cookieStore = await cookies()
  cookieStore.delete('admin_token')
  
  return NextResponse.json({ success: true })
} 