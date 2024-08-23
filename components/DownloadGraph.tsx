"use client";
import { fetcher } from "@/utils/fetcher";
import { Spinner } from "@nextui-org/react";
import { CategoryScale, Chart, Legend, LinearScale, LineController, LineElement, PointElement, Title, Tooltip } from "chart.js";
import { useEffect, useRef } from "react";
import useSWR from "swr";

Chart.register(CategoryScale, LinearScale, LineController, LineElement, PointElement, LinearScale, Title, Tooltip, Legend);

interface DownloadData {
  downloads: { day: string, downloads: number }[],
  start: string,
  end: string,
  package: string
}

export type Period = 'last-day' | 'last-week' | 'last-month' | 'last-year'

export interface DownloadGraphProps {
  packageName: string
  period?: Period
}

let chart: Chart;

export default function DownloadGraph({ packageName, period }: DownloadGraphProps) {
  const {data, error, isLoading} = useSWR<DownloadData>(`/api/downloads/${encodeURIComponent(packageName)}${ period ? `?period=${period}` : '' }`, fetcher);

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!data) return;

    const labels = data.downloads.map(v => v.day);
    const downloads = data.downloads.map(v => v.downloads);

    const chartCanvas = canvasRef.current?.getContext('2d');
    if (chartCanvas) {
      if (chart)
        chart.destroy();
      
      chart = new Chart(chartCanvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Downloads',
              data: downloads,
              borderColor: 'rgb(53, 162, 235)',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [data]);

  if (error) return <div className='text-red-500'>Failed to load data {JSON.stringify(error.message)}</div>;
  if (isLoading) return <Spinner />;

  return (
    <div>
      <canvas ref={canvasRef} />
    </div>
  );
}
