import { Card } from 'antd'
import { PropsWithChildren } from 'react'

interface ActionsPanelProps extends PropsWithChildren {}
export default function ActionsPanel({ children }: ActionsPanelProps) {
  return (
    <Card.Grid
      hoverable={false}
      style={{
        width: '100%',
        padding: '8px 20px',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      {children}
    </Card.Grid>
  )
}
