/* eslint-disable react/no-duplicate-key */
import { createContext, useMemo } from 'react'
import type { BaseGridCellProps } from './BaseGridCell'
import BaseGridCell from './BaseGridCell'

const colsMap = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
}

interface Props {
  items: BaseGridCellProps[]
  /**
   * @description grid columns
   * @default 2
   */
  cols?: keyof typeof colsMap
}

export const BaseGridContext = createContext({ cols: 1 })

export default function BaseGrid({ items, cols = 2 }: Props) {
  const contextValue = useMemo(() => ({ cols }), [cols])
  return (
    <BaseGridContext.Provider value={contextValue}>
      <div className={`grid ${colsMap[cols]} gap-8`}>
        {
          items.map(({ label, value, block }, index) => (
            <BaseGridCell key={index} label={label} value={value} block={block} />
          ))
        }
      </div>
    </BaseGridContext.Provider>
  )
}
