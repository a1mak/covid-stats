import ChartCard from '@/components/ChartCard'
import { trpc } from '@/utils/trpc'
import { Loading3QuartersOutlined, WarningOutlined } from '@ant-design/icons'
import { Col, Row, theme } from 'antd'

const { useToken } = theme
export default function Dashboard() {
  const { token } = useToken()
  const { data: chartsData, status: chartsStatus } = trpc.allCharts.useQuery()

  return (
    <Row gutter={[30, 30]}>
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
