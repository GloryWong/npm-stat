import { Link } from '@nextui-org/react'

interface Props {
  url: string
  className?: string
  titleType?: 'full' | 'path' | 'no-protocol'
  isExternal?: boolean
}

function removeProtocol(url: string) {
  return url.replace(/(^\w+:|^)\/\//, '')
}

export default function BaseGridLink({ url, className, titleType = 'full', isExternal }: Props) {
  return (
    <Link href={url} className={className} isExternal={isExternal} showAnchorIcon={isExternal} underline="hover">
      {
        titleType === 'path'
          ? new URL(url).pathname.slice(1)
          : titleType === 'no-protocol'
            ? removeProtocol(url)
            : url
      }
    </Link>
  )
}
