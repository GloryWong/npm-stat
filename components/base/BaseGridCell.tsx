import isPlainObject from 'is-plain-obj'
import BaseGridCellArray from './BaseGridCellArray'
import BaseGridCellMap from './BaseGridCellMap'
import BaseGridLink from './BaseGridLink'
import { isHttp } from '@/utils/isHttp'

export interface BaseGridCellProps {
  label: string
  value: any
  block?: boolean
}

export default function BaseGridCell({ label, value, block }: BaseGridCellProps) {
  return (
    <div className={`${block ? 'col-span-2 ' : ''}flex flex-col gap-2`}>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="flex gap-1 flex-wrap">
        {
          (value && Object.keys(value).length > 0)
            ? (Array.isArray(value)
                ? <BaseGridCellArray value={value} />
                : isPlainObject(value)
                  ? <BaseGridCellMap value={value} />
                  : typeof value === 'string' && isHttp(value)
                    ? <BaseGridLink isExternal url={value} className="text-gray-200" titleType="path" />
                    : String(value)
              )
            : <span className="text-gray-500 text-sm">----</span>
        }
      </div>
    </div>
  )
}
