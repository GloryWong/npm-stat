import { Chip, Link, Listbox, ListboxItem, ScrollShadow, Spinner } from '@nextui-org/react'
import useSWR from 'swr'
import { Icon } from '@iconify/react'
import { useState } from 'react'
import type { Key } from '@react-types/shared'
import { format } from 'timeago.js'
import { BaseClientLink } from './base/BaseClientLink'
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
                      variant="flat"
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
                            showDivider
                            description={
                              (
                                <div className="flex flex-col gap-1">
                                  <p>
                                    { item.description }
                                  </p>
                                  <div className="flex items-center gap-1">
                                    <BaseClientLink
                                      searchParams={{
                                        text: item.maintainer,
                                        searchType: 'maintainer',
                                      }}
                                      underline="hover"
                                    >
                                      { item.maintainer }
                                    </BaseClientLink>
                                    <span className="">
                                      published
                                      {' '}
                                      {format(item.date)}
                                    </span>
                                  </div>
                                </div>
                              )
                            }
                            endContent={(
                              <Link className="text-gray-500" isExternal showAnchorIcon anchorIcon={<Icon icon="mdi:npm-variant-outline" />} href={item.npmLink} />
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
