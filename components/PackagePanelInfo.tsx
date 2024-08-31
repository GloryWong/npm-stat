import { ScrollShadow, Spinner } from '@nextui-org/react'
import { useMemo } from 'react'
import { JsonView, darkStyles } from 'react-json-view-lite'
import useSWR from 'swr'
import 'react-json-view-lite/dist/index.css'
import { format } from 'timeago.js'
import type { PackageJson } from 'type-fest'
import BaseModel from './base/BaseModel'
import BaseGrid from './base/BaseGrid'
import type { BaseGridCellProps } from './base/BaseGridCell'
import type { BaseLinkInternalProps } from './base/BaseLinkInternal'
import type { PackageInfo } from '@/types/package'
import type { SearchType } from '@/types/search-type'

interface Props {
  packageName: string
}

function createLintInternalString(str: string, searchType: SearchType, size?: BaseLinkInternalProps['size']) {
  return `${str}:linkInternal:{"searchParams":{"searchType":"${searchType}","text":"${str}"},${size ? `"size":"${size}",` : ''}"underline":"hover","showAnchorIcon":true}`
}

function createDepsLink(deps: PackageJson['dependencies']) {
  return Object.fromEntries(Object.entries(deps ?? {}).map(([k, v]) => ([
    createLintInternalString(k, 'text', 'sm'),
    v,
  ])))
}

function createPackageItems(data: PackageInfo): BaseGridCellProps[] {
  const { packageJson, maintainers, date, npmLink } = data

  return [
    {
      label: 'Name',
      value: packageJson.name,
    },
    {
      label: 'Version',
      value: packageJson.version,
    },
    {
      label: 'Description',
      value: packageJson.description,
      block: true,
    },
    {
      label: 'Maintainers',
      value: maintainers.map(v => createLintInternalString(v, 'maintainer', 'sm')),
    },
    {
      label: 'Publish Time',
      value: format(date),
    },
    {
      label: 'Module Type',
      value: packageJson.type === 'module' ? 'ESModule' : 'CommonJS',
    },
    {
      label: 'License',
      value: packageJson.license,
    },
    {
      label: 'Repository',
      value: (packageJson.repository as { url?: string } | undefined)?.url?.replace('git+', '').replace('.git', ''),
    },
    {
      label: 'Registry',
      value: npmLink,
    },
    {
      label: 'Author',
      value: packageJson.author,
      block: true,
    },
    {
      label: 'Keywords',
      value: packageJson.keywords,
      block: true,
    },
    {
      label: 'Dependencies',
      value: createDepsLink(packageJson.dependencies),
      block: true,
    },
    {
      label: 'Dev Dependencies',
      value: createDepsLink(packageJson.devDependencies),
      block: true,
    },
    {
      label: 'Package JSON',
      value: (
        <BaseModel
          buttonLabel="show"
          buttonSize="sm"
          modalTitle={(
            <div className="flex items-center gap-4">
              <span className="">{packageJson.name}</span>
              <span className="text-gray-500">package.json</span>
            </div>
          )}
        >
          <JsonView data={packageJson} style={darkStyles} />
        </BaseModel>
      ),
    },
  ]
}

export default function PackagePanelInfo({ packageName }: Props) {
  const { data, error, isLoading } = useSWR<PackageInfo>(`/api/package/${encodeURIComponent(packageName)}`)

  const packageItems = useMemo(() => {
    if (!data)
      return []

    return createPackageItems(data)
  }, [data])

  return (
    <div className="h-full w-full flex justify-center">
      {
        isLoading
          ? <Spinner />
          : error
            ? (
                <div className="text-red-500">
                  Failed to load data
                  {JSON.stringify(error.message)}
                </div>
              )
            : (
                <div className="w-full h-full flex flex-col gap-4">
                  <div className="w-full flex-grow min-h-0">
                    <ScrollShadow className="h-full">
                      <BaseGrid items={packageItems} />
                    </ScrollShadow>
                  </div>
                </div>
              )
      }
    </div>

  )
}
