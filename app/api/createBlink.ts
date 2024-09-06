import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { blink_url, title, description, image_url, amount1, amount2, wallet_address } = req.body;

    try {
      const blink = await prisma.blink.create({
        data: {
          blink_url,
          title,
          description,
          image_url,
          amount1: parseFloat(amount1),
          amount2: parseFloat(amount2),
          wallet_address,
        },
      });
      res.status(200).json(blink);
    } catch (error) {
      res.status(500).json({ error: 'Error creating Blink' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
