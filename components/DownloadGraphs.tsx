import { Tab, Tabs } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import DownloadGraph, { type DownloadGraphProps } from './DownloadGraph'
import type { Period } from '@/constants/periods'
import { periods } from '@/constants/periods'

interface DownloadGraphsProps extends DownloadGraphProps {
  onPeriodChange?: (period: Period) => void
}

const items = periods.map(v => ({ period: v }))

export default function DownloadGraphs({ packageName, period = 'last-week', onPeriodChange }: DownloadGraphsProps) {
  const [selected, setSelected] = useState(period)

  useEffect(() => {
    if (onPeriodChange)
      onPeriodChange(selected)
  }, [selected, onPeriodChange])

  return (
    <div className="w-full h-[300px]">
      <Tabs aria-label="Period options" key={packageName} variant="underlined" fullWidth selectedKey={selected} onSelectionChange={key => setSelected(key as Period)} items={items}>
        {({ period }) => (
          <Tab key={period} title={period}>
            <DownloadGraph packageName={packageName} period={period} />
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
