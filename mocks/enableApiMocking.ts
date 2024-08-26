'use client'
import { useEffect, useState } from 'react';

export function useApiMocking() {
  const [isWorkerReady, setIsWorkerReady] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV === 'development' && typeof window !== "undefined") {
      import('@/mocks/browser').then(({ worker }) => worker.start({ onUnhandledRequest: 'bypass' })).then(() => {
        setIsWorkerReady(true)
      })
    } else {
      setIsWorkerReady(true)
    }
  }, [])

  return {
    isWorkerReady
  }
}
