import { prisma } from '@/server/db'
import { publicProcedure, router } from '@/server/trpc'
import { z } from 'zod'

export const appRouter = router({
  allCards: publicProcedure.query(async () => {
    const chart = await prisma.dashboardCard.findMany()

    return chart
  }),
  cardById: publicProcedure.input(z.number()).query(async ({ input: id }) => {
    const chart = await prisma.dashboardCard.findUnique({ where: { id } })

    return chart
  }),
})

export type AppRouter = typeof appRouter
