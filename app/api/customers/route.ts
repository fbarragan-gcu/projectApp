import { NextRequest, NextResponse } from 'next/server';
import { getAllCustomers } from '../../lib/data';

export async function GET(request: NextRequest) {

  try {
    const customers = await getAllCustomers();
    return NextResponse.json(customers);
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch customer data' }, { status: 500 });
  }
}
