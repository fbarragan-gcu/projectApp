
import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects, createProject } from '../../lib/data';

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
    const newCustomer = await createProject(body);
    return NextResponse.json(newCustomer, { status: 201})
  } catch (err) {
    console.log("API Error", err);
    return NextResponse.json({ error: "Failed to create new Customer" }, { status: 500});
  }
}