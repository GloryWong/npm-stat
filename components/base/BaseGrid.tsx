/* eslint-disable react/no-duplicate-key */
import type { BaseGridCellProps } from './BaseGridCell'
import GridCell from './BaseGridCell'

interface Props {
  items: BaseGridCellProps[]
  cols?: number
}

export default function BaseGrid({ items, cols = 2 }: Props) {
  return (
    <div className={`grid grid-cols-${cols} gap-8`}>
      {
        items.map(({ label, value, block }, index) => (
          <GridCell key={index} label={label} value={value} block={block} />
        ))
      }
    </div>
  )
}
