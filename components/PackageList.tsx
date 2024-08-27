import { Chip, Link, Listbox, ListboxItem, ScrollShadow, Spinner, Tooltip } from '@nextui-org/react'
import type { Key } from 'react'
import useSWR from 'swr'
import { Icon } from '@iconify/react'
import { fetcher } from '@/utils/fetcher'

export interface Package {
  name: string
  version: string
  description: string
}

export default function PakcageList({ userName, onSelect }: { userName: string, onSelect: (name: Key) => void }) {
  const { data, error, isLoading } = useSWR<Package[]>(`/api/packages/${userName}`, fetcher)

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
                    <Listbox aria-label="Package list" items={data} variant="bordered" onAction={onSelect} selectionMode="single">
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
