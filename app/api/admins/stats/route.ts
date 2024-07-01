import { NextRequest, NextResponse } from 'next/server';
import { getAppStats } from '../../../lib/data';


// Get App Stats for main page
// api/admins/stats
export async function GET(request: NextRequest) {

  try {
    const stats = await getAppStats();
    return NextResponse.json(stats);
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch App Stats data' }, { status: 500 });
  }
}
