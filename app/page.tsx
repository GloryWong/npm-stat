"use client";

import React, { lazy, Suspense, useEffect, useState } from 'react';
import PakcageList from '@/components/PackageList';
import { Divider, Spinner } from '@nextui-org/react';
import { useSearchParams } from 'react-router-dom';
import { Period } from '@/components/DownloadGraph';

const DownloadGraphs = lazy(() => import('@/components/DownloadGraphs'))

export default function Home() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [packageName, setPackageName] = useState<string | undefined>(searchParams.get('packageName') ?? undefined);
  const [period, setPeriod] = useState<Period>(searchParams.get('period') as Period | null ?? 'last-week');

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

  return (
    <div className='w-full h-full flex gap-2'>
      <div className='flex-1 p-4 flex justify-center'>
        <PakcageList userName='gloxy' onSelect={(name) => setPackageName(name as string)} />
      </div>
      <Divider orientation='vertical' />
      <div className='flex-1 p-4 flex justify-center'>
        { packageName ?
        <Suspense fallback={<Spinner />}>
            <DownloadGraphs packageName={packageName} period={period} onPeriodChange={setPeriod} />
        </Suspense>
          : <div>Select a package</div> }
      </div>
    </div>
  );
}
