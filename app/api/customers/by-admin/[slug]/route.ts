import { NextRequest, NextResponse } from 'next/server';
import { getAllCustomersByAdminId } from '../../../../lib/data';

// Get Customer By Id
// api/customers/by-admin/:adminID
export async function GET(
  request: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug
  try {
    console.log(`from slug ${slug}`)
    console.log(typeof(slug))
    const customers = await getAllCustomersByAdminId(slug);
    if(!customers) {
      return NextResponse.json({error: `No Customers for Admin ID:${slug} found.`}, { status: 404});
    }
    return NextResponse.json(customers, { status: 200 });
  } catch (err) {
    console.error('API Error: ', err);
    return NextResponse.json({ error: 'Failed to fetch customers data' }, { status: 500 });
  }
}
