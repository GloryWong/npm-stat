import type { ReactNode } from 'react'
import { isValidElement } from 'react'
import BaseLinkExternal from './BaseLinkExternal'
import { BaseLinkInternal } from './BaseLinkInternal'
import { isHttp } from '@/utils/isHttp'

interface Props {
  value: ReactNode
  className?: string
}

export default function BaseGridCellValue({ value, className }: Props) {
  if (typeof value === 'string') {
    if (isHttp(value))
      return <BaseLinkExternal url={value} className={className} />

    const [label, linkInternal, ...rest] = value.split(':')
    if (linkInternal === 'linkInternal' && rest) {
      try {
        const props = JSON.parse(rest.join(':'))
        if (props.searchParams) {
          return <BaseLinkInternal {...props}>{label}</BaseLinkInternal>
        }
      }
      catch {}
    }
  }

  if (isValidElement(value))
    return value

  return String(value)
}
