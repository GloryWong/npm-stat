import { Tab, Tabs } from "@nextui-org/react"
import DownloadGraph, { DownloadGraphProps, type Period } from "./DownloadGraph"
import { useState } from "react"

export default function DownloadGraphs({ packageName, period = 'last-week' }: DownloadGraphProps) {
  const periods: Period[] = ['last-week', 'last-month', 'last-year']
  const items = periods.map(v => ({ period: v }))
  const [selected, setSelected] = useState(period)

  return (
    <div>
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
