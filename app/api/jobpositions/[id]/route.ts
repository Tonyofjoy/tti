import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { JobPosition } from '../route'

// Path to store job positions data
const DATA_DIR = path.join(process.cwd(), 'data')
const POSITIONS_FILE = path.join(DATA_DIR, 'jobpositions.json')

// Get all job positions
function getPositions(): JobPosition[] {
  try {
    console.log('API ID: Getting positions from file');
    
    if (!fs.existsSync(POSITIONS_FILE)) {
      console.log('API ID: Positions file does not exist, returning empty array');
      return [];
    }
    
    const data = fs.readFileSync(POSITIONS_FILE, 'utf-8');
    
    try {
      const positions = JSON.parse(data);
      
      // Validate it's an array
      if (!Array.isArray(positions)) {
        console.error('API ID: Positions file does not contain an array');
        return [];
      }
      
      console.log(`API ID: Successfully loaded ${positions.length} positions`);
      return positions;
    } catch (e) {
      console.error('API ID: Error parsing positions file:', e);
      // If we can't parse the file, return an empty array
      return [];
    }
  } catch (error) {
    console.error('API ID: Error reading positions file:', error);
    return [];
  }
}

// Save job positions
function savePositions(positions: JobPosition[]): boolean {
  console.log('API ID: Saving positions, count:', positions.length);
  
  try {
    if (!fs.existsSync(DATA_DIR)) {
      console.log('API ID: Creating data directory');
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // Validate positions is an array
    if (!Array.isArray(positions)) {
      console.error('API ID: Cannot save - positions is not an array');
      return false;
    }
    
    // Filter out any invalid positions
    const validPositions = positions.filter(pos => pos && typeof pos === 'object' && pos.id && pos.title);
    console.log(`API ID: Filtered out ${positions.length - validPositions.length} invalid positions`);
    
    // Write the file with 'w' flag to ensure overwrite
    fs.writeFileSync(POSITIONS_FILE, JSON.stringify(validPositions, null, 2), { flag: 'w' });
    console.log('API ID: Successfully wrote positions file');
    
    // Verify the file was written correctly
    const verifyData = fs.readFileSync(POSITIONS_FILE, 'utf-8');
    try {
      const parsedData = JSON.parse(verifyData);
      if (Array.isArray(parsedData)) {
        console.log(`API ID: Verified file contains array with ${parsedData.length} positions`);
        return true;
      } else {
        console.error('API ID: Verification failed - file does not contain an array');
        return false;
      }
    } catch (e) {
      console.error('API ID: Verification failed - file contains invalid JSON:', e);
      return false;
    }
  } catch (error) {
    console.error('API ID: Error saving positions:', error);
    return false;
  }
}

// Get position by ID
function getPositionById(id: string): JobPosition | undefined {
  console.log(`API ID: Finding position with ID: ${id}`);
  const positions = getPositions();
  const position = positions.find(pos => pos.id === id);
  console.log(`API ID: Position found: ${!!position}`);
  return position;
}

// Update position
function updatePosition(id: string, updates: Partial<JobPosition>): JobPosition | null {
  console.log(`API ID: Updating position with ID: ${id}`);
  const positions = getPositions();
  const index = positions.findIndex(pos => pos.id === id);
  
  if (index === -1) {
    console.log(`API ID: Position not found for update: ${id}`);
    return null;
  }
  
  const updatedPosition = {
    ...positions[index],
    ...updates
  };
  
  positions[index] = updatedPosition;
  const success = savePositions(positions);
  
  if (success) {
    console.log(`API ID: Successfully updated position: ${id}`);
    return updatedPosition;
  } else {
    console.error(`API ID: Failed to save positions after update: ${id}`);
    return null;
  }
}

// Delete position
function deletePosition(id: string): {success: boolean, positions: JobPosition[]} {
  console.log(`API ID: Deleting position with ID: ${id}`);
  const positions = getPositions();
  const positionExists = positions.some(pos => pos.id === id);
  
  if (!positionExists) {
    console.log(`API ID: Position not found for deletion: ${id}`);
    return { success: false, positions };
  }
  
  console.log(`API ID: Position exists, proceeding with deletion`);
  const filteredPositions = positions.filter(pos => pos.id !== id);
  console.log(`API ID: Filtered positions count: ${filteredPositions.length} (original: ${positions.length})`);
  
  const success = savePositions(filteredPositions);
  
  if (success) {
    console.log(`API ID: Successfully deleted position: ${id}`);
    // Get the latest positions to return
    const updatedPositions = getPositions();
    return { success: true, positions: updatedPositions };
  } else {
    console.error(`API ID: Failed to save positions after deletion: ${id}`);
    return { success: false, positions };
  }
}

// GET - Retrieve a single job position
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const position = getPositionById(params.id)
    
    if (!position) {
      return NextResponse.json(
        { error: 'Position not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json(position)
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
    if (!body.title || !body.department || !body.location || !body.description) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }
    
    const updatedPosition = updatePosition(params.id, body)
    
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
    
    const updatedPosition = updatePosition(params.id, body)
    
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
    const position = getPositionById(params.id);
    if (!position) {
      console.log('API ID: DELETE - Position not found for deletion:', params.id);
      return NextResponse.json(
        { error: 'Position not found', id: params.id },
        { status: 404 }
      );
    }
    
    // Get all positions to log the count
    const allPositions = getPositions();
    console.log('API ID: DELETE - Current positions count before deletion:', allPositions.length);
    
    // Delete the position
    const result = deletePosition(params.id);
    
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