import { NextRequest, NextResponse } from 'next/server';
import { getAllAdmins } from '../../lib/data';


// Get All Admins
// api/admins/
export async function GET(request: NextRequest) {

  try {
    const admins = await getAllAdmins();
    return NextResponse.json(admins);
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch admin data' }, { status: 500 });
  }
}
