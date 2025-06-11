import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password, id } = req.body;
  if (password !== 'AdminPassword') return res.status(403).json({ error: 'Unauthorized' });

  const filePath = path.join(process.cwd(), 'data', 'properties.json');
  let data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  data = data.filter((listing: any) => listing.id !== id);

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ success: true });
}
