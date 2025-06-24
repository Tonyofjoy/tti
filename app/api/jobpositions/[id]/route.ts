import { NextRequest, NextResponse } from 'next/server'
import { JobPosition } from '../route'
import clientPromise from '@/lib/mongodb'

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
    console.log('API ID: Getting positions from MongoDB');
    
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
    
    console.log(`API ID: Successfully loaded ${formattedPositions.length} positions from MongoDB`);
    return formattedPositions;
  } catch (error) {
    console.error('API ID: Error reading positions from MongoDB:', error);
    return [];
  }
}

// Save job positions to MongoDB
async function savePositions(positions: JobPosition[]): Promise<boolean> {
  console.log('API ID: Saving positions, count:', positions.length);
  
  try {
    // Validate positions is an array
    if (!Array.isArray(positions)) {
      console.error('API ID: Cannot save - positions is not an array');
      return false;
    }
    
    // Filter out any invalid positions
    const validPositions = positions.filter(pos => pos && typeof pos === 'object' && pos.id && pos.title);
    console.log(`API ID: Filtered out ${positions.length - validPositions.length} invalid positions`);
    
    const collection = await getCollection()
    
    // Clear existing positions and insert new ones
    await collection.deleteMany({})
    
    if (validPositions.length > 0) {
      await collection.insertMany(validPositions)
    }
    
    console.log(`API ID: Successfully saved ${validPositions.length} positions to MongoDB`);
    return true;
  } catch (error) {
    console.error('API ID: Error saving positions to MongoDB:', error);
    return false;
  }
}

// Get position by ID from MongoDB
async function getPositionById(id: string): Promise<JobPosition | undefined> {
  console.log(`API ID: Finding position with ID: ${id}`);
  try {
    const collection = await getCollection()
    const position = await collection.findOne({ id })
    
    if (!position) {
      console.log(`API ID: Position not found: ${id}`);
      return undefined
    }
    
    const formattedPosition = {
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
    
    console.log(`API ID: Position found: ${!!formattedPosition}`);
    return formattedPosition
  } catch (error) {
    console.error('API ID: Error getting position by ID from MongoDB:', error);
    return undefined
  }
}

// Update position in MongoDB
async function updatePosition(id: string, updates: Partial<JobPosition>): Promise<JobPosition | null> {
  console.log(`API ID: Updating position with ID: ${id}`);
  try {
    const collection = await getCollection()
    const result = await collection.findOneAndUpdate(
      { id },
      { $set: updates },
      { returnDocument: 'after' }
    )
    
    if (!result) {
      console.log(`API ID: Position not found for update: ${id}`);
      return null;
    }
    
    const updatedPosition = {
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
    
    console.log(`API ID: Successfully updated position: ${id}`);
    return updatedPosition;
  } catch (error) {
    console.error(`API ID: Failed to update position: ${id}`, error);
    return null;
  }
}

// Delete position from MongoDB
async function deletePosition(id: string): Promise<{success: boolean, positions: JobPosition[]}> {
  console.log(`API ID: Deleting position with ID: ${id}`);
  try {
    const collection = await getCollection()
    const result = await collection.deleteOne({ id })
    
    if (result.deletedCount === 0) {
      console.log(`API ID: Position not found for deletion: ${id}`);
      const positions = await getPositions()
      return { success: false, positions };
    }
    
    console.log(`API ID: Successfully deleted position: ${id}`);
    // Get the latest positions to return
    const updatedPositions = await getPositions();
    return { success: true, positions: updatedPositions };
  } catch (error) {
    console.error(`API ID: Failed to delete position: ${id}`, error);
    const positions = await getPositions()
    return { success: false, positions };
  }
}

// GET - Retrieve a single job position
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const position = await getPositionById(params.id)
    
    if (!position) {
      return NextResponse.json(
        { error: 'Position not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(position, {
      headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error('Error fetching job position:', error)
    return NextResponse.json(
      { error: 'Failed to fetch job position' },
      { status: 500 }
    )
  }
}

// PUT/PATCH - Update a job position
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    // Validate required fields if it's a full update
    if (!body.title || !body.department || !body.location) {
      return NextResponse.json(
        { error: 'Missing required fields: title, department, location' },
        { status: 400 }
      )
    }
    
    const updatedPosition = await updatePosition(params.id, body)
    
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

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    
    const updatedPosition = await updatePosition(params.id, body)
    
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
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    console.log('API ID: DELETE - Deleting position with ID:', params.id);
    
    // Check if the position exists before trying to delete it
    const position = await getPositionById(params.id);
    if (!position) {
      console.log('API ID: DELETE - Position not found for deletion:', params.id);
      return NextResponse.json(
        { error: 'Position not found', id: params.id },
        { status: 404 }
      );
    }
    
    // Get all positions to log the count
    const allPositions = await getPositions();
    console.log('API ID: DELETE - Current positions count before deletion:', allPositions.length);
    
    // Delete the position
    const result = await deletePosition(params.id);
    
    if (!result.success) {
      console.log('API ID: DELETE - Deletion failed for position:', params.id);
      return NextResponse.json(
        { error: 'Position not found or could not be deleted', id: params.id },
        { status: 500 }
      );
    }
    
    console.log('API ID: DELETE - Successfully deleted position:', params.id);
    console.log('API ID: DELETE - Remaining positions count:', result.positions.length);
    
    return NextResponse.json({ 
      success: true,
      message: `Position ${params.id} deleted successfully`,
      remainingCount: result.positions.length,
      remainingPositions: result.positions // Return full position objects
    });
  } catch (error) {
    console.error('API ID: DELETE - Error deleting job position:', error);
    return NextResponse.json(
      { error: 'Failed to delete job position', details: String(error) },
      { status: 500 }
    );
  }
} 