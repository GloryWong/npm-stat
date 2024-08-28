'use client'

import React, { Suspense, lazy, useCallback, useEffect, useState } from 'react'
import { Button, Divider, Input, Spinner } from '@nextui-org/react'
import { useSearchParams } from 'react-router-dom'
import { Icon } from '@iconify/react'
import { SWRConfig } from 'swr'
import type { Period } from '@/constants/periods'
import { fetcher } from '@/utils/fetcher'

const DownloadGraphs = lazy(() => import('@/components/DownloadGraphs'))
const PackageList = lazy(() => import('@/components/PackageList'))

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [packageName, setPackageName] = useState<string | undefined>(searchParams.get('packageName') ?? undefined)
  const [period, setPeriod] = useState<Period>(searchParams.get('period') as Period | null ?? 'last-week')
  const [userName, setUserName] = useState<string | undefined>(searchParams.get('userName') ?? undefined)

  function useUpdateSearchParam(key: string, value?: string) {
    useEffect(() => {
      if (searchParams.get(key) === value)
        return

      setSearchParams((val) => {
        if (!value)
          val.delete(key)
        else
          val.set(key, value)

        return val
      })
    }, [key, value])
  }

  useUpdateSearchParam('packageName', packageName)
  useUpdateSearchParam('period', period)
  useUpdateSearchParam('userName', userName)

  const [input, setInput] = useState<string>(searchParams.get('userName') ?? '')
  const confirmInput = useCallback(() => {
    setUserName(input)
  }, [input])

  return (
    <SWRConfig
      value={{
        revalidateOnFocus: false,
        keepPreviousData: true,
        fetcher,
      }}
    >
      <div className="w-full h-full flex gap-2">
        <div className="flex-1 min-w-0 p-4 flex flex-col gap-4">
          <div className="flex gap-2">
            <Input
              type="text"
              placeholder="Author name"
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
          <div className="flex-grow min-h-0 flex justify-center">
            {
              userName
                ? (
                    <Suspense fallback={<Spinner />}>
                      <PackageList userName={userName} onSelect={name => setPackageName(name as string)} />
                    </Suspense>
                  )
                : (
                    <div className="flex items-center gap-2 flex-wrap">
                      <Icon icon="fa6-regular:hand-point-up" />
                      Type an author name to search for packages
                    </div>
                  )
            }
          </div>
        </div>
        <Divider orientation="vertical" />
        <div className="flex-1 min-w-0 p-4 flex justify-center">
          { packageName
            ? (
                <Suspense fallback={<Spinner />}>
                  <DownloadGraphs packageName={packageName} period={period} onPeriodChange={setPeriod} />
                </Suspense>
              )
            : (
                <div className="flex items-center gap-2">
                  <Icon icon="fa6-regular:hand-point-left" />
                  Select a package in the package lists
                </div>
              )}
        </div>
      </div>
    </SWRConfig>
  )
}
