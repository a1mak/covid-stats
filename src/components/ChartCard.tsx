import ActionsPanel from '@/components/ActionsPanel'
import CommentButton from '@/components/CommentButton'
import Favourite from '@/components/Favourite'
import type { AppRouter } from '@/server/router'
import { trpc } from '@/utils/trpc'
import { inferRouterOutputs } from '@trpc/server'
import { Avatar, Card } from 'antd'

type ChartCardProps = inferRouterOutputs<AppRouter>['allCharts'][number]

export default function ChartCard({
  id,
  cardInfo: { title, favourite, avatar },
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
        Chart here
      </Card.Grid>
      <ActionsPanel>
        <Avatar src={avatar.url} alt={avatar.altText} />
        <CommentButton href="/">3</CommentButton>
      </ActionsPanel>
    </Card>
  )
}
