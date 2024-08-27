import { Tab, Tabs } from '@nextui-org/react'
import { useEffect, useState } from 'react'
import DownloadGraph, { type DownloadGraphProps, type Period } from './DownloadGraph'

interface DownloadGraphsProps extends DownloadGraphProps {
  onPeriodChange?: (period: Period) => void
}

export const periods: Period[] = ['last-week', 'last-month', 'last-year']
const items = periods.map(v => ({ period: v }))

export default function DownloadGraphs({ packageName, period = 'last-week', onPeriodChange }: DownloadGraphsProps) {
  const [selected, setSelected] = useState(period)

  useEffect(() => {
    if (onPeriodChange)
      onPeriodChange(selected)
  }, [selected, onPeriodChange])

  return (
    <div className="w-full h-[300px]">
      <Tabs aria-label="Period options" key={packageName} variant="underlined" selectedKey={selected} onSelectionChange={key => setSelected(key as Period)} items={items}>
        {({ period }) => (
          <Tab key={period} title={period}>
            <DownloadGraph packageName={packageName} period={period} />
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
