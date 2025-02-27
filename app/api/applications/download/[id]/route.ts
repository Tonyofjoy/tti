import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { JobApplication } from '@/app/api/applications/route'

// Path to store applications data
const DATA_DIR = path.join(process.cwd(), 'data')
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json')
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads')

// Get application by ID
function getApplicationById(id: string): JobApplication | undefined {
  if (!fs.existsSync(APPLICATIONS_FILE)) {
    return undefined
  }
  const data = fs.readFileSync(APPLICATIONS_FILE, 'utf-8')
  const applications: JobApplication[] = JSON.parse(data)
  return applications.find(app => app.id === id)
}

// GET - Download CV file
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const application = getApplicationById(params.id)
    
    if (!application) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }
    
    const filePath = path.join(UPLOADS_DIR, application.cvFilename)
    
    if (!fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'CV file not found' },
        { status: 404 }
      )
    }
    
    const fileBuffer = fs.readFileSync(filePath)
    const fileExtension = path.extname(application.cvFilename).toLowerCase()
    
    // Set appropriate content type based on file extension
    let contentType = 'application/octet-stream'
    if (fileExtension === '.pdf') {
      contentType = 'application/pdf'
    } else if (fileExtension === '.doc') {
      contentType = 'application/msword'
    } else if (fileExtension === '.docx') {
      contentType = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    }
    
    // Create a response with the file content
    const response = new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${application.fullName.replace(/\s+/g, '_')}_CV${fileExtension}"`,
      },
    })
    
    return response
  } catch (error) {
    console.error('Error downloading CV:', error)
    return NextResponse.json(
      { error: 'Failed to download CV' },
      { status: 500 }
    )
  }
} 