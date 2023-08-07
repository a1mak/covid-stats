import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import { trpc } from '@/utils/trpc'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: lineChartsData, status: lineChartsStatus } =
    trpc.allLineCharts.useQuery()
  const { data: pieChartsData, status: pieChartsStatus } =
    trpc.allPieCharts.useQuery()
  return (
    <>
      <Head>
        <title>Covid Dashboard</title>
        <meta name="description" content="Covid statistics dashboard for UK" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
        <div>
          Covid Dashboard
          <br />
          {lineChartsStatus === 'success' && JSON.stringify(lineChartsData)}
          <br />
          {pieChartsStatus === 'success' && JSON.stringify(pieChartsData)}
        </div>
      </main>
    </>
  )
}
