import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') return res.status(405).end();

  try {
    const { password, listing } = req.body;  // Changed here
    if (password !== 'AdminPassword') return res.status(403).json({ error: 'Unauthorized' });

    const dataDir = path.join(process.cwd(), 'data');
    const filePath = path.join(dataDir, 'properties.json');

    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir);
    }

    let data: any[] = [];
    if (fs.existsSync(filePath)) {
      const fileContent = fs.readFileSync(filePath, 'utf-8').trim();
      if (fileContent) {
        data = JSON.parse(fileContent);
        if (!Array.isArray(data)) {
          return res.status(500).json({ error: 'Data file is corrupted' });
        }
      }
    }

    if (
      !listing.address ||
      !listing.bedrooms ||
      !listing.bathrooms ||
      !listing.availableFrom ||
      !listing.rent ||
      !listing.contactNumber
    ) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const nextId = data.length ? Math.max(...data.map((l) => l.id)) + 1 : 1;

    const newListing = {
      id: nextId,
      address: listing.address,
      description: listing.description || '',
      bedrooms: parseInt(listing.bedrooms, 10),
      bathrooms: parseInt(listing.bathrooms, 10),
      availableFrom: listing.availableFrom,
      rent: parseInt(listing.rent, 10),  // Parse rent too
      contactNumber: listing.contactNumber,
      trademeLink: listing.trademeLink || null,
    };

    data.push(newListing);

    fs.writeFileSync(filePath, JSON.stringify(data, null, 2));

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Add listing error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
