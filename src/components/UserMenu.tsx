import {
  DownloadOutlined,
  FilterOutlined,
  MenuOutlined,
} from '@ant-design/icons'
import { Badge, Button, theme } from 'antd'
import { CSSProperties } from 'react'

const { useToken } = theme

export default function UserMenu({
  style,
  ...propsRest
}: React.HTMLAttributes<HTMLUListElement>) {
  const { token } = useToken()
  const menuStyle: CSSProperties = Object.assign(
    {
      display: 'flex',
      gap: '0.5rem',
      justifyContent: 'flex-end',
      listStyle: 'none',
      margin: 0,
    },
    style
  )

  const buttonStyle: CSSProperties = {
    borderWidth: 0,
    display: 'flex',
    alignItems: 'center',
  }

  return (
    <ul style={menuStyle} {...propsRest}>
      <li>
        <Button style={buttonStyle}>
          Export to PDF
          <DownloadOutlined />
        </Button>
      </li>
      <li>
        <Button style={buttonStyle}>
          Notes (3)
          <MenuOutlined />
        </Button>
      </li>
      <li>
        <Button style={buttonStyle}>
          Filter{' '}
          <Badge
            count="9+"
            color={token.colorPrimary}
            style={{ marginLeft: '0.25rem' }}
          />
          <FilterOutlined />
        </Button>
      </li>
    </ul>
  )
}
