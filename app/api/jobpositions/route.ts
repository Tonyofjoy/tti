import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

// Define the job position type
export type JobPosition = {
  id: string
  title: string
  department: string
  location: string
  description: string
  requirements: string[]
  icon: string
}

// Path to store job positions data
const DATA_DIR = path.join(process.cwd(), 'data')
const POSITIONS_FILE = path.join(DATA_DIR, 'jobpositions.json')

// Ensure directories exist
function ensureDirectoriesExist() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true })
  }
  
  if (!fs.existsSync(POSITIONS_FILE)) {
    // Create default positions if the file doesn't exist
    const defaultPositions: JobPosition[] = [
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
    ]
    fs.writeFileSync(POSITIONS_FILE, JSON.stringify(defaultPositions, null, 2))
  }
}

// Get all job positions
function getPositions(): JobPosition[] {
  try {
    console.log('API: Fetching all job positions from file');
    ensureDirectoriesExist();
    
    if (!fs.existsSync(POSITIONS_FILE)) {
      console.log('API: Positions file does not exist, creating default positions');
      // Create default positions if the file doesn't exist
      const defaultPositions = getDefaultPositions();
      savePositions(defaultPositions);
      return defaultPositions;
    }
    
    // Read file with explicit utf8 encoding
    const data = fs.readFileSync(POSITIONS_FILE, 'utf8');
    
    try {
      const positions = JSON.parse(data);
      
      // Validate it's an array
      if (!Array.isArray(positions)) {
        console.error('API: Positions file does not contain an array, resetting to defaults');
        const defaultPositions = getDefaultPositions();
        savePositions(defaultPositions);
        return defaultPositions;
      }
      
      console.log(`API: Successfully loaded ${positions.length} positions`);
      return positions;
    } catch (parseError) {
      console.error('API: Error parsing positions file, resetting to defaults:', parseError);
      // If JSON parse fails, create new default positions
      const defaultPositions = getDefaultPositions();
      savePositions(defaultPositions);
      return defaultPositions;
    }
  } catch (error) {
    console.error('API: Error reading positions file:', error);
    return [];
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

// Save job positions
function savePositions(positions: JobPosition[]) {
  try {
    console.log(`API: Saving ${positions.length} positions to file`);
    
    // Create directory if it doesn't exist
    if (!fs.existsSync(DATA_DIR)) {
      console.log('API: Creating data directory');
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    
    // Validate that positions is actually an array before saving
    if (!Array.isArray(positions)) {
      console.error('API: Positions is not an array!', typeof positions);
      throw new Error('Cannot save positions: data is not an array');
    }
    
    // Ensure we're writing valid JSON by validating each position
    const validPositions = positions.filter(pos => {
      return pos && typeof pos === 'object' && pos.id && pos.title;
    });
    console.log(`API: Filtered ${positions.length - validPositions.length} invalid positions`);
    
    // Convert to JSON with pretty formatting
    const jsonData = JSON.stringify(validPositions, null, 2);
    
    // Use writeFileSync with explicit overwrite flag
    fs.writeFileSync(POSITIONS_FILE, jsonData, { flag: 'w' });
    
    // Verify the file was written correctly by reading it back
    const verifyData = fs.readFileSync(POSITIONS_FILE, 'utf-8');
    try {
      const parsedData = JSON.parse(verifyData);
      console.log(`API: Verified saved data, found ${parsedData.length} positions`);
    } catch (e) {
      console.error('API: WARNING - File verification failed, saved data may be corrupt');
      throw new Error('File verification failed after save');
    }
    
    return true;
  } catch (error) {
    console.error('API: Error saving positions:', error);
    throw error;
  }
}

// Get position by ID
function getPositionById(id: string): JobPosition | undefined {
  const positions = getPositions()
  return positions.find(pos => pos.id === id)
}

// Update position
function updatePosition(id: string, updates: Partial<JobPosition>): JobPosition | null {
  const positions = getPositions()
  const index = positions.findIndex(pos => pos.id === id)
  
  if (index === -1) {
    return null
  }
  
  const updatedPosition = {
    ...positions[index],
    ...updates
  }
  
  positions[index] = updatedPosition
  savePositions(positions)
  
  return updatedPosition
}

// Delete position
function deletePosition(id: string): boolean {
  const positions = getPositions()
  const initialLength = positions.length
  const filteredPositions = positions.filter(pos => pos.id !== id)
  
  if (filteredPositions.length === initialLength) {
    return false
  }
  
  savePositions(filteredPositions)
  return true
}

// GET - Retrieve all job positions
export async function GET(request: NextRequest) {
  try {
    console.log('API: GET - Fetching all job positions');
    const positions = getPositions();
    console.log(`API: GET - Found ${positions.length} positions`);
    return NextResponse.json(positions);
  } catch (error) {
    console.error('API: GET - Error fetching job positions:', error);
    return NextResponse.json(
      { error: 'Failed to fetch job positions', details: String(error) },
      { status: 500 }
    );
  }
}

// POST - Create a new job position
export async function POST(request: NextRequest) {
  try {
    console.log('API: POST - Creating new job position');
    const body = await request.json();
    console.log('API: POST - Received job position data:', body);
    
    // Validate required fields
    if (!body.title || !body.department || !body.location || !body.description) {
      console.log('API: POST - Missing required fields in job position data');
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }
    
    // Create new position
    const newPosition: JobPosition = {
      id: body.id || uuidv4(),
      title: body.title,
      department: body.department,
      location: body.location,
      description: body.description,
      requirements: body.requirements || [],
      icon: body.icon || 'Briefcase'
    };
    console.log('API: POST - Created new job position object:', newPosition);
    
    // Get existing positions
    const positions = getPositions();
    console.log('API: POST - Current positions count before adding:', positions.length);
    
    // Save to file
    positions.push(newPosition);
    savePositions(positions);
    
    // Get updated positions to verify
    const updatedPositions = getPositions();
    console.log('API: POST - Positions count after adding:', updatedPositions.length);
    
    return NextResponse.json({
      success: true,
      position: newPosition,
      message: 'Job position created successfully',
      totalPositions: updatedPositions.length,
      allPositions: updatedPositions // Return all positions for immediate UI update
    });
  } catch (error) {
    console.error('API: POST - Error creating job position:', error);
    return NextResponse.json(
      { error: 'Failed to create job position', details: String(error) },
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
    
    const updatedPosition = updatePosition(body.id, body)
    
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
    
    const success = deletePosition(id)
    
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