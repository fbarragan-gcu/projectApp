import { NextRequest, NextResponse } from 'next/server';
import { getProjectById } from '../../../lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  try {
    const projects = await getProjectById(slug);
    if(!projects) {
      return NextResponse.json({error: `No Project with ID:${slug} found.`}, { status: 404});
    }
    return NextResponse.json(projects, { status: 200 });
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch project data' }, { status: 500 });
  }
}