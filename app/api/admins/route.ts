import { getAllAdmins } from '../../lib/data';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {

  try {
    const admins = await getAllAdmins();
    return NextResponse.json(admins);
  } catch (err) {
    console.error('API Error: ', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch admin data' }), { status: 500 });
  }
}
