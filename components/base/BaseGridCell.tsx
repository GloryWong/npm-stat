import isPlainObject from 'is-plain-obj'
import type { ReactNode } from 'react'
import { isValidElement, useContext } from 'react'
import BaseGridCellArray from './BaseGridCellArray'
import BaseGridCellMap from './BaseGridCellMap'
import { BaseGridContext } from './BaseGrid'
import BaseGridCellValue from './BaseGridCellValue'

export interface BaseGridCellProps {
  label: string
  value: ReactNode | Record<string, any>
  // cols: number
  block?: boolean
}

const colSpanMap: Record<number, string> = {
  1: 'col-span-1',
  2: 'col-span-2',
  3: 'col-span-3',
  4: 'col-span-4',
}

const Empty = () => <span className="text-gray-500 text-sm">----</span>

export default function BaseGridCell({ label, value, block }: BaseGridCellProps) {
  const { cols } = useContext(BaseGridContext)
  return (
    <div className={`${block ? `${colSpanMap[cols]} ` : ''}flex flex-col gap-2`}>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="flex gap-1 flex-wrap text-balance">
        {(() => {
          if (value === undefined)
            return <Empty />

          if (isValidElement(value))
            return value

          if (Array.isArray(value)) {
            if (value.length)
              return <BaseGridCellArray value={value} />
            else
              return <Empty />
          }

          if (isPlainObject(value)) {
            if (Object.keys(value).length)
              return <BaseGridCellMap value={value} />
            else
              return <Empty />
          }

          return <BaseGridCellValue value={value as ReactNode} />
        })()}
      </div>
    </div>
  )
}
