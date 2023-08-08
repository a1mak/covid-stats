import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Seeding started...')
    const filtersParamEngland = await prisma.apiFilters.create({
      data: {
        areaType: 'nation',
        areaName: 'England',
      },
    })
    const cardAvatarEngland = await prisma.cardAvatar.create({
      data: {
        url: 'https://img.icons8.com/fluency/48/england-circular.png',
        altText: 'England',
      },
    })
    const cardEngland = await prisma.cardInfo.create({
      data: {
        title: 'Cases in England',
        favourite: false,
        cardAvatarId: cardAvatarEngland.id,
      },
    })
    const chartEngland = await prisma.chart.create({
      data: {
        type: 'singleLine',
        apiFiltersId: filtersParamEngland.id,
        cardInfoId: cardEngland.id,
        xAxisLabel: 'Date',
        yAxisLabel: 'Cases',
      },
    })

    const filtersParamUK = await prisma.apiFilters.create({
      data: {
        areaType: 'nation',
        areaName: '', // Empty means whole UK
      },
    })
    const cardAvatarUK = await prisma.cardAvatar.create({
      data: {
        url: 'https://img.icons8.com/fluency/48/great-britain-circular.png',
        altText: 'United Kingdom',
      },
    })
    const cardUK = await prisma.cardInfo.create({
      data: {
        title: 'Cumulative cases in Untied Kingdom',
        favourite: false,
        cardAvatarId: cardAvatarUK.id,
      },
    })
    const pieChartUK = await prisma.chart.create({
      data: {
        type: 'pie',
        apiFiltersId: filtersParamUK.id,
        cardInfoId: cardUK.id,
        yAxisLabel: 'Cases',
        xAxisLabel: 'Nation',
      },
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
