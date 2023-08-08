import { AppRouter } from '@/server/router'
import { Chart as G2Chart } from '@antv/g2'
import { inferRouterOutputs } from '@trpc/server'
import { useEffect, useRef } from 'react'

type ChartData = inferRouterOutputs<AppRouter>['allCharts'][number]

interface PieChartProps {
  data: 'pie' extends ChartData['type']
    ? Extract<ChartData['covidData'], { areaName: string }[]>
    : never
}

export default function PieChart({ data }: PieChartProps) {
  const container = useRef<HTMLDivElement | null>(null)
  const chart = useRef<G2Chart | null>(null)

  useEffect(() => {
    if (!chart.current && container.current) {
      chart.current = renderPieChart(
        container.current,
        data,
        'areaName',
        'cumCasesByPublishDate'
      )

      window.addEventListener('resize', () => {
        if (chart.current) chart.current.render()
      })
    }
  })

  return <div ref={container} style={{ width: '100%', height: '100%' }}></div>
}

function renderPieChart<T extends Record<string, any>>(
  container: HTMLDivElement,
  chartData: T[],
  color: keyof T | ((x: T) => any),
  y: keyof T | ((x: T) => any)
) {
  const chart = new G2Chart({
    container,
    theme: 'classic',
    autoFit: true,
    data: chartData,
    marginLeft: 10,
    marginRight: 10,
  })

  chart.coordinate({ type: 'theta', innerRadius: 0.25, outerRadius: 0.8 })

  chart
    .interval()
    .transform({ type: 'stackY' })
    .encode({ color, y })
    .scale('color', {
      range: ['#e8c1a0', '#f47560', '#f1e15b', '#e8a838', '#61cdbb'],
    })
    .label({
      text: 'cumCasesByPublishDate',
      style: {
        fontWeight: 'bold',
        offset: 14,
      },
    })
    .label({
      text: 'areaName',
      position: 'spider',
      connectorDistance: 0,
      style: {
        fontWeight: 'bold',
        textBaseline: 'bottom',
        dy: -4,
      },
    })
    .style('radius', 4)
    .style('stroke', '#fff')
    .style('lineWidth', 2)
    .animate('enter', { type: 'waveIn' })

  chart.render()

  return chart
}
