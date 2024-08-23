import { Tab, Tabs } from "@nextui-org/react"
import DownloadGraph, { DownloadGraphProps, type Period } from "./DownloadGraph"
import { useEffect, useState } from "react"

interface DownloadGraphsProps extends DownloadGraphProps {
  onPeriodChange?: (period: Period) => void
}

export default function DownloadGraphs({ packageName, period = 'last-week', onPeriodChange }: DownloadGraphsProps) {
  const periods: Period[] = ['last-week', 'last-month', 'last-year']
  const items = periods.map(v => ({ period: v }))
  const [selected, setSelected] = useState(period)

  useEffect(() => {
    if (onPeriodChange)
      onPeriodChange(selected)
  }, [selected])

  return (
    <div className="w-full h-[300px]">
      <Tabs aria-label="Period options" variant="underlined" selectedKey={selected} onSelectionChange={(key) => setSelected(key as Period)} items={items}>
        {({ period }) => (
          <Tab key={period} title={period}>
            <DownloadGraph packageName={packageName} period={period} />
          </Tab>
        )}
      </Tabs>
    </div>
  )
}
