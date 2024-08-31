/* eslint-disable react/no-duplicate-key */
import { Icon } from '@iconify/react'
import { Button, Input, Select, SelectItem } from '@nextui-org/react'
import { useCallback, useEffect, useState } from 'react'
import type { Key } from '@react-types/shared'
import { SEARCH_TYPES } from '@/constants/search-types'
import type { SearchType } from '@/types/search-type'

interface Props {
  defaultInput?: string
  onConfirmInput: (input: string) => void
  searchType?: SearchType
  onSearchTypeChange?: (searchType: SearchType) => void
}

export default function SelectionPanelSearch({ defaultInput = '', onConfirmInput, searchType = 'text', onSearchTypeChange }: Props) {
  const [input, setInput] = useState(defaultInput)
  useEffect(() => {
    setInput(defaultInput)
  }, [defaultInput])

  const confirmInput = useCallback(() => {
    onConfirmInput(input)
  }, [onConfirmInput, input])

  const [selectedKeys, setSelectedKeys] = useState(new Set<Key>([]))
  useEffect(() => {
    setSelectedKeys(new Set([searchType]))
  }, [searchType])

  return (
    <div className="flex gap-2">
      <Select
        aria-label="Select search type"
        className="w-[150px]"
        selectedKeys={selectedKeys}
        onSelectionChange={(keys) => {
          onSearchTypeChange?.(Array.from(keys)[0] as SearchType)
          setSelectedKeys(new Set(keys))
        }}
        selectionMode="single"
        disallowEmptySelection
      >
        {SEARCH_TYPES.map(type => (
          <SelectItem key={type}>
            {type.replace(/^(.)(.*)$/, (_, p1: string, p2: string) => p1.toUpperCase() + p2)}
          </SelectItem>
        ))}
      </Select>
      <Input
        type="text"
        placeholder="type to search"
        isClearable
        value={input}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            confirmInput()
          }
        }}
        onValueChange={setInput}
      />
      <Button type="button" isIconOnly onClick={confirmInput}>
        <Icon icon="material-symbols:search" />
      </Button>
    </div>
  )
}
