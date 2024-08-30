/* eslint-disable react/no-duplicate-key */
import { createContext, useMemo } from 'react'
import type { BaseGridCellProps } from './BaseGridCell'
import BaseGridCell from './BaseGridCell'

interface Props {
  items: BaseGridCellProps[]
  /**
   * @description grid columns
   * @default 2
   */
  cols?: number
}

export const BaseGridContext = createContext({ cols: 1 })

export default function BaseGrid({ items, cols = 2 }: Props) {
  const contextValue = useMemo(() => ({ cols }), [cols])
  return (
    <BaseGridContext.Provider value={contextValue}>
      <div className={`grid grid-cols-${cols} gap-8`}>
        {
          items.map(({ label, value, block }, index) => (
            <BaseGridCell key={index} label={label} value={value} block={block} />
          ))
        }
      </div>
    </BaseGridContext.Provider>
  )
}
