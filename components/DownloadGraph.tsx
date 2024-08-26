"use client";
import { fetcher } from "@/utils/fetcher";
import { Spinner } from "@nextui-org/react";
import { CategoryScale, Chart, ChartData, Filler, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useMemo, useState } from "react";
import { Line } from "react-chartjs-2";
import useSWR from "swr";

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, LinearScale, Filler, Title, Tooltip, Legend);

export interface DownloadData {
  downloads: { day: string, downloads: number }[],
  start: string,
  end: string,
  package: string
}

export type Period = 'last-week' | 'last-month' | 'last-year'

export interface DownloadGraphProps {
  packageName: string
  period?: Period
}

export default function DownloadGraph({ packageName, period }: DownloadGraphProps) {
  const {data, error, isLoading} = useSWR<DownloadData>(`/api/downloads/${encodeURIComponent(packageName)}${ period ? `?period=${period}` : '' }`, fetcher);

  const chartOptions = useMemo(() => ({
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
          text: 'Downloads'
        },
        beginAtZero: true,
      },
    },
  }), [])

  const [chartData, setChartData] = useState<ChartData<'line'> | undefined>()

  useEffect(() => {
    if (!data) return;

    const labels = data.downloads.map(v => v.day);
    const downloads = data.downloads.map(v => v.downloads);

    setChartData({
      labels,
      datasets: [
        {
          label: packageName,
          data: downloads,
          fill: true,
          tension: 0.5,
          borderColor: 'rgb(53, 162, 235)',
          backgroundColor: 'rgba(53, 162, 235, 0.5)',
        },
      ],
    })
  }, [data, packageName]);

  return (
    <div className="flex justify-center h-[200px]">
      {
        isLoading ?
          <Spinner /> :
        error ?
          <div className='text-red-500'>Failed to load data {JSON.stringify(error.message)}</div> :
        chartData && <Line data={chartData} options={chartOptions}/> }
    </div>
  );
}
