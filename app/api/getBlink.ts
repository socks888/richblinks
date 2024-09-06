import { PrismaClient } from '@prisma/client';
import type { NextApiRequest, NextApiResponse } from 'next';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;
  console.log(id)
  if (req.method === 'GET') {
    try {
      const blink = await prisma.blink.findUnique({
        where: {
          id: Number(id),
        },
      });
      res.status(200).json(blink);
      console.log(blink)
    } catch (error) {
      res.status(500).json({ error: 'Error fetching Blink' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
