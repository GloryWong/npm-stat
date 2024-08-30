/* eslint-disable react/no-duplicate-key */

import BaseGridLink from './BaseGridLink'
import { isHttp } from '@/utils/isHttp'

export default function BaseGridCellMap({ value }: { value: Record<string, any> | Map<string, any> }) {
  return (
    Object.entries(value).map(([k, v], index) => (
      <div className="flex rounded-xl overflow-hidden text-sm" key={index}>
        <span className="bg-gray-800 py-1 px-3">{k}</span>
        <span className="py-1 px-3 bg-gray-900 text-gray-500">
          {
            typeof v === 'string' && isHttp(v)
              ? <BaseGridLink isExternal url={v} className="text-sm text-gray-500" urlTitleType="no-protocol" />
              : String(v)
          }
        </span>
      </div>
    ))
  )
}
