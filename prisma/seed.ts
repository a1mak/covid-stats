import { PrismaClient, Prisma } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  try {
    console.log('Seeding started...')
    const dateAxis = await prisma.axis.create({
      data: {
        title: 'Date',
        structureParam: 'date',
      },
    })
    const newCasesAxis = await prisma.axis.create({
      data: {
        title: 'Cases',
        structureParam: 'newCasesByPublishDate',
      },
    })
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
    const chartEngland = await prisma.signleLineChart.create({
      data: {
        apiFiltersId: filtersParamEngland.id,
        cardInfoId: cardEngland.id,
        xAxisId: dateAxis.id,
        yAxisId: newCasesAxis.id,
        page: 1,
      },
    })
    const cumCasesAxis = await prisma.axis.create({
      data: {
        title: 'Cases',
        structureParam: 'cumCasesByPublishDate',
      },
    })

    const filtersParamUK = await prisma.apiFilters.create({
      data: {
        areaType: 'nation',
        areaName: 'United Kingdom',
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
    const pieChartUK = await prisma.pieChart.create({
      data: {
        apiFiltersId: filtersParamUK.id,
        cardInfoId: cardUK.id,
        yAxisId: cumCasesAxis.id,
        latestBy: 'cumCasesByPublishDate',
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
