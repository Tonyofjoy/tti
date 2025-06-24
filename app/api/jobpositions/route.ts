import { NextRequest, NextResponse } from 'next/server'
import { v4 as uuidv4 } from 'uuid'
import clientPromise from '@/lib/mongodb'

// Define the comprehensive job position type
export type JobPosition = {
  id: string
  title: string
  department: string
  location: string
  description?: string // Keep for backward compatibility
  
  // Comprehensive job details
  heritage?: string
  culture?: {
    description: string
    values: string[]
  }
  responsibilities?: string[]
  requirements?: string[]
  workingSchedule?: {
    description: string
    hours: string
  }
  benefits?: string[]
  callToAction?: string
  
  icon: string
}

// Database collection name
const COLLECTION_NAME = 'jobpositions'

// Helper function to get database collection
async function getCollection() {
  const client = await clientPromise
  const db = client.db()
  return db.collection(COLLECTION_NAME)
}

// Get all job positions from MongoDB
async function getPositions(): Promise<JobPosition[]> {
  try {
    console.log('API: Fetching all job positions from MongoDB');
    const collection = await getCollection()
    const positions = await collection.find({}).toArray()
    
    // Convert MongoDB _id to our id format and remove _id
    const formattedPositions = positions.map(pos => ({
      id: pos.id || pos._id.toString(),
      title: pos.title,
      department: pos.department,
      location: pos.location,
      description: pos.description,
      heritage: pos.heritage,
      culture: pos.culture,
      responsibilities: pos.responsibilities || [],
      requirements: pos.requirements || [],
      workingSchedule: pos.workingSchedule,
      benefits: pos.benefits || [],
      callToAction: pos.callToAction,
      icon: pos.icon || 'Briefcase'
    }))
    
    console.log(`API: Successfully loaded ${formattedPositions.length} positions from MongoDB`);
    
    // If no positions exist, create default ones
    if (formattedPositions.length === 0) {
      console.log('API: No positions found, creating default positions');
      const defaultPositions = getDefaultPositions()
      await savePositions(defaultPositions)
      return defaultPositions
    }
    
    return formattedPositions
  } catch (error) {
    console.error('API: Error reading positions from MongoDB:', error);
    // Return default positions as fallback
    return getDefaultPositions()
  }
}

// Helper function to get default positions with unique IDs
function getDefaultPositions(): JobPosition[] {
  return [
    {
      id: uuidv4(),
      title: "Senior AI Engineer",
      department: "Engineering",
      location: "London, UK (Hybrid)",
      description: "Lead the development of cutting-edge AI solutions for enterprise clients.",
      requirements: ["5+ years experience in ML/AI", "Strong Python skills", "Experience with TensorFlow or PyTorch"],
      icon: "Briefcase"
    },
    {
      id: uuidv4(),
      title: "UX/UI Designer",
      department: "Design",
      location: "Remote (UK-based)",
      description: "Create intuitive and engaging user experiences for our digital products.",
      requirements: ["3+ years in UX/UI design", "Proficiency in Figma", "Portfolio of digital products"],
      icon: "Users"
    },
    {
      id: uuidv4(),
      title: "Technical Project Manager",
      department: "Project Management",
      location: "London, UK",
      description: "Oversee the successful delivery of complex technical projects for our clients.",
      requirements: ["PMP or Agile certification", "5+ years managing tech projects", "Client-facing experience"],
      icon: "Lightbulb"
    }
  ];
}

// Save job positions to MongoDB
async function savePositions(positions: JobPosition[]): Promise<boolean> {
  try {
    console.log(`API: Saving ${positions.length} positions to MongoDB`);
    
    // Validate that positions is actually an array before saving
    if (!Array.isArray(positions)) {
      console.error('API: Positions is not an array!', typeof positions);
      throw new Error('Cannot save positions: data is not an array');
    }
    
    // Ensure we're writing valid data by validating each position
    const validPositions = positions.filter(pos => {
      return pos && typeof pos === 'object' && pos.id && pos.title;
    });
    console.log(`API: Filtered ${positions.length - validPositions.length} invalid positions`);
    
    const collection = await getCollection()
    
    // Clear existing positions and insert new ones
    await collection.deleteMany({})
    
    if (validPositions.length > 0) {
      await collection.insertMany(validPositions)
    }
    
    console.log(`API: Successfully saved ${validPositions.length} positions to MongoDB`);
    return true;
  } catch (error) {
    console.error('API: Error saving positions to MongoDB:', error);
    throw error;
  }
}

// Get position by ID from MongoDB
async function getPositionById(id: string): Promise<JobPosition | undefined> {
  try {
    const collection = await getCollection()
    const position = await collection.findOne({ id })
    
    if (!position) {
      return undefined
    }
    
    return {
      id: position.id,
      title: position.title,
      department: position.department,
      location: position.location,
      description: position.description,
      heritage: position.heritage,
      culture: position.culture,
      responsibilities: position.responsibilities || [],
      requirements: position.requirements || [],
      workingSchedule: position.workingSchedule,
      benefits: position.benefits || [],
      callToAction: position.callToAction,
      icon: position.icon || 'Briefcase'
    }
  } catch (error) {
    console.error('API: Error getting position by ID from MongoDB:', error);
    return undefined
  }
}

// Update position in MongoDB
async function updatePosition(id: string, updates: Partial<JobPosition>): Promise<JobPosition | null> {
  try {
    const collection = await getCollection()
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after' }
    )
    
    if (!result) {
      return null
    }
    
    return {
      id: result.id,
      title: result.title,
      department: result.department,
      location: result.location,
      description: result.description,
      heritage: result.heritage,
      culture: result.culture,
      responsibilities: result.responsibilities || [],
      requirements: result.requirements || [],
      workingSchedule: result.workingSchedule,
      benefits: result.benefits || [],
      callToAction: result.callToAction,
      icon: result.icon || 'Briefcase'
    }
  } catch (error) {
    console.error('API: Error updating position in MongoDB:', error);
    return null
  }
}

// Delete position from MongoDB
async function deletePosition(id: string): Promise<boolean> {
  try {
    const collection = await getCollection()
    const result = await collection.deleteOne({ id })
    return result.deletedCount > 0
  } catch (error) {
    console.error('API: Error deleting position from MongoDB:', error);
    return false
  }
}

// GET - Retrieve all job positions
export async function GET(request: NextRequest) {
  try {
    console.log('API: GET - Fetching all job positions');
    const positions = await getPositions();
    console.log(`API: GET - Found ${positions.length} positions`);
    
    return NextResponse.json(positions, {
      status: 200,
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error('API: GET - Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve job positions' },
      { status: 500 }
    );
  }
}

// POST - Create a new job position
export async function POST(request: NextRequest) {
  try {
    console.log('API: POST - Creating new job position');
    const body = await request.json();
    console.log('API: POST - Request body:', body);
    
    // Validate required fields
    if (!body.title || !body.department || !body.location) {
      console.log('API: POST - Missing required fields');
      return NextResponse.json(
        { error: 'Missing required fields: title, department, location' },
        { status: 400 }
      );
    }
    
    // Create new position with comprehensive structure
    const newPosition: JobPosition = {
      id: uuidv4(),
      title: body.title,
      department: body.department,
      location: body.location,
      description: body.description,
      heritage: body.heritage,
      culture: body.culture,
      responsibilities: body.responsibilities || [],
      requirements: body.requirements || [],
      workingSchedule: body.workingSchedule,
      benefits: body.benefits || [],
      callToAction: body.callToAction,
      icon: body.icon || 'Briefcase'
    };
    
    console.log('API: POST - Created position object:', newPosition);
    
    // Get current positions and add the new one
    const currentPositions = await getPositions();
    const updatedPositions = [...currentPositions, newPosition];
    
    // Save updated positions
    await savePositions(updatedPositions);
    
    console.log('API: POST - Successfully created position');
    return NextResponse.json({
      success: true,
      position: newPosition,
      message: 'Job position created successfully',
      totalPositions: updatedPositions.length,
      allPositions: updatedPositions
    }, { status: 201 });
    
  } catch (error) {
    console.error('API: POST - Error:', error);
    return NextResponse.json(
      { error: 'Failed to create job position' },
      { status: 500 }
    );
  }
}

// PUT - Update an existing job position
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    
    if (!body.id) {
      return NextResponse.json(
        { error: 'Position ID is required' },
        { status: 400 }
      )
    }
    
    // Validate required fields
    if (!body.title || !body.department || !body.location || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const updatedPosition = await updatePosition(body.id, body)
    
    if (!updatedPosition) {
      return NextResponse.json(
        { error: 'Position not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(updatedPosition)
  } catch (error) {
    console.error('Error updating job position:', error)
    return NextResponse.json(
      { error: 'Failed to update job position' },
      { status: 500 }
    )
  }
}

// DELETE - Remove a job position
export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    
    if (!id) {
      return NextResponse.json(
        { error: 'Position ID is required' },
        { status: 400 }
      )
    }
    
    const success = await deletePosition(id)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Position not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting job position:', error)
    return NextResponse.json(
      { error: 'Failed to delete job position' },
      { status: 500 }
    )
  }
} 