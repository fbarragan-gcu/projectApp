
import { NextRequest, NextResponse } from 'next/server';
import { getAllProjects } from '../../lib/data';

export async function GET(request: NextRequest) {

  try {
    const customers = await getAllProjects();
    return NextResponse.json(customers);
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch project data' }, { status: 500 });
  }
}
