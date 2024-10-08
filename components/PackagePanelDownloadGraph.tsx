'use client'
import { Spinner } from '@nextui-org/react'
import type { ChartData } from 'chart.js'
import { CategoryScale, Chart, Filler, Legend, LineController, LineElement, LinearScale, PointElement, Title, Tooltip } from 'chart.js'
import { useMemo } from 'react'
import { Line } from 'react-chartjs-2'
import useSWR from 'swr'
import type { Period } from '@/types/period'

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, LinearScale, Filler, Title, Tooltip, Legend)

export interface PackagePanelDownloadData {
  downloads: { day: string, downloads: number }[]
  start: string
  end: string
  package: string
}

export interface PackagePanelDownloadGraphProps {
  packageName: string
  period?: Period
}

const chartOptions = {
  maintainAspectRatio: false,
  responsive: true,
  interaction: {
    intersect: false,
  },
  scales: {
    y: {
      display: true,
      title: {
        display: true,
        text: 'Downloads',
      },
      beginAtZero: true,
    },
  },
}

export default function PackagePanelDownloadGraph({ packageName, period }: PackagePanelDownloadGraphProps) {
  const { data, error, isLoading } = useSWR<PackagePanelDownloadData>(`/api/downloads/${encodeURIComponent(packageName)}${period ? `?period=${period}` : ''}`)

  const chartData = useMemo<ChartData<'line'> | undefined>(() => {
    if (!data)
      return

    const labels = data.downloads.map(v => v.day)
    const downloads = data.downloads.map(v => v.downloads)

    return ({
      labels,
      datasets: [
        {
          label: packageName,
          data: downloads,
          fill: true,
          tension: 0.5,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
          ...(period === 'last-year' ? { pointRadius: 0 } : {}),
        },
      ],
    })
  }, [data, period, packageName])

  return (
    <div className="flex justify-center h-full">
      {
        isLoading
          ? <Spinner />
          : error
            ? (
                <div className="text-red-500">
                  Failed to load data
                  {JSON.stringify(error.message)}
                </div>
              )
            : chartData && <Line data={chartData} options={chartOptions} />
      }
    </div>
  )
}
