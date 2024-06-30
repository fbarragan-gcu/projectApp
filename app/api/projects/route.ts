
import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, createProject, updateProject } from '../../lib/data';

// Get All Projects
// api/projects/
export async function GET(request: NextRequest) {

  try {
    const customers = await getAllProjects();
    return NextResponse.json(customers);
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch project data' }, { status: 500 });
  }
}

// POST Method for New Project creation
// api/project
export async function POST(request: NextRequest) {
  
  try {
    const body = await request.json();
    const newProject = await createProject(body);
    return NextResponse.json(newProject, { status: 201})
  } catch (err) {
    console.log("API Error", err);
    return NextResponse.json({ error: "Failed to create new Project" }, { status: 500});
  }
}

// POST Method for New Project creation
// api/project
export async function PUT(request: NextRequest) {
  
  try {
    const body = await request.json();
    const updatedProject = await updateProject(body);
    return NextResponse.json(updatedProject, { status: 200})
  } catch (err) {
    console.log("API Error", err);
    return NextResponse.json({ error: "Failed to edit Project" }, { status: 500});
  }
}