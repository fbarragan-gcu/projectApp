import { NextApiRequest, NextApiResponse } from 'next';
import { getAllProjects } from '../../lib/data';

export async function GET(req: NextApiRequest, res: NextApiResponse) {

  try {
    const customers = await getAllProjects();
    return Response.json(customers);
  } catch (err) {
    console.error('API Error: ', err);
    return new Response(JSON.stringify({ error: 'Failed to fetch project data' }), { status: 500 });
  }
}
