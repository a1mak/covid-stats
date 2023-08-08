import CommentIcon from '@/components/CommentIcon'
import { theme } from 'antd'
import Link from 'next/link'
import { ComponentPropsWithRef } from 'react'

interface CommentButtonProps extends ComponentPropsWithRef<typeof Link> {}

const { useToken } = theme

export default function CommentButton({
  children,
  ...props
}: CommentButtonProps) {
  const { token } = useToken()
  return (
    <Link
      style={{
        display: 'flex',
        alignItems: 'center',
        color: token.colorBorder,
      }}
      {...props}
    >
      <span style={{ fontSize: '1.125rem' }}>{children}</span>
      <CommentIcon
        style={{ fontSize: '1.5rem', position: 'relative', bottom: -2 }}
      />
    </Link>
  )
}
