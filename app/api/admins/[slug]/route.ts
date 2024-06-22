import { NextRequest, NextResponse } from 'next/server';
import { getAdminById } from '../../../lib/data';

export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  try {
    const admins = await getAdminById(slug);
    if(!admins) {
      return NextResponse.json({error: `No Admin with ID:${slug} found.`}, { status: 404});
    }
    return NextResponse.json(admins, { status: 200 });
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 });
  }
}
