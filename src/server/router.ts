import fetchCovidApi from '@/server/covidApi'
import { prisma } from '@/server/db'
import { publicProcedure, router } from '@/server/trpc'
import { TRPCError } from '@trpc/server'
import { z } from 'zod'

export const appRouter = router({
  allCharts: publicProcedure.query(async () => {
    const charts = await prisma.chart.findMany({
      select: {
        id: true,
        type: true,
        cardInfo: {
          select: {
            title: true,
            favourite: true,
            avatar: true,
          },
        },
        apiFilters: {
          select: {
            areaType: true,
            areaName: true,
          },
        },
        xAxisLabel: true,
        yAxisLabel: true,
      },
    })

    const chartPromises = charts.map((chart) => {
      if (chart.type === 'singleLine') {
        return fetchCovidApi({
          filters: chart.apiFilters,
          structure: ['date', 'newCasesByPublishDate'],
        }).then((resObj) => {
          return {
            ...chart,
            covidData: resObj?.data || [],
          }
        })
      } else {
        return fetchCovidApi({
          filters: chart.apiFilters,
          structure: ['areaName', 'cumCasesByPublishDate'],
          latestBy: 'cumCasesByPublishDate',
        }).then((resObj) => {
          return {
            ...chart,
            covidData: resObj?.data || [],
          }
        })
      }
    })

    try {
      const chartResponses = await Promise.all(chartPromises)

      return chartResponses
    } catch (err) {
      console.error(err)
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: 'Something went wrong',
        cause: err,
      })
    }
  }),
  addToFavourites: publicProcedure
    .input(z.number())
    .mutation(async ({ input: id }) => {
      return await prisma.$transaction(async (tx) => {
        const chart = await tx.chart.findUnique({
          select: {
            cardInfo: {
              select: { favourite: true },
            },
          },
          where: { id },
        })

        if (!chart) {
          throw new Error(`Chart with id ${id} doesn't exist`)
        }

        const updatedChart = await tx.chart.update({
          where: { id },
          data: {
            cardInfo: {
              update: { favourite: !chart.cardInfo.favourite },
            },
          },
        })

        return updatedChart
      })
    }),
})

export type AppRouter = typeof appRouter
