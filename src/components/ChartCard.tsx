import ActionsPanel from '@/components/ActionsPanel'
import CommentButton from '@/components/CommentButton'
import Favourite from '@/components/Favourite'
import type { AppRouter } from '@/server/router'
import { trpc } from '@/utils/trpc'
import { inferRouterOutputs } from '@trpc/server'
import { Avatar, Card } from 'antd'
import dynamic from 'next/dynamic'

const LineChart = dynamic(() => import('@/components/LineChart'), {
  ssr: false,
})

const PieChart = dynamic(() => import('@/components/PieChart'), {
  ssr: false,
})

type ChartCardProps = inferRouterOutputs<AppRouter>['allCharts'][number]

export default function ChartCard({
  id,
  cardInfo: { title, favourite, avatar },
  apiFilters: { areaType, areaName },
  type,
  covidData,
}: ChartCardProps) {
  const context = trpc.useContext()
  const { mutate: mutateFav, isLoading: isFavLoading } =
    trpc.addToFavourites.useMutation({
      async onSuccess() {
        await context.allCharts.invalidate()
      },
    })

  return (
    <Card
      title={title}
      extra={
        <Favourite
          onClick={() => mutateFav(id)}
          filled={favourite}
          loading={isFavLoading}
          style={{ color: '#f33' }}
        />
      }
      headStyle={{ fontWeight: 'bold' }}
    >
      <Card.Grid hoverable={false} style={{ width: '100%', aspectRatio: 1 }}>
        {type === 'singleLine' ? (
          <LineChart
            data={
              covidData as {
                date: string
                newCasesByPublishDate: number
              }[]
            }
          />
        ) : (
          <PieChart
            data={
              covidData as {
                areaName: string
                cumCasesByPublishDate: number
              }[]
            }
          />
        )}
      </Card.Grid>
      <ActionsPanel>
        <Avatar src={avatar.url} alt={avatar.altText} />
        <CommentButton href="/">3</CommentButton>
      </ActionsPanel>
    </Card>
  )
}
