import { ScrollShadow, Spinner } from '@nextui-org/react'
import { useMemo } from 'react'
import { JsonView, darkStyles } from 'react-json-view-lite'
import useSWR from 'swr'
import type { PackageJson } from 'type-fest'
import 'react-json-view-lite/dist/index.css'
import BaseModel from './base/BaseModel'
import BaseGrid from './base/BaseGrid'

interface Props {
  packageName: string
}

export default function PackagePanelInfo({ packageName }: Props) {
  const { data, error, isLoading } = useSWR<PackageJson>(`/api/package/${encodeURIComponent(packageName)}`)

  const packageInfo = useMemo(() => {
    if (!data)
      return {}

    return {
      name: {
        label: 'Name',
        value: data.name,
      },
      type: {
        label: 'Type',
        value: data.type === 'module' ? 'ESModule' : 'CommonJS',
      },
      description: {
        label: 'Description',
        value: data.description,
        block: true,
      },
      repository: {
        label: 'Repository',
        value: (data.repository as { url?: string } | undefined)?.url?.replace('git+', '').replace('.git', ''),
      },
      license: {
        label: 'License',
        value: data.license,
      },
      author: {
        label: 'Author',
        value: data.author,
      },
      keywords: {
        label: 'Keywords',
        value: data.keywords,
      },
      dependencies: {
        label: 'Dependencies',
        value: data.dependencies,
        block: true,
      },
      devDependencies: {
        label: 'Dev Dependencies',
        value: data.devDependencies,
        block: true,
      },
    }
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
                  <div>
                    <BaseModel label="Package.json">
                      { data && <JsonView data={data} style={darkStyles} /> }
                    </BaseModel>
                  </div>
                  <div className="w-full flex-grow min-h-0">
                    <ScrollShadow className="h-full">
                      <BaseGrid items={Object.values((packageInfo))} />
                    </ScrollShadow>
                  </div>
                </div>
              )
      }
    </div>

  )
}
