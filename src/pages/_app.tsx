import 'antd/dist/reset.css'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { trpc } from '@/utils/trpc'
import { ConfigProvider } from 'antd'
import theme from '@/theme/themeConfig'

function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigProvider theme={theme}>
      <Component {...pageProps} />
    </ConfigProvider>
  )
}

export default trpc.withTRPC(App)
