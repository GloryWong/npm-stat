import { Icon } from '@iconify/react/dist/iconify.js'
import { Spinner } from '@nextui-org/react'
import { Suspense, lazy } from 'react'
import PackagePanelInfo from './PackagePanelInfo'
import type { Period } from '@/types/period'

const PackagePanelDownloadGraphs = lazy(() => import('@/components/PackagePanelDownloadGraphs'))

export default function PackagePanel({ packageName, period, onPeriodChange }: { packageName?: string, period: Period, onPeriodChange: (period: Period) => void }) {
  return (
    <div className="h-full w-full p-4 flex flex-col gap-4">
      <div className="w-full flex-shrink-0 h-[300px] flex justify-center items-center">
        { packageName
          ? (
              <Suspense fallback={<Spinner />}>
                <PackagePanelDownloadGraphs packageName={packageName} period={period} onPeriodChange={onPeriodChange} />
              </Suspense>
            )
          : (
              <div className="flex items-center gap-2">
                <Icon icon="fa6-regular:hand-point-left" />
                Select a package in the package lists
              </div>
            )}
      </div>
      <div className="w-full flex-grow min-h-0">
        { packageName && <PackagePanelInfo packageName={packageName} /> }
      </div>
    </div>
  )
}
