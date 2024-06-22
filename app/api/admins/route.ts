import { NextApiRequest, NextApiResponse } from 'next';
import { getAllAdmins } from '../../lib/data';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  try {
    const admins = await getAllAdmins();
    return Response.json(admins);
  } catch (err) {
    console.error('API Error: ', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch admin data' }), { status: 500 });
  }
}
