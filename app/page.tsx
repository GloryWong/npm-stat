'use client'

import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Divider, Spinner } from '@nextui-org/react'
import { useSearchParams } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { fetcher } from '@/utils/fetcher'
import type { Period } from '@/types/period'
import type { SearchType } from '@/types/search-type'

const SelectionPanel = lazy(() => import('@/components/SelectionPanel'))
const PackagePanel = lazy(() => import('@/components/PackagePanel'))

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [packageName, setPackageName] = useState<string | undefined>(searchParams.get('packageName') ?? undefined)
  const [period, setPeriod] = useState<Period>(searchParams.get('period') as Period | null ?? 'last-week')
  const [text, setText] = useState<string | undefined>(searchParams.get('text') ?? undefined)
  const [searchType, setSearchType] = useState<SearchType>(searchParams.get('searchType') as SearchType | null ?? 'text')

  useEffect(() => {
    setPackageName(searchParams.get('packageName') ?? undefined)
    setPeriod(searchParams.get('period') as Period | null ?? 'last-week')
    setText(searchParams.get('text') ?? undefined)
    setSearchType(searchParams.get('searchType') as SearchType | null ?? 'text')
  }, [searchParams])

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
  useUpdateSearchParam('text', text)
  useUpdateSearchParam('searchType', searchType)

  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <div className="w-full h-full flex gap-2">
        <div className="flex-1 min-w-0 flex justify-center items-center">
          <Suspense fallback={<Spinner />}>
            <SelectionPanel {...{ text, packageName, onSelectPackage: setPackageName, onConfirmInput: setText, searchType, onSearchTypeChange: type => setSearchType(type) }} />
          </Suspense>
        </div>
        <Divider orientation="vertical" />
        <div className="flex-1 min-w-0 flex justify-center items-center">
          <Suspense fallback={<Spinner />}>
            <PackagePanel {...{ packageName, period, onPeriodChange: period => setPeriod(period) }} />
          </Suspense>
        </div>
      </div>
    </SWRConfig>
  )
}
