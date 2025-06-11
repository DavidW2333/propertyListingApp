import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') return res.status(405).end();

  const filePath = path.join(process.cwd(), 'data', 'properties.json');

  try {
    const data = fs.readFileSync(filePath, 'utf-8');
    const listings = JSON.parse(data);

    return res.status(200).json(listings);
  } catch (error) {
    console.error('Failed to read listings:', error);
    return res.status(500).json({ error: 'Failed to load listings' });
  }
}
