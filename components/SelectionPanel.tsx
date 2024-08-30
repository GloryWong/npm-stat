import { Icon } from '@iconify/react/dist/iconify.js'
import { Spinner } from '@nextui-org/react'
import { Suspense, lazy } from 'react'
import SelectionPanelSearch from './SelectionPanelSearch'
import type { SearchType } from '@/types/search-type'

interface Props {
  text?: string
  packageName?: string
  onSelectPackage: (packageName: string) => void
  onConfirmInput: (input: string) => void
  searchType?: SearchType
  onSearchTypeChange?: (type: SearchType) => void
}

const SelectionPanelResult = lazy(() => import('@/components/SelectionPanelResult'))

export default function SelectionPanel({ text, packageName, onSelectPackage, onConfirmInput, searchType, onSearchTypeChange }: Props) {
  return (
    <div className="h-full w-full p-4 flex flex-col gap-4">
      <SelectionPanelSearch {...{ defaultInput: text, onConfirmInput, searchType, onSearchTypeChange }} />
      <div className="flex-grow min-h-0 flex justify-center">
        {
          text
            ? (
                <Suspense fallback={<Spinner />}>
                  <SelectionPanelResult text={text} packageName={packageName} searchType={searchType} onSelect={onSelectPackage} />
                </Suspense>
              )
            : (
                <div className="flex items-center gap-2 flex-wrap">
                  <Icon icon="fa6-regular:hand-point-up" />
                  Type a publisher name to search for packages
                </div>
              )
        }
      </div>
    </div>
  )
}
