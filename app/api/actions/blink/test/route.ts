// route.ts
// route: /api/blink/test/route.ts
import { ActionGetResponse, ActionPostRequest, ActionPostResponse, ACTIONS_CORS_HEADERS, createPostResponse, MEMO_PROGRAM_ID } from "@solana/actions"
import { Transaction, TransactionInstruction, ComputeBudgetProgram, PublicKey, Connection, clusterApiUrl, SystemProgram } from "@solana/web3.js"

import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function OPTIONS(request: Request) {
  return new Response(null, { headers : ACTIONS_CORS_HEADERS })
}

export async function GET(request: NextRequest) {
  // Get the 'id' from the query string
  const { searchParams } = new URL(request.url);
  const id = searchParams.get('id');
  console.log(id)
  // Check if the id exists and is a number
  if (!id || isNaN(Number(id))) {
    return NextResponse.json({ error: 'Invalid or missing id parameter' }, { status: 400 });
  }

  try {
    // Query Prisma to find the Blink by id
    const blink = await prisma.blink.findUnique({
      where: { id: Number(id) },
    });

    if (!blink) {
      return NextResponse.json({ error: 'Blink not found' }, { status: 404 });
    }

    // Return the Blink data and make the blink
    console.log(blink.label)
    const response : ActionGetResponse  = {
      icon : new URL("/garden.jpg", new URL(request.url).origin).toString(),
      label : blink.label,
      description : blink.description,
      title : "Donate to my fund",
      links: {
          actions: [
              {
                  href: request.url + "?action&amount=0.01",
                  label: "0.01 SOL",
              },
              {
                  href: request.url + "?action&amount=0.05",
                  label: "0.05 SOL",
              },
              {
                  href: request.url + "?action&amount={amount}",
                  label: "another",
                  parameters:  [
                      {
                          name: "amount",
                          label: "custom",
                          required: true
                  
                  }        
              ],
              },
          ]
      },
      }
      error: {
          message: "This blink is not implemented yet!"
      }
  return Response.json(response, {
      headers : ACTIONS_CORS_HEADERS 
  });

    //return NextResponse.json(blink);
  } catch (error) {
    console.error('Error fetching Blink:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

