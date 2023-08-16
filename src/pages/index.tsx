import Dashboard from '@/components/Dashboard'
import useClientBreakpoint from '@/utils/useClientBreakpoint'
import { Layout, Space, theme } from 'antd'
import { Inter } from 'next/font/google'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })
const { useToken } = theme

export default function Home() {
  const { token } = useToken()

  const screens = useClientBreakpoint()

  return (
    <>
      <Head>
        <title>Covid Dashboard</title>
        <meta name="description" content="Covid statistics dashboard for UK" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Layout className={`${inter.className}`} style={{ minHeight: '100vh' }}>
        <Space
          direction="vertical"
          size="large"
          style={{ marginBottom: '2rem' }}
        >
          <Layout.Header
            style={{
              backgroundColor: token.colorBgContainer,
              padding: screens.lg ? '0 5.375rem' : '0 1rem',
              display: 'flex',
              alignItems: 'center',
              boxShadow: token.boxShadowSecondary,
            }}
          >
            <span
              style={{
                fontSize: '1.125rem',
                marginBottom: 0,
                color: token.colorPrimary,
              }}
            >
              Covid statistics
            </span>
          </Layout.Header>
          <Layout.Content
            style={{
              maxWidth: '100rem',
              padding: screens.lg ? '0 8.5rem' : '0 1rem',
            }}
          >
            <Dashboard />
          </Layout.Content>
        </Space>
      </Layout>
    </>
  )
}
