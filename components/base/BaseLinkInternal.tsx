import type { LinkProps } from '@nextui-org/react'
import { Link } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import type { ReactNode } from 'react'
import { Icon } from '@iconify/react'

function createClientLinkUrl(searchParams: Record<string, any>, path = '/') {
  return `${path}?${new URLSearchParams({
    ...Object.fromEntries(new URLSearchParams(location.search)),
    ...searchParams,
  }).toString()}`
}

export interface BaseLinkInternalProps {
  path?: string
  searchParams: Record<string, any>
  children?: ReactNode
  className?: string
  size?: LinkProps['size']
  underline?: LinkProps['underline']
  showAnchorIcon?: LinkProps['showAnchorIcon']
}

export function BaseLinkInternal({ path, searchParams, children, className, size, underline, showAnchorIcon }: BaseLinkInternalProps) {
  const _searchParams = useSearchParams()
  return (
    <Link
      color="foreground"
      className={`gap-1${` ${className}`}`}
      size={size}
      underline={underline}
      anchorIcon={<Icon icon="material-symbols:search" />}
      showAnchorIcon={showAnchorIcon}
      href={createClientLinkUrl({
        ..._searchParams,
        ...searchParams,
      }, path)}
    >
      { children }
    </Link>
  )
}
