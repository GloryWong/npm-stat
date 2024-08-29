/* eslint-disable react/no-duplicate-key */
import { Chip } from '@nextui-org/react'

export default function BaseGridCellArray({ value }: { value: any[] }) {
  return (
    value.map((v, index) => (
      <Chip className="bg-gray-800" key={index}>
        {String(v)}
      </Chip>
    ))
  )
}
