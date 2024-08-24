"use client";

import React, { lazy, Suspense, useEffect, useState } from 'react';
import PakcageList from '@/components/PackageList';
import { Button, Divider, Input, Spinner } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';
import { Period } from '@/components/DownloadGraph';
import { Icon } from '@iconify/react'

const DownloadGraphs = lazy(() => import('@/components/DownloadGraphs'))

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [packageName, setPackageName] = useState<string | undefined>(searchParams.get('packageName') ?? undefined);
  const [period, setPeriod] = useState<Period>(searchParams.get('period') as Period | null ?? 'last-week');
  const [userName, setUserName] = useState<string | undefined>(searchParams.get('userName') ?? undefined)

  const updateSearchParam = (key: string, value?: string) => {
    if (value) {
      searchParams.set(key, value)
      setSearchParams(searchParams)
    }
    else {
      searchParams.delete(key)
      setSearchParams(searchParams)
    }
  }

  useEffect(() => {
    updateSearchParam('packageName', packageName)
  }, [packageName])

  useEffect(() => {
    updateSearchParam('period', period)
  }, [period])

  const [input, setInput] = useState<string>(searchParams.get('userName') ?? '')
  const confirmInput = () => {
    setUserName(input)
  }
  useEffect(() => {
    updateSearchParam('userName', userName)
  }, [userName])

  return (
    <div className='w-full h-full flex gap-2'>
      <div className='flex-1 min-w-0 p-4 flex flex-col gap-4'>
        <div className='flex gap-2'>
          <Input type='text' placeholder='Author name' isClearable value={input} onKeyUp={(e) => {
            if (e.key === 'Enter') {
              confirmInput()
            }
          }} onValueChange={setInput}/>
          <Button type='button' isIconOnly onClick={confirmInput}>
            <Icon icon="material-symbols:search" />
          </Button>
        </div>
        <div className='flex-grow min-h-0'>
        {
          userName && <PakcageList userName={userName} onSelect={(name) => setPackageName(name as string)} />
        }
        </div>
      </div>
      <Divider orientation='vertical' />
      <div className='flex-1 min-w-0 p-4 flex justify-center'>
        { packageName ?
        <Suspense fallback={<Spinner />}>
            <DownloadGraphs packageName={packageName} period={period} onPeriodChange={setPeriod} />
        </Suspense>
          : <div>Select a package</div> }
      </div>
    </div>
  );
}
