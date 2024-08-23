"use client";

import React, { useState } from 'react';
import PakcageList from '@/components/PackageList';
import { Divider } from '@nextui-org/react';
import DownloadGraphs from '@/components/DownloadGraphs';

export default function Home() {
  const [selected, setSelected] = useState<string>();

  return (
    <div className='w-full h-full flex gap-2'>
      <div className='flex-1 p-4'>
        <PakcageList userName='gloxy' onSelect={(name) => setSelected(name as string)} />
      </div>
      <Divider orientation='vertical' />
      <div className='flex-1 p-4'>
        { selected && <DownloadGraphs packageName={selected} /> }
      </div>
    </div>
  );
}
