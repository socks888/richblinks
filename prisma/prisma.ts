// prisma.ts
// route: prisma/prisma.ts

// import { PrismaClient } from '@prisma/client'
const queryString = window.location.search; // e.g., "?product=shirt&color=blue"
const urlParams = new URLSearchParams(queryString);

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient()
const id = urlParams.get('id');
async function main() {
  // const res = await prisma.blink.findMany()
  const res = await prisma.blink.findUnique({
    where: {
      // id: Number(1),
      id: {id},
    }})
  console.log(res)
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })