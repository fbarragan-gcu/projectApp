import { NextRequest, NextResponse } from 'next/server';
import { getProjectsByCustomerId } from '../../../../lib/data';

// Get Project By Customer Id
// api/projects/customer/:customerID
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  try {
    const projects = await getProjectsByCustomerId(slug);
    if(!projects) {
      return NextResponse.json({error: `No Projects with By Customer ID:${slug} found.`}, { status: 404});
    }
    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch projects by customer data' }, { status: 500 });
  }
}