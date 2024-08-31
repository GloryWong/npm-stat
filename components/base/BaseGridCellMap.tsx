/* eslint-disable react/no-duplicate-key */

import BaseGridCellValue from './BaseGridCellValue'

export default function BaseGridCellMap({ value }: { value: Record<string, any> | Map<string, any> }) {
  return (
    Object.entries(value).map(([k, v], index) => (
      <div className="flex rounded-xl overflow-hidden text-sm" key={index}>
        <span className="bg-gray-800 py-1 pl-3 pr-2">
          <BaseGridCellValue value={k} className="text-sm" />
        </span>
        <span className="py-1 pl-2 pr-3 bg-gray-900 text-gray-500">
          <BaseGridCellValue value={v} className="text-sm text-gray-500" />
        </span>
      </div>
    ))
  )
}
