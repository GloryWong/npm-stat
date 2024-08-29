'use client'

import { NextUIProvider, Spinner } from '@nextui-org/react'
import { BrowserRouter, useNavigate } from 'react-router-dom'
import type { ReactNode } from 'react'
import { useApiMocking } from '@/mocks/enableApiMocking'

function Provider({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  return (
    <NextUIProvider className="w-full h-full" navigate={navigate}>
      {children}
    </NextUIProvider>
  )
}

export function Providers({ children }: { children: ReactNode }) {
  const { isWorkerReady } = useApiMocking()

  if (!isWorkerReady) {
    return <Spinner />
  }

  return (
    <BrowserRouter>
      <Provider>{children}</Provider>
    </BrowserRouter>
  )
}
