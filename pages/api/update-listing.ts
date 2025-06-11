import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  const { password, listing } = req.body;
  if (password !== process.env.ADMIN_PASSWORD) return res.status(403).json({ error: 'Unauthorized' });

  const filePath = path.join(process.cwd(), 'data', 'properties.json');
  const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  const index = data.findIndex((p: any) => p.id === listing.id);
  if (index === -1) return res.status(404).json({ error: 'Listing not found' });

  data[index] = {
    id: listing.id,
    address: listing.address,
    description: listing.description,
    bedrooms: parseInt(listing.bedrooms, 10),
    bathrooms: parseInt(listing.bathrooms, 10),
    availableFrom: listing.availableFrom,
    rent: listing.rent,
    contactNumber: listing.contactNumber,
    trademeLink: listing.trademeLink || null
  };

  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  res.status(200).json({ success: true });
}
