'use client'

import React, { Suspense, lazy, useEffect, useState } from 'react'
import { Divider, Spinner } from '@nextui-org/react'
import { useSearchParams } from 'react-router-dom'
import { SWRConfig } from 'swr'
import { fetcher } from '@/utils/fetcher'
import type { Period } from '@/types/period'

const SelectionPanel = lazy(() => import('@/components/SelectionPanel'))
const PackagePanel = lazy(() => import('@/components/PackagePanel'))

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

  return (
    <SWRConfig
      value={{
        fetcher,
      }}
    >
      <div className="w-full h-full flex gap-2">
        <div className="flex-1 min-w-0 flex justify-center items-center">
          <Suspense fallback={<Spinner />}>
            <SelectionPanel {...{ userName, packageName, onSelectPackage: setPackageName, onConfirmInput: setUserName }} />
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
