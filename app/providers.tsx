'use client';

import { useApiMocking } from '@/mocks/enableApiMocking';
import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';

export function Providers({ children }: { children: React.ReactNode }) {
  const { isWorkerReady } = useApiMocking()

  if (!isWorkerReady) {
    return <div>Enabling api mocking...</div>;
  }
  
  return (
    <BrowserRouter>
      <NextUIProvider className='w-full h-full'>
        {children}
      </NextUIProvider>
    </BrowserRouter>
  );
}
