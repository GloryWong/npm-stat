'use client';

import { NextUIProvider } from '@nextui-org/react';
import { BrowserRouter } from 'react-router-dom';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <BrowserRouter>
      <NextUIProvider className='w-full h-full'>
        {children}
      </NextUIProvider>
    </BrowserRouter>
  );
}
