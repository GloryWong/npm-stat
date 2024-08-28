'use client'

import React, { useEffect, useState } from 'react'
import { Divider } from '@nextui-org/react'
import { useSearchParams } from 'react-router-dom'
import { SWRConfig } from 'swr'
import type { Period } from '@/constants/periods'
import { fetcher } from '@/utils/fetcher'
import PackagePanel from '@/components/PackagePanel'
import SelectionPanel from '@/components/SelectionPanel'

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
        <div className="flex-1 min-w-0">
          <SelectionPanel {...{ userName, packageName, onSelectPackage: setPackageName, onConfirmInput: setUserName }} />
        </div>
        <Divider orientation="vertical" />
        <div className="flex-1 min-w-0">
          <PackagePanel {...{ packageName, period, onPeriodChange: period => setPeriod(period) }} />
        </div>
      </div>
    </SWRConfig>
  )
}
