import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Define the application type
export type JobApplication = {
  id: string
  fullName: string
  email: string
  phone: string
  position: string
  experience: string
  coverLetter: string
  cvFilename: string
  submittedAt: string
  status: 'new' | 'reviewed' | 'interviewing' | 'rejected' | 'hired'
}

// Path to store applications data
const DATA_DIR = path.join(process.cwd(), 'data')
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json')
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads')

// Ensure directories exist
function ensureDirectoriesExist() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  
  if (!fs.existsSync(UPLOADS_DIR)) {
    fs.mkdirSync(UPLOADS_DIR, { recursive: true })
  }
  
  if (!fs.existsSync(APPLICATIONS_FILE)) {
    fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify([]))
  }
}

// Get all applications
function getApplications(): JobApplication[] {
  ensureDirectoriesExist()
  const data = fs.readFileSync(APPLICATIONS_FILE, 'utf-8')
  return JSON.parse(data)
}

// Save applications
function saveApplications(applications: JobApplication[]) {
  ensureDirectoriesExist()
  fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2))
}

// Save uploaded file
async function saveFile(file: File): Promise<string> {
  ensureDirectoriesExist()
  
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  
  // Generate unique filename
  const originalName = file.name
  const extension = path.extname(originalName)
  const filename = `${uuidv4()}${extension}`
  const filePath = path.join(UPLOADS_DIR, filename)
  
  fs.writeFileSync(filePath, buffer)
  return filename
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData()
    
    // Get file
    const file = formData.get('cv') as File
    if (!file) {
      return NextResponse.json(
        { error: 'CV file is required' },
        { status: 400 }
      )
    }
    
    // Save file
    const filename = await saveFile(file)
    
    // Create application object
    const application: JobApplication = {
      id: uuidv4(),
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      position: formData.get('position') as string,
      experience: formData.get('experience') as string,
      coverLetter: formData.get('coverLetter') as string || '',
      cvFilename: filename,
      submittedAt: new Date().toISOString(),
      status: 'new'
    }
    
    // Save application to JSON file
    const applications = getApplications()
    applications.push(application)
    saveApplications(applications)
    
    return NextResponse.json({ success: true, applicationId: application.id })
  } catch (error) {
    console.error('Error processing application:', error)
    return NextResponse.json(
      { error: 'Failed to process application' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const applications = getApplications()
    return NextResponse.json(applications)
  } catch (error) {
    console.error('Error fetching applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch applications' },
      { status: 500 }
    )
  }
} 