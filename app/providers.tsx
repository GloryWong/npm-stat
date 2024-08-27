'use client'

import { NextUIProvider, Spinner } from '@nextui-org/react'
import { BrowserRouter } from 'react-router-dom'
import { useApiMocking } from '@/mocks/enableApiMocking'

export function Providers({ children }: { children: React.ReactNode }) {
  const { isWorkerReady } = useApiMocking()

  if (!isWorkerReady) {
    return <Spinner />
  }

  return (
    <BrowserRouter>
      <NextUIProvider className="w-full h-full">
        {children}
      </NextUIProvider>
    </BrowserRouter>
  )
}
