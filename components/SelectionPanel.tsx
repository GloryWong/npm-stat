import { Icon } from '@iconify/react/dist/iconify.js'
import { Spinner } from '@nextui-org/react'
import { Suspense, lazy } from 'react'
import SelectionPanelSearch from './SelectionPanelSearch'

interface Props {
  userName?: string
  packageName?: string
  onSelectPackage: (packageName: string) => void
  onConfirmInput: (input: string) => void
}

const SelectionPanelResult = lazy(() => import('@/components/SelectionPanelResult'))

export default function SelectionPanel({ userName, packageName, onSelectPackage, onConfirmInput }: Props) {
  return (
    <div className="h-full w-full p-4 flex flex-col gap-4">
      <SelectionPanelSearch {...{ defaultInput: userName, onConfirmInput }} />
      <div className="flex-grow min-h-0 flex justify-center">
        {
          userName
            ? (
                <Suspense fallback={<Spinner />}>
                  <SelectionPanelResult userName={userName} packageName={packageName} onSelect={onSelectPackage} />
                </Suspense>
              )
            : (
                <div className="flex items-center gap-2 flex-wrap">
                  <Icon icon="fa6-regular:hand-point-up" />
                  Type an author name to search for packages
                </div>
              )
        }
      </div>
    </div>
  )
}
