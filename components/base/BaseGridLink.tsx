import { Link } from '@nextui-org/react'

interface Props {
  url: string
  className?: string
  /**
   * if not provided, the url is used
   */
  title?: string
  urlTitleType?: 'full' | 'no-protocol' | 'path'
  isExternal?: boolean
}

function removeProtocol(url: string) {
  return url.replace(/(^\w+:|^)\/\//, '')
}

export default function BaseGridLink({ url, className, title, urlTitleType = 'full', isExternal }: Props) {
  return (
    <Link href={url} className={className} isExternal={isExternal} showAnchorIcon={isExternal} underline="always">
      {(() => {
        if (title)
          return title

        if (urlTitleType === 'path')
          return new URL(url).pathname.slice(1)
        if (urlTitleType === 'no-protocol')
          return removeProtocol(url)
        return url
      })()}
    </Link>
  )
}
