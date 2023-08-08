import { AppRouter } from '@/server/router'
import { Chart as G2Chart } from '@antv/g2'
import { inferRouterOutputs } from '@trpc/server'
import { useEffect, useRef } from 'react'

type ChartData = inferRouterOutputs<AppRouter>['allCharts'][number]

interface SingleLineChartProps {
  data: 'singleLine' extends ChartData['type']
    ? Extract<ChartData['covidData'], { date: string }[]>
    : never
}

export default function LineChart({ data }: SingleLineChartProps) {
  const container = useRef<HTMLDivElement | null>(null)
  const chart = useRef<G2Chart | null>(null)

  const dataPerWeek = data.reduce((acc, cases, ind) => {
    if (!(ind % 7)) {
      acc.push(cases)
    } else {
      acc[acc.length - 1].newCasesByPublishDate += cases.newCasesByPublishDate
    }
    return acc
  }, [] as SingleLineChartProps['data'])

  useEffect(() => {
    if (!chart.current && container.current) {
      chart.current = renderLineChart(
        container.current,
        dataPerWeek,
        (d) => new Date(d.date),
        'newCasesByPublishDate'
      )

      window.addEventListener('resize', () => {
        if (chart.current) chart.current.render()
      })
    }
  })

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>
}

function renderLineChart<T extends Record<string, any>>(
  container: HTMLDivElement,
  chartData: T[],
  x: keyof T | ((x: T) => any),
  y: keyof T | ((x: T) => any)
) {
  const chart = new G2Chart({
    container,
    theme: 'classic',
    autoFit: true,
    data: chartData,
    marginLeft: 40,
    marginRight: 10,
  })

  chart
    .line()
    .encode({ x, y })
    .animate('enter', { type: 'growInY', duration: 500 })

  chart.render()

  return chart
}
