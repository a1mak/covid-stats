import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Seeding started...')

    const cards = await prisma.dashboardCard.createMany({
      data: [{ title: 'Dashboard Card 1' }, { title: 'Dashboard Card 2' }],
    })

    await prisma.$disconnect()
    console.log('Seeding finished.')
  } catch (error) {
    console.error(error)
    await prisma.$disconnect()
    process.exit(1)
  }
}

main()
