import ChartCard from '@/components/ChartCard'
import UserMenu from '@/components/UserMenu'
import { trpc } from '@/utils/trpc'
import useClientBreakpoint from '@/utils/useClientBreakpoint'
import { Loading3QuartersOutlined, WarningOutlined } from '@ant-design/icons'
import { Col, Row, Typography, theme } from 'antd'

const { useToken } = theme
export default function Dashboard() {
  const { token } = useToken()
  const screens = useClientBreakpoint()
  const { data: chartsData, status: chartsStatus } = trpc.allCharts.useQuery()

  return (
    <Row gutter={[30, 30]}>
      <Col
        span={24}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
        }}
      >
        <Typography.Title
          level={1}
          style={{
            fontSize: '1.25rem',
            fontWeight: 'normal',
            marginBottom: 0,
          }}
        >
          Dashboard
        </Typography.Title>
        <UserMenu
          style={{
            flexDirection: screens.sm ? 'row' : 'column',
            alignItems: screens.sm ? 'center' : 'flex-end',
          }}
        />
      </Col>
      {chartsStatus === 'loading' ? (
        <Col span={24} style={{ textAlign: 'center' }}>
          <Loading3QuartersOutlined
            style={{ fontSize: '2rem', color: token.colorPrimary }}
            spin
          />
        </Col>
      ) : chartsStatus === 'error' ? (
        <Col span={24} style={{ textAlign: 'center' }}>
          <WarningOutlined
            style={{ fontSize: '2rem', color: token.colorError }}
          />
        </Col>
      ) : (
        chartsData
          .sort((a, b) => a.id - b.id)
          .map((chart) => (
            <Col key={chart.id} xs={24} lg={12}>
              <ChartCard {...chart} />
            </Col>
          ))
      )}
    </Row>
  )
}
