/* eslint-disable react/no-duplicate-key */
import { Button, Chip, Link, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ScrollShadow, Spinner, useDisclosure } from '@nextui-org/react'
import type { ReactNode } from 'react'
import { useMemo } from 'react'
import { JsonView, darkStyles } from 'react-json-view-lite'
import useSWR from 'swr'
import type { PackageJson } from 'type-fest'
import 'react-json-view-lite/dist/index.css'

interface Props {
  packageName: string
}

function removeProtocol(url: string) {
  return url.replace(/(^\w+:|^)\/\//, '')
}

function createLink(value: any, { className, pathOnly }: { className?: string, pathOnly?: boolean }) {
  return typeof value === 'string' && (value.startsWith('http') || value.startsWith('https'))
    ? <Link href={value} className={className} isExternal showAnchorIcon underline="hover">{pathOnly ? new URL(value).pathname.slice(1) : removeProtocol(value)}</Link>
    : String(value)
}

function Cell({ label, value, block }: { label: string, value: any, block?: boolean }) {
  return (
    <div className={`${block ? 'col-span-2 ' : ''}flex flex-col gap-2`}>
      <div className="text-gray-500 text-sm">{label}</div>
      <div className="flex gap-1 flex-wrap">
        {
          Array.isArray(value)
            ? value.map((v, index) => <Chip key={index}>{String(v)}</Chip>)
            : typeof value === 'object'
              ? Object.entries(value).map(([k, v], index) => (
                <div className="flex rounded-xl overflow-hidden text-sm" key={index}>
                  <span className="bg-gray-800 py-1 px-3">{k}</span>
                  <span className="py-1 px-3 bg-gray-900 text-gray-500">
                    {
                      createLink(v, { className: 'text-sm text-gray-500' })
                    }
                  </span>
                </div>
              ))
              : createLink(value, { className: 'text-gray-300', pathOnly: true })
        }
      </div>
    </div>
  )
}

function IModel({ label, children }: { label: string, children: ReactNode }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure()

  return (
    <>
      <Button onPress={onOpen}>{label}</Button>
      <Modal size="3xl" isOpen={isOpen} onOpenChange={onOpenChange} scrollBehavior="inside">
        <ModalContent>
          {onClose => (
            <>
              <ModalHeader className="flex flex-col gap-1">{label}</ModalHeader>
              <ModalBody>
                {children}
              </ModalBody>
              <ModalFooter>
                <Button variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  )
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
                    <IModel label="Package.json">
                      { data && <JsonView data={data} style={darkStyles} /> }
                    </IModel>
                  </div>
                  <div className="w-full flex-grow min-h-0">
                    <ScrollShadow className="h-full">
                      <div className="grid grid-cols-2 gap-8">
                        {
                          Object.values((packageInfo)).map(({ label, value, block }, index) => (
                            <Cell key={index} label={label} value={value} block={block} />
                          ))
                        }
                      </div>
                    </ScrollShadow>
                  </div>
                </div>
              )
      }
    </div>

  )
}
