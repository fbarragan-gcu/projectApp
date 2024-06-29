import { NextRequest, NextResponse } from 'next/server';
import { getProjectsByAdminId } from '../../../../lib/data';

// Get Project By Admin Id
// api/projects/admin/:adminID
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  try {
    const projects = await getProjectsByAdminId(slug);
    if(!projects) {
      return NextResponse.json({error: `No Projects with By Admin ID:${slug} found.`}, { status: 404});
    }
    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch projects by admin data' }, { status: 500 });
  }
}