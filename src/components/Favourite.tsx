import { HeartFilled, HeartOutlined, LoadingOutlined } from '@ant-design/icons'
import { CSSProperties, MouseEventHandler } from 'react'

interface FavouriteProps {
  filled: boolean
  loading: boolean
  style?: CSSProperties
  onClick: MouseEventHandler
}

export default function Favourite({
  onClick,
  filled,
  loading,
  style,
}: FavouriteProps) {
  if (loading) return <LoadingOutlined style={style} spin />

  return (
    <div onClick={onClick} style={{ cursor: 'pointer' }}>
      {filled ? <HeartOutlined style={style} /> : <HeartFilled style={style} />}
    </div>
  )
}
