import { Grid } from 'antd'
import { useEffect, useState } from 'react'

const { useBreakpoint } = Grid

export default function useClientBreakpoint() {
  const screens = useBreakpoint()
  const [breakpoint, setBreakpoint] = useState<typeof screens>()
  const hasWindow = typeof window !== 'undefined'
  useEffect(() => {
    if (hasWindow) setBreakpoint(screens)
  }, [hasWindow, screens])

  return screens
}
