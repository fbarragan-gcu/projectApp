import { NextApiRequest, NextApiResponse } from 'next';
import { getAllCustomers } from '../../lib/data';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  try {
    const customers = await getAllCustomers();
    return Response.json(customers);
  } catch (err) {
    console.error('API Error: ', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch customer data' }), { status: 500 });
  }
}
