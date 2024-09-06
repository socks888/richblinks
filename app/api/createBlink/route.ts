// filename: route.ts
// route: /app/api/createBlink/route.ts

import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';

const prisma = new PrismaClient();


export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Create a new Blink entry
    const newBlink = await prisma.blink.create({
      data: {
        title: body.title,
        description: body.description,
        image_url: body.image_url,
        amount1: body.amount1,
        amount2: body.amount2,
        label: body.label,
        wallet_address: body.wallet_address,
      },
    });

    // Return the newly created ID as part of the blink URL
    return NextResponse.json({ id: newBlink.id });
  } catch (err) {
    console.error('Error creating Blink:', err);
    return NextResponse.json({ error: 'An error occurred' }, { status: 500 });
  }
}
