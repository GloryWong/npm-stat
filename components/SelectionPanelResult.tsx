import { Chip, Link, Listbox, ListboxItem, ScrollShadow, Spinner, Tooltip } from '@nextui-org/react'
import useSWR from 'swr'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import type { Key } from '@react-types/shared'
import type { PackageBasic } from '@/types/package'
import type { SearchType } from '@/types/search-type'

export default function SelectionPanelResult({ text, onSelect, packageName, searchType }: { text: string, packageName?: string, onSelect: (packageName: string) => void, searchType?: SearchType }) {
  const { data, error, isLoading } = useSWR<PackageBasic[]>(`/api/packages/${encodeURIComponent(text)}?type=${searchType}`)

  const [selectedKeys, setSelectedKeys] = useState(new Set<Key>(packageName ? [packageName] : []))

  return (
    <div className="w-full h-full flex justify-center">
      {
        error
          ? (
              <div className="text-red-500">
                Failed to load data
                {JSON.stringify(error.message)}
              </div>
            )
          : isLoading
            ? <Spinner />
            : (
                <div className="w-full flex-grow min-h-0">
                  <ScrollShadow size={80} className="h-full">
                    <Listbox
                      aria-label="Package list"
                      items={data}
                      variant="bordered"
                      disallowEmptySelection
                      selectionMode="single"
                      selectedKeys={selectedKeys}
                      onSelectionChange={(keys) => {
                        onSelect(Array.from(keys)[0].toString())
                        setSelectedKeys(new Set(keys))
                      }}
                    >
                      {
                        item => (
                          <ListboxItem
                            key={item.name}
                            textValue={item.name}
                            title={(
                              <div className="flex items-center gap-2">
                                <span className="font-bold text-lg text-wrap">{item.name}</span>
                                <Chip variant="flat" size="sm">{item.version}</Chip>
                              </div>
                            )}
                            description={item.description}
                            endContent={(
                              <Tooltip content={`Go to the package ${item.name} in npm`} delay={200}>
                                <Link className="text-gray-500" isExternal showAnchorIcon anchorIcon={<Icon icon="mdi:launch" />} href={`https://www.npmjs.com/package/${item.name}`} />
                              </Tooltip>
                            )}
                          >
                          </ListboxItem>
                        )
                      }
                    </Listbox>
                  </ScrollShadow>
                </div>
              )
      }
    </div>
  )
}
