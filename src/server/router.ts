import { prisma } from '@/server/db'
import { publicProcedure, router } from '@/server/trpc'
import { z } from 'zod'

export const appRouter = router({
  allLineCharts: publicProcedure.query(async () => {
    const chart = await prisma.signleLineChart.findMany({
      select: {
        id: true,
        cardInfo: {
          select: {
            title: true,
            favourite: true,
            Avatar: true,
          },
        },
        apiFilters: {
          select: {
            areaType: true,
            areaName: true,
          },
        },
        xAxis: {
          select: {
            title: true,
            structureParam: true,
          },
        },
        yAxis: {
          select: {
            title: true,
            structureParam: true,
          },
        },
        page: true,
      },
    })

    return chart
  }),
  allPieCharts: publicProcedure.query(async () => {
    const chart = await prisma.pieChart.findMany({
      select: {
        id: true,
        cardInfo: {
          select: {
            title: true,
            favourite: true,
            Avatar: true,
          },
        },
        apiFilters: {
          select: {
            areaType: true,
            areaName: true,
          },
        },
        yAxis: {
          select: {
            title: true,
            structureParam: true,
          },
        },
        latestBy: true,
      },
    })

    return chart
  }),
})

export type AppRouter = typeof appRouter
