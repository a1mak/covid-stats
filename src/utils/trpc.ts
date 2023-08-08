import { createTRPCNext } from '@trpc/next'
import { httpBatchLink } from '@trpc/client'
import type { AppRouter } from '@/server/router'

function getBaseUrl() {
  if (typeof window !== 'undefined')
    // browser should use relative path
    return ''
  if (process.env.VERCEL_URL)
    // reference for vercel.com
    return `https://${process.env.VERCEL_URL}`
  // assume localhost
  return `http://localhost:${process.env.PORT ?? 3000}`
}

export const trpc = createTRPCNext<AppRouter>({
  config(_opts) {
    return {
      links: [
        httpBatchLink({
          url: `${getBaseUrl()}/api/trpc`,
        }),
      ],
    }
  },
})
