import { NextRequest, NextResponse } from 'next/server';
import { getCustomerById } from '../../../lib/data';


// Get Customer By Id
// api/customers/:customerID
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  try {
    const customers = await getCustomerById(slug);
    if(!customers) {
      return NextResponse.json({error: `No Customer with ID:${slug} found.`}, { status: 404});
    }
    return NextResponse.json(customers, { status: 200 });
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch customer data' }, { status: 500 });
  }
}
