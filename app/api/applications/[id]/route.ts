import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { JobApplication } from '@/app/api/applications/route'

// Path to store applications data
const DATA_DIR = path.join(process.cwd(), 'data')
const APPLICATIONS_FILE = path.join(DATA_DIR, 'applications.json')

// Get all applications
function getApplications(): JobApplication[] {
  if (!fs.existsSync(APPLICATIONS_FILE)) {
    return []
  }
  const data = fs.readFileSync(APPLICATIONS_FILE, 'utf-8')
  return JSON.parse(data)
}

// Save applications
function saveApplications(applications: JobApplication[]) {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  fs.writeFileSync(APPLICATIONS_FILE, JSON.stringify(applications, null, 2))
}

// Get application by ID
function getApplicationById(id: string): JobApplication | undefined {
  const applications = getApplications()
  return applications.find(app => app.id === id)
}

// Update application
function updateApplication(id: string, updates: Partial<JobApplication>): JobApplication | null {
  const applications = getApplications()
  const index = applications.findIndex(app => app.id === id)
  
  if (index === -1) {
    return null
  }
  
  const updatedApplication = {
    ...applications[index],
    ...updates
  }
  
  applications[index] = updatedApplication
  saveApplications(applications)
  
  return updatedApplication
}

// GET - Retrieve a specific application
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
    
    return NextResponse.json(application)
  } catch (error) {
    console.error('Error fetching application:', error)
    return NextResponse.json(
      { error: 'Failed to fetch application' },
      { status: 500 }
    )
  }
}

// PATCH - Update application status
export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate status
    if (body.status && !['new', 'reviewed', 'interviewing', 'hired', 'rejected'].includes(body.status)) {
      return NextResponse.json(
        { error: 'Invalid status value' },
        { status: 400 }
      )
    }
    
    const updatedApplication = updateApplication(params.id, body)
    
    if (!updatedApplication) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updatedApplication)
  } catch (error) {
    console.error('Error updating application:', error)
    return NextResponse.json(
      { error: 'Failed to update application' },
      { status: 500 }
    )
  }
}

// DELETE - Remove an application
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const applications = getApplications()
    const filteredApplications = applications.filter(app => app.id !== params.id)
    
    // If no applications were removed, the ID doesn't exist
    if (applications.length === filteredApplications.length) {
      return NextResponse.json(
        { error: 'Application not found' },
        { status: 404 }
      )
    }
    
    saveApplications(filteredApplications)
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting application:', error)
    return NextResponse.json(
      { error: 'Failed to delete application' },
      { status: 500 }
    )
  }
} 